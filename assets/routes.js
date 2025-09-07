// Datos de rutas por carretera y tren
window.ROUTES = [
  {
    origin: "Rua do Almada 539, 4050-039 Porto, Portugal",
    destination: "Lisboa, Portugal", // Falta hotel de Lisboa
    waypoints: [
      { location: "Estátua de Dom Dinis" },
      { location: "Mosteiro da Batalha" },
      { location: "Santuário de Nossa Senhora de Fátima" },
      { location: "Lisboa, Portugal" },  
      { location: "Palácio Nacional da Pena" }
    ],
    travelMode: "DRIVING",
  },
  {
    origin: "C. de la Flor Baja, 3, Centro, 28013 Madrid, España",
    destination: "C. de la Flor Baja, 3, Centro, 28013 Madrid, España",
    waypoints: [
      { location: "Toledo, Spain" },
      { location: "Segovia, Spain" },
      { location: "Ávila, Spain" },
    ],
    travelMode: "DRIVING",
  },
  {
    origin: "Granada, Spain",
    destination: "Cordoba, Spain",
    waypoints: [],
    travelMode: "TRANSIT",
    transitOptions: {
      departureTime: new Date("2025-10-12T15:06:00+02:00"),
      modes: ["TRAIN"]
    },
  },
  {
    origin: "Cordoba, Spain",
    destination: "Sevilla, Spain",
    waypoints: [],
    travelMode: "TRANSIT",
    transitOptions: {
      departureTime: new Date("2025-10-13T17:49:00+02:00"),
      modes: ["TRAIN"]
    },
  },
  {
    origin: "Sevilla, Spain",
    destination: "Madrid, Spain",
    waypoints: [],
    travelMode: "TRANSIT",
    transitOptions: {
      departureTime: new Date("2025-10-16T15:06:00+02:00"),
      modes: ["TRAIN"]
    },
  }
];

// Tramos de vuelo para dibujar polilíneas
window.FLIGHT_PATHS = [
  // Ciudad de México → Oporto (vía Madrid)
  [
    { lat: 19.436169079217773, lng: -99.07072287203195 }, // Mexico City Airport
    { lat: 40.49098395926725, lng: -3.572456116177815 }, // Madrid Airport
    { lat: 41.247649238140774, lng: -8.679794767673798 }, // Oporto Airport
  ],
  // Lisboa → Madrid
  [
    { lat: 38.77937753585106, lng: -9.129309078522576 }, // Lisboa Airport
    { lat: 40.49098395926725, lng: -3.572456116177815 }, // Madrid Airport
  ],
  // Madrid → Granada
  [
    { lat: 40.49098395926725, lng: -3.572456116177815 }, // Madrid Airport
    { lat: 37.18788252763504, lng: -3.7775277500907265 }, // Granada
  ],
  // Madrid → Ciudad de México
  [
    { lat: 40.49098395926725, lng: -3.572456116177815 }, // Madrid Airport
    { lat: 19.436169079217773, lng: -99.07072287203195 } // Mexico City Airport
  ]
];
