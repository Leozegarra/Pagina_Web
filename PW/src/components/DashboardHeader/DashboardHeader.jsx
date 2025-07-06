import React from 'react'

export default function DashboardHeader({title, onGestionarCategorias}) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center px-6 py-4 bg-white shadow-sm border-b border-gray-100 mb-6 gap-2 md:gap-0">
      <div className="flex items-center gap-2">
        <svg className="w-6 h-6 text-teal-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h8M12 8v8" /></svg>
        <h1 className="text-xl md:text-2xl font-bold text-gray-800 tracking-tight">{title}</h1>
      </div>
      <div className="flex gap-2">
        {onGestionarCategorias && (
          <button
            className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 transition text-gray-700 px-5 py-2 rounded-full shadow-sm font-semibold text-sm active:scale-95 focus:outline-none focus:ring-2 focus:ring-teal-200 focus:ring-offset-2"
            onClick={onGestionarCategorias}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
            Gestionar Categorías
          </button>
        )}
        <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 transition text-gray-700 px-5 py-2 rounded-full shadow-sm font-semibold text-sm active:scale-95 focus:outline-none focus:ring-2 focus:ring-teal-200 focus:ring-offset-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5v-9m0 0L8.25 7.5m3.75 0l3.75 3.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Exportar
        </button>
      </div>
    </div>
  );
}