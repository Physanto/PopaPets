import { Search, Stethoscope, LayoutDashboard, ClipboardList } from "lucide-react" // Asegúrate de importar el ícono
import { cn } from "@/lib/utils"

// Asegúrate de que las props acepten la cuarta opción
interface BottomNavProps {
  activeView: "ciudadano" | "veterinario" | "dashboard" | "historialClinico";
  onViewChange: (view: "ciudadano" | "veterinario" | "dashboard" | "historialClinico") => void;
}

export function BottomNav({ activeView, onViewChange }: BottomNavProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-3 flex justify-around items-center">
      
      {/* Botón 1: Ciudadano */}
      <button onClick={() => onViewChange("ciudadano")} className={cn("flex flex-col items-center gap-1", activeView === "ciudadano" ? "text-primary" : "text-muted-foreground")}>
        <Search className="w-6 h-6" />
        <span className="text-xs">Escaneo</span>
      </button>

      {/* Botón 2: Veterinario */}
      <button onClick={() => onViewChange("veterinario")} className={cn("flex flex-col items-center gap-1", activeView === "veterinario" ? "text-primary" : "text-muted-foreground")}>
        <Stethoscope className="w-6 h-6" />
        <span className="text-xs">Veterinario</span>
      </button>

      {/* Botón 3: NUEVO - Historial Clínico */}
      <button onClick={() => onViewChange("historialClinico")} className={cn("flex flex-col items-center gap-1", activeView === "historialClinico" ? "text-primary" : "text-muted-foreground")}>
        <ClipboardList className="w-6 h-6" />
        <span className="text-xs">Historial</span>
      </button>

      {/* Botón 4: Dashboard */}
      <button onClick={() => onViewChange("dashboard")} className={cn("flex flex-col items-center gap-1", activeView === "dashboard" ? "text-primary" : "text-muted-foreground")}>
        <LayoutDashboard className="w-6 h-6" />
        <span className="text-xs">Dashboard</span>
      </button>

    </div>
  )
}
