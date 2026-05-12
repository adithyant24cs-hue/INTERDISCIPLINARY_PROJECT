import {
  LayoutDashboard,
  ShieldCheck,
  QrCode,
  LogOut
} from "lucide-react";

import { useNavigate } from "react-router-dom";

export default function Sidebar({ role }) {

  const navigate = useNavigate();

  const logout = () => {

    localStorage.clear();

    navigate("/login");

  };

  return (
    <div className="w-[260px] bg-[#081225] border-r border-cyan-500/10 min-h-screen p-6 flex flex-col">

      {/* Logo */}
      <div>

        <h1 className="text-3xl font-black text-cyan-400">
          V-PASS
        </h1>

        <p className="text-slate-500 text-sm mt-1">
          Hostel Management
        </p>

      </div>

      {/* Navigation */}
      <div className="mt-10 flex-1 space-y-3">

        {/* Student */}
        {
          role === "student" && (
            <button
              onClick={() => navigate("/student")}
              className="w-full flex items-center gap-3 px-4 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 transition"
            >

              <LayoutDashboard size={20} />

              Dashboard

            </button>
          )
        }

        {/* Warden */}
        {
          role === "warden" && (
            <button
              onClick={() => navigate("/warden")}
              className="w-full flex items-center gap-3 px-4 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 transition"
            >

              <ShieldCheck size={20} />

              Warden Panel

            </button>
          )
        }

        {/* Security */}
        {
          role === "security" && (
            <button
              onClick={() => navigate("/security")}
              className="w-full flex items-center gap-3 px-4 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 transition"
            >

              <QrCode size={20} />

              QR Scanner

            </button>
          )
        }

      </div>

      {/* Logout */}
      <button
        onClick={logout}
        className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 transition py-4 rounded-2xl font-bold"
      >

        <LogOut size={18} />

        Logout

      </button>

    </div>
  );
}