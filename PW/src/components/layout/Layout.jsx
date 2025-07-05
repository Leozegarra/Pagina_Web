import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import SearchBar from "../SearchBar/SearchBar";
import productos from "../../contexts/ProductosJSON";
import UserStatus from "../UserStatus/UserStatus";
import { useUser } from "../../contexts/UserContext";

const socialLinks = [
  {
    href: "https://facebook.com",
    label: "Facebook",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17 2.75A2.25 2.25 0 0119.25 5v14A2.25 2.25 0 0117 21.25H7A2.25 2.25 0 014.75 19V5A2.25 2.25 0 017 2.75h10zm-4.25 7.5v6m0 0h-1.5m1.5 0h1.5m-1.5-6v-1.5a1.5 1.5 0 013 0V10"
        />
      </svg>
    ),
  },
  {
    href: "https://twitter.com",
    label: "Twitter",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.29 20.251c7.547 0 11.675-6.155 11.675-11.495 0-.175 0-.349-.012-.522A8.18 8.18 0 0022 5.92a8.19 8.19 0 01-2.357.637A4.118 4.118 0 0021.448 4.1a8.224 8.224 0 01-2.605.988A4.107 4.107 0 0015.448 3c-2.266 0-4.102 1.832-4.102 4.09 0 .32.036.634.105.934C7.728 7.86 4.1 6.13 1.671 3.149a4.07 4.07 0 00-.555 2.057c0 1.42.725 2.675 1.825 3.41A4.093 4.093 0 01.8 7.575v.051c0 1.984 1.417 3.637 3.292 4.017a4.1 4.1 0 01-1.085.144c-.265 0-.522-.025-.773-.073.523 1.63 2.037 2.816 3.833 2.847A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"
        />
      </svg>
    ),
  },
  {
    href: "https://instagram.com",
    label: "Instagram",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
      >
        <rect width="20" height="20" x="2" y="2" rx="5" />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.5 7.5h.008v.008H16.5V7.5zm-4.5 2.25A4.25 4.25 0 1112 16.25a4.25 4.25 0 010-8.5z"
        />
      </svg>
    ),
  },
];

const navIcons = {
  home: (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 12l9-9 9 9M4.5 10.5V21a1.5 1.5 0 001.5 1.5h3.75a1.5 1.5 0 001.5-1.5v-4.5h3.75V21a1.5 1.5 0 001.5 1.5h3.75a1.5 1.5 0 001.5-1.5V10.5"
      />
    </svg>
  ),
  products: (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
    >
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
    </svg>
  ),
  account: (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 7.5a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 21a8.25 8.25 0 0115 0"
      />
    </svg>
  ),
  login: (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-3A2.25 2.25 0 008.25 5.25V9m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3A2.25 2.25 0 008.25 5.25V9m7.5 0a2.25 2.25 0 01-2.25 2.25h-7.5A2.25 2.25 0 013.75 9V5.25A2.25 2.25 0 016 3h12a2.25 2.25 0 012.25 2.25V9z"
      />
    </svg>
  ),
  logout: (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-3A2.25 2.25 0 008.25 5.25V9m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3A2.25 2.25 0 008.25 5.25V9m7.5 0a2.25 2.25 0 01-2.25 2.25h-7.5A2.25 2.25 0 013.75 9V5.25A2.25 2.25 0 016 3h12a2.25 2.25 0 012.25 2.25V9z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17 16l4-4m0 0l-4-4m4 4H7"
      />
    </svg>
  ),
  cart: (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
    >
      <circle cx="9" cy="21" r="1.5" />
      <circle cx="19" cy="21" r="1.5" />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A2 2 0 007.48 19h8.04a2 2 0 001.83-1.3L17 13M7 13V6h10v7"
      />
    </svg>
  ),
};

const Layout = () => {
  const { cart } = useCart();
  const { user } = useUser();
  const location = useLocation();
  const categoriasUnicas = Array.from(
    new Set(productos.map((p) => p.categoria))
  );

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-white to-teal-50">
      <header className="w-full bg-white/80 backdrop-blur-md shadow transition-all">
        <div className="flex flex-row justify-between items-center px-4 md:px-8 py-2 max-w-7xl mx-auto">
          <Link to="/" className="flex items-center gap-2 group">
            <span className="text-3xl font-extrabold text-teal-700 tracking-tight">
              Zona Tech
            </span>
          </Link>
          <div className="hidden md:block w-72">
            <SearchBar />
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <div className="block md:hidden w-32">
              <SearchBar />
            </div>
            <UserStatus guestClassName="bg-gray-100 text-gray-700 px-3 py-1 rounded-xl font-semibold text-sm border border-gray-300 shadow-sm" />
          </div>
        </div>
        <nav className="sticky top-0 z-30 w-full border-t border-gray-100 bg-white/90 shadow-sm">
          <ul className="flex flex-wrap justify-center gap-1 md:gap-3 py-1 md:py-2 text-base font-semibold">
            <li>
              <Link
                to="/"
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-150 relative group ${
                  location.pathname === "/"
                    ? "bg-teal-600 text-white shadow"
                    : "hover:bg-teal-100 text-teal-700"
                }`}
              >
                {navIcons.home}
                <span className="after:block after:absolute after:left-0 after:-bottom-1 after:w-full after:h-0.5 after:bg-teal-600 after:scale-x-0 group-hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left">
                  Inicio
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/SCategorias"
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-150 relative group ${
                  location.pathname.startsWith("/SCategorias")
                    ? "bg-teal-600 text-white shadow"
                    : "hover:bg-teal-100 text-teal-700"
                }`}
              >
                {navIcons.products}
                <span className="after:block after:absolute after:left-0 after:-bottom-1 after:w-full after:h-0.5 after:bg-teal-600 after:scale-x-0 group-hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left">
                  Productos
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/cart"
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-150 relative group ${
                  location.pathname.startsWith("/cart")
                    ? "bg-teal-600 text-white shadow"
                    : "hover:bg-teal-100 text-teal-700"
                }`}
              >
                {navIcons.cart}
                <span className="after:block after:absolute after:left-0 after:-bottom-1 after:w-full after:h-0.5 after:bg-teal-600 after:scale-x-0 group-hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left">
                  Carrito{" "}
                  <span className="ml-1 font-bold">({cart.length})</span>
                </span>
              </Link>
            </li>
            {user && (
              <li>
                <Link
                  to="/cuenta"
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-150 relative group ${
                    location.pathname === "/cuenta"
                      ? "bg-teal-600 text-white shadow"
                      : "hover:bg-teal-100 text-teal-700"
                  }`}
                >
                  {navIcons.account}
                  <span className="after:block after:absolute after:left-0 after:-bottom-1 after:w-full after:h-0.5 after:bg-teal-600 after:scale-x-0 group-hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left">
                     Mi Cuenta
                  </span>
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </header>
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-8 animate-fade-in">
        <Outlet />
      </main>
      <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-teal-900 border-t border-gray-700 py-12 text-center mt-8 shadow-inner text-gray-200">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 px-4">
          <div className="flex flex-col items-start gap-3 md:gap-6 md:items-start md:w-1/3">
            <span className="text-2xl font-extrabold text-white tracking-tight">
              Zona Tech
            </span>
            <p className="text-gray-300 text-sm md:text-base max-w-xs">
              Tienda de tecnología, innovación y soporte. Encuentra lo último en
              laptops, celulares, audio y más.
            </p>
            <div className="flex gap-4 mt-2">
              {socialLinks.map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="hover:text-teal-400 transition-colors"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2 md:w-1/3">
            <span className="font-bold text-lg text-white mb-2">
              Categorías
            </span>
            <div className="flex flex-wrap justify-center gap-2 md:gap-3">
              {categoriasUnicas.map((categoria, index) => (
                <Link
                  key={index}
                  to={`/categorias/${encodeURIComponent(categoria)}`}
                  className="text-teal-300 hover:text-white font-semibold px-2 py-1 rounded transition-all relative after:block after:absolute after:left-0 after:-bottom-1 after:w-full after:h-0.5 after:bg-teal-400 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left"
                >
                  {categoria}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2 md:w-1/3 items-end md:items-end">
            <span className="font-bold text-lg text-white mb-2">Soporte</span>
            <span className="text-gray-300 text-sm">
              Email: soporte@zonatech.com
            </span>
            <span className="text-gray-300 text-sm">
              Teléfono: +51 999 888 777
            </span>
            <span className="text-gray-300 text-sm">Lun a Vie: 9am - 6pm</span>
            <span className="text-gray-300 text-xs mt-4">
              &copy; {new Date().getFullYear()} Zona Tech. Todos los derechos
              reservados.
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
