"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  FileText, Syringe, Pill, Scissors, TestTube, AlertCircle, 
  Calendar, User, MapPin, Phone, CheckCircle2, ChevronDown, ChevronUp, 
  Heart, Weight, Droplet, Activity, ClipboardList, Stethoscope, 
  Download, PlusCircle
} from "lucide-react"
import { cn } from "@/lib/utils"

// Base de datos simulada
const animalesDB: Record<string, any> = {
  "PP-NFC-1243": {
    id: "PP-NFC-1243",
    nombre: "Luna",
    especie: "Felino",
    raza: "Siamés",
    sexo: "Hembra",
    edad: "2 años",
    fechaNacimiento: "15/03/2024",
    color: "Crema con puntos oscuros",
    peso: "4.2 kg",
    microchip: "982 000 8765 4321",
    esterilizado: true,
    imagen: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/gatito-triste-callejero-calle-concepto-proteccion-animales-hogar_996086-1493-VIggqtmyTl50VyiVvHaxD2mzhgKbKz.avif",
    estado: "Adoptado Rescate",
    propietario: {
      nombre: "María García López",
      telefono: "+57 310 456 7890",
      direccion: "Calle 5 #12-34, Centro Histórico, Popayán",
      email: "maria.garcia@email.com"
    },
    condiciones: ["Esterilizada", "Indoor cat"],
    alergias: ["Proteína de pollo"],
    grupoSanguineo: "A",
    consultas: [
      {
        id: 1,
        fecha: "28/04/2025",
        tipo: "Control Rutinario",
        veterinario: "Dr. Carlos Mendoza",
        clinica: "Clínica Veterinaria PopaPet Central",
        motivo: "Control anual de salud",
        diagnostico: "Paciente en excelente estado de salud general",
        tratamiento: "Ninguno requerido",
        observaciones: "Se recomienda continuar con dieta actual. Próximo control en 6 meses.",
        peso: "4.2 kg",
        temperatura: "38.5°C",
        frecuenciaCardiaca: "180 bpm",
        frecuenciaRespiratoria: "25 rpm"
      }
    ],
    vacunas: [
      { nombre: "Triple Felina", fecha: "28/04/2025", proximaDosis: "28/04/2026", lote: "TF-2025-0892", veterinario: "Dr. Carlos Mendoza", estado: "Vigente" },
      { nombre: "Rabia", fecha: "28/04/2025", proximaDosis: "28/04/2026", lote: "RB-2025-1234", veterinario: "Dr. Carlos Mendoza", estado: "Vigente" },
      { nombre: "Leucemia Felina", fecha: "15/03/2024", proximaDosis: "15/03/2025", lote: "LF-2024-0456", veterinario: "Dra. Ana Sofía Ruiz", estado: "Vencida" }
    ],
    tratamientos: [
      { id: 1, nombre: "Desparasitación Interna", medicamento: "Milbemax", dosis: "1 tableta", frecuencia: "Cada 3 meses", fechaInicio: "28/04/2025", fechaFin: "Continuo", estado: "Activo", veterinario: "Dr. Carlos Mendoza" }
    ],
    laboratorios: [
      {
        id: 1, fecha: "28/04/2025", tipo: "Hemograma Completo",
        resultados: [
          { parametro: "Hematocrito", valor: "38%", referencia: "30-45%", estado: "Normal" },
          { parametro: "Leucocitos", valor: "8,500 /µL", referencia: "5,500-19,500 /µL", estado: "Normal" }
        ],
        veterinario: "Dr. Carlos Mendoza", laboratorio: "Laboratorio Clínico VetLab"
      }
    ],
    cirugias: [
      { id: 1, fecha: "20/06/2024", procedimiento: "Ovariohisterectomía", cirujano: "Dr. Carlos Mendoza", anestesista: "Dra. Laura Pérez", duracion: "45 min", complicaciones: "Ninguna", recuperacion: "Excelente" }
    ]
  }
}

export function HistorialClinicoView() {
  // Inicializamos directamente con los datos de "Luna" para que se muestre de inmediato
  const [animal, setAnimal] = useState<any>(animalesDB["PP-NFC-1243"]) 
  
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    consultas: true,
    vacunas: true,
    tratamientos: true,
    laboratorios: false,
    cirugias: false
  })

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header Clínico */}
      <header className="bg-primary text-primary-foreground px-4 py-5 shadow-md">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center shadow-inner">
              <ClipboardList className="w-6 h-6 text-accent-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">PopaPet Vet</h1>
              <p className="text-sm text-primary-foreground/80">Historial Clínico Digital</p>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 p-4 max-w-4xl mx-auto w-full space-y-6 mt-4">
        
        {/* Resultados del historial directo */}
        {animal && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-6 duration-500 pb-10">
            
            {/* Acciones Rápidas */}
            <div className="flex justify-end gap-2">
              <Button variant="outline" size="sm" className="h-9">
                <Download className="w-4 h-4 mr-2" />
                Exportar PDF
              </Button>
              <Button size="sm" className="h-9 bg-accent hover:bg-accent/90 text-accent-foreground">
                <PlusCircle className="w-4 h-4 mr-2" />
                Nueva Consulta
              </Button>
            </div>

            {/* Ficha Principal del Animal */}
            <Card className="bg-card border-border overflow-hidden shadow-md">
              <div className="relative h-56 sm:h-64">
                <img
                  src={animal.imagen}
                  alt={animal.nombre}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 text-white">
                  <div className="flex items-center gap-3 mb-1">
                    <h2 className="text-3xl font-bold">{animal.nombre}</h2>
                    <Badge variant="secondary" className="bg-white/20 hover:bg-white/30 backdrop-blur-md text-white border-none">
                      {animal.sexo}
                    </Badge>
                  </div>
                  <p className="text-white/80 font-medium">{animal.raza} • {animal.especie}</p>
                </div>
                <Badge 
                  className={cn(
                    "absolute top-4 right-4 text-sm px-3 py-1 shadow-lg",
                    animal.estado === "Adoptado Rescate" 
                      ? "bg-accent hover:bg-accent text-accent-foreground" 
                      : "bg-primary hover:bg-primary text-primary-foreground"
                  )}
                >
                  {animal.estado}
                </Badge>
              </div>
              
              <CardContent className="p-0">
                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 border-b">
                  <div className="p-4 text-center bg-muted/10">
                    <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold mb-1 flex justify-center items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" /> Edad
                    </p>
                    <p className="font-bold text-foreground">{animal.edad}</p>
                  </div>
                  <div className="p-4 text-center bg-muted/10">
                    <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold mb-1 flex justify-center items-center gap-1">
                      <Weight className="w-3.5 h-3.5" /> Peso
                    </p>
                    <p className="font-bold text-foreground">{animal.peso}</p>
                  </div>
                  <div className="p-4 text-center bg-muted/10">
                    <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold mb-1 flex justify-center items-center gap-1">
                      <Droplet className="w-3.5 h-3.5 text-red-500" /> Sangre
                    </p>
                    <p className="font-bold text-foreground">{animal.grupoSanguineo}</p>
                  </div>
                  <div className="p-4 text-center bg-muted/10">
                    <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">
                      Microchip
                    </p>
                    <p className="font-mono font-bold text-foreground">{animal.microchip}</p>
                  </div>
                </div>

                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Info Médica Rápida */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-semibold text-muted-foreground border-b pb-2">CONDICIONES ACTUALES</h4>
                    <div className="flex flex-wrap gap-2">
                      {animal.condiciones.map((cond: string, i: number) => (
                        <span key={i} className="bg-accent/10 text-accent border border-accent/20 px-3 py-1 rounded-full text-sm font-medium">
                          {cond}
                        </span>
                      ))}
                    </div>
                    {animal.alergias.length > 0 && (
                      <div className="flex items-start gap-2 bg-destructive/5 p-3 rounded-lg border border-destructive/20 mt-3">
                        <AlertCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-bold text-destructive">Alergias Registradas</p>
                          <p className="text-sm text-destructive/90">{animal.alergias.join(", ")}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Propietario */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-semibold text-muted-foreground border-b pb-2">DATOS DEL PROPIETARIO</h4>
                    <div className="space-y-2.5">
                      <p className="flex items-center gap-3 text-sm font-medium">
                        <User className="w-4 h-4 text-muted-foreground" />
                        {animal.propietario.nombre}
                      </p>
                      <p className="flex items-center gap-3 text-sm">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        {animal.propietario.telefono}
                      </p>
                      <p className="flex items-center gap-3 text-sm">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span className="truncate">{animal.propietario.direccion}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* SECCIONES EXPANDIBLES */}
            
            {/* Sección: Consultas */}
            <Card className="bg-card border-border shadow-sm overflow-hidden">
              <button 
                className="w-full p-4 flex items-center justify-between bg-muted/10 hover:bg-muted/30 transition-colors"
                onClick={() => toggleSection("consultas")}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Stethoscope className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg text-left">
                    Historial de Consultas 
                    <span className="text-muted-foreground text-sm font-normal ml-2">({animal.consultas.length})</span>
                  </h3>
                </div>
                {expandedSections.consultas ? <ChevronUp className="w-5 h-5 text-muted-foreground" /> : <ChevronDown className="w-5 h-5 text-muted-foreground" />}
              </button>
              
              {expandedSections.consultas && (
                <CardContent className="p-4 sm:p-6 space-y-4 border-t">
                  {animal.consultas.map((consulta: any) => (
                    <div key={consulta.id} className="border border-border rounded-xl p-5 space-y-4 bg-background shadow-sm">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className={cn(
                              consulta.tipo === "Emergencia" ? "bg-destructive text-destructive-foreground" :
                              consulta.tipo === "Cirugía" ? "bg-orange-500 text-white" : "bg-accent text-accent-foreground"
                            )}>
                              {consulta.tipo}
                            </Badge>
                            <span className="text-sm text-muted-foreground font-medium flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5" /> {consulta.fecha}
                            </span>
                          </div>
                          <p className="font-semibold text-foreground">{consulta.motivo}</p>
                        </div>
                        <p className="text-sm text-muted-foreground font-medium flex items-center gap-1 sm:text-right">
                          <User className="w-3.5 h-3.5" /> {consulta.veterinario}
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-4 gap-2 text-center bg-muted/30 rounded-lg p-3">
                        <div><p className="text-[10px] uppercase text-muted-foreground font-bold">Peso</p><p className="font-semibold text-sm">{consulta.peso}</p></div>
                        <div><p className="text-[10px] uppercase text-muted-foreground font-bold">Temp</p><p className="font-semibold text-sm">{consulta.temperatura}</p></div>
                        <div><p className="text-[10px] uppercase text-muted-foreground font-bold">FC</p><p className="font-semibold text-sm">{consulta.frecuenciaCardiaca}</p></div>
                        <div><p className="text-[10px] uppercase text-muted-foreground font-bold">FR</p><p className="font-semibold text-sm">{consulta.frecuenciaRespiratoria}</p></div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs uppercase text-muted-foreground font-bold mb-1">Diagnóstico</p>
                          <p className="text-sm text-foreground">{consulta.diagnostico}</p>
                        </div>
                        <div>
                          <p className="text-xs uppercase text-muted-foreground font-bold mb-1">Tratamiento Indicado</p>
                          <p className="text-sm text-foreground">{consulta.tratamiento}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              )}
            </Card>

            {/* Sección: Vacunas */}
            <Card className="bg-card border-border shadow-sm overflow-hidden">
              <button 
                className="w-full p-4 flex items-center justify-between bg-muted/10 hover:bg-muted/30 transition-colors"
                onClick={() => toggleSection("vacunas")}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Syringe className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="font-semibold text-lg text-left">
                    Carnet de Vacunación
                    <span className="text-muted-foreground text-sm font-normal ml-2">({animal.vacunas.length})</span>
                  </h3>
                </div>
                {expandedSections.vacunas ? <ChevronUp className="w-5 h-5 text-muted-foreground" /> : <ChevronDown className="w-5 h-5 text-muted-foreground" />}
              </button>
              
              {expandedSections.vacunas && (
                <CardContent className="p-4 sm:p-6 space-y-3 border-t">
                  {animal.vacunas.map((vacuna: any, i: number) => (
                    <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between border border-border rounded-xl p-4 gap-4 bg-background">
                      <div className="flex items-center gap-4">
                        <div className={cn(
                          "w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0",
                          vacuna.estado === "Vigente" ? "bg-[#0D9488]/10" : "bg-destructive/10"
                        )}>
                          {vacuna.estado === "Vigente" ? (
                            <CheckCircle2 className="w-6 h-6 text-[#0D9488]" />
                          ) : (
                            <AlertCircle className="w-6 h-6 text-destructive" />
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-base">{vacuna.nombre}</p>
                          <p className="text-sm text-muted-foreground">
                            Aplicada: <span className="font-medium text-foreground">{vacuna.fecha}</span> • Lote: {vacuna.lote}
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5">Vet: {vacuna.veterinario}</p>
                        </div>
                      </div>
                      <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center w-full sm:w-auto mt-2 sm:mt-0 pt-3 sm:pt-0 border-t sm:border-0 border-border">
                        <p className="text-xs text-muted-foreground font-medium mb-1">Próxima dosis</p>
                        <Badge variant={vacuna.estado === "Vigente" ? "outline" : "destructive"} className={
                          vacuna.estado === "Vigente" ? "border-[#0D9488] text-[#0D9488] bg-[#0D9488]/5" : ""
                        }>
                          {vacuna.proximaDosis}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              )}
            </Card>

          </div>
        )}
      </main>
    </div>
  )
}