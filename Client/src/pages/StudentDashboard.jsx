import { useEffect, useState } from "react";

import api from "../services/api";

import {
  User,
  Calendar,
  FileText,
  Send,
  Clock3,
  ShieldCheck,
  QrCode
} from "lucide-react";

import { QRCodeCanvas } from "qrcode.react";

import Sidebar from "../components/Sidebar";

import toast from "react-hot-toast";

export default function StudentDashboard() {

  const [reason, setReason] = useState("");

  const [fromDate, setFromDate] = useState("");

  const [toDate, setToDate] = useState("");

  const [passes, setPasses] = useState([]);

  const studentId =
    localStorage.getItem("studentId");

  // APPLY
  const applyOutpass = async () => {

    if(!reason || !fromDate || !toDate){

      return toast.error(
        "Please fill all fields"
      );

    }

    try {

      await api.post(
        "/outpass/create",
        {
          reason,
          fromDate,
          toDate
        }
      );

      toast.success(
        "Outpass Applied Successfully"
      );

      setReason("");
      setFromDate("");
      setToDate("");

      fetchPasses();

    } catch(err) {

      console.log(err);

      toast.error(
        err.response?.data?.message ||
        "Something went wrong"
      );

    }

  };

  // FETCH
  const fetchPasses = async() => {

    try{

      const res = await api.get(
        "/outpass"
      );

      setPasses(res.data);

    }catch(err){

      console.log(err);

    }

  };

  useEffect(()=>{

    fetchPasses();

  },[]);

  return (
    <div className="min-h-screen bg-[#020817] text-white flex">

      {/* Sidebar */}
      <Sidebar role="student" />

      {/* Main */}
      <div className="flex-1 p-8 overflow-y-auto">

        {/* Heading */}
        <div className="mb-10">

          <h1 className="text-4xl font-black text-cyan-400">
            Student Dashboard
          </h1>

          <p className="text-slate-400 mt-2">
            Hostel Outpass Portal
          </p>

        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

          {/* Student */}
          <div className="bg-slate-900 border border-cyan-500/20 rounded-3xl p-6">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-slate-400">
                  Student ID
                </p>

                <h2 className="text-2xl font-black mt-2 text-cyan-400">
                  {studentId}
                </h2>

              </div>

              <User
                size={42}
                className="text-cyan-400"
              />

            </div>

          </div>

          {/* Requests */}
          <div className="bg-slate-900 border border-yellow-500/20 rounded-3xl p-6">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-slate-400">
                  Total Requests
                </p>

                <h2 className="text-2xl font-black mt-2 text-yellow-400">
                  {passes.length}
                </h2>

              </div>

              <Clock3
                size={42}
                className="text-yellow-400"
              />

            </div>

          </div>

          {/* Approved */}
          <div className="bg-slate-900 border border-green-500/20 rounded-3xl p-6">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-slate-400">
                  Approved Passes
                </p>

                <h2 className="text-2xl font-black mt-2 text-green-400">
                  {
                    passes.filter(
                      p => p.status === "approved"
                    ).length
                  }
                </h2>

              </div>

              <ShieldCheck
                size={42}
                className="text-green-400"
              />

            </div>

          </div>

        </div>

        {/* FORM */}
        <div className="bg-slate-900 border border-cyan-500/10 rounded-3xl p-8 mb-10 w-full max-w-4xl relative z-10">

          <h2 className="text-3xl font-black text-cyan-400 mb-8">
            Apply Outpass
          </h2>

          {/* Reason */}
          <div className="mb-6">

            <label className="block text-slate-300 mb-2">
              Reason
            </label>

            <div className="h-14 rounded-xl bg-slate-800 flex items-center px-4">

              <FileText
                size={20}
                className="text-slate-400"
              />

              <input
                type="text"
                placeholder="Enter Reason"
                value={reason}
                onChange={(e)=>
                  setReason(e.target.value)
                }
                className="bg-transparent outline-none px-3 flex-1 text-white"
              />

            </div>

          </div>

          {/* Dates */}
          <div className="grid md:grid-cols-2 gap-6">

            {/* From */}
            <div>

              <label className="block text-slate-300 mb-2">
                From Date
              </label>

              <div className="h-14 rounded-xl bg-slate-800 flex items-center px-4">

                <Calendar
                  size={20}
                  className="text-slate-400"
                />

                <input
                  type="date"
                  value={fromDate}
                  onChange={(e)=>
                    setFromDate(e.target.value)
                  }
                  className="bg-transparent outline-none px-3 flex-1 text-white"
                />

              </div>

            </div>

            {/* To */}
            <div>

              <label className="block text-slate-300 mb-2">
                To Date
              </label>

              <div className="h-14 rounded-xl bg-slate-800 flex items-center px-4">

                <Calendar
                  size={20}
                  className="text-slate-400"
                />

                <input
                  type="date"
                  value={toDate}
                  onChange={(e)=>
                    setToDate(e.target.value)
                  }
                  className="bg-transparent outline-none px-3 flex-1 text-white"
                />

              </div>

            </div>

          </div>

          {/* BUTTON */}
          <button
            onClick={applyOutpass}
            className="mt-8 px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-bold text-lg hover:opacity-90 transition flex items-center gap-3 cursor-pointer relative z-20"
          >

            <Send size={20} />

            Apply Outpass

          </button>

        </div>

        {/* PASSES */}
        <div>

          <h2 className="text-3xl font-black text-cyan-400 mb-6">
            My Passes
          </h2>

          <div className="grid lg:grid-cols-2 gap-6">

            {
              passes.map((pass)=>(

                <div
                  key={pass._id}
                  className="bg-slate-900 border border-cyan-500/10 rounded-3xl p-6"
                >

                  <div className="flex items-center justify-between">

                    <h3 className="text-2xl font-bold">
                      {pass.reason}
                    </h3>

                    {
                      pass.status === "pending" && (
                        <span className="px-4 py-2 rounded-xl bg-yellow-500/20 text-yellow-400 font-bold">
                          Pending
                        </span>
                      )
                    }

                    {
                      pass.status === "approved" && (
                        <span className="px-4 py-2 rounded-xl bg-green-500/20 text-green-400 font-bold">
                          Approved
                        </span>
                      )
                    }

                    {
                      pass.status === "rejected" && (
                        <span className="px-4 py-2 rounded-xl bg-red-500/20 text-red-400 font-bold">
                          Rejected
                        </span>
                      )
                    }

                  </div>

                  <p className="text-slate-400 mt-4">
                    {pass.fromDate} → {pass.toDate}
                  </p>

                  {/* QR */}
                  {
                    pass.status === "approved"
                    && pass.qrCode && (

                      <div className="mt-6 flex flex-col items-center">

                        <div className="bg-white p-4 rounded-2xl">

                          <QRCodeCanvas
                            value={pass.qrCode}
                            size={180}
                          />

                        </div>

                        <div className="flex items-center gap-2 mt-4 text-cyan-400">

                          <QrCode size={20} />

                          Valid QR Pass

                        </div>

                      </div>

                    )
                  }

                </div>

              ))
            }

          </div>

        </div>

      </div>

    </div>
  );
}