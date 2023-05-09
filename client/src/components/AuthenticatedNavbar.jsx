import {
  MagnifyingGlassIcon,
  PlusIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { createShortUrl } from "../util/function";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const AuthenticatedNavbar = ({ search, setSearch, image, noSearch = false }) => {
  const navigate = useNavigate();
  const createNew = async () => {
    const title = prompt("Enter Title");
    const url = prompt("Enter Full URL");

    if (!title || !url || title.length === 0 || url.length === 0) {
      toast.error("One or more fields are empty! Try Again");
      return;
    }

    const done = await createShortUrl(title, url);
    if (!done.result) {
      toast.error(done.message);
    } else {
      toast.success(done.message);
    }
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };
  
  const logout = () => {
    localStorage.removeItem('auth')
    navigate('/login')
    toast.info("Logged out!")
  }
  return (
    <nav className="p-4 bg-white flex items-center justify-between">
      {/* Title */}
      <a href="/dashboard">
      <h3 className="font-bruno text-lg tracking-wider">Shorty</h3>
      </a>
      {/* Search */}
      <div className="flex items-center space-x-6">
        {/* Search Icon */}
        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
        {/* Search Box */}
        <input
          type="search"
          className="bg-gray-300 text-gray-800 rounded-lg p-2 outline-none text-center w-96"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          disabled={noSearch}
          placeholder="Search or Paste URL"
        />
        {/* New Button (Plus) */}
        <button
          className="p-2 rounded-lg hover:bg-gray-100 transition-all duration-150 ease-in-out"
          onClick={createNew}
        >
          <PlusIcon className="h-5 w-5 text-gray-400" />
        </button>
      </div>
      {/* UserIcon and menu */}
      <div className="flex items-center space-x-4">
        <button onClick={() => navigate("/profile")}>
          <img
            src={image}
            alt="Profile Image"
            className="h-8 w-8 rounded-full object-cover"
          />
        </button>
        <button className="p-2 hover:bg-gray-100 transition-all duration-100 ease-in-out rounded-lg" onClick={logout}>
          <ArrowLeftOnRectangleIcon className="h-6 w-6 text-red-400 hover:text-red-600 " />
        </button>
      </div>
    </nav>
  );
};

export default AuthenticatedNavbar;
