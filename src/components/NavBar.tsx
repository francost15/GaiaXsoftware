"use client";
import { PanelSettings } from './panel/PanelSettings';
import { PanelNotifications } from './panel/PanelNotifications';
type PropsTittle = {
  title: string
}
export const NavBar: React.FC<PropsTittle> = ({ title }) => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex-1 flex items-center justify-start">
          <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
        </div>
        <div className="flex items-center space-x-4">
          <PanelNotifications />
          <PanelSettings name={'Franco Sanchez'} job={'Product Management'} />
        </div>
      </div>
    </header>
  )
}