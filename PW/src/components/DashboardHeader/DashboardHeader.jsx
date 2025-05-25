import React from 'react'

export default function DashboardHeader({title}) {
  return (
    <div className="flex justify-between items-center p-4 bg-white shadow">
      <h1 className="text-lg font-bold">{title}</h1>
      <button className="bg-teal-500 text-white px-4 py-2 rounded-lg">Export</button>
    </div>
  );
}