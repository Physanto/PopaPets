"use client"

import { useEffect, useRef, useState } from "react"
import dynamic from "next/dynamic"

// Coordenadas de las zonas de Popayán con datos de concentración de animales
const POPAYAN_ZONES = [
  // Centro Histórico - Alta concentración
  { lat: 2.4419, lng: -76.6063, intensity: 0.9, name: "Centro Histórico", animals: 156 },
  { lat: 2.4425, lng: -76.6055, intensity: 0.85, name: "Centro Histórico", animals: 0 },
  { lat: 2.4412, lng: -76.6070, intensity: 0.8, name: "Centro Histórico", animals: 0 },
  
  // Parque Caldas - Alta concentración
  { lat: 2.4422, lng: -76.6061, intensity: 0.95, name: "Parque Caldas", animals: 89 },
  { lat: 2.4428, lng: -76.6058, intensity: 0.88, name: "Parque Caldas", animals: 0 },
  
  // Bolívar - Media-Alta concentración
  { lat: 2.4480, lng: -76.6020, intensity: 0.75, name: "Bolívar", animals: 134 },
  { lat: 2.4490, lng: -76.6015, intensity: 0.7, name: "Bolívar", animals: 0 },
  { lat: 2.4475, lng: -76.6030, intensity: 0.72, name: "Bolívar", animals: 0 },
  
  // La Esmeralda - Media concentración
  { lat: 2.4350, lng: -76.6150, intensity: 0.6, name: "La Esmeralda", animals: 98 },
  { lat: 2.4345, lng: -76.6160, intensity: 0.55, name: "La Esmeralda", animals: 0 },
  { lat: 2.4360, lng: -76.6140, intensity: 0.58, name: "La Esmeralda", animals: 0 },
  
  // El Cadillal - Alta concentración (zona popular)
  { lat: 2.4520, lng: -76.5980, intensity: 0.85, name: "El Cadillal", animals: 167 },
  { lat: 2.4530, lng: -76.5975, intensity: 0.8, name: "El Cadillal", animals: 0 },
  { lat: 2.4515, lng: -76.5990, intensity: 0.78, name: "El Cadillal", animals: 0 },
  
  // La Pamba - Media concentración
  { lat: 2.4380, lng: -76.5920, intensity: 0.5, name: "La Pamba", animals: 76 },
  { lat: 2.4385, lng: -76.5915, intensity: 0.48, name: "La Pamba", animals: 0 },
  
  // Bello Horizonte - Baja-Media concentración
  { lat: 2.4550, lng: -76.6100, intensity: 0.45, name: "Bello Horizonte", animals: 54 },
  { lat: 2.4555, lng: -76.6095, intensity: 0.42, name: "Bello Horizonte", animals: 0 },
  
  // Alfonso López - Media concentración
  { lat: 2.4300, lng: -76.6200, intensity: 0.55, name: "Alfonso López", animals: 87 },
  { lat: 2.4295, lng: -76.6210, intensity: 0.52, name: "Alfonso López", animals: 0 },
  { lat: 2.4305, lng: -76.6195, intensity: 0.5, name: "Alfonso López", animals: 0 },
  
  // Los Campos - Baja concentración
  { lat: 2.4250, lng: -76.6250, intensity: 0.35, name: "Los Campos", animals: 43 },
  { lat: 2.4245, lng: -76.6255, intensity: 0.32, name: "Los Campos", animals: 0 },
  
  // Pandiguando - Media-Baja concentración
  { lat: 2.4600, lng: -76.5950, intensity: 0.4, name: "Pandiguando", animals: 52 },
  { lat: 2.4605, lng: -76.5945, intensity: 0.38, name: "Pandiguando", animals: 0 },
  
  // Pueblillo - Baja concentración
  { lat: 2.4150, lng: -76.6300, intensity: 0.3, name: "Pueblillo", animals: 38 },
  
  // El Empedrado - Media concentración
  { lat: 2.4400, lng: -76.6080, intensity: 0.65, name: "El Empedrado", animals: 92 },
  { lat: 2.4395, lng: -76.6085, intensity: 0.62, name: "El Empedrado", animals: 0 },
  
  // Santa Rosa - Media concentración
  { lat: 2.4450, lng: -76.5900, intensity: 0.58, name: "Santa Rosa", animals: 78 },
  
  // Loma de la Virgen - Baja concentración
  { lat: 2.4480, lng: -76.6120, intensity: 0.25, name: "Loma de la Virgen", animals: 29 },
  
  // Las Américas - Media concentración
  { lat: 2.4320, lng: -76.6000, intensity: 0.52, name: "Las Américas", animals: 67 },
  { lat: 2.4325, lng: -76.5995, intensity: 0.5, name: "Las Américas", animals: 0 },
  
  // Yanaconas - Baja concentración
  { lat: 2.4200, lng: -76.5850, intensity: 0.28, name: "Yanaconas", animals: 34 },
  
  // Puntos adicionales para suavizar el mapa de calor
  { lat: 2.4435, lng: -76.6045, intensity: 0.7, name: "", animals: 0 },
  { lat: 2.4460, lng: -76.6030, intensity: 0.6, name: "", animals: 0 },
  { lat: 2.4370, lng: -76.6100, intensity: 0.5, name: "", animals: 0 },
  { lat: 2.4500, lng: -76.6050, intensity: 0.55, name: "", animals: 0 },
  { lat: 2.4280, lng: -76.6150, intensity: 0.4, name: "", animals: 0 },
]

// Datos agregados por zona para la leyenda
const ZONE_SUMMARY = [
  { name: "El Cadillal", animals: 167, color: "#DC2626" },
  { name: "Centro Histórico", animals: 156, color: "#DC2626" },
  { name: "Bolívar", animals: 134, color: "#F59E0B" },
  { name: "La Esmeralda", animals: 98, color: "#F59E0B" },
  { name: "El Empedrado", animals: 92, color: "#F59E0B" },
  { name: "Parque Caldas", animals: 89, color: "#F59E0B" },
  { name: "Alfonso López", animals: 87, color: "#22C55E" },
  { name: "Santa Rosa", animals: 78, color: "#22C55E" },
  { name: "La Pamba", animals: 76, color: "#22C55E" },
  { name: "Las Américas", animals: 67, color: "#22C55E" },
]

// Componente del mapa que se carga dinámicamente (solo cliente)
function MapComponent() {
  const mapRef = useRef<L.Map | null>(null)
  const heatLayerRef = useRef<L.Layer | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Solo ejecutar en el cliente
    if (typeof window === "undefined") return

    const initMap = async () => {
      const L = (await import("leaflet")).default
      await import("leaflet/dist/leaflet.css")
      // @ts-expect-error - leaflet.heat no tiene tipos
      await import("leaflet.heat")

      // Si el mapa ya existe, no recrearlo
      if (mapRef.current) return

      // Crear el mapa centrado en Popayán
      const map = L.map("popayan-map", {
        center: [2.4419, -76.6063],
        zoom: 13,
        zoomControl: true,
        attributionControl: true,
      })

      // Agregar capa de OpenStreetMap
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 18,
      }).addTo(map)

      // Preparar datos para el mapa de calor
      const heatData: [number, number, number][] = POPAYAN_ZONES.map((zone) => [
        zone.lat,
        zone.lng,
        zone.intensity,
      ])

      // Crear capa de calor
      // @ts-expect-error - leaflet.heat extiende L
      const heatLayer = L.heatLayer(heatData, {
        radius: 35,
        blur: 25,
        maxZoom: 15,
        max: 1.0,
        gradient: {
          0.0: "#22C55E",
          0.3: "#84CC16",
          0.5: "#EAB308",
          0.7: "#F59E0B",
          0.85: "#EF4444",
          1.0: "#DC2626",
        },
      }).addTo(map)

      // Agregar marcadores para las zonas principales
      POPAYAN_ZONES.filter((z) => z.animals > 0).forEach((zone) => {
        const markerColor =
          zone.intensity >= 0.8
            ? "#DC2626"
            : zone.intensity >= 0.6
              ? "#F59E0B"
              : zone.intensity >= 0.4
                ? "#EAB308"
                : "#22C55E"

        const icon = L.divIcon({
          className: "custom-marker",
          html: `
            <div style="
              background-color: ${markerColor};
              color: white;
              padding: 4px 8px;
              border-radius: 12px;
              font-size: 11px;
              font-weight: 600;
              white-space: nowrap;
              box-shadow: 0 2px 4px rgba(0,0,0,0.2);
              border: 2px solid white;
            ">
              ${zone.animals}
            </div>
          `,
          iconSize: [40, 20],
          iconAnchor: [20, 10],
        })

        L.marker([zone.lat, zone.lng], { icon })
          .addTo(map)
          .bindPopup(
            `<div style="text-align: center;">
              <strong>${zone.name}</strong><br/>
              <span style="color: #0D9488; font-weight: 600;">${zone.animals} animales</span><br/>
              <small>identificados en esta zona</small>
            </div>`
          )
      })

      mapRef.current = map
      heatLayerRef.current = heatLayer
      setIsLoaded(true)
    }

    initMap()

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [])

  return (
    <div className="relative">
      <div
        id="popayan-map"
        className="w-full h-[400px] rounded-lg overflow-hidden border border-border"
        style={{ background: "#e5e7eb" }}
      />
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted rounded-lg">
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin" />
            <span className="text-sm text-muted-foreground">Cargando mapa...</span>
          </div>
        </div>
      )}
    </div>
  )
}

// Componente principal exportado con carga dinámica
const DynamicMap = dynamic(() => Promise.resolve(MapComponent), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] rounded-lg bg-muted flex items-center justify-center border border-border">
      <div className="flex flex-col items-center gap-2">
        <div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin" />
        <span className="text-sm text-muted-foreground">Cargando mapa...</span>
      </div>
    </div>
  ),
})

export function PopayanHeatmap() {
  return (
    <div className="space-y-4">
      {/* Mapa */}
      <DynamicMap />

      {/* Leyenda de colores */}
      <div className="flex items-center justify-center gap-6 text-xs">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#22C55E]" />
          <span className="text-muted-foreground">Bajo ({"<"}50)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#EAB308]" />
          <span className="text-muted-foreground">Medio (50-80)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#F59E0B]" />
          <span className="text-muted-foreground">Alto (80-120)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#DC2626]" />
          <span className="text-muted-foreground">Muy Alto ({">"}120)</span>
        </div>
      </div>

      {/* Top zonas */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {ZONE_SUMMARY.slice(0, 5).map((zone) => (
          <div
            key={zone.name}
            className="bg-card rounded-lg p-3 border border-border text-center"
          >
            <div
              className="w-2 h-2 rounded-full mx-auto mb-1"
              style={{ backgroundColor: zone.color }}
            />
            <p className="text-xs font-medium text-foreground truncate">{zone.name}</p>
            <p className="text-lg font-bold text-accent">{zone.animals}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
