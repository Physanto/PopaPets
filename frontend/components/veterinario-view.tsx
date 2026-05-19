"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { 
  Mic, 
  MicOff, 
  AlertTriangle, 
  FileText, 
  Activity,
  Stethoscope,
  PawPrint,
  TrendingUp
} from "lucide-react"
import { cn } from "@/lib/utils"

type RecordingState = "idle" | "recording" | "processing" | "complete"

export function VeterinarioView() {
  const [recordingState, setRecordingState] = useState<RecordingState>("idle")
  const [transcribedText, setTranscribedText] = useState("")
  const [showTriage, setShowTriage] = useState(false)
  const [waveAmplitudes, setWaveAmplitudes] = useState<number[]>(Array(12).fill(20))

  // Animación de ondas de sonido
  useEffect(() => {
    if (recordingState === "recording") {
      const interval = setInterval(() => {
        setWaveAmplitudes(
          Array(12).fill(0).map(() => Math.random() * 60 + 10)
        )
      }, 100)
      return () => clearInterval(interval)
    } else {
      setWaveAmplitudes(Array(12).fill(20))
    }
  }, [recordingState])

  const handleStartRecording = () => {
    setRecordingState("recording")
    setTranscribedText("")
    setShowTriage(false)

    // Simular grabación de 3 segundos
    setTimeout(() => {
      setRecordingState("processing")
      
      // Simular procesamiento
      setTimeout(() => {
        setRecordingState("complete")
        setTranscribedText(
          "Paciente con temperatura de 39.5°C, letargo evidente y posible cuadro infeccioso. Se observa secreción nasal y tos ocasional. Pérdida de apetito en las últimas 48 horas."
        )
        
        // Mostrar triage después de un momento
        setTimeout(() => {
          setShowTriage(true)
        }, 500)
      }, 1000)
    }, 3000)
  }

  const handleStopRecording = () => {
    setRecordingState("idle")
    setTranscribedText("")
    setShowTriage(false)
  }

  return (
    <div className="flex flex-col min-h-[calc(100vh-5rem)]">
      {/* Header */}
      <header className="bg-primary text-primary-foreground px-4 py-5 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
            <Stethoscope className="w-6 h-6 text-accent-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">PopaPet</h1>
            <p className="text-sm text-primary-foreground/80">Dashboard Veterinario</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 space-y-4">
        {/* Estadísticas */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="bg-card border-none shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">24</p>
                  <p className="text-xs text-muted-foreground">Reportes Hoy</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-none shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#DC2626]/10 flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-[#DC2626]" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">3</p>
                  <p className="text-xs text-muted-foreground">Casos Críticos</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-none shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#F59E0B]/10 flex items-center justify-center">
                  <Activity className="w-6 h-6 text-[#F59E0B]" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">12</p>
                  <p className="text-xs text-muted-foreground">En Seguimiento</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-none shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <PawPrint className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">156</p>
                  <p className="text-xs text-muted-foreground">Total Pacientes</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Módulo de Registro Clínico por Voz */}
        <Card className="bg-card border-none shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold text-foreground flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-accent" />
              Registro Clínico por Voz
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Botón de grabación */}
            <div className="flex flex-col items-center gap-4">
              <Button
                onClick={recordingState === "recording" ? handleStopRecording : handleStartRecording}
                disabled={recordingState === "processing"}
                className={cn(
                  "w-32 h-32 rounded-full transition-all duration-300 shadow-lg",
                  recordingState === "recording"
                    ? "bg-[#DC2626] hover:bg-[#DC2626]/90 animate-pulse"
                    : "bg-accent hover:bg-accent/90"
                )}
              >
                {recordingState === "recording" ? (
                  <MicOff className="w-12 h-12" />
                ) : recordingState === "processing" ? (
                  <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Mic className="w-12 h-12" />
                )}
              </Button>
              <p className="text-sm font-medium text-foreground">
                {recordingState === "idle" && "Dictar Síntomas"}
                {recordingState === "recording" && "Grabando... Toca para detener"}
                {recordingState === "processing" && "Procesando audio..."}
                {recordingState === "complete" && "Grabación completada"}
              </p>
            </div>

            {/* Visualización de ondas de sonido */}
            {recordingState === "recording" && (
              <div className="flex items-center justify-center gap-1 h-16 bg-muted/50 rounded-lg p-4">
                {waveAmplitudes.map((amplitude, i) => (
                  <div
                    key={i}
                    className="w-2 bg-accent rounded-full transition-all duration-100"
                    style={{ height: `${amplitude}px` }}
                  />
                ))}
              </div>
            )}

            {/* Texto transcrito */}
            {(recordingState === "complete" || transcribedText) && (
              <div className="space-y-2 animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
                <label className="text-sm font-medium text-foreground">
                  Transcripción:
                </label>
                <Textarea
                  value={transcribedText}
                  onChange={(e) => setTranscribedText(e.target.value)}
                  className="min-h-[100px] text-sm bg-muted/30"
                  placeholder="El texto transcrito aparecerá aquí..."
                />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Alerta de Triage (CDSS) */}
        {showTriage && (
          <Card 
            className={cn(
              "border-2 border-[#DC2626] bg-[#DC2626]/5 shadow-lg",
              "animate-in fade-in-0 slide-in-from-bottom-4 duration-500"
            )}
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-[#DC2626] flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded-full bg-[#DC2626] text-white text-xs font-bold">
                      PRIORIDAD ALTA
                    </span>
                    <span className="text-xs text-muted-foreground">
                      CDSS - Sistema de Soporte a Decisiones
                    </span>
                  </div>
                  <p className="text-sm text-foreground font-medium leading-relaxed">
                    <strong>Sugerencia:</strong> Aislamiento preventivo y revisión de enfermedades respiratorias infecciosas. Se recomienda realizar pruebas de moquillo y análisis sanguíneo completo.
                  </p>
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" className="bg-[#DC2626] hover:bg-[#DC2626]/90 text-white">
                      Iniciar Protocolo
                    </Button>
                    <Button size="sm" variant="outline">
                      Ver Más Opciones
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}
