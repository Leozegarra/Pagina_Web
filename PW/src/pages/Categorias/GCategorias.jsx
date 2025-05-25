import React, { useState, useEffect } from "react"
import productos from "../../contexts/Ropa"

const GestorCategorias = () => {
  // Extrae las categorías únicas del archivo original
  const categoriasBase = [...new Set(productos.map(p => p.categoria))]

  const [categorias, setCategorias] = useState(categoriasBase)

  // Cargar las categorías adicionales guardadas en localStorage
  useEffect(() => {
    const guardadas = JSON.parse(localStorage.getItem("categoriasExtra")) || []
    const nuevas = [...new Set([...categoriasBase, ...guardadas])]
    setCategorias(nuevas)
  }, [])

  // Agregar una nueva categoría
  const agregarCategoria = () => {
    const nueva = prompt("Ingresa el nombre de la nueva categoría:")
    const limpia = nueva?.trim().toLowerCase()

    if (!limpia || categorias.includes(limpia)) return

    const nuevasCategorias = [...categorias, limpia]
    const soloExtras = nuevasCategorias.filter(c => !categoriasBase.includes(c))
    localStorage.setItem("categoriasExtra", JSON.stringify(soloExtras))
    setCategorias(nuevasCategorias)
  }

  return (
    <div className="container mt-4">
      <h3>Gestor de Categorías</h3>
      <button className="btn btn-primary mb-3" onClick={agregarCategoria}>
        + Agregar categoría
      </button>

      <ul className="list-group">
        {categorias.map((cat, idx) => (
          <li key={idx} className="list-group-item categoría">
            {cat}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default GestorCategorias
