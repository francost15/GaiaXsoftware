"use client"
import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FaRocket, FaTimes, FaPaperPlane } from 'react-icons/fa'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'

type Message = {
  sender: 'user' | 'bot'
  message: string
}

export const Chatbot: React.FC = () => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false)
  const [chatMessages, setChatMessages] = useState<Message[]>([
    { sender: 'bot', message: '¡Hola Ana! ¿En qué puedo ayudarte hoy?' },
  ])
  const [newMessage, setNewMessage] = useState('')

  const sendMessage = () => {
    if (newMessage.trim()) {
      setChatMessages([...chatMessages, { sender: 'user', message: newMessage }])
      setNewMessage('')
      setTimeout(() => {
        setChatMessages(prev => [...prev, { sender: 'bot', message: 'Gracias por tu mensaje. ¿Puedo ayudarte en algo más?' }])
      }, 1000)
    }
  }

  return (
    <>
      <AnimatePresence>
        {isChatbotOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-4 right-4 w-full sm:w-96 z-50"
          >
            <Card className="shadow-lg overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
                <CardTitle className="text-lg font-medium flex items-center">
                  <FaRocket className="mr-2 h-5 w-5" />
                  Asistente IA
                </CardTitle>
                <Button variant="ghost" size="icon" onClick={() => setIsChatbotOpen(false)} className="text-white hover:text-blue-500">
                  <FaTimes className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[400px] p-4">
                  {chatMessages.map((msg, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className={`mb-4 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}
                    >
                      <div className={`inline-block p-3 rounded-lg ${msg.sender === 'user' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
                        {msg.message}
                      </div>
                    </motion.div>
                  ))}
                </ScrollArea>
                <div className="p-4 border-t">
                  <form onSubmit={(e) => { e.preventDefault(); sendMessage(); }} className="flex items-center">
                    <Input 
                      type="text" 
                      placeholder="Escribe tu mensaje..." 
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="flex-grow mr-2 rounded-full"
                    />
                    <Button type="submit" size="icon" className="rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
                      <FaPaperPlane className="h-4 w-4" />
                    </Button>
                  </form>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
      {!isChatbotOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed bottom-4 right-4 z-50"
        >
          <Button onClick={() => setIsChatbotOpen(true)} className="rounded-full w-14 h-14 bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg hover:shadow-xl transition-all duration-300">
            <FaRocket className="h-6 w-6" />
          </Button>
        </motion.div>
      )}
    </>
  )
}