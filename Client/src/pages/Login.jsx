import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, User, Lock } from "lucide-react";
import axios from "axios";

export default function Login() {

  const navigate = useNavigate();

  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {

    if(!studentId || !password){
      return alert("Please fill all fields");
    }

    try {

      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          studentId,
          password
        }
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "role",
        res.data.role
      );

      localStorage.setItem(
        "studentId",
        res.data.studentId
      );

      alert("Login Successful");

      // Role Based Navigation
      if(res.data.role === "student"){
        navigate("/student");
      }

      else if(res.data.role === "warden"){
        navigate("/warden");
      }

      else if(res.data.role === "security"){
        navigate("/security");
      }

    } catch(err) {

      alert(
        err.response?.data?.message || "Login Failed"
      );

    } finally {

      setLoading(false);

    }

  };

  return (
    <div className="h-screen w-screen bg-[#020817] flex items-center justify-center relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute w-[500px] h-[500px] bg-cyan-500/20 blur-[120px] rounded-full"></div>

      {/* Login Card */}
      <div className="relative z-10 w-[420px] bg-[#081225] border border-cyan-500/20 rounded-[28px] p-8 shadow-2xl">

        {/* Logo */}
        <div className="flex justify-center mb-6">

          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-lg">

            <Shield
              size={38}
              className="text-black"
            />

          </div>

        </div>

        {/* Title */}
        <h1 className="text-center text-cyan-400 text-5xl font-black">
          VIRTUAL PASS
        </h1>

        <p className="text-center text-slate-400 mt-2">
          Smart Hostel Outpass System
        </p>

        {/* Form */}
        <div className="mt-8">

          {/* User ID */}
          <div className="mb-5">

            <label className="text-slate-300 text-sm block mb-2">
              User ID
            </label>

            <div className="h-14 rounded-xl bg-slate-800 flex items-center px-4 border border-transparent focus-within:border-cyan-400 transition">

              <User
                className="text-slate-400"
                size={20}
              />

              <input
                type="text"
                placeholder="Enter User ID"
                value={studentId}
                onChange={(e)=>
                  setStudentId(e.target.value)
                }
                className="bg-transparent outline-none px-3 flex-1 text-white placeholder:text-slate-500"
              />

            </div>

          </div>

          {/* Password */}
          <div>

            <label className="text-slate-300 text-sm block mb-2">
              Password
            </label>

            <div className="h-14 rounded-xl bg-slate-800 flex items-center px-4 border border-transparent focus-within:border-cyan-400 transition">

              <Lock
                className="text-slate-400"
                size={20}
              />

              <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e)=>
                  setPassword(e.target.value)
                }
                className="bg-transparent outline-none px-3 flex-1 text-white placeholder:text-slate-500"
              />

            </div>

          </div>

        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full h-14 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-bold text-lg mt-8 hover:opacity-90 transition disabled:opacity-50"
        >
          {
            loading
            ? "Logging in..."
            : "Login"
          }
        </button>

        {/* Footer */}
        <p className="text-center text-slate-500 text-sm mt-5">
          Contact hostel office for credentials
        </p>

      </div>

    </div>
  );
}