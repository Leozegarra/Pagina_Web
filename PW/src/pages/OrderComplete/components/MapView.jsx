import { useEffect, useRef, useState } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const MapView = ({ address }) => {
  const mapRef = useRef(null)
  const mapInstanceRef = useRef(null)

  useEffect(() => {
    const initMap = async () => {
      if (!address) return

      // Eliminar mapa anterior si existe
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }

      // Limpiar el contenedor manualmente
      if (mapRef.current) {
        mapRef.current.innerHTML = ''
      }

      let lat = -12.0464
      let lon = -77.0428

      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
        )
        const data = await response.json()
        if (data.length > 0) {
          lat = parseFloat(data[0].lat)
          lon = parseFloat(data[0].lon)
        } else {
          console.warn('No se encontró la dirección. Mostrando Perú por defecto.')
        }
      } catch (err) {
        console.error('Error al buscar la dirección:', err)
      }

      const map = L.map(mapRef.current).setView([lat, lon], 14)

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map)

      L.marker([lat, lon]).addTo(map).bindPopup('Tu dirección de entrega').openPopup()

      mapInstanceRef.current = map
    }

    initMap()
  }, [address])

  return (
    <div ref={mapRef} style={{ height: '300px', width: '100%', borderRadius: '8px' }} />
  )
}

export default MapView
