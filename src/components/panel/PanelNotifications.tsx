"use client";
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { FaBell, FaCheck, FaTrash } from "react-icons/fa"
import { Button } from "../ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card"
import { Separator } from "../ui/separator"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { ScrollArea } from "../ui/scroll-area"

type Notification = {
    id: number
    category: 'curso' | 'recordatorio' | 'logro' | 'equipo'
    title: string
    desc: string
    time: string
    read: boolean
}

const NotificationItem = ({ notification, onMarkAsRead, onDelete }: { 
    notification: Notification
    onMarkAsRead: (id: number) => void
    onDelete: (id: number) => void 
    }) => {


return (
    <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.2 }}
    className="p-4 hover:bg-gray-50 transition-colors"
    >
    <div className="flex items-start">
        <div className="flex-grow">
        <div className="flex justify-between items-start mb-1">
            <h4 className="font-semibold text-sm">{notification.title}</h4>
            <span className="text-xs text-gray-500">{notification.time}</span>
        </div>
        <p className="text-sm text-gray-600 mb-2">{notification.desc}</p>
        <div className="flex justify-end space-x-2">
            {!notification.read && (
            <Button variant="ghost" size="sm" className="hover:bg-green-500 hover:text-white" onClick={() => onMarkAsRead(notification.id)}>
                <FaCheck className="h-4 w-4 mr-1" />
                Marcar como leído
            </Button>
            )}
            <Button variant="ghost" size="sm" className="hover:bg-red-600 hover:text-white" onClick={() => onDelete(notification.id)}>
            <FaTrash className="h-4 w-4 mr-1" />
            Eliminar
            </Button>
        </div>
        </div>
    </div>
    <Separator className="mt-2" />
    </motion.div>
)
}

export const PanelNotifications = () => {
const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
const [notifications, setNotifications] = useState<Notification[]>([
    { id: 1, category: 'curso', title: 'Nuevo curso disponible', desc: 'Se ha añadido "Innovación en PyMEs"', time: '2 min', read: true },
    { id: 2, category: 'recordatorio', title: 'Recordatorio', desc: 'Taller de Comunicación Efectiva en 1 hora', time: '1 hora', read: false },
    { id: 3, category: 'logro', title: 'Logro desbloqueado', desc: 'Has completado 5 cursos. ¡Felicidades!', time: '3 horas', read: false },
    { id: 4, category: 'equipo', title: 'Mensaje del equipo', desc: 'Juan ha compartido un nuevo documento', time: '5 horas', read: true },
    ])
    const unreadCount = notifications.filter(notif => !notif.read).length
    const markAsRead = (id: number) => {
    setNotifications(notifications.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
    ))
    }

    const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(notif => notif.id !== id))
    }

return (
<Popover open={isNotificationsOpen} onOpenChange={setIsNotificationsOpen}>
<PopoverTrigger asChild>
    <Button variant="ghost" size="icon" className="relative">
    <FaBell className="h-5 w-5" />
    {unreadCount > 0 && (
        <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
    )}
    </Button>
</PopoverTrigger>
<PopoverContent className="w-80 p-0 mr-4 rounded-xl shadow-2xl">
    <AnimatePresence>
    {isNotificationsOpen && (
        <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        >
        <Card>
            <CardHeader className="pb-2">
            <CardTitle>Notificaciones</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
            <Tabs defaultValue="all">
                <TabsList className="w-full">
                <TabsTrigger value="all" className="flex-1">Todas</TabsTrigger>
                <TabsTrigger value="unread" className="flex-1">No leídas</TabsTrigger>
                </TabsList>
                <TabsContent value="all">
                <ScrollArea className="h-[300px]">
                    {notifications.map((notif) => (
                    <NotificationItem
                        key={notif.id}
                        notification={notif}
                        onMarkAsRead={markAsRead}
                        onDelete={deleteNotification}
                    />
                    ))}
                </ScrollArea>
                </TabsContent>
                <TabsContent value="unread">
                <ScrollArea className="h-[300px]">
                    {notifications.filter(n => !n.read).map((notif) => (
                    <NotificationItem
                        key={notif.id}
                        notification={notif}
                        onMarkAsRead={markAsRead}
                        onDelete={deleteNotification}
                    />
                    ))}
                </ScrollArea>
                </TabsContent>
            </Tabs>
            </CardContent>
        </Card>
        </motion.div>
    )}
    </AnimatePresence>
</PopoverContent>
</Popover>
)
}
