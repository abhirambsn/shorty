import { useState } from "react";
import CustomInput from "../components/CustomInput";
import { UserIcon, EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { register } from "../util/function";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password, name);

    if (password !== confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }

    const resp = await register(email, password, name);
    if (resp.result) {
      toast.success(resp.message)
      setTimeout(() => {}, 1000)
      navigate("/login");
    } else {
      toast.error(resp.message);
    }
  };
  return (
    <div className="bg-gray-100 h-screen w-screen flex flex-col items-center justify-center">
      <form
        className="bg-white rounded-xl p-10 px-20 gap-5 flex flex-col items-center"
        onSubmit={handleSubmit}
      >
        <h3 className="font-bold text-4xl font-bruno">Register Here</h3>
        <CustomInput
          type="email"
          name="email"
          value={email}
          setValue={setEmail}
          placeholder="johndoe@example.com"
          Icon={EnvelopeIcon}
        />
        <CustomInput
          type="password"
          name="password"
          value={password}
          setValue={setPassword}
          Icon={LockClosedIcon}
          placeholder="......"
        />
        <CustomInput
          type="password"
          name="cpassword"
          value={confirmPassword}
          setValue={setConfirmPassword}
          Icon={LockClosedIcon}
          placeholder="......"
        />
        <CustomInput
          type="text"
          name="name"
          value={name}
          setValue={setName}
          Icon={UserIcon}
          placeholder="John Doe"
        />
        <button className="w-full flex items-center justify-center text-white bg-green-600 rounded-lg py-2 hover:bg-green-800 transition-all duration-100 ease-in-out">
          Register
        </button>
        <p className="text-gray-500">
          Already have an account?{" "}
          <a href="/login">
            <span className="text-black hover:underline">Login</span>
          </a>
        </p>
      </form>
    </div>
  );
};

export default Register;
