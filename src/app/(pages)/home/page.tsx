"use client";

import React, { useState, useEffect } from 'react'
import { FaUsers, FaBolt, FaCalendar } from 'react-icons/fa'
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { motion, AnimatePresence } from "framer-motion"
import { NavBarHome, Chatbot, CoursesCards, SkillsCards } from '@/components'

export default function HackMyMind() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const cards = [
    { 
      title: 'Mi Progreso', 
      icon: FaBolt, 
      color: 'from-blue-500 to-indigo-600', 
      content: (
        <>
          <Progress value={65} className="w-full h-3 bg-blue-200" />
          <p className="text-sm mt-2">65% de tus objetivos alcanzados</p>
          <Button variant="secondary" className="w-full mt-4 hover:bg-white/90 transition-colors">Ver detalles</Button>
        </>
      )
    },
    { 
      title: 'Próxima Actividad', 
      icon: FaCalendar, 
      color: 'from-green-400 to-blue-500', 
      content: (
        <>
          <h3 className="font-semibold mb-2">Taller de Comunicación Efectiva</h3>
          <p className="text-sm mb-4">Hoy, 15:00 - 16:30</p>
          <Button variant="secondary" className="w-full hover:bg-white/90 transition-all duration-300">Unirse al Taller</Button>
        </>
      )
    },
    { 
      title: 'Colaboración de Equipo', 
      icon: FaUsers, 
      color: 'from-purple-500 to-pink-500', 
      content: (
        <>
          <div className="flex -space-x-2 mb-4">
            {[1, 2, 3].map((i) => (
              <Avatar key={i} className="h-8 w-8 ring-2 ring-white">
                <AvatarImage src={`/placeholder-avatar-${i}.jpg`} alt={`Usuario ${i}`} />
                <AvatarFallback>U{i}</AvatarFallback>
              </Avatar>
            ))}
            <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center text-xs font-medium ring-2 ring-white">+2</div>
          </div>
          <p className="text-sm mb-4">5 compañeros están en línea</p>
          <Button variant="secondary" className="w-full hover:bg-white/90 transition-colors">Iniciar Chat de Equipo</Button>
        </>
      )
    },
  ]

  return (
    <div className="bg-gray-50 text-gray-800 min-h-screen">
      <NavBarHome />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence>
          {isClient && (
            <motion.h2 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-2xl md:text-3xl font-bold text-gray-800 mb-6"
            >
              Bienvenida de nuevo, Ana
            </motion.h2>
          )}
        </AnimatePresence>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <AnimatePresence>
            {isClient && cards.map((card, index) => (
              <motion.div 
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Card className={`overflow-hidden bg-gradient-to-br ${card.color} text-white h-full flex flex-col`}>
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <card.icon className="mr-2 h-5 w-5" />
                      {card.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow flex flex-col justify-between">
                    {card.content}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="space-y-8">
          {isClient && (
            <>
              <CoursesCards />
              <SkillsCards />
            </>
          )}
        </div>
      </div>
      {isClient && <Chatbot />}
    </div>
  )
}