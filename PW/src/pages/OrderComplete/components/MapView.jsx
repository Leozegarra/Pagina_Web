import { useEffect } from 'react'
import L from 'leaflet'

const MapView = ({ address }) => {
  useEffect(() => {
    const loadMap = async () => {
      try {
        // Buscar coordenadas de la dirección
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`)
        const data = await response.json()

        let lat = -12.0464
        let lon = -77.0428
        let label = 'Lima, Perú (por defecto)'

        if (data && data.length > 0) {
          lat = parseFloat(data[0].lat)
          lon = parseFloat(data[0].lon)
          label = address
        } else {
          console.warn('Dirección no encontrada. Mostrando Lima por defecto.')
        }

        // Verifica si el mapa ya existe y lo elimina
        const mapContainer = document.getElementById('map')
        if (mapContainer._leaflet_id) {
          mapContainer._leaflet_id = null
          mapContainer.innerHTML = ''
        }

        // Crear el mapa
        const map = L.map('map').setView([lat, lon], 14)

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map)

        // Marcador
        L.marker([lat, lon]).addTo(map).bindPopup(label).openPopup()
      } catch (error) {
        console.error('Error cargando el mapa:', error)
      }
    }

    loadMap()
  }, [address])

  return <div id="map" className="h-64 rounded-lg shadow mt-4" />
}

export default MapView
// Este componente carga un mapa utilizando Leaflet y muestra un marcador en la ubicación de la dirección proporcionada.
// Si la dirección no se encuentra, muestra un marcador por defecto en Lima, Perú.