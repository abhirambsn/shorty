import { useNavigate } from "react-router-dom"
import NavLink from "./NavLink"

const Navbar = ({authenticated = false}) => {
    const navigate = useNavigate();

    const goToDashboard = () => navigate('/dashboard')
  return (
    <nav className="flex flex-row items-center justify-between p-4">
        {/* Logo */}
        <p className="font-bruno font-bold text-4xl">Shorty</p>
        {/* Paths */}
        <ul className="flex items-center justify-center gap-8">
            <li>
                <NavLink name="About Us" link="/" />
            </li>
            <li>
                <NavLink name="Working" link="/" />
            </li>
            <li>
                <NavLink name="Contact" link="/" />
            </li>
        </ul>
        {/* Buttons */}
        {!authenticated ? (
            <ul className="flex items-center justify-center gap-2">
            <li>
                <button className="px-4 py-2 rounded-lg bg-blue-500 text-white transition-all duration-150 ease-in-out hover:bg-blue-700">Login</button>
            </li>
            <li>
                <button className="px-3 py-2 border border-green-500 rounded-lg text-green-500 transition-all duration-150 ease-in-out hover:text-white hover:bg-green-600 hover:border-green-600">Register</button>
            </li>
        </ul>
        ): (
            <ul className="flex items-center justify-center gap-4">
            <li>
                <button className="px-3 py-2 bg-indigo-600 text-white transition-all duration-150 ease-in-out hover:bg-indigo-800 rounded-lg" onClick={goToDashboard}>Go to Dashboard</button>
            </li>
        </ul>
        )}
    </nav>
  )
}

export default Navbar