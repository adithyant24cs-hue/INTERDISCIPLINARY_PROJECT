import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../services/api";

import {
  ShieldCheck,
  CheckCircle,
  XCircle,
  Clock3,
  Users,
  UserPlus
} from "lucide-react";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from "recharts";

import Sidebar from "../components/Sidebar";

export default function WardenDashboard() {

  const [passes, setPasses] = useState([]);

  const [users, setUsers] = useState([]);

  // CREATE USER STATES
  const [studentId, setStudentId] = useState("");

  const [password, setPassword] = useState("");

  const [role, setRole] = useState("student");

  // FETCH PASSES
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

  // FETCH USERS
  const fetchUsers = async() => {

    try{

      const res = await api.get(
        "/users"
      );

      setUsers(res.data);

    }catch(err){

      console.log(err);

    }

  };

  useEffect(()=>{

    fetchPasses();

    fetchUsers();

  },[]);

  // APPROVE
  const approvePass = async(id) => {

    try{

      await api.put(
        `/outpass/approve/${id}`
      );

      fetchPasses();

    }catch(err){

      console.log(err);

    }

  };

  // REJECT
  const rejectPass = async(id) => {

    try{

      await api.put(
        `/outpass/reject/${id}`
      );

      fetchPasses();

    }catch(err){

      console.log(err);

    }

  };

  // CREATE USER
  const createUser = async() => {

    if(!studentId || !password){

      return alert("Fill all fields");

    }

    try{

      await api.post(
        "/users/create",
        {
          studentId,
          password,
          role
        }
      );

      toast.success("User Created");

      setStudentId("");
      setPassword("");

      fetchUsers();

    }catch(err){

      console.log(err);

      alert(
        err.response?.data?.message
      );

    }

  };

  // STATS
  const pendingCount =
    passes.filter(
      p => p.status === "pending"
    ).length;

  const approvedCount =
    passes.filter(
      p => p.status === "approved"
    ).length;

  const rejectedCount =
    passes.filter(
      p => p.status === "rejected"
    ).length;

  // CHART DATA
  const chartData = [

    {
      name:"Approved",
      value:approvedCount
    },

    {
      name:"Pending",
      value:pendingCount
    },

    {
      name:"Rejected",
      value:rejectedCount
    }

  ];

  // COLORS
  const COLORS = [
    "#22c55e",
    "#eab308",
    "#ef4444"
  ];

  return (
    <div className="min-h-screen bg-[#020817] text-white flex">

      {/* Sidebar */}
      <Sidebar role="warden" />

      {/* Main */}
      <div className="flex-1 p-8 overflow-y-auto">

        {/* Heading */}
        <div className="mb-10">

          <h1 className="text-4xl font-black text-cyan-400">
            Warden Dashboard
          </h1>

          <p className="text-slate-400 mt-2">
            Hostel Outpass Management
          </p>

        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-10">

          {/* Total */}
          <div className="bg-slate-900 border border-cyan-500/20 rounded-3xl p-6">

            <h3 className="text-slate-400">
              Total Requests
            </h3>

            <div className="flex items-center justify-between mt-4">

              <h2 className="text-3xl font-black text-cyan-400">
                {passes.length}
              </h2>

              <Users
                size={42}
                className="text-cyan-400"
              />

            </div>

          </div>

          {/* Pending */}
          <div className="bg-slate-900 border border-yellow-500/20 rounded-3xl p-6">

            <h3 className="text-slate-400">
              Pending
            </h3>

            <div className="flex items-center justify-between mt-4">

              <h2 className="text-3xl font-black text-yellow-400">
                {pendingCount}
              </h2>

              <Clock3
                size={42}
                className="text-yellow-400"
              />

            </div>

          </div>

          {/* Approved */}
          <div className="bg-slate-900 border border-green-500/20 rounded-3xl p-6">

            <h3 className="text-slate-400">
              Approved
            </h3>

            <div className="flex items-center justify-between mt-4">

              <h2 className="text-3xl font-black text-green-400">
                {approvedCount}
              </h2>

              <CheckCircle
                size={42}
                className="text-green-400"
              />

            </div>

          </div>

          {/* Rejected */}
          <div className="bg-slate-900 border border-red-500/20 rounded-3xl p-6">

            <h3 className="text-slate-400">
              Rejected
            </h3>

            <div className="flex items-center justify-between mt-4">

              <h2 className="text-3xl font-black text-red-400">
                {rejectedCount}
              </h2>

              <XCircle
                size={42}
                className="text-red-400"
              />

            </div>

          </div>

        </div>

        {/* Analytics */}
        <div className="bg-slate-900 border border-cyan-500/10 rounded-3xl p-8 mb-10">

          <h2 className="text-3xl font-black text-cyan-400 mb-8">
            Request Analytics
          </h2>

          <div className="grid lg:grid-cols-2 gap-10">

            {/* Chart */}
            <div className="h-[350px]">

              <ResponsiveContainer
                width="100%"
                height="100%"
              >

                <PieChart>

                  <Pie
                    data={chartData}
                    dataKey="value"
                    outerRadius={120}
                    label
                  >

                    {
                      chartData.map((entry,index)=>(

                        <Cell
                          key={index}
                          fill={COLORS[index]}
                        />

                      ))
                    }

                  </Pie>

                  <Tooltip />

                </PieChart>

              </ResponsiveContainer>

            </div>

            {/* Legend */}
            <div className="flex flex-col justify-center gap-6">

              {
                chartData.map((item,index)=>(

                  <div
                    key={index}
                    className="bg-slate-800 rounded-2xl p-5 flex items-center justify-between"
                  >

                    <div className="flex items-center gap-4">

                      <div
                        className="w-5 h-5 rounded-full"
                        style={{
                          background:COLORS[index]
                        }}
                      />

                      <h3 className="text-xl font-bold">
                        {item.name}
                      </h3>

                    </div>

                    <h2 className="text-2xl font-black">
                      {item.value}
                    </h2>

                  </div>

                ))
              }

            </div>

          </div>

        </div>

        {/* Create User */}
        <div className="bg-slate-900 border border-cyan-500/10 rounded-3xl p-8 mb-10">

          <div className="flex items-center gap-3 mb-8">

            <UserPlus className="text-cyan-400" />

            <h2 className="text-3xl font-black text-cyan-400">
              Create User
            </h2>

          </div>

          <div className="grid md:grid-cols-4 gap-4">

            {/* ID */}
            <input
              type="text"
              placeholder="User ID"
              value={studentId}
              onChange={(e)=>
                setStudentId(e.target.value)
              }
              className="h-14 rounded-2xl bg-slate-800 px-4 outline-none"
            />

            {/* Password */}
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e)=>
                setPassword(e.target.value)
              }
              className="h-14 rounded-2xl bg-slate-800 px-4 outline-none"
            />

            {/* Role */}
            <select
              value={role}
              onChange={(e)=>
                setRole(e.target.value)
              }
              className="h-14 rounded-2xl bg-slate-800 px-4 outline-none"
            >

              <option value="student">
                Student
              </option>

              <option value="security">
                Security
              </option>

            </select>

            {/* Button */}
            <button
              onClick={createUser}
              className="h-14 rounded-2xl bg-cyan-400 text-black font-bold hover:opacity-90 transition"
            >
              Create
            </button>

          </div>

        </div>

        {/* Users */}
        <div className="bg-slate-900 border border-cyan-500/10 rounded-3xl p-8 mb-10">

          <h2 className="text-3xl font-black text-cyan-400 mb-6">
            System Users
          </h2>

          <div className="space-y-4">

            {
              users.map((user)=>(

                <div
                  key={user._id}
                  className="bg-slate-800 rounded-2xl p-5 flex items-center justify-between"
                >

                  <div>

                    <h3 className="text-xl font-bold">
                      {user.studentId}
                    </h3>

                    <p className="text-slate-400 mt-1">
                      {user.role}
                    </p>

                  </div>

                </div>

              ))
            }

          </div>

        </div>

        {/* Requests */}
        <div>

          <h2 className="text-3xl font-black text-cyan-400 mb-6">
            Outpass Requests
          </h2>

          <div className="space-y-6">

            {
              passes.map((pass)=>(

                <div
                  key={pass._id}
                  className="bg-slate-900 border border-cyan-500/10 rounded-3xl p-6"
                >

                  <div className="flex items-center justify-between">

                    <div>

                      <h3 className="text-2xl font-bold text-cyan-400">
                        {pass.studentId}
                      </h3>

                      <p className="text-slate-400 mt-3">
                        {pass.reason}
                      </p>

                      <p className="mt-3 text-sm">
                        {pass.fromDate} → {pass.toDate}
                      </p>

                    </div>

                    <div>

                      {
                        pass.status === "pending" && (
                          <span className="px-5 py-3 rounded-2xl bg-yellow-500/20 text-yellow-400 font-bold">
                            Pending
                          </span>
                        )
                      }

                      {
                        pass.status === "approved" && (
                          <span className="px-5 py-3 rounded-2xl bg-green-500/20 text-green-400 font-bold">
                            Approved
                          </span>
                        )
                      }

                      {
                        pass.status === "rejected" && (
                          <span className="px-5 py-3 rounded-2xl bg-red-500/20 text-red-400 font-bold">
                            Rejected
                          </span>
                        )
                      }

                    </div>

                  </div>

                  {
                    pass.status === "pending" && (

                      <div className="flex gap-4 mt-6">

                        <button
                          onClick={()=>
                            approvePass(pass._id)
                          }
                          className="px-6 py-3 rounded-2xl bg-green-500 hover:bg-green-600 transition text-black font-bold"
                        >
                          Approve
                        </button>

                        <button
                          onClick={()=>
                            rejectPass(pass._id)
                          }
                          className="px-6 py-3 rounded-2xl bg-red-500 hover:bg-red-600 transition font-bold"
                        >
                          Reject
                        </button>

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