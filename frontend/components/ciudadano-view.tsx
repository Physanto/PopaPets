"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Wifi, CheckCircle2, Send, PawPrint, Calendar, Syringe, ChevronDown, Heart, Bandage, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"

type ScanState = "idle" | "scanning" | "scanned" | "reported"
type AnimalStatus = "saludable" | "herido" | "enfermo"

interface PetInfo {
  name: string
  breed: string
  sex: string
  age: string
  weight: string
  color: string
  microchip: string
  nfcId: string
  lastControl: string
  vacunas: number
  conditions: string[]
  imageUrl: string
}

export function CiudadanoView() {
  const [scanState, setScanState] = useState<ScanState>("idle")
  const [manualId, setManualId] = useState("")
  const [animalStatus, setAnimalStatus] = useState<AnimalStatus | "">("")
  const [petInfo, setPetInfo] = useState<PetInfo | null>(null)
  const [showVacunas, setShowVacunas] = useState(false)

  const handleScan = () => {
    setScanState("scanning")
    // Simular escaneo NFC de 2 segundos
    setTimeout(() => {
      setPetInfo({
        name: "Luna",
        breed: "Siamés",
        sex: "Hembra",
        age: "2 años",
        weight: "4.2 kg",
        color: "Crema con puntos oscuros",
        microchip: "982 000 8765 4321",
        nfcId: "PP-NFC-1243",
        lastControl: "28 Abril 2025",
        vacunas: 3,
        conditions: ["Esterilizada", "Indoor cat"],
        imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/gatito-triste-callejero-calle-concepto-proteccion-animales-hogar_996086-1493-VIggqtmyTl50VyiVvHaxD2mzhgKbKz.avif"
      })
      setScanState("scanned")
    }, 2000)
  }

  const handleManualSubmit = () => {
    if (manualId.trim()) {
      setScanState("scanning")
      setTimeout(() => {
        setPetInfo({
          name: "Max",
          breed: "Mestizo",
          sex: "Macho",
          age: "3 años",
          weight: "8.5 kg",
          color: "Marrón con manchas blancas",
          microchip: "982 000 1234 5678",
          nfcId: manualId,
          status: "Con Dueño",
          lastControl: "15 Marzo 2025",
          vacunas: 5,
          conditions: ["Vacunado", "Desparasitado"],
          imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/gatito-triste-callejero-calle-concepto-proteccion-animales-hogar_996086-1493-VIggqtmyTl50VyiVvHaxD2mzhgKbKz.avif"
        })
        setScanState("scanned")
      }, 1500)
    }
  }

  const handleReport = () => {
    if (animalStatus) {
      setScanState("reported")
      setTimeout(() => {
        setScanState("idle")
        setAnimalStatus("")
        setPetInfo(null)
        setManualId("")
        setShowVacunas(false)
      }, 3000)
    }
  }

  const resetScan = () => {
    setScanState("idle")
    setAnimalStatus("")
    setPetInfo(null)
    setManualId("")
    setShowVacunas(false)
  }

  return (
    <div className="flex flex-col min-h-[calc(100vh-5rem)]">
      {/* Header */}
      <header className="bg-primary text-primary-foreground px-4 py-5 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
            <PawPrint className="w-6 h-6 text-accent-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">PopaPet</h1>
            <p className="text-sm text-primary-foreground/80">Red Ciudadana</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 flex flex-col items-center justify-center gap-6">
        {/* Estado: Idle - Mostrar botón de escaneo */}
        {scanState === "idle" && (
          <>
            <div className="text-center mb-4">
              <h2 className="text-lg font-semibold text-foreground mb-2">
                Reporte Rápido de Mascotas
              </h2>
              <p className="text-sm text-muted-foreground">
                Escanea el collar NFC o ingresa el ID del tatuaje
              </p>
            </div>

            {/* Botón gigante de escaneo NFC */}
            <Button
              onClick={handleScan}
              className="w-64 h-64 rounded-full bg-accent hover:bg-accent/90 text-accent-foreground shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 flex flex-col items-center justify-center gap-4"
            >
              <Wifi className="w-20 h-20" />
              <span className="text-xl font-bold">Escanear Chip NFC</span>
            </Button>

            {/* Separador */}
            <div className="flex items-center gap-4 w-full max-w-xs">
              <div className="flex-1 h-px bg-border" />
              <span className="text-sm text-muted-foreground">o</span>
              <div className="flex-1 h-px bg-border" />
            </div>

            {/* Input manual */}
            <Card className="w-full max-w-xs">
              <CardContent className="p-4">
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Ingresar ID del Tatuaje manualmente
                </label>
                <div className="flex gap-2">
                  <Input
                    value={manualId}
                    onChange={(e) => setManualId(e.target.value)}
                    placeholder="Ej: TAT-12345"
                    className="flex-1"
                  />
                  <Button 
                    onClick={handleManualSubmit}
                    disabled={!manualId.trim()}
                    size="icon"
                    className="bg-accent hover:bg-accent/90"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {/* Estado: Scanning - Animación de radar */}
        {scanState === "scanning" && (
          <div className="flex flex-col items-center justify-center gap-6">
            <div className="text-center mb-4">
              <h2 className="text-lg font-semibold text-foreground mb-2">
                Escaneando...
              </h2>
              <p className="text-sm text-muted-foreground">
                Acerca el dispositivo al animal
              </p>
            </div>

            {/* Animación de radar/pulso */}
            <div className="relative w-64 h-64 flex items-center justify-center">
              {/* Círculos de pulso */}
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className={cn(
                    "absolute rounded-full border-4 border-accent/30",
                    "animate-ping"
                  )}
                  style={{
                    width: `${100 + i * 60}px`,
                    height: `${100 + i * 60}px`,
                    animationDelay: `${i * 0.3}s`,
                    animationDuration: "1.5s",
                  }}
                />
              ))}
              {/* Círculo central */}
              <div className="w-24 h-24 rounded-full bg-accent flex items-center justify-center shadow-lg z-10">
                <Wifi className="w-12 h-12 text-accent-foreground animate-pulse" />
              </div>
            </div>
          </div>
        )}

        {/* Estado: Scanned - Mostrar tarjeta de perfil completa */}
        {scanState === "scanned" && petInfo && (
          <div className="w-full max-w-sm space-y-0 overflow-hidden">
            {/* Header de identificación */}
            <div className="bg-accent/10 border border-accent/30 rounded-t-xl p-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-accent-foreground" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-accent">¡Animal Identificado!</p>
                  <p className="text-xs text-muted-foreground">ID NFC: {petInfo.nfcId}</p>
                </div>
              </div>
              <span className="bg-accent text-accent-foreground text-xs font-medium px-2 py-1 rounded-full">
                {petInfo.status}
              </span>
            </div>

            {/* Imagen del animal con nombre */}
            <div className="relative h-48 overflow-hidden">
              <img 
                src={petInfo.imageUrl} 
                alt={petInfo.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white">{petInfo.name}</h2>
                  <p className="text-white/80 text-sm">{petInfo.breed}</p>
                </div>
                <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-medium px-2 py-1 rounded-full">
                  {petInfo.sex}
                </span>
              </div>
            </div>

            {/* Información básica en grid */}
            <Card className="rounded-none border-x border-t-0">
              <CardContent className="p-0">
                <div className="grid grid-cols-2">
                  <div className="p-3 border-r border-b">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Edad</p>
                    <p className="text-base font-semibold text-foreground">{petInfo.age}</p>
                  </div>
                  <div className="p-3 border-b">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Peso</p>
                    <p className="text-base font-semibold text-foreground">{petInfo.weight}</p>
                  </div>
                  <div className="p-3 border-r">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Color</p>
                    <p className="text-sm font-medium text-foreground">{petInfo.color}</p>
                  </div>
                  <div className="p-3">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Microchip</p>
                    <p className="text-sm font-medium text-foreground font-mono">{petInfo.microchip}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Último control */}
            <Card className="rounded-none border-x border-t-0">
              <CardContent className="p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Último control</p>
                      <p className="text-sm font-semibold text-foreground">{petInfo.lastControl}</p>
                    </div>
                  </div>
                  <span className="bg-accent/10 text-accent text-xs font-medium px-2.5 py-1 rounded-full">
                    Al día
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Vacunas (acordeón) */}
            <Card className="rounded-none border-x border-t-0">
              <CardContent className="p-0">
                <button 
                  onClick={() => setShowVacunas(!showVacunas)}
                  className="w-full p-3 flex items-center justify-between hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Syringe className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-sm font-medium text-foreground">Vacunas ({petInfo.vacunas})</span>
                  </div>
                  <ChevronDown className={cn(
                    "w-5 h-5 text-muted-foreground transition-transform",
                    showVacunas && "rotate-180"
                  )} />
                </button>
                {showVacunas && (
                  <div className="px-3 pb-3 space-y-2 border-t">
                    <div className="flex justify-between items-center pt-2">
                      <span className="text-sm text-foreground">Rabia</span>
                      <span className="text-xs text-muted-foreground">15 Ene 2025</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-foreground">Triple Felina</span>
                      <span className="text-xs text-muted-foreground">20 Feb 2025</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-foreground">Leucemia Felina</span>
                      <span className="text-xs text-muted-foreground">28 Mar 2025</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Condiciones / Observaciones */}
            <Card className="rounded-none border-x border-t-0">
              <CardContent className="p-3">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium mb-2">
                  Condiciones / Observaciones
                </p>
                <div className="flex flex-wrap gap-2">
                  {petInfo.conditions.map((condition, i) => (
                    <span 
                      key={i}
                      className="bg-secondary text-secondary-foreground text-xs font-medium px-2.5 py-1 rounded-full"
                    >
                      {condition}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Sección de Reportar Estado */}
            <Card className="rounded-none rounded-b-xl border-x border-b border-t-0">
              <CardContent className="p-4 bg-muted/30">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-[#F59E0B]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <AlertTriangle className="w-4 h-4 text-[#F59E0B]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Reportar Estado</p>
                    <p className="text-xs text-muted-foreground">
                      ¿Observas algo que debería saber el veterinario?
                    </p>
                  </div>
                </div>

                {/* Botones de estado */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <button
                    onClick={() => setAnimalStatus("saludable")}
                    className={cn(
                      "flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all",
                      animalStatus === "saludable" 
                        ? "border-[#0D9488] bg-[#0D9488]/10" 
                        : "border-border bg-card hover:border-[#0D9488]/50"
                    )}
                  >
                    <Heart className={cn(
                      "w-6 h-6",
                      animalStatus === "saludable" ? "text-[#0D9488]" : "text-muted-foreground"
                    )} />
                    <span className={cn(
                      "text-xs font-medium",
                      animalStatus === "saludable" ? "text-[#0D9488]" : "text-foreground"
                    )}>Saludable</span>
                  </button>

                  <button
                    onClick={() => setAnimalStatus("herido")}
                    className={cn(
                      "flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all",
                      animalStatus === "herido" 
                        ? "border-[#F59E0B] bg-[#F59E0B]/10" 
                        : "border-border bg-card hover:border-[#F59E0B]/50"
                    )}
                  >
                    <Bandage className={cn(
                      "w-6 h-6",
                      animalStatus === "herido" ? "text-[#F59E0B]" : "text-muted-foreground"
                    )} />
                    <span className={cn(
                      "text-xs font-medium",
                      animalStatus === "herido" ? "text-[#F59E0B]" : "text-foreground"
                    )}>Herido</span>
                  </button>

                  <button
                    onClick={() => setAnimalStatus("enfermo")}
                    className={cn(
                      "flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all",
                      animalStatus === "enfermo" 
                        ? "border-[#DC2626] bg-[#DC2626]/10" 
                        : "border-border bg-card hover:border-[#DC2626]/50"
                    )}
                  >
                    <AlertTriangle className={cn(
                      "w-6 h-6",
                      animalStatus === "enfermo" ? "text-[#DC2626]" : "text-muted-foreground"
                    )} />
                    <span className={cn(
                      "text-xs font-medium",
                      animalStatus === "enfermo" ? "text-[#DC2626]" : "text-foreground"
                    )}>Enfermo</span>
                  </button>
                </div>

                {/* Botones de acción */}
                <div className="flex gap-2">
                  <Button
                    onClick={resetScan}
                    variant="outline"
                    className="flex-1"
                  >
                    Cancelar
                  </Button>
                  <Button
                    onClick={handleReport}
                    disabled={!animalStatus}
                    className="flex-1 bg-accent hover:bg-accent/90"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Enviar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Estado: Reported - Confirmación */}
        {scanState === "reported" && (
          <div className="flex flex-col items-center justify-center gap-6 text-center">
            <div className="w-24 h-24 rounded-full bg-accent flex items-center justify-center animate-bounce">
              <CheckCircle2 className="w-14 h-14 text-accent-foreground" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground mb-2">
                ¡Reporte Enviado!
              </h2>
              <p className="text-muted-foreground">
                Gracias por contribuir a la red ciudadana
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
