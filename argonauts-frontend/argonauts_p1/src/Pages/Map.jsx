import React, { useState, useEffect } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Polyline, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import bgpng from "../assets/goodBG.jpg";

const MapPage = () => {
  const [argos, setArgos] = useState([]);
  const [selectedArgo, setSelectedArgo] = useState("");
  const [cycles, setCycles] = useState([]);
  const [hoveredCycle, setHoveredCycle] = useState(null);

  // Fetch all Argo IDs
  useEffect(() => {
    axios.get("http://localhost:5000/api/argos")
      .then(res => setArgos(res.data))
      .catch(err => console.error(err));
  }, []);

  // Fetch cycles for selected Argo
  useEffect(() => {
    if (!selectedArgo) return;
    axios.get(`http://localhost:5000/api/argos/${selectedArgo}/cycles`)
      .then(res => setCycles(res.data))
      .catch(err => console.error(err));
  }, [selectedArgo]);

  // Sort cycles to find the latest
  const sortedCycles = [...cycles].sort((a, b) => a.cycle_id - b.cycle_id);
  const latestCycleId = sortedCycles[sortedCycles.length - 1]?.cycle_id;

  return (
    <div
      className="relative min-h-screen p-4 md:p-8 space-y-8"
      style={{
        backgroundImage: `url(${bgpng})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay for slight transparency */}
      <div className="absolute inset-0 bg-black opacity-30 z-0"></div>

      <div className="relative z-10 space-y-6">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-white drop-shadow-lg">
          Argonauts Trajectory Map
        </h1>

        {/* Argo ID Dropdown */}
        <div className="flex justify-center mb-4">
          <select
            className="p-2 border rounded shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-black text-white"
            value={selectedArgo}
            onChange={e => setSelectedArgo(e.target.value)}
          >
            <option value="">Select Argo ID</option>
            {argos.map(a => (
              <option key={a.argo_id} value={a.argo_id}>{a.argo_id}</option>
            ))}
          </select>
        </div>

        {/* Messages */}
        {selectedArgo && sortedCycles.length === 0 && (
          <p className="text-center text-gray-200">Loading trajectory...</p>
        )}

        {/* Map */}
        {selectedArgo && sortedCycles.length > 0 && (
          <MapContainer
            center={[sortedCycles[0].lat, sortedCycles[0].long]}
            zoom={4}
            className="w-full h-[600px] rounded shadow-lg"
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {/* Gradient-like modern trajectory line */}
            <Polyline
              positions={sortedCycles.map(c => [c.lat, c.long])}
              color="#3b82f6"
              weight={4}
              opacity={0.7}
              dashArray="5,5"
            />

            {/* Cycle points */}
            {sortedCycles.map(c => (
              <CircleMarker
                key={c.cycle_id}
                center={[c.lat, c.long]}
                radius={hoveredCycle === c.cycle_id ? 10 : 6}
                color={c.cycle_id === latestCycleId ? "yellow" : "red"}
                fillColor={c.cycle_id === latestCycleId ? "yellow" : "red"}
                fillOpacity={0.8}
                eventHandlers={{
                  click: () => setHoveredCycle(c.cycle_id),
                  mouseover: () => setHoveredCycle(c.cycle_id),
                  mouseout: () => setHoveredCycle(null),
                }}
              >
                <Popup>
                  <div className="text-sm">
                    <p><strong>Cycle ID:</strong> {c.cycle_id}</p>
                    <p><strong>Mean Temp:</strong> {c.mean_temp} °C</p>
                    <p><strong>Mean Salinity:</strong> {c.mean_salinity} PSU</p>
                    <p><strong>Mean Pressure:</strong> {c.mean_press} dbar</p>
                    <p><strong>Lat:</strong> {c.lat.toFixed(2)}</p>
                    <p><strong>Long:</strong> {c.long.toFixed(2)}</p>
                  </div>
                </Popup>
              </CircleMarker>
            ))}
          </MapContainer>
        )}
      </div>
    </div>
  );
};

export default MapPage;
