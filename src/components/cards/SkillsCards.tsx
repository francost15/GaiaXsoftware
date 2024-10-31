import { motion } from 'framer-motion'
import { FaComments, FaChartBar, FaUsers, FaLightbulb } from 'react-icons/fa'
import { Button } from '../ui/button'
export const SkillsCards = () => {
    const skills = [
        { icon: FaComments, label: 'Negociación', color: 'from-purple-400 to-indigo-500' },
        { icon: FaUsers, label: 'Trabajo en Equipo', color: 'from-green-400 to-teal-500' },
        { icon: FaChartBar, label: 'Análisis de Datos', color: 'from-blue-400 to-cyan-500' },
        { icon: FaLightbulb, label: 'Innovación', color: 'from-yellow-400 to-orange-500' },
      ]
  return (
    <section>
    <h3 className="text-xl md:text-2xl font-semibold mb-4">Habilidades Recomendadas</h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {skills.map(({ icon: Icon, label, color }, index) => (
        <motion.div 
          key={label} 
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.3, delay: 0.1 * index }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button variant="outline" className={`h-24 w-full flex-col bg-gradient-to-br ${color} text-white hover:shadow-lg transition-all duration-300`}>
            <Icon className="h-8 w-8 mb-2" />
            {label}
          </Button>
        </motion.div>
      ))}
    </div>
  </section>
  )
}
