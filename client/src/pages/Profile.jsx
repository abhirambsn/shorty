import { useLayoutEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { deleteUser, getProfile, modifyUser } from "../util/function";
import AuthenticatedNavbar from "../components/AuthenticatedNavbar";
import CustomInput from "../components/CustomInput";
import { UserIcon, EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";

const Profile = () => {
    const [profile, setProfile] = useState({})
    const location = useLocation();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    useLayoutEffect(() => {
        (async () => {
          const profile = await getProfile();
          if (!profile.result) {
            navigate("/login");
          }
          setProfile(profile.profile);
          setName(profile.profile.name);
          
        })();
      }, [location, navigate]);


      const handleProfileChange = async () => {
        const result = await modifyUser(name, password)
        if (!result.result) {
          toast.error(result.message)
        } else {
          toast.success(result.message)
          window.location.reload();
        }
      }

      const handleDeleteAccount = async () => {
        const cnf = confirm("Confirm Deletion? All your data and urls will be lost!!!")
        if (!cnf) return;
        const result = await deleteUser();
        if (!result.result) {
          toast.error(result.message)
        } else {
          localStorage.removeItem('auth')
          navigate('/login')
          toast.success(result.message)
        }
      }
  return (
    <div className="flex flex-col bg-gray-100 h-screen">
        <AuthenticatedNavbar noSearch={true} image={profile.image} />
        <div className="flex max-w-7xl items-center justify-center mx-auto w-full">
            <div className="p-4 w-full">
                <h3 className="font-bruno text-3xl text-gray-400">My Profile</h3>
                <div className="bg-white rounded-lg mt-5 p-6 flex items-center justify-around">
                    {/* Image */}
                    <img src={profile.image} className="h-64 w-64 rounded-full" />
                    {/* Fields */}
                    <div className="flex items-center flex-col gap-4 flex-[0.9]">
                      <h3 className="text-3xl text-center">Edit Profile</h3>
                        <CustomInput Icon={EnvelopeIcon}  type="email" name="email" value={profile.email} disabled />
                        <CustomInput Icon={UserIcon} type="text" name="name" value={name} setValue={setName}  />
                        <CustomInput Icon={LockClosedIcon} type="password" placeholder="Enter New Password" name="password" value={password} setValue={setPassword} />
                        <div className="flex items-center justify-between w-full space-x-6">
                        <button onClick={handleProfileChange} className="py-2 px-3 bg-indigo-600 text-white w-full rounded-lg hover:bg-indigo-800 transition-all duration-150 ease-in-out">Change</button>
                        <button onClick={handleDeleteAccount} className="py-2 px-3 bg-red-600 text-white w-full rounded-lg hover:bg-red-800 transition-all duration-150 ease-in-out">Delete Account</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Profile