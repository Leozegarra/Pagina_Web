import React, { useState, useEffect } from "react"
import productos from "../../contexts/Ropa"

const GestorCategorias = () => {
  const categoriasBase = [...new Set(productos.map(p => p.categoria))]

  const [categorias, setCategorias] = useState(categoriasBase)

  useEffect(() => {
    const guardadas = JSON.parse(localStorage.getItem("categoriasExtra")) || []
    const nuevas = [...new Set([...categoriasBase, ...guardadas])]//crea nuevo array
    setCategorias(nuevas)
  }, [])

  const agregarCategoria = () => {
    const nueva = prompt("Ingresa el nombre de la nueva categoría:")
    const limpia = nueva?.trim().toLowerCase() // asumiendo una condicional de que no este vacio  continua evita errores 

    if (!limpia || categorias.includes(limpia)) return

    const nuevasCategorias = [...categorias, limpia]//nuevo array
    const soloExtras = nuevasCategorias.filter(c => !categoriasBase.includes(c))
    localStorage.setItem("categoriasExtra", JSON.stringify(soloExtras))
    setCategorias(nuevasCategorias)
  }

  return (
    <div className="container mt-4">
      <h3>Gestor de Categorías</h3>//boton adicional para referenciar en otras pestañas como hook personalizado
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
