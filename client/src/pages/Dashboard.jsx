import { useLayoutEffect, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { deleteShortUrl, getProfile, updateShortUrl } from "../util/function";
import { getShortUrls } from "../util/function";
import AuthenticatedNavbar from "../components/AuthenticatedNavbar";
import {
  EllipsisVerticalIcon,
  ChartBarIcon,
  ClipboardDocumentListIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { toast } from "react-toastify";

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [profile, setProfile] = useState({});
  const [urls, setUrls] = useState([]);

  const [filtered, setFiltered] = useState([]);

  const [search, setSearch] = useState("");
  useLayoutEffect(() => {
    (async () => {
      const profile = await getProfile();
      if (!profile.result) {
        navigate("/login");
      }
      setProfile(profile.profile);
      const urls = await getShortUrls();
      if (!urls.result) {
        return;
      }
      setUrls(urls.urls);
    })();
  }, [location, navigate]);

  useEffect(() => {
    if (search === "") {
      setFiltered(urls);
    } else {
      setFiltered(
        urls.filter((url) => String(url.title.toLowerCase()).includes(search))
      );
    }
  }, [search, urls]);

  const handleURLModify = async (url) => {
    const title = prompt("Enter new Title (leave blank if unchanged)");
    const new_url = prompt("Enter new URL (leave blank if unchanged)");

    const result = await updateShortUrl(url._id, title, new_url);
    if (result.result) {
      toast.success(result.message);
      window.location.reload();
    }
  };

  const handleURLDelete = async (url) => {
    const conf = confirm("Confirm URL Deletion?");
    if (!conf) return;
    const result = await deleteShortUrl(url._id);
    if (result) {
      toast.info("URL Deleted");
      window.location.reload()
    }
  };

  return (
    <div className="flex flex-col bg-gray-100 h-screen">
      <AuthenticatedNavbar
        search={search}
        setSearch={setSearch}
        image={profile.image}
      />
      <div className="flex max-w-7xl items-center justify-center mx-auto w-full">
        <div className="p-4 w-full">
          <p className="font-bruno text-gray-500">Stats</p>
          <div className="m-6">
            <ul className="flex flex-col gap-2">
              {filtered.map((url, i) => (
                <li
                  key={i}
                  className="bg-white p-4 flex items-center space-x-3"
                >
                  <EllipsisVerticalIcon className="h-10 w-10 text-gray-300" />
                  <div className="flex flex-col gap-1 flex-1">
                    <h3 className="text-xl font-bold">{url.title}</h3>
                    <a
                      className="text-cyan-500 text-sm hover:underline"
                      href={`http://localhost:5001/${url.shortened_id}`}
                    >
                      https://localhost:5001/{url.shortened_id}
                    </a>
                  </div>
                  <div className="flex items-center space-x-1">
                    <p className="text-gray-400">{url.clicks}</p>
                    <ChartBarIcon className="h-3 w-3 text-gray-400" />
                  </div>
                  <div className="flex items-center space-x-4 ml-4">
                    <button
                      className="p-1 rounded-lg hover:bg-gray-100 transition-all duration-150 ease-in-out"
                      onClick={() => {
                        const copyText = `http://localhost:5001/${url.shortened_id}`;
                        navigator.clipboard.writeText(copyText);
                        toast.success("Copied to Clipboard");
                      }}
                    >
                      <ClipboardDocumentListIcon className="h-5 w-5 text-gray-500" />
                    </button>
                    <button
                      className="p-1 rounded-lg hover:bg-gray-100 transition-all duration-150 ease-in-out"
                      onClick={() => handleURLModify(url)}
                    >
                      <PencilSquareIcon className="h-5 w-5 text-gray-500" />
                    </button>
                    <button
                      className="p-1 rounded-lg hover:bg-gray-100 transition-all duration-150 ease-in-out"
                      onClick={() => handleURLDelete(url)}
                    >
                      <TrashIcon className="h-5 w-5 text-gray-500" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
