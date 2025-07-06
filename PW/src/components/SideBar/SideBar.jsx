import React from "react";
import { Link, useLocation } from "react-router-dom";
import LogoIcon from "./../../assets/images/jpg/LogoIcon.jpg"

const navItems = [
  { to: "/admin/listUsers", label: "Usuarios", icon: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87M16 3.13a4 4 0 010 7.75M8 3.13a4 4 0 000 7.75" /></svg>
  )},
  { to: "/admin/listOrders", label: "Órdenes", icon: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-6a2 2 0 012-2h2a2 2 0 012 2v6m-6 0h6" /></svg>
  )},
  { to: "/admin/createProduct", label: "Crear Producto", icon: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
  )},
  { to: "/admin/listProducts", label: "Lista de Productos", icon: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /></svg>
  )},
  { to: "/admin/categorias", label: "Categorias", icon: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
  )},
];

export default function SideBar({ onGestionarCategorias }) {
  const location = useLocation();
  const adminEmail = 'admin@example.com';
  const adminAvatar = LogoIcon;
  return (
    <aside className="w-64 min-w-[180px] h-screen bg-white flex flex-col text-gray-800 shadow-2xl rounded-r-2xl border-r border-gray-100 py-6 px-4">
      <div className="flex flex-col items-center gap-2 mb-8">
        <img className="rounded-full w-14 h-14 shadow border-2 border-gray-200" src={LogoIcon} alt="Logo icon" />
        <span className="flex items-center gap-1 text-base font-bold text-gray-700 mt-1">
          <svg className="w-5 h-5 text-teal-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h8M12 8v8" /></svg>
          Dashboard
        </span>
      </div>
      <nav className="flex-1">
        <ul className="flex flex-col gap-2">
          {navItems.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                className={`flex items-center gap-2 py-2 px-4 rounded-lg font-medium text-sm transition-all ${location.pathname === item.to ? 'bg-teal-50 text-teal-700 shadow' : 'hover:bg-gray-100 text-gray-800'}`}
              >
                {item.icon}
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-auto pt-8 border-t border-gray-100 flex flex-col gap-2 items-center">
        {onGestionarCategorias && (
          <button
            className="w-full mb-2 py-2 rounded-full bg-gray-100 text-gray-700 font-semibold shadow hover:bg-gray-200 transition-all active:scale-95 text-sm flex items-center justify-center gap-2"
            onClick={onGestionarCategorias}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
            Gestionar Categorías
          </button>
        )}
        <img src={adminAvatar} alt="Admin avatar" className="w-10 h-10 rounded-full border border-gray-200 shadow" />
        <span className="text-xs text-gray-500 font-medium mt-1">{adminEmail}</span>
        <button className="w-full mt-3 py-2 rounded-full bg-gray-100 text-gray-700 font-semibold shadow hover:bg-red-100 hover:text-red-600 transition-all active:scale-95 text-sm flex items-center justify-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          Salir
        </button>
      </div>
    </aside>
  );
}