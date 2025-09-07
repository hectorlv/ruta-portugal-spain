(function () {
  function mapTravelMode(modeStr) {
    return google.maps.TravelMode[modeStr];
  }

  function mapTransitOptions(opts) {
    if (!opts) return undefined;
    return {
      departureTime: opts.departureTime,
      modes: Array.isArray(opts.modes) ? opts.modes.map((m) => google.maps.TransitMode[m]) : undefined,
    };
  }

  function routesAsync(directionsService, request) {
    return new Promise((resolve, reject) => {
      directionsService.route(request, (result, status) => {
        if (status === "OK") {
          resolve(result);
        } else {
          reject(status);
        }
      });
    });
  }

  async function renderRoute(directionsService, routes, map) {
    for (const r of routes) {
      const request = {
        origin: r.origin,
        destination: r.destination,
        waypoints: r.waypoints,
        travelMode: mapTravelMode(r.travelMode),
      };
      if (request.travelMode === google.maps.TravelMode.TRANSIT) {
        request.transitOptions = mapTransitOptions(r.transitOptions);
      }

      try {
        const result = await routesAsync(directionsService, request);

        new google.maps.DirectionsRenderer({
          map: map,
          directions: result,
          suppressMarkers: true,
          polylineOptions: {
            strokeColor: request.travelMode === google.maps.TravelMode.DRIVING ? "#0074D9" : "#FF4136",
            strokeWeight: 5,
          },
        });

        const legs = result.routes[0].legs;
        if (legs.length > 0) {
          const firstStartCity = legs[0].start_address.split(",")[0];
          new google.maps.Marker({ position: legs[0].start_location, map, title: firstStartCity });
        }
        legs.forEach((leg) => {
          const endCity = leg.end_address.split(",")[0];
          new google.maps.Marker({ position: leg.end_location, map, title: endCity });
        });

        const panel = document.getElementById("ruta");
        let routeHtml = "";
        legs.forEach((leg, i) => {
          const transitStep = (leg.steps || []).find((s) => s.transit);
          routeHtml += `<p><strong>Tramo ${i + 1}:</strong> ${leg.start_address} → ${leg.end_address}<br>
                Distancia: ${leg.distance.text}, Tiempo: ${leg.duration.text}
                ${transitStep ? `<br>Instrucciones: ${transitStep.instructions}<br>Salida: ${transitStep.transit.departure_stop.name} ${formatDate(transitStep.transit.departure_time.value)}<br>Llegada: ${transitStep.transit.arrival_stop.name} ${formatDate(transitStep.transit.arrival_time.value)}<br>Paradas: ${transitStep.transit.num_stops}` : ''}
              </p>`;
        });
        panel.innerHTML += routeHtml;
      } catch (error) {
        console.error("Error al obtener la ruta:", error);
        const panel = document.getElementById("ruta");
        panel.innerHTML += `<p>Error al obtener la ruta: ${error}</p>`;
      }
    }
  }

  // Formatea tipo Date a dd/MM/yyyy hh:mm
  function formatDate(date) {
    const options = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    return date.toLocaleString("es-ES", options);
  }

  function renderFlightPath(flightPaths, map) {
    flightPaths.forEach((path) => {
      const flightPath = new google.maps.Polyline({
        path: path,
        geodesic: true,
        strokeColor: "#8e44ad",
        strokeOpacity: 0.8,
        strokeWeight: 4,
        icons: [
          {
            icon: { path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW },
            offset: "100%",
          },
        ],
      });
      flightPath.setMap(map);
    });
  }

  // Init global para callback de Google Maps
  window.initMap = function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 6,
      center: { lat: 40.4168, lng: -3.7038 }, // Madrid
    });

    const directionsService = new google.maps.DirectionsService();
    renderRoute(directionsService, window.ROUTES || [], map);
    renderFlightPath(window.FLIGHT_PATHS || [], map);

    const panel = document.getElementById("ruta");
    panel.innerHTML += `
      <h3>Tramos en avión</h3>
      <ul>
      <li><strong>Ciudad de México → Oporto (vía Madrid)</strong><br>
        Vuelo a Madrid, duración aproximada: 10h 40min<br>
        Conexión: 2 horas<br>
        Vuelo a Oporto, duración aproximada: 1h 15min<br>
      </li>
      <li><strong>Lisboa → Madrid</strong><br>
        Vuelo directo, duración aproximada: 1h 25min
      </li>
      <li><strong>Madrid → Granada</strong><br>
        Vuelo directo, duración aproximada: 1h 10min
      </li>
      <li><strong>Madrid → Ciudad de México</strong><br>
        Vuelo directo, duración aproximada: 11h 25min
      </li>
      </ul>
    `;
  };
})();
