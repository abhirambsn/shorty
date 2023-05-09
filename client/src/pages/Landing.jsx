import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import {ArrowRightIcon} from '@heroicons/react/24/outline'

const Landing = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col">
        <Navbar />
        <div className="flex-1 max-w-7xl items-center justify-center w-full mx-auto">
            <div className="flex flex-col p-4 mt-12 gap-5">
              <h1 className="text-5xl text-center">Shor.ty</h1>
              <p className="text-lg text-center">A Tiny but blazingly fast URL Shortener</p>
              <p className="flex items-center text-lg space-x-10 text-center font-bold mx-auto">
                <span className="text-blue-600">https://averyvery...longurl</span>
                <ArrowRightIcon className="h-8 w-8 text-black font-bold" />
                <span className="text-indigo-600">https://shr.ty/xyz12</span>
              </p>
              <button onClick={() => navigate('/register')} className="bg-black px-3 py-2 rounded-lg w-1/4 mx-auto text-white hover:opacity-80 transition-all duration-100">Get Started</button>
            </div>
        </div>
    </div>
  )
}

export default Landing