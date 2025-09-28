import React from "react";
import bgImage from "../assets/goodBG.jpg";

function HowToUse() {
  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative space-y-20 p-10 pt-32 text-white">
        {/* Title */}
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-4">How to Use the Portal</h1>
          <p className="text-xl text-gray-200 max-w-4xl mx-auto">
            Our portal provides three main features to explore ARGO data — 
            <span className="font-semibold"> Map Interface</span>, 
            <span className="font-semibold"> Dashboard</span>, and 
            <span className="font-semibold"> AI Chatbot</span>.
          </p>
        </div>

        {/* Feature 1: Map Interface */}
        <div className="border-2 border-gray-400 rounded-2xl p-8 bg-black/40 shadow-xl text-center space-y-6">
          <h2 className="text-4xl font-bold">1. Map Interface</h2>
          <p className="text-gray-200 text-lg font-medium">
            Use the interactive map to select an <span className="font-semibold">Argo ID</span>.
            The map will display where the Argo float has traveled, showing its trajectory
            and current location. Clicking on a float will reveal essential information like
            coordinates, measurement dates, and basic parameters.
          </p>
        </div>

        {/* Feature 2: Dashboard */}
        <div className="border-2 border-gray-400 rounded-2xl p-8 bg-black/40 shadow-xl text-center space-y-6">
          <h2 className="text-4xl font-bold">2. Dashboard</h2>
          <p className="text-gray-200 text-lg font-medium">
            On the dashboard, select an <span className="font-semibold">Argo ID</span> and a specific 
            <span className="font-semibold"> cycle</span>. The portal will generate
            visualization graphs such as:
          </p>
          <ul className="list-disc list-inside text-lg text-gray-200 space-y-2 ml-6">
            <li>Temperature vs Depth</li>
            <li>Salinity vs Depth</li>
            <li>Float location and metadata for that cycle</li>
          </ul>
          <p className="text-gray-200 text-lg font-medium">
            These visualizations help users explore the vertical structure of the ocean
            and understand conditions at different depths.
          </p>
        </div>

        {/* Feature 3: Chatbot */}
        <div className="border-2 border-gray-400 rounded-2xl p-8 bg-black/40 shadow-xl text-center space-y-6">
          <h2 className="text-4xl font-bold">3. AI Chatbot</h2>
          <p className="text-gray-200 text-lg font-medium">
            Our chatbot allows users to ask natural language questions about oceanographic
            data. The system translates queries into database searches and provides
            precise answers with context. You can explore trends, comparisons, or specific
            float details without writing any code.
          </p>

          {/* Example Queries */}
          <h3 className="text-2xl font-semibold mt-4">Example Queries:</h3>
          <ul className="list-disc list-inside text-lg text-gray-200 space-y-2 ml-6">
            <li>“Show me salinity profiles near the equator in March 2025.”</li>
            <li>“Tell me about argo id 7902246.”</li>
            <li>“Give me the depth profile of float 7902246 for cycle 5.”</li>
            <li>“Explain salinity variations in the equatorial region.”</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default HowToUse;