"use client";
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'

import { Input } from '@/components/ui/input'
import { PanelSettings } from './panel/PanelSettings';
import {FaSearch } from 'react-icons/fa';
import { PanelNotifications } from './panel/PanelNotifications';



export const NavBarHome = () => {
 
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearchFocused, setIsSearchFocused] = useState(false)

  const searchSuggestions = [
    'Liderazgo', 'Comunicación efectiva', 'Gestión del tiempo', 'Innovación'
  ]



  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
          <div className="flex-shrink-0 flex items-center relative w-full max-w-xs">
            <Input 
              type="text" 
              placeholder="Buscar cursos, habilidades..." 
              className="w-full pr-10 rounded-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
            />
            <Button size="icon" className="absolute right-0 top-0 bottom-0 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
              <FaSearch className="h-4 w-4" />
            </Button>
            <AnimatePresence>
              {isSearchFocused && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 right-0 bg-white shadow-lg rounded-b-lg mt-1 py-2 z-50"
                >
                  {searchSuggestions.map((suggestion, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      className="w-full justify-start px-4 py-2 text-left"
                      onClick={() => setSearchQuery(suggestion)}
                    >
                      {suggestion}
                    </Button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <PanelNotifications />
          <PanelSettings name={'Franco Sanchez'} job={'Product Management'} />
        </div>
      </div>
    </header>
  )
}