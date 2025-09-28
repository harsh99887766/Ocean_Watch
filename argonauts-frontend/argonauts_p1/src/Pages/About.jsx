import React from "react";
import bgImage from "../assets/goodBG.jpg";

function AboutUs() {
  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative max-w-6xl mx-auto space-y-16 p-10 pt-32 text-white">
        
        {/* Title */}
        <div className="border-2 border-gray-400 rounded-2xl p-8 bg-black/40 shadow-xl text-center">
          <h1 className="text-5xl font-bold mb-4">About Us</h1>
          <p className="text-xl text-gray-200 max-w-4xl mx-auto">
            We are <span className="font-bold">Argonauts</span> — a team dedicated to
            making oceanographic data accessible, interactive, and actionable through AI-powered tools.
          </p>
        </div>

        {/* Background Section */}
        <div className="border-2 border-gray-400 rounded-2xl p-8 bg-black/40 shadow-xl space-y-6">
          <h2 className="text-4xl font-bold">Background</h2>
          <p className="text-gray-200 text-lg font-medium">
            Oceanographic data is vast, complex, and heterogeneous – ranging from satellite
            observations to in-situ measurements like CTD casts, Argo floats, and BGC sensors.
            The Argo program, which deploys autonomous profiling floats across the world’s oceans,
            generates extensive datasets in NetCDF format containing temperature, salinity, and
            other key variables. Accessing and analyzing this data requires specialized tools and
            expertise, which limits its accessibility.
          </p>
        </div>

        {/* Problem & Solution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div className="border-2 border-gray-400 rounded-2xl p-8 bg-black/40 shadow-xl space-y-6">
            <h2 className="text-4xl font-bold">The Problem</h2>
            <p className="text-gray-200 text-lg font-medium">
              Users face challenges when working with ARGO NetCDF files due to their complexity.
              Querying, visualizing, and extracting insights demands technical knowledge and
              domain expertise. Non-technical users are often unable to explore the rich ocean
              datasets effectively.
            </p>
          </div>

          <div className="border-2 border-gray-400 rounded-2xl p-8 bg-black/40 shadow-xl space-y-6">
            <h2 className="text-4xl font-bold">Our Solution</h2>
            <p className="text-gray-200 text-lg font-medium">
              We are building an AI-powered conversational system that enables intuitive
              interaction with Argo float data. By leveraging Retrieval-Augmented Generation (RAG),
              structured databases, and interactive dashboards, our solution transforms raw data
              into meaningful insights. With natural language queries, users can easily explore
              ocean profiles, trends, and comparisons — bridging the gap between scientists,
              decision-makers, and data.
            </p>
          </div>
        </div>

        {/* Expected Features */}
        <div className="border-2 border-gray-400 rounded-2xl p-8 bg-black/40 shadow-xl space-y-6">
          <h2 className="text-4xl font-bold">Expected Features</h2>
          <ul className="list-disc list-inside text-lg text-gray-200 space-y-2">
            <li>End-to-end pipeline to process ARGO NetCDF data into PostgreSQL + Vector DBs</li>
            <li>RAG-based LLM system that converts natural language into SQL queries</li>
            <li>Interactive dashboards with maps, plots, and profile comparisons</li>
            <li>Chat interface for intuitive question-answering</li>
            <li>Proof-of-Concept on Indian Ocean data with extensibility to BGC floats, gliders, buoys, and satellites</li>
          </ul>
        </div>

        {/* Team Section */}
        <div className="border-2 border-gray-400 rounded-2xl p-8 bg-black/40 shadow-xl text-center space-y-6">
          <h2 className="text-4xl font-bold">Our Team</h2>
          <p className="text-xl text-gray-200 font-semibold">
            We are the <span className="font-bold">Argonauts</span>
          </p>
          <div className="flex flex-wrap justify-center gap-4.5 mt-6">
            <span className="bg-white/10 px-6 py-3 rounded-xl">Parikshit Desai</span>
            <span className="bg-white/10 px-6 py-3 rounded-xl">Harsh Pawar</span>
            <span className="bg-white/10 px-6 py-3 rounded-xl">Gargi Rahane</span>
            <span className="bg-white/10 px-6 py-3 rounded-xl">Rashmi Abhyankar</span>
            <span className="bg-white/10 px-6 py-3 rounded-xl">Aabha Jog</span>
            <span className="bg-white/10 px-6 py-3 rounded-xl">Akanksha Bhagwat</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;