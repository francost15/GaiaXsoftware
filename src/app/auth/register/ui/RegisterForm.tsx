import { Button, Input, Label, Progress, Separator } from '@/components';
import Link from 'next/link';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { FaUser, FaEnvelope, FaLock, FaEyeSlash, FaEye, FaApple, FaGoogle } from 'react-icons/fa';

const calculatePasswordStrength = (password: string): number => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (password.match(/[a-z]+/)) strength += 1;
    if (password.match(/[A-Z]+/)) strength += 1;
    if (password.match(/[0-9]+/)) strength += 1;
    if (password.match(/[$@#&!]+/)) strength += 1;
  
    return strength;
  }
  
  const PasswordStrengthIndicator = ({ password }: { password: string }) => {
    const strength = calculatePasswordStrength(password);
    const percentage = (strength / 5) * 100;
  
    return (
      <div className="mt-2">
        <Progress value={percentage} className="h-1" />
        <p className="text-xs mt-1 text-gray-600">
          {strength === 0 && "Muy débil"}
          {strength === 1 && "Débil"}
          {strength === 2 && "Regular"}
          {strength === 3 && "Buena"}
          {strength === 4 && "Fuerte"}
          {strength === 5 && "Muy fuerte"}
        </p>
      </div>
    )
  }
export const RegisterForm = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm()
    const [showPassword, setShowPassword] = useState(false)
    const password = watch("password", "")
    const onSubmit = (data: any) => {
        console.log('Registration attempt with:', data)
      }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
    <div className="space-y-4">
      <div>
        <Label htmlFor="name" className="text-sm font-medium text-gray-700">
          Nombre completo
        </Label>
        <div className="mt-1 relative">
          <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            id="name"
            type="text"
            {...register("name", { required: "El nombre es requerido" })}
            className="pl-10"
            placeholder="Jose Armando Hernandez"
          />
        </div>
        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message as string}</p>}
      </div>

      <div>
        <Label htmlFor="email" className="text-sm font-medium text-gray-700">
          Correo electrónico
        </Label>
        <div className="mt-1 relative">
          <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            id="email"
            type="email"
            {...register("email", { 
              required: "El correo electrónico es requerido",
              pattern: { 
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Correo electrónico inválido"
              }
            })}
            className="pl-10"
            placeholder="tu@email.com"
          />
        </div>
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message as string}</p>}
      </div>

      <div>
        <Label htmlFor="password" className="text-sm font-medium text-gray-700">
          Contraseña
        </Label>
        <div className="mt-1 relative">
          <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            {...register("password", { 
              required: "La contraseña es requerida",
              minLength: {
                value: 8,
                message: "La contraseña debe tener al menos 8 caracteres"
              }
            })}
            className="pl-10 pr-10"
            placeholder="••••••••"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message as string}</p>}
        <PasswordStrengthIndicator password={password} />
      </div>
    </div>

    <Button type="submit" className="w-full">
      Registrate
    </Button>

    <div className="relative">
      <div className="absolute inset-0 flex items-center">
        <Separator className="w-full" />
      </div>
      <div className="relative flex justify-center text-xs uppercase">
        <span className="bg-gray-50 px-2 text-gray-500">O continúa con</span>
      </div>
    </div>

    <div className="grid grid-cols-2 gap-4">
      <Button variant="outline" className="w-full">
        <FaApple className="mr-2 h-4 w-4" />
        Apple
      </Button>
      <Button variant="outline" className="w-full">
        <FaGoogle className="mr-2 h-4 w-4" />
        Google
      </Button>
    </div>

    <p className="text-center text-sm text-gray-600">
      ¿Ya tienes una cuenta?{' '}
      <Link href="/auth/login" className="font-medium text-blue-600 hover:text-blue-500">
        Inicia Sesión
      </Link>
    </p>
  </form>
  )
}
