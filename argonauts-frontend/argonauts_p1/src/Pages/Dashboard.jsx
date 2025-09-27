import React, { useState, useEffect } from "react";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import newArgopng from "../assets/goodBG.jpg";

const Dashboard = () => {
  const [argos, setArgos] = useState([]);
  const [selectedArgo, setSelectedArgo] = useState("");
  const [cycles, setCycles] = useState([]);
  const [selectedCycle, setSelectedCycle] = useState("");
  const [measurements, setMeasurements] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/argos")
      .then(res => setArgos(res.data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    if (!selectedArgo) return;
    axios.get(`http://localhost:5000/api/argos/${selectedArgo}/cycles`)
      .then(res => setCycles(res.data))
      .catch(err => console.error(err));
  }, [selectedArgo]);

  useEffect(() => {
    if (!selectedCycle || !selectedArgo) return;
    axios.get(`http://localhost:5000/api/argos/${selectedArgo}/cycles/${selectedCycle}`)
      .then(res => setMeasurements(res.data))
      .catch(err => console.error(err));
  }, [selectedCycle, selectedArgo]);

  const cycleDetails = cycles.find(c => c.cycle_id === parseInt(selectedCycle));

  return (
    <div
      className="min-h-screen p-4 md:p-8 space-y-8 bg-cover bg-center "
       style={{ backgroundImage: `url(${newArgopng})` }}
    >
      {/* Dropdowns */}
      <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 justify-center items-center">
        <select
          className="p-2 border rounded shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-black text-white"
          value={selectedArgo}
          onChange={e => { setSelectedArgo(e.target.value); setSelectedCycle(""); setMeasurements([]); }}
        >
          <option value="">Select Argo ID</option>
          {argos.map(a => (
            <option key={a.argo_id} value={a.argo_id}>{a.argo_id}</option>
          ))}
        </select>

        <select
          className="p-2 border rounded shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-black text-white"
          value={selectedCycle}
          onChange={e => setSelectedCycle(e.target.value)}
        >
          <option value="">Select Cycle</option>
          {cycles.map(c => (
            <option key={c.cycle_id} value={c.cycle_id}>{c.cycle_id}</option>
          ))}
        </select>
      </div>

      {/* Graphs */}
      {measurements.length > 0 && (
        <div className="flex flex-col md:flex-row md:justify-center md:space-x-6 space-y-6 md:space-y-0 overflow-x-auto">
          {[
            { key: "temp", title: "Temperature (°C)", color: "#ec4899", gradient: "url(#tempGrad)" },
            { key: "salinity", title: "Salinity (PSU)", color: "#10b981", gradient: "url(#salinityGrad)" },
            { key: "press", title: "Pressure (dbar)", color: "#6366f1", gradient: "url(#pressGrad)" },
          ].map((g, i) => (
            <div key={i} className="flex-shrink-0 p-4 rounded-xl shadow-lg w-full md:w-96 mx-auto"
                 style={{ background: "rgba(255, 255, 255, 0.85)" }}>
              <h3 className="text-lg font-semibold mb-2 text-center" style={{ color: g.color }}>{g.title} vs Depth Level</h3>
              <LineChart width={350} height={250} data={measurements}>
                <defs>
                  <linearGradient id="tempGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#f472b6"/>
                    <stop offset="100%" stopColor="#fb7185"/>
                  </linearGradient>
                  <linearGradient id="salinityGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#6ee7b7"/>
                    <stop offset="100%" stopColor="#14b8a6"/>
                  </linearGradient>
                  <linearGradient id="pressGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#a5b4fc"/>
                    <stop offset="100%" stopColor="#6366f1"/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="depth" label={{ value: "Depth Level", position: "insideBottomRight", offset: -5 }} />
                <YAxis />
                <CartesianGrid stroke="#e0e0e0" strokeDasharray="5 5" />
                <Tooltip 
                  contentStyle={{ backgroundColor: "#fff", borderRadius: "10px", borderColor: g.color }} 
                  labelStyle={{ color: g.color }}
                  itemStyle={{ color: "#111" }} 
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey={g.key}
                  stroke={g.gradient}
                  strokeWidth={3}
                  dot={{ fill: g.color, r: 5, stroke: "#fff", strokeWidth: 2 }}
                  activeDot={{ r: 8, fill: g.color, stroke: "#1d4ed8", strokeWidth: 2 }}
                  animationDuration={1200}
                />
              </LineChart>
            </div>
          ))}
        </div>
      )}

      {/* Map for selected cycle */}
      {cycleDetails && (
        <div className="p-4 rounded-xl shadow-lg mt-6" style={{ background: "rgba(255, 255, 255, 0.85)" }}>
          <h2 className="text-xl font-semibold mb-2 text-center">Cycle Location Map</h2>
          <MapContainer
            center={[cycleDetails.lat, cycleDetails.long]}
            zoom={5}
            className="w-full h-96 rounded"
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[cycleDetails.lat, cycleDetails.long]}>
              <Popup>
                <div className="text-sm">
                  <p><strong>Cycle ID:</strong> {cycleDetails.cycle_id}</p>
                  <p><strong>Mean Temp:</strong> {cycleDetails.mean_temp} °C</p>
                  <p><strong>Mean Salinity:</strong> {cycleDetails.mean_salinity} PSU</p>
                  <p><strong>Mean Pressure:</strong> {cycleDetails.mean_press} dbar</p>
                  <p><strong>Latitude:</strong> {cycleDetails.lat.toFixed(2)}</p>
                  <p><strong>Longitude:</strong> {cycleDetails.long.toFixed(2)}</p>
                </div>
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
