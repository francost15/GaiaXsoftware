"use client";
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaEnvelope,  FaGraduationCap, FaTrophy, FaEdit, FaCamera, FaLightbulb } from 'react-icons/fa'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { NavBar } from '@/components';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('overview')

  const userInfo = {
    name: "Ana Martínez",
    role: "Gerente de Proyectos",
    email: "ana.martinez@example.com",
    level: 7,
    progress: 65,
    coursesCompleted: 12,
    skillsMastered: 8,
    achievements: [
      { id: 1, title: "Líder Emergente", description: "Completó el programa de liderazgo" },
      { id: 2, title: "Comunicador Estrella", description: "Obtuvo la certificación en comunicación efectiva" },
      { id: 3, title: "Innovador Digital", description: "Lideró un proyecto de transformación digital" },
    ],
    recentCourses: [
      { id: 1, title: "Gestión Ágil de Proyectos", progress: 80 },
      { id: 2, title: "Liderazgo en la Era Digital", progress: 60 },
      { id: 3, title: "Inteligencia Emocional en el Trabajo", progress: 40 },
    ],
    skills: [
      { name: "Liderazgo", level: 85 },
      { name: "Gestión de Proyectos", level: 90 },
      { name: "Comunicación", level: 75 },
      { name: "Resolución de Problemas", level: 80 },
    ],
  }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <NavBar title={'Perfil'}/>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="mb-8 overflow-hidden">
            <div className="bg-gradient-to-br from-blue-400 to-blue-600 p-6 text-white">
              <CardHeader className="relative pb-0">
                <div className="absolute top-0 right-0 space-x-2">
                  <Button variant="secondary" size="icon">
                    <FaEdit className="h-4 w-4" />
                  </Button>
                  <Button variant="secondary" size="icon">
                    <FaCamera className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4">
                  <Avatar className="h-24 w-24 sm:h-32 sm:w-32 ring-4 ring-white">
                    <AvatarImage src="/placeholder-avatar.jpg" alt={userInfo.name} />
                    <AvatarFallback>{userInfo.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="text-center sm:text-left">
                    <CardTitle className="text-2xl sm:text-3xl">{userInfo.name}</CardTitle>
                    <CardDescription className="text-lg text-blue-100">{userInfo.role}</CardDescription>
                    <div className="flex items-center justify-center sm:justify-start space-x-2 mt-2">
                      <FaEnvelope className="text-blue-200" />
                      <span className="text-blue-100">{userInfo.email}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold">{userInfo.level}</div>
                    <div className="text-sm text-blue-200">Nivel Actual</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold">{userInfo.progress}%</div>
                    <div className="text-sm text-blue-200">Progreso</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold">{userInfo.coursesCompleted}</div>
                    <div className="text-sm text-blue-200">Cursos completados</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold">{userInfo.skillsMastered}</div>
                    <div className="text-sm text-blue-200">Habilidades dominadas</div>
                  </div>
                </div>
              </CardContent>
            </div>
          </Card>
        </motion.div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full bg-white rounded-lg shadow-md">
            <TabsTrigger value="overview" className="flex-1 py-3">Resumen</TabsTrigger>
            <TabsTrigger value="courses" className="flex-1 py-3">Cursos</TabsTrigger>
            <TabsTrigger value="achievements" className="flex-1 py-3">Logros</TabsTrigger>
            <TabsTrigger value="skills" className="flex-1 py-3">Habilidades</TabsTrigger>
          </TabsList>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <TabsContent value="overview" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="overflow-hidden">
                    <div className="bg-gradient-to-br from-teal-400 to-teal-600 p-6 text-white">
                      <CardHeader className="p-0">
                        <CardTitle className="text-xl flex items-center">
                          <FaGraduationCap className="mr-2" />
                          Cursos Recientes
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-0 mt-4">
                        <ul className="space-y-4">
                          {userInfo.recentCourses.slice(0, 3).map((course) => (
                            <li key={course.id}>
                              <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                  <h4 className="font-semibold">{course.title}</h4>
                                  <span className="text-sm">{course.progress}%</span>
                                </div>
                                <Progress value={course.progress} className="h-2 bg-teal-300"  />
                              </div>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                      <CardFooter className="p-0 mt-4">
                        <Button variant="secondary" className="w-full" onClick={() => setActiveTab('courses')}>Ver Todos los Cursos</Button>
                      </CardFooter>
                    </div>
                  </Card>
                  <Card className="overflow-hidden">
                    <div className="bg-gradient-to-br from-purple-400 to-pink-500 p-6 text-white">
                      <CardHeader className="p-0">
                        <CardTitle className="text-xl flex items-center">
                          <FaTrophy className="mr-2" />
                          Logros Destacados
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-0 mt-4">
                        <ul className="space-y-4">
                          {userInfo.achievements.slice(0, 3).map((achievement) => (
                            <li key={achievement.id}>
                              <div className="flex items-start">
                                <Badge className="mr-2 bg-white text-purple-600">{achievement.id}</Badge>
                                <div>
                                  <h4 className="font-semibold">{achievement.title}</h4>
                                  <p className="text-sm text-purple-100">{achievement.description}</p>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                      <CardFooter className="p-0 mt-4">
                        <Button variant="secondary" className="w-full" onClick={() => setActiveTab('achievements')}>Ver Todos los Logros</Button>
                      </CardFooter>
                    </div>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="courses" className="mt-6">
                <Card className="overflow-hidden">
                  <div className="bg-gradient-to-br from-blue-400 to-blue-600 p-6 text-white">
                    <CardHeader className="p-0">
                      <CardTitle className="text-xl flex items-center">
                        <FaGraduationCap className="mr-2" />
                        Mis Cursos
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 mt-4">
                      <ul className="space-y-6">
                        {userInfo.recentCourses.map((course) => (
                          <li key={course.id}>
                            <div className="space-y-2">
                              <div className="flex justify-between items-center">
                                <h4 className="font-semibold">{course.title}</h4>
                                <span className="text-sm">{course.progress}%</span>
                              </div>
                              <Progress value={course.progress} className="h-2 bg-blue-200 " />
                            </div>
                            <div className="mt-2 flex justify-end">
                              <Button variant="secondary" className='shadow-xl font-bold border-2'>Continuar</Button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </div>
                </Card>
              </TabsContent>
              <TabsContent value="achievements" className="mt-6">
                <Card className="overflow-hidden">
                  <div className="bg-gradient-to-br from-purple-400 to-pink-500 p-6 text-white">
                    <CardHeader className="p-0">
                      <CardTitle className="text-xl flex items-center">
                        <FaTrophy className="mr-2" />
                        Mis Logros
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 mt-4">
                      <ul className="space-y-6">
                        {userInfo.achievements.map((achievement) => (
                          <li key={achievement.id}>
                            <div className="flex items-start">
                              <Badge className="mr-4 bg-white text-purple-600">{achievement.id}</Badge>
                              <div>
                                <h4 className="font-semibold text-lg">{achievement.title}</h4>
                                <p className="text-purple-100">{achievement.description}</p>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </div>
                </Card>
              </TabsContent>
              <TabsContent value="skills" className="mt-6">
                <Card className="overflow-hidden">
                  <div className="bg-gradient-to-br from-teal-400 to-teal-600 p-6 text-white">
                    <CardHeader className="p-0">
                      <CardTitle className="text-xl flex items-center">
                        <FaLightbulb className="mr-2" />
                        Mis Habilidades
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 mt-4">
                      <ul className="space-y-6">
                        {userInfo.skills.map((skill) => (
                          <li key={skill.name}>
                            <div className="space-y-2">
                              <div className="flex justify-between items-center">
                                <h4 className="font-semibold">{skill.name}</h4>
                                <span className="text-sm">{skill.level}%</span>
                              </div>
                              <Progress value={skill.level} className="h-2 bg-teal-300" />
                            </div>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </div>
                </Card>
              </TabsContent>
            </motion.div>
          </AnimatePresence>
        </Tabs>
      </main>
    </div>
  )
}