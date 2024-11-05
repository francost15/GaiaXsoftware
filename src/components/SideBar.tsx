"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  FaGraduationCap,
  FaBullseye,
  FaUsers,
  FaComments,
  FaUser,
  FaChartBar,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { Button } from "./ui/button";
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from "./ui/tooltip";

const menuItems = [
  // { icon: FaGraduationCap, label: "Mis Cursos", href: "/cursos" },
  // { icon: FaBullseye, label: "Mis Objetivos", href: "/objetivos" },
  // { icon: FaUsers, label: "Mi Equipo", href: "/equipo" },
  { icon: FaComments, label: "Colaboración", href: "/teamchat" },
  { icon: FaUser, label: "Mi Perfil", href: "/profile" },
  { icon: FaChartBar, label: "Administrador", href: "/dashboard" },
];

export const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsMounted(true);
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth >= 1024);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  if (!isMounted) {
    return null; // or a loading placeholder
  }

  return (
    <TooltipProvider>
      <motion.aside
        initial={{ width: 256 }}
        animate={{ width: isSidebarOpen ? 256 : 64 }}
        transition={{ duration: 0.3 }}
        className="bg-white shadow-lg flex flex-col h-screen"
      >
        <Link href="/" className="flex items-center justify-between p-4 border-b">
          <Image src="/logo.svg" alt="Logo" width={isSidebarOpen ? 90 : 40} height={isSidebarOpen ? 80 : 40} />
        </Link>
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-1">
            {menuItems.map(({ icon: Icon, label, href }) => (
              <li key={label}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link href={href}>
                      <Button
                        variant="ghost"
                        className={`w-full justify-start transition-all duration-200 ${
                          pathname === href
                            ? "bg-blue-100 text-blue-700 font-medium"
                            : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                        } ${isSidebarOpen ? "px-4" : "px-2"}`}
                      >
                        <Icon className={`${isSidebarOpen ? "mr-3" : "mr-0"} h-5 w-5 transition-transform`} />
                        {isSidebarOpen && <span className="font-medium text-sm">{label}</span>}
                      </Button>
                    </Link>
                  </TooltipTrigger>
                  {!isSidebarOpen && (
                    <TooltipContent side="right">
                      <p>{label}</p>
                    </TooltipContent>
                  )}
                </Tooltip>
              </li>
            ))}
          </ul>
        </nav>
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
    </TooltipProvider>
  );
};