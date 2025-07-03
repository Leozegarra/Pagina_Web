import React from "react";
import { Link } from "react-router-dom";
import LogoIcon from "./../../assets/images/jpg/LogoIcon.jpg"

export default function SideBar() {
  return (
    <div className="w-80 h-screen bg-teal-500 flex flex-col text-white">
      <div className="p-4 font-bold text-xl flex items-center gap-3">
        <div className="">
          <img className="rounded-xl w-[50px] h-[50px]" src={LogoIcon} alt="Logo icon" />
        </div>
        <h1>Dashboard</h1>
      </div>
      <nav className="mt-10">
        <ul className="flex flex-col gap-3">
          <li className={`py-2 px-4 ${window.location.pathname == "/admin/listUsers" ? 'bg-teal-600' : 'hover:bg-teal-400'} rounded-lg hover:cursor-pointer`}><Link className="block text-white w-full" style={{textDecoration:'none'}} to="/admin/listUsers">Usuarios</Link></li>
          <li className={`py-2 px-4 ${window.location.pathname == "/admin/listOrders" ? 'bg-teal-600' : 'hover:bg-teal-500'} rounded-lg hover:cursor-pointer`}><Link className="block text-white w-full" style={{textDecoration:'none'}} to="/admin/listOrders">Órdenes</Link></li>
          <li className={`py-2 px-4 ${window.location.pathname == "/admin/createProduct" ? 'bg-teal-600' : 'hover:bg-teal-500'} rounded-lg hover:cursor-pointer`}><Link className="block text-white w-full" style={{textDecoration:'none'}} to="/admin/createProduct">Crear Producto</Link></li>
          <li className={`py-2 px-4 ${window.location.pathname == "/admin/listProducts" ? 'bg-teal-600' : 'hover:bg-teal-400'} rounded-lg hover:cursor-pointer`}><Link className="block text-white w-full" style={{textDecoration:'none'}} to="/admin/listProducts">Lista de Productos</Link></li>
          <li className={`py-2 px-4 ${window.location.pathname == "/admin/categorias" ? 'bg-teal-600' : 'hover:bg-teal-400'} rounded-lg hover:cursor-pointer`}><Link className="block text-white w-full" style={{textDecoration:'none'}} to="/admin/categorias">Categorias</Link></li>
        </ul>
      </nav>
      <div className="mt-auto p-4 grid grid-cols-[3fr_1fr]">
        <div className="flex items-start flex-column">
          <span className="text-sm">Administrador</span>
          <span className="ml-auto text-sm">admin@gmail.com</span>
        </div>
        <button className="text-red-600 bg-white  text-center">
          Salir
        </button>
      </div>
    </div>
  );
}