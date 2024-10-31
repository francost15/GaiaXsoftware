"use client";
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import React, { useState } from 'react'
import { FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa'
import { Button } from '../ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/card'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Progress } from '../ui/progress'
import { Separator } from '../ui/separator'
interface PersonProps{
    name: string
    job: string
    image?: string
}
export const PanelSettings = ({name,job,image}:PersonProps) => {
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
    return (
        <Popover open={isUserMenuOpen} onOpenChange={setIsUserMenuOpen}>
        <PopoverTrigger asChild>
        <Avatar className="h-8 w-8 ring-2 ring-blue-500 cursor-pointer">
            <AvatarImage src="/placeholder-avatar.jpg" alt="Ana" />
            <AvatarFallback>AN</AvatarFallback>
        </Avatar>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-0 mr-4 rounded-xl shadow-xl">
        <AnimatePresence>
            {isUserMenuOpen && (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
            >
                <Card>
                <CardHeader className="pb-2">
                    <div className="flex items-center space-x-4">
                    <Avatar className="h-16 w-16">
                        <AvatarImage src={image} alt={name} />
                        <AvatarFallback>AN</AvatarFallback>
                    </Avatar>
                    <div>
                        <CardTitle>{name}</CardTitle>
                        <CardDescription>{job}</CardDescription>
                    </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                    <div>
                        <div className="flex justify-between text-sm mb-1">
                        <span>Nivel 7</span>
                        <span>65% al siguiente nivel</span>
                        </div>
                        <Progress value={65} className="h-2" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-blue-100 p-3 rounded-lg text-center">
                        <div className="text-2xl font-bold text-blue-600">12</div>
                        <div className="text-sm text-blue-800">Cursos completados</div>
                        </div>
                        <div className="bg-green-100 p-3 rounded-lg text-center">
                        <div className="text-2xl font-bold text-green-600">8</div>
                        <div className="text-sm text-green-800">Habilidades dominadas</div>
                        </div>
                    </div>
                    <Separator />
                    <div className="space-y-3">
                        <Link href="/profile" className="no-underline ">
                        <Button variant="outline" className="w-full hover:bg-neutral-200 ">
                            <FaUser className="mr-2 h-4 w-4" />
                            Ver Perfil Completo
                        </Button>
                        </Link>
                        <Link href="/settings" className="no-underline ">
                        <Button variant="outline" className="w-full hover:bg-neutral-200">
                            <FaCog className="mr-2 h-4 w-4" />
                            Configuración
                        </Button>
                        </Link>
                        <Link href="/auth/login" className="no-underline ">
                        <Button variant="outline" className="w-full  text-red-500 hover:text-white hover:bg-red-600">
                            <FaSignOutAlt className="mr-2 h-4 w-4" />
                            Cerrar Sesión
                        </Button>
                        </Link>
                    </div>
                    </div>
                </CardContent>
                </Card>
            </motion.div>
            )}
        </AnimatePresence>
        </PopoverContent>
    </Popover>
    )
    }
