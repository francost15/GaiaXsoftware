'use client';
import { TooltipProvider, Tooltip, TooltipTrigger} from '@radix-ui/react-tooltip'
import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { FaGraduationCap, FaBullseye, FaUsers, FaComments, FaUser, FaChartBar, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { Button } from './ui/button'
import Link from 'next/link'
import Image from 'next/image';

export const SideBar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false)
      } else {
        setIsSidebarOpen(true)
      }
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <motion.aside
      initial={{ width: 256 }}
      animate={{ width: isSidebarOpen ? 256 : 64 }}
      transition={{ duration: 0.3 }}
      className="bg-white shadow-lg overflow-hidden flex flex-col"
    >
      <Link href="/">
        <div className="flex items-center justify-between p-4 border-b">
          
            <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              <Image src="/logo.svg" alt="Logo" width={90} height={80} />
            </h1>
    
        </div>
      </Link>
      <TooltipProvider>
        <nav className="flex-1 p-4">
          <ul className="space-y-1">
            {[
              { icon: FaGraduationCap, label: 'Mis Cursos', href: '/cursos' },
              { icon: FaBullseye, label: 'Mis Objetivos', href: '/objetivos' },
              { icon: FaUsers, label: 'Mi Equipo', href: '/equipo' },
              { icon: FaComments, label: 'Colaboración', href: '/colaboracion' },
              { icon: FaUser, label: 'Mi Perfil', href: '/profile' },
              { icon: FaChartBar, label: 'Mi Progreso', href: '/progreso' },
            ].map(({ icon: Icon, label, href }, index) => (
              <li key={label}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link href={href}>
                      <Button
                        variant="ghost"
                        className={`w-full justify-start transition-all duration-200 ${
                          index === 2
                            ? 'bg-blue-100 text-blue-700 font-medium'
                            : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                        } ${isSidebarOpen ? 'px-4' : 'px-2'}`}
                      >
                        <Icon className={`${isSidebarOpen ? 'mr-3' : 'mr-0'} h-5 w-5 transition-transform`} />
                        {isSidebarOpen && (
                          <span className="font-medium text-sm">{label}</span>
                        )}
                      </Button>
                    </Link>
                  </TooltipTrigger>
                </Tooltip>
              </li>
            ))}
          </ul>
        </nav>
      </TooltipProvider>
      <div className="p-4 border-t">
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleSidebar}
          className="w-full justify-center"
        >
          {isSidebarOpen ? <FaChevronLeft className="h-4 w-4" /> : <FaChevronRight className="h-4 w-4" />}
        </Button>
      </div>
    </motion.aside>
  )
}
