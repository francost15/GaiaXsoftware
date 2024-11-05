"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RegisterForm } from './ui/RegisterForm'

const marketingMessages = [
  {
    title: "Desarrolla tu potencial empresarial",
    description: "Únete a nuestra plataforma y descubre herramientas innovadoras para el crecimiento de tu negocio"
  },
  {
    title: "Impulsa tu carrera profesional",
    description: "Accede a recursos exclusivos y conecta con expertos en tu industria"
  },
  {
    title: "Aprende. Crece. Innova.",
    description: "Explora cursos diseñados para potenciar tus habilidades y conocimientos"
  },
  {
    title: "Networking estratégico",
    description: "Amplía tu red de contactos y descubre nuevas oportunidades de negocio"
  }
]

export default function EnhancedRegisterPage() {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % marketingMessages.length)
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen w-full flex bg-gray-50">
      {/* Left side - Marketing Content */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-500 to-purple-600 p-12 text-white items-center justify-center overflow-hidden"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentMessageIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="max-w-xl"
          >
            <motion.h1 
              className="text-5xl font-bold mb-6"
            >
              {marketingMessages[currentMessageIndex].title}
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-100"
            >
              {marketingMessages[currentMessageIndex].description}
            </motion.p>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Right side - Register Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md space-y-8"
        >
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Crea una cuenta</h2>
            <p className="mt-2 text-gray-600">Bienvenido a HackMyMind</p>
          </div>
          <RegisterForm />

        </motion.div>
      </div>
    </div>
  )
}