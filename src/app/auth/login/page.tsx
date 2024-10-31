"use client";
import React, { useState, useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { FaEnvelope, FaLock, FaGoogle, FaEye, FaEyeSlash } from 'react-icons/fa'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import Link from 'next/link';

const PasswordStrengthIndicator = ({ password }) => {
  const [strength, setStrength] = useState(0)

  useEffect(() => {
    const calculateStrength = (pwd) => {
      let score = 0
      if (pwd.length > 6) score += 1
      if (pwd.match(/[a-z]/) && pwd.match(/[A-Z]/)) score += 1
      if (pwd.match(/\d/)) score += 1
      if (pwd.match(/[^a-zA-Z\d]/)) score += 1
      return score
    }

    setStrength(calculateStrength(password))
  }, [password])

  return (
    <div className="mt-2">
      <Progress value={(strength / 4) * 100} className="h-1" />
      <p className="text-xs mt-1 text-gray-600">
        {strength === 0 && "Débil"}
        {strength === 1 && "Regular"}
        {strength === 2 && "Buena"}
        {strength === 3 && "Fuerte"}
        {strength === 4 && "Muy fuerte"}
      </p>
    </div>
  )
}

export default function EnhancedLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const controls = useAnimation()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica de autenticación
    console.log('Login attempt with:', email, password)
  }

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

  const inputAnimation = {
    focus: { scale: 1.02, transition: { duration: 0.2 } },
    blur: { scale: 1, transition: { duration: 0.2 } }
  }

  const buttonAnimation = {
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95, transition: { duration: 0.2 } }
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md"
      >
        <Card className="w-full shadow-lg border-0 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 p-6">
            <CardTitle className="text-3xl font-bold text-center text-white">Iniciar Sesión</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <motion.div variants={itemVariants} className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Correo electrónico
                </Label>
                <motion.div
                  className="relative"
                  variants={inputAnimation}
                  whileFocus="focus"
                  whileBlur="blur"
                >
                  <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                    required
                    aria-label="Correo electrónico"
                  />
                </motion.div>
              </motion.div>
              <motion.div variants={itemVariants} className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Contraseña
                </Label>
                <motion.div
                  className="relative"
                  variants={inputAnimation}
                  whileFocus="focus"
                  whileBlur="blur"
                >
                  <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                    required
                    aria-label="Contraseña"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                    aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </motion.div>
                <PasswordStrengthIndicator password={password} />
              </motion.div>
              <motion.div variants={itemVariants}>
                <motion.button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
                  variants={buttonAnimation}
                  whileHover="hover"
                  whileTap="tap"
                >
                  Iniciar Sesión
                </motion.button>
              </motion.div>
            </form>
            <motion.div variants={itemVariants} className="mt-6">
              <Button variant="outline" className="w-full border-gray-300 text-gray-700 hover:bg-gray-50">
                <FaGoogle className="mr-2 h-4 w-4 text-red-500" />
                Iniciar sesión con Google
              </Button>
            </motion.div>
            <motion.div variants={itemVariants} className="mt-4 text-center">
              <a href="#" className="text-sm text-blue-600 hover:text-blue-500">
                ¿Olvidaste tu contraseña?
              </a>
            </motion.div>
            <motion.div variants={itemVariants} className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                ¿No tienes una cuenta?{' '}
                <Link href="/auth/register" className="font-medium text-blue-600 hover:text-blue-500">
                  Regístrate
                </Link>
              </p>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}