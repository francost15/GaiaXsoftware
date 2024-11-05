"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FaUsers, FaChartLine, FaGraduationCap, FaTrophy, FaSearch, FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

// Mock data for demonstration
const employees = [
  { id: 1, name: 'Ana García', avatar: '/placeholder.svg?height=40&width=40', department: 'Marketing', progress: 75, courses: 3, achievements: 2, status: 'active' },
  { id: 2, name: 'Carlos Rodríguez', avatar: '/placeholder.svg?height=40&width=40', department: 'Ventas', progress: 60, courses: 2, achievements: 1, status: 'inactive' },
  { id: 3, name: 'Elena Martínez', avatar: '/placeholder.svg?height=40&width=40', department: 'Desarrollo', progress: 90, courses: 5, achievements: 4, status: 'active' },
  { id: 4, name: 'David López', avatar: '/placeholder.svg?height=40&width=40', department: 'Recursos Humanos', progress: 45, courses: 1, achievements: 0, status: 'active' },
  { id: 5, name: 'Sofia Hernández', avatar: '/placeholder.svg?height=40&width=40', department: 'Finanzas', progress: 80, courses: 4, achievements: 3, status: 'active' },
]

const AdminDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterDepartment, setFilterDepartment] = useState('all')
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' })

  const filteredEmployees = employees.filter(employee => 
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterDepartment === 'all' || employee.department === filterDepartment)
  )

  const sortedEmployees = [...filteredEmployees].sort((a, b) => {
    if (sortConfig.key === null) return 0
    const aValue = a[sortConfig.key]
    const bValue = b[sortConfig.key]
    if (aValue < bValue) return sortConfig.direction === 'ascending' ? -1 : 1
    if (aValue > bValue) return sortConfig.direction === 'ascending' ? 1 : -1
    return 0
  })

  const requestSort = (key) => {
    let direction = 'ascending'
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending'
    }
    setSortConfig({ key, direction })
  }

  const overallProgress = employees.reduce((sum, employee) => sum + employee.progress, 0) / employees.length

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold mb-8 text-gray-800"
      >
        Panel Administrativo
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Empleados Totales</CardTitle>
              <FaUsers className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{employees.length}</div>
              <p className="text-xs text-muted-foreground">+2% desde el último mes</p>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Progreso General</CardTitle>
              <FaChartLine className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{overallProgress.toFixed(1)}%</div>
              <Progress value={overallProgress} className="mt-2" />
            </CardContent>
          </Card>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Cursos Completados</CardTitle>
              <FaGraduationCap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{employees.reduce((sum, employee) => sum + employee.courses, 0)}</div>
              <p className="text-xs text-muted-foreground">+5 desde la semana pasada</p>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Logros Obtenidos</CardTitle>
              <FaTrophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{employees.reduce((sum, employee) => sum + employee.achievements, 0)}</div>
              <p className="text-xs text-muted-foreground">+3 desde el último mes</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Progreso de Empleados</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row justify-between mb-6 space-y-4 md:space-y-0 md:space-x-4">
            <div className="relative flex-1">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Buscar empleado..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex-1">
              <Select value={filterDepartment} onValueChange={setFilterDepartment}>
                <SelectTrigger>
                  <SelectValue placeholder="Filtrar por departamento" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los departamentos</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                  <SelectItem value="Ventas">Ventas</SelectItem>
                  <SelectItem value="Desarrollo">Desarrollo</SelectItem>
                  <SelectItem value="Recursos Humanos">Recursos Humanos</SelectItem>
                  <SelectItem value="Finanzas">Finanzas</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[250px]">Empleado</TableHead>
                  <TableHead className="w-[150px]">
                    <Button variant="ghost" onClick={() => requestSort('department')} className="font-semibold">
                      Departamento
                      {sortConfig.key === 'department' && (
                        sortConfig.direction === 'ascending' ? <FaSortAmountUp className="ml-2 inline" /> : <FaSortAmountDown className="ml-2 inline" />
                      )}
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button variant="ghost" onClick={() => requestSort('progress')} className="font-semibold">
                      Progreso
                      {sortConfig.key === 'progress' && (
                        sortConfig.direction === 'ascending' ? <FaSortAmountUp className="ml-2 inline" /> : <FaSortAmountDown className="ml-2 inline" />
                      )}
                    </Button>
                  </TableHead>
                  <TableHead className="text-right">
                    <Button variant="ghost" onClick={() => requestSort('courses')} className="font-semibold">
                      Cursos
                      {sortConfig.key === 'courses' && (
                        sortConfig.direction === 'ascending' ? <FaSortAmountUp className="ml-2 inline" /> : <FaSortAmountDown className="ml-2 inline" />
                      )}
                    </Button>
                  </TableHead>
                  <TableHead className="text-right">
                    <Button variant="ghost" onClick={() => requestSort('achievements')} className="font-semibold">
                      Logros
                      {sortConfig.key === 'achievements' && (
                        sortConfig.direction === 'ascending' ? <FaSortAmountUp className="ml-2 inline" /> : <FaSortAmountDown className="ml-2 inline" />
                      )}
                    </Button>
                  </TableHead>
                  <TableHead className="text-right">Estado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedEmployees.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src={employee.avatar} alt={employee.name} />
                          <AvatarFallback>{employee.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span>{employee.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{employee.department}</TableCell>
                    <TableCell>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="flex items-center space-x-2">
                              <Progress value={employee.progress} className="w-[60px]" />
                              <span>{employee.progress}%</span>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Progreso: {employee.progress}%</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>
                    <TableCell className="text-right">{employee.courses}</TableCell>
                    <TableCell className="text-right">{employee.achievements}</TableCell>
                    <TableCell className="text-right">
                      <Badge variant={employee.status === 'active' ? 'success' : 'secondary'}>
                        {employee.status === 'active' ? 'Activo' : 'Inactivo'}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default AdminDashboard