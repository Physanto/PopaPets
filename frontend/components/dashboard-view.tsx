"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dog,
  Cat,
  Activity,
  Syringe,
  AlertTriangle,
  TrendingUp,
  MapPin,
  Calendar,
  Heart,
  Bug,
  Thermometer,
  Eye
} from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
  Area,
  AreaChart
} from "recharts"
import { PopayanHeatmap } from "./popayan-heatmap"

// Datos de enfermedades detectadas
const enfermedadesData = [
  { nombre: "Parvovirus", casos: 45, color: "#DC2626" },
  { nombre: "Moquillo", casos: 32, color: "#F59E0B" },
  { nombre: "Ehrlichiosis", casos: 28, color: "#0D9488" },
  { nombre: "Leishmaniasis", casos: 18, color: "#1A365D" },
  { nombre: "Sarna", casos: 56, color: "#6B7280" },
  { nombre: "Dermatitis", casos: 67, color: "#8B5CF6" },
]

// Datos de vacunación mensual
const vacunacionMensual = [
  { mes: "Ene", vacunados: 145, pendientes: 23 },
  { mes: "Feb", vacunados: 189, pendientes: 18 },
  { mes: "Mar", vacunados: 234, pendientes: 31 },
  { mes: "Abr", vacunados: 178, pendientes: 25 },
  { mes: "May", vacunados: 267, pendientes: 12 },
  { mes: "Jun", vacunados: 312, pendientes: 8 },
]

// Datos de tendencia de identificación
const tendenciaIdentificacion = [
  { semana: "Sem 1", perros: 45, gatos: 23 },
  { semana: "Sem 2", perros: 52, gatos: 28 },
  { semana: "Sem 3", perros: 61, gatos: 35 },
  { semana: "Sem 4", perros: 78, gatos: 42 },
  { semana: "Sem 5", perros: 89, gatos: 51 },
  { semana: "Sem 6", perros: 95, gatos: 58 },
]

// Estadísticas generales
const estadisticasGenerales = {
  totalAnimales: 1247,
  perros: 823,
  gatos: 424,
  vacunados: 1089,
  enTratamiento: 78,
  casosCriticos: 12,
  esterilizados: 654,
  reportesHoy: 34
}

export function DashboardView() {
  return (
    <div className="min-h-screen bg-background p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard PopaPet</h1>
          <p className="text-sm text-muted-foreground">Popayán, Cauca - Monitoreo en tiempo real</p>
        </div>
        <Badge variant="outline" className="bg-accent/10 text-accent border-accent">
          <Activity className="w-3 h-3 mr-1" />
          En vivo
        </Badge>
      </div>

      {/* Tarjetas de estadísticas principales */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Dog className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Total Animales</p>
                <p className="text-xl font-bold text-foreground">{estadisticasGenerales.totalAnimales.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <Syringe className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Vacunados</p>
                <p className="text-xl font-bold text-foreground">{estadisticasGenerales.vacunados.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
                <Thermometer className="w-5 h-5 text-orange-500" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">En Tratamiento</p>
                <p className="text-xl font-bold text-foreground">{estadisticasGenerales.enTratamiento}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-500" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Casos Críticos</p>
                <p className="text-xl font-bold text-red-500">{estadisticasGenerales.casosCriticos}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Segunda fila de estadísticas */}
      <div className="grid grid-cols-4 gap-3">
        <Card className="bg-card border-border">
          <CardContent className="p-3 text-center">
            <Dog className="w-5 h-5 mx-auto text-primary mb-1" />
            <p className="text-lg font-bold text-foreground">{estadisticasGenerales.perros}</p>
            <p className="text-xs text-muted-foreground">Perros</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-3 text-center">
            <Cat className="w-5 h-5 mx-auto text-primary mb-1" />
            <p className="text-lg font-bold text-foreground">{estadisticasGenerales.gatos}</p>
            <p className="text-xs text-muted-foreground">Gatos</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-3 text-center">
            <Heart className="w-5 h-5 mx-auto text-pink-500 mb-1" />
            <p className="text-lg font-bold text-foreground">{estadisticasGenerales.esterilizados}</p>
            <p className="text-xs text-muted-foreground">Esterilizados</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-3 text-center">
            <Eye className="w-5 h-5 mx-auto text-accent mb-1" />
            <p className="text-lg font-bold text-foreground">{estadisticasGenerales.reportesHoy}</p>
            <p className="text-xs text-muted-foreground">Reportes Hoy</p>
          </CardContent>
        </Card>
      </div>

      {/* Mapa de Calor Real de Popayán */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <MapPin className="w-5 h-5 text-accent" />
            Mapa de Calor - Popayán, Cauca
          </CardTitle>
          <p className="text-xs text-muted-foreground">
            Densidad de animales identificados por zona (click en marcadores para detalles)
          </p>
        </CardHeader>
        <CardContent>
          <PopayanHeatmap />
        </CardContent>
      </Card>

      {/* Gráfico de Enfermedades */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Bug className="w-5 h-5 text-red-500" />
            Enfermedades Detectadas
          </CardTitle>
          <p className="text-xs text-muted-foreground">Distribución de casos por patología</p>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={enfermedadesData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis type="number" tick={{ fontSize: 12 }} />
                <YAxis 
                  dataKey="nombre" 
                  type="category" 
                  tick={{ fontSize: 11 }} 
                  width={80}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px'
                  }}
                />
                <Bar 
                  dataKey="casos" 
                  radius={[0, 4, 4, 0]}
                >
                  {enfermedadesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Resumen de enfermedades */}
          <div className="grid grid-cols-3 gap-2 mt-4">
            <div className="text-center p-2 bg-red-50 rounded-lg">
              <p className="text-lg font-bold text-red-600">246</p>
              <p className="text-xs text-muted-foreground">Total Casos</p>
            </div>
            <div className="text-center p-2 bg-orange-50 rounded-lg">
              <p className="text-lg font-bold text-orange-600">45</p>
              <p className="text-xs text-muted-foreground">En Tratamiento</p>
            </div>
            <div className="text-center p-2 bg-green-50 rounded-lg">
              <p className="text-lg font-bold text-green-600">189</p>
              <p className="text-xs text-muted-foreground">Recuperados</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Gráfico de Vacunación */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Syringe className="w-5 h-5 text-accent" />
            Progreso de Vacunación 2025
          </CardTitle>
          <p className="text-xs text-muted-foreground">Animales vacunados vs pendientes por mes</p>
        </CardHeader>
        <CardContent>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={vacunacionMensual}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="mes" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="vacunados" 
                  stackId="1"
                  stroke="#0D9488" 
                  fill="#0D9488" 
                  fillOpacity={0.6}
                  name="Vacunados"
                />
                <Area 
                  type="monotone" 
                  dataKey="pendientes" 
                  stackId="1"
                  stroke="#F59E0B" 
                  fill="#F59E0B" 
                  fillOpacity={0.6}
                  name="Pendientes"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Meta de vacunación */}
          <div className="mt-4 p-3 bg-accent/10 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">Meta anual de vacunación</span>
              <span className="text-sm font-bold text-accent">87%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="bg-accent h-2 rounded-full" style={{ width: '87%' }} />
            </div>
            <p className="text-xs text-muted-foreground mt-1">1,089 de 1,250 animales vacunados</p>
          </div>
        </CardContent>
      </Card>

      {/* Tendencia de Identificación */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Tendencia de Identificación
          </CardTitle>
          <p className="text-xs text-muted-foreground">Nuevos registros por semana</p>
        </CardHeader>
        <CardContent>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={tendenciaIdentificacion}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="semana" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="perros" 
                  stroke="#1A365D" 
                  strokeWidth={2}
                  dot={{ fill: '#1A365D', r: 4 }}
                  name="Perros"
                />
                <Line 
                  type="monotone" 
                  dataKey="gatos" 
                  stroke="#0D9488" 
                  strokeWidth={2}
                  dot={{ fill: '#0D9488', r: 4 }}
                  name="Gatos"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Distribución por Tipo */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary" />
            Distribución de Animales
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-around">
            <div className="h-40 w-40">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Perros', value: estadisticasGenerales.perros, color: '#1A365D' },
                      { name: 'Gatos', value: estadisticasGenerales.gatos, color: '#0D9488' },
                    ]}
                    cx="50%"
                    cy="50%"
                    innerRadius={35}
                    outerRadius={60}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    <Cell fill="#1A365D" />
                    <Cell fill="#0D9488" />
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded bg-primary" />
                <div>
                  <p className="text-sm font-medium text-foreground">Perros</p>
                  <p className="text-xs text-muted-foreground">{((estadisticasGenerales.perros / estadisticasGenerales.totalAnimales) * 100).toFixed(1)}%</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded bg-accent" />
                <div>
                  <p className="text-sm font-medium text-foreground">Gatos</p>
                  <p className="text-xs text-muted-foreground">{((estadisticasGenerales.gatos / estadisticasGenerales.totalAnimales) * 100).toFixed(1)}%</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Footer con última actualización */}
      <div className="text-center py-4">
        <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
          <Calendar className="w-3 h-3" />
          Última actualización: {new Date().toLocaleDateString('es-CO', { 
            day: 'numeric', 
            month: 'long', 
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}
        </p>
      </div>
    </div>
  )
}
