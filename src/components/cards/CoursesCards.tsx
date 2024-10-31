
import { motion } from 'framer-motion'
import Link from 'next/link'
import React from 'react'
import { FaAward, FaComments, FaCalendar } from 'react-icons/fa'
import { Button } from '../ui/button'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../ui/card'
import { Progress } from '../ui/progress'

export const CoursesCards = () => {
    const courses = [
        { title: 'Liderazgo Efectivo', progress: 60, color: 'from-yellow-400 to-orange-500', icon: FaAward },
        { title: 'Comunicación Asertiva', progress: 40, color: 'from-green-400 to-blue-500', icon: FaComments },
        { title: 'Gestión del Tiempo', progress: 20, color: 'from-pink-400 to-red-500', icon: FaCalendar },
      ]
    return (
        <section>
        <h3 className="text-xl md:text-2xl font-semibold mb-4">Mis Cursos en Progreso</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, index) => (
            <motion.div 
              key={course.title} 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Card className="overflow-hidden group hover:shadow-lg transition-shadow duration-300">
                <div className={`h-2 bg-gradient-to-r ${course.color}`} />
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <course.icon className="mr-2 h-5 w-5" />
                    {course.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Progress value={course.progress} className="mb-2" />
                  <p className="text-sm text-gray-600 mb-4">{course.progress}% completado</p>
                </CardContent>
                <CardFooter>
                <div className="w-full">
                <Link href="/course">
                  <Button className={`w-full bg-gradient-to-r ${course.color} text-white group-hover:shadow-md transition-all duration-300`}>
                    Continuar
                  </Button>
                </Link>
              </div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
    )
}
