"use client";
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FaBell, FaLock, FaPalette, FaUserCircle, FaToggleOn } from 'react-icons/fa'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { NavBar } from '@/components';

export default function EnhancedConfigurationPage() {
  const [activeTab, setActiveTab] = useState('account')

  const containerVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 20,
        staggerChildren: 0.07
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 20 }
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <NavBar title={'Configuración'} />
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto mt-8"
      >
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-white p-1 rounded-lg shadow">
            <TabsTrigger 
              value="account" 
              className="flex items-center justify-center data-[state=active]:bg-blue-500 data-[state=active]:text-white"
            >
              <FaUserCircle className="mr-2" />
              Cuenta
            </TabsTrigger>
            <TabsTrigger 
              value="notifications" 
              className="flex items-center justify-center data-[state=active]:bg-green-500 data-[state=active]:text-white"
            >
              <FaBell className="mr-2" />
              Notificaciones
            </TabsTrigger>
            <TabsTrigger 
              value="privacy" 
              className="flex items-center justify-center data-[state=active]:bg-purple-500 data-[state=active]:text-white"
            >
              <FaLock className="mr-2" />
              Privacidad
            </TabsTrigger>
            <TabsTrigger 
              value="appearance" 
              className="flex items-center justify-center data-[state=active]:bg-pink-500 data-[state=active]:text-white"
            >
              <FaPalette className="mr-2" />
              Apariencia
            </TabsTrigger>
          </TabsList>

          <TabsContent value="account">
            <Card className="bg-gradient-to-br from-blue-400 to-blue-600 text-white">
              <CardHeader>
                <CardTitle>Configuración de la cuenta</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <motion.div variants={itemVariants} className="space-y-2">
                  <Label htmlFor="name" className="text-white">Nombre</Label>
                  <Input id="name" defaultValue="Ana Martínez" className="bg-white/20 border-white/30 text-white placeholder-white/50" />
                </motion.div>
                <motion.div variants={itemVariants} className="space-y-2">
                  <Label htmlFor="email" className="text-white">Correo electrónico</Label>
                  <Input id="email" type="email" defaultValue="ana.martinez@example.com" className="bg-white/20 border-white/30 text-white placeholder-white/50" />
                </motion.div>
                <motion.div variants={itemVariants} className="space-y-2">
                  <Label htmlFor="language" className="text-white">Idioma</Label>
                  <Select defaultValue="es">
                    <SelectTrigger id="language" className="bg-white/20 border-white/30 text-white">
                      <SelectValue placeholder="Selecciona un idioma" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="fr">Français</SelectItem>
                    </SelectContent>
                  </Select>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <Button className="w-full sm:w-auto bg-white text-blue-600 hover:bg-blue-100">Guardar cambios</Button>
                </motion.div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card className="bg-gradient-to-br from-green-400 to-green-600 text-white">
              <CardHeader>
                <CardTitle>Preferencias de notificaciones</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <motion.div variants={itemVariants} className="flex items-center justify-between">
                  <Label htmlFor="email-notifications" className="flex items-center space-x-2">
                    <FaBell className="text-white" />
                    <span>Notificaciones por correo</span>
                  </Label>
                  <Switch id="email-notifications" />
                </motion.div>
                <motion.div variants={itemVariants} className="flex items-center justify-between">
                  <Label htmlFor="push-notifications" className="flex items-center space-x-2">
                    <FaToggleOn className="text-white" />
                    <span>Notificaciones push</span>
                  </Label>
                  <Switch id="push-notifications" />
                </motion.div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacy">
            <Card className="bg-gradient-to-br from-purple-400 to-purple-600 text-white">
              <CardHeader>
                <CardTitle>Configuración de privacidad</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <motion.div variants={itemVariants} className="flex items-center justify-between">
                  <Label htmlFor="profile-visibility" className="flex items-center space-x-2">
                    <FaUserCircle className="text-white" />
                    <span>Perfil público</span>
                  </Label>
                  <Switch id="profile-visibility" />
                </motion.div>
                <motion.div variants={itemVariants} className="flex items-center justify-between">
                  <Label htmlFor="activity-visibility" className="flex items-center space-x-2">
                    <FaToggleOn className="text-white" />
                    <span>Mostrar actividad de aprendizaje</span>
                  </Label>
                  <Switch id="activity-visibility" />
                </motion.div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appearance">
            <Card className="bg-gradient-to-br from-pink-400 to-purple-600 text-white">
              <CardHeader>
                <CardTitle>Personalización de la apariencia</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <motion.div variants={itemVariants} className="space-y-2">
                  <Label htmlFor="theme" className="text-white">Tema</Label>
                  <Select defaultValue="light">
                    <SelectTrigger id="theme" className="bg-white/20 border-white/30 text-white">
                      <SelectValue placeholder="Selecciona un tema" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Claro</SelectItem>
                      <SelectItem value="dark">Oscuro</SelectItem>
                      <SelectItem value="system">Sistema</SelectItem>
                    </SelectContent>
                  </Select>
                </motion.div>
                <motion.div variants={itemVariants} className="flex items-center justify-between">
                  <Label htmlFor="animations" className="flex items-center space-x-2">
                    <FaToggleOn className="text-white" />
                    <span>Animaciones</span>
                  </Label>
                  <Switch id="animations" />
                </motion.div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  )
}