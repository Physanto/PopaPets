"use client"

import { useState } from "react"
import { CiudadanoView } from "@/components/ciudadano-view"
import { DashboardView } from "@/components/dashboard-view"
import { BottomNav } from "@/components/bottom-nav"
import { HistorialClinicoView } from "@/components/historial-clinico"
import { VeterinarioView } from "@/components/veterinario-view"

export default function PopaPetApp() {
  // Ahora tenemos 4 vistas posibles
  const [activeView, setActiveView] = useState<"ciudadano" | "veterinario" | "dashboard" | "historialClinico">("ciudadano")

  const renderView = () => {
    switch (activeView) {
      case "ciudadano":
        return <CiudadanoView />
      case "veterinario":
        return <VeterinarioView/>
      case "dashboard":
        return <DashboardView />
      case "historialClinico": // <-- CORREGIDO: Exactamente igual que en el useState
        return <HistorialClinicoView />
      default:
        return <CiudadanoView />
    }
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {renderView()}
      <BottomNav activeView={activeView} onViewChange={setActiveView} />
    </div>
  )
}