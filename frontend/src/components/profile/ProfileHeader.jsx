import { User, MessageCircle } from 'lucide-react'

const ProfileHeader = () => {
  return (
    <div className="bg-green-700 shadow-lg rounded-lg p-4 flex items-center justify-between mb-8 max-w-[95%] mx-auto animate-fade-down animate-duration-[1000ms] animate-delay-[1000ms]">
      {/* Lado izquierdo de la seccion imagen de perfil y informacion del usuario */}
      <div className="flex items-center space-x-6">
        <div className="bg-green-200 rounded-full p-4 shadow-md">
          <User className="w-12 h-12 text-green-600" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-white leading-tight">nombre usuario</h2>
          <p className="text-md text-green-500">nombbreusuario@gmail.com</p>
        </div>
      </div>

      {/* Lado derecho icono de mensajes */}
      <a
        href="/chat"
        className="text-green-600 hover:text-green-800 transition duration-300 ease-in-out flex items-center space-x-2 bg-green-100 p-3 rounded-full shadow-md hover:shadow-lg"
      >
        <MessageCircle className="w-8 h-8" />
      </a>
    </div>
  )
}

export default ProfileHeader
