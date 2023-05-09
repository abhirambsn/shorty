
const NavLink = ({name, link}) => {
  return (
    <a href={link} className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-100 ease-in-out">{name}</a>
  )
}

export default NavLink