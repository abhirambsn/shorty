import { useLayoutEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import { UserIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { getSession, login } from "../util/function";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password);

    const resp = await login(email, password);
    if (resp) {
      navigate("/dashboard");
    } else {
      toast("Invalid Credentials! Try again.", {
        type: "error",
      });
    }
  };

  useLayoutEffect(() => {
    const sessToken = getSession()
    console.log(sessToken)
  }, [location])
  return (
    <div className="bg-gray-100 h-screen w-screen flex flex-col items-center justify-center">
      <form
        className="bg-white rounded-xl p-10 px-20 gap-5 flex flex-col items-center"
        onSubmit={handleSubmit}
      >
        <h3 className="font-bold text-4xl font-bruno">Sign in to Continue</h3>
        <CustomInput
          type="email"
          name="email"
          value={email}
          setValue={setEmail}
          placeholder="johndoe@example.com"
          Icon={UserIcon}
        />
        <CustomInput
          type="password"
          name="password"
          value={password}
          setValue={setPassword}
          Icon={LockClosedIcon}
          placeholder="....."
        />
        <button className="w-full flex items-center justify-center text-white bg-blue-600 rounded-lg py-2 hover:bg-blue-800 transition-all duration-100 ease-in-out">
          Login
        </button>
        <p className="text-gray-500">
          Don&apos;t have an account?{" "}
          <a href="/register">
            <span className="text-black hover:underline">Sign up</span>
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
