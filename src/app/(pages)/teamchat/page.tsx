"use client"

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { 
  FaPaperPlane, 
  FaUserFriends, 
  FaPaperclip, 
  FaSmile, 
  FaSearch, 
  FaEllipsisH,
  FaEdit,
  FaTrash,
  FaReply,
  FaShare
} from 'react-icons/fa'

interface User {
  id: number
  name: string
  avatar: string
  status: 'online' | 'offline' | 'away'
  unread: number
}

interface Message {
  id: number
  sender: string
  content: string
  timestamp: string
  replyTo?: number
}

const mockUsers: User[] = [
  { id: 1, name: 'Ana García', avatar: '/avatars/ana.jpg', status: 'online', unread: 2 },
  { id: 2, name: 'Carlos Rodríguez', avatar: '/avatars/carlos.jpg', status: 'offline', unread: 0 },
  { id: 3, name: 'Elena Martínez', avatar: '/avatars/elena.jpg', status: 'away', unread: 1 },
  { id: 4, name: 'David López', avatar: '/avatars/david.jpg', status: 'online', unread: 0 },
]

const mockMessages: Message[] = [
  { id: 1, sender: 'Ana García', content: '¡Hola a todos! ¿Cómo va el proyecto?', timestamp: '10:30 AM' },
  { id: 2, sender: 'Carlos Rodríguez', content: 'Bastante bien, estamos avanzando con la fase de diseño.', timestamp: '10:32 AM' },
  { id: 3, sender: 'Elena Martínez', content: 'Acabo de terminar los mockups, los compartiré en un momento.', timestamp: '10:35 AM' },
  { id: 4, sender: 'David López', content: '¡Genial! Estoy ansioso por verlos.', timestamp: '10:36 AM' },
]

export const CollaborativeChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(mockMessages)
  const [newMessage, setNewMessage] = useState('')
  const [activeChat, setActiveChat] = useState('team')
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [replyingTo, setReplyingTo] = useState<number | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

  const handleSendMessage = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    if (newMessage.trim()) {
      const message: Message = {
        id: messages.length + 1,
        sender: 'You',
        content: newMessage,
        timestamp: format(new Date(), 'HH:mm', { locale: es }),
        replyTo: replyingTo ?? undefined
      }
      setMessages(prevMessages => [...prevMessages, message])
      setNewMessage('')
      setReplyingTo(null)
      setShowEmojiPicker(false)
    }
  }, [messages, newMessage, replyingTo])

  const handleEmojiClick = useCallback((emojiData: EmojiClickData) => {
    setNewMessage(prev => prev + emojiData.emoji)
  }, [])

  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Handle file upload logic here
      console.log('File selected:', file)
    }
  }, [])

  const renderChatHeader = () => (
    <div className="bg-white border-b border-gray-200 p-4 flex justify-between items-center">
      <div className="flex items-center">
        <Avatar className="h-10 w-10">
          <AvatarImage src="/avatars/team.jpg" alt="Team Avatar" />
          <AvatarFallback>TE</AvatarFallback>
        </Avatar>
        <div className="ml-3">
          <h2 className="text-xl font-bold">Chat del Equipo</h2>
          <p className="text-sm text-gray-500">4 miembros • 2 en línea</p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Buscar en el chat">
                <FaSearch className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Buscar en el chat</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Más opciones">
              <FaEllipsisH className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <FaUserFriends className="mr-2 h-4 w-4" />
              <span>Ver miembros</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <FaEdit className="mr-2 h-4 w-4" />
              <span>Editar nombre</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">
              <FaTrash className="mr-2 h-4 w-4" />
              <span>Salir del chat</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )

  const renderMessage = (message: Message, index: number) => (
    <motion.div
      key={message.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className={`mb-4 flex ${message.sender === 'You' ? 'justify-end' : 'justify-start'}`}
    >
      <div className={`max-w-[70%] group ${message.sender === 'You' ? 'order-2' : ''}`}>
        {message.sender !== 'You' && (index === 0 || messages[index - 1].sender !== message.sender) && (
          <p className="text-xs text-gray-500 mb-1">{message.sender}</p>
        )}
        <div className="relative">
          {message.replyTo && (
            <div className="text-xs text-gray-500 mb-1 bg-gray-100 p-2 rounded">
              Respondiendo a: {messages.find(m => m.id === message.replyTo)?.content}
            </div>
          )}
          <div
            className={`p-3 rounded-lg ${
              message.sender === 'You'
                ? 'bg-blue-500 text-white'
                : 'bg-white border border-gray-200'
            }`}
          >
            <p>{message.content}</p>
            <p className="text-xs mt-1 opacity-70">{message.timestamp}</p>
          </div>
          <div className="absolute top-2 right-0 translate-x-full pl-2 hidden group-hover:flex items-center space-x-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() => setReplyingTo(message.id)}
              aria-label="Responder"
            >
              <FaReply className="h-3 w-3" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              aria-label="Compartir"
            >
              <FaShare className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  )

  const renderMessageInput = () => (
    <div className="bg-white border-t border-gray-200 p-4">
      {replyingTo && (
        <div className="flex items-center justify-between bg-gray-100 p-2 rounded-lg mb-2">
          <p className="text-sm text-gray-600">
            Respondiendo a: {messages.find(m => m.id === replyingTo)?.content}
          </p>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setReplyingTo(null)}
            aria-label="Cancelar respuesta"
          >
            ✕
          </Button>
        </div>
      )}
      
      <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileUpload}
          aria-label="Subir archivo"
        />
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => fileInputRef.current?.click()}
                aria-label="Adjuntar archivo"
              >
                <FaPaperclip className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Adjuntar archivo</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <div className="flex-1 relative">
          <Input
            type="text"
            placeholder={replyingTo ? "Escribe tu respuesta..." : "Escribe un mensaje..."}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="pr-10"
            aria-label="Mensaje"
          />
          
          <div className="absolute right-2 top-1/2 -translate-y-1/2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    aria-label="Añadir emoji"
                  >
                    <FaSmile className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Añadir emoji</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        {showEmojiPicker && (
          <div className="absolute bottom-20 right-4">
            <EmojiPicker
              onEmojiClick={handleEmojiClick}
              width={300}
              height={400}
            />
          </div>
        )}

        <Button type="submit" size="icon" aria-label="Enviar mensaje">
          <FaPaperPlane className="h-4 w-4" />
        </Button>
      </form>
    </div>
  )

  return (
    <div className="flex h-screen bg-gray-50">
      <motion.div 
        initial={{ x: -300, opacity: 0 }} 
        animate={{ x: 0, opacity: 1 }} 
        transition={{ duration: 0.5 }} 
        className="w-80 bg-white border-r border-gray-200 flex flex-col"
      >
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-2xl font-bold mb-4">Chats</h2>
          <div className="relative">
            <Input type="text" placeholder="Buscar chats..." className="pl-10" aria-label="Buscar chats" />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
        <Tabs defaultValue="team" className="flex-1 flex flex-col">
          <TabsList className="grid w-full grid-cols-2 p-2">
            <TabsTrigger value="team">Equipo</TabsTrigger>
            <TabsTrigger value="direct">Directos</TabsTrigger>
          </TabsList>
          <TabsContent value="team" className="flex-1 p-2">
            <Button variant="outline" className="w-full mb-4 justify-start">
              <FaUserFriends className="mr-2" />
              Chat del Equipo
              <Badge variant="secondary" className="ml-auto">4</Badge>
            </Button>
          </TabsContent>
          <TabsContent value="direct" className="flex-1 p-0">
            <ScrollArea className="h-[calc(100vh-200px)]">
              {mockUsers.map((user) => (
                <motion.div
                  key={user.id}
                  whileHover={{ backgroundColor: "rgba(0,0,0,0.05)" }}
                  className="flex items-center p-3 cursor-pointer"
                >
                  <Avatar className="h-10 w-10 relative">
                    <AvatarImage src={user.avatar}   alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    <span className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${
                      user.status === 'online' ? 'bg-green-500' : user.status === 'away' ? 'bg-yellow-500' : 'bg-gray-500'
                    }`} />
                  </Avatar>
                  <div className="ml-3 flex-1">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.status}</p>
                  </div>
                  {user.unread > 0 && (
                    <Badge>{user.unread}</Badge>
                  )}
                </motion.div>
              ))}
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 0.5 }} 
        className="flex-1 flex flex-col"
      >
        {renderChatHeader()}
        <ScrollArea className="flex-1 p-4 bg-gray-50">
          <AnimatePresence>
            {messages.map((message, index) => renderMessage(message, index))}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </ScrollArea>
        {renderMessageInput()}
      </motion.div>
    </div>
  )
}

export default CollaborativeChat