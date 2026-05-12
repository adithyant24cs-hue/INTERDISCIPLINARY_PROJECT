import { useEffect, useState } from "react";

import {
  ShieldCheck,
  QrCode,
  CheckCircle,
  XCircle,
  ScanLine,
  History
} from "lucide-react";

import { Html5QrcodeScanner } from "html5-qrcode";

import Sidebar from "../components/Sidebar";

import api from "../services/api";

export default function SecurityDashboard() {

  const [scanResult, setScanResult] = useState(null);

  const [valid, setValid] = useState(null);

  const [logs, setLogs] = useState([]);

  // FETCH LOGS
  const fetchLogs = async() => {

    try{

      const res = await api.get(
        "/outpass/logs"
      );

      setLogs(res.data);

    }catch(err){

      console.log(err);

    }

  };

  // QR SCANNER
  useEffect(() => {

    fetchLogs();

    const scanner = new Html5QrcodeScanner(
      "reader",
      {
        qrbox:{
          width:250,
          height:250
        },
        fps:5
      },
      false
    );

    scanner.render(

      async(result)=>{

        try{

          setScanResult(result);

          const res = await api.post(
            "/outpass/verify",
            {
              qrData:result
            }
          );

          setValid(res.data.pass);

          fetchLogs();

        }catch(err){

          console.log(err);

          setValid(false);

        }

      },

      (err)=>{
        console.log(err);
      }

    );

    return () => {
      scanner.clear();
    };

  },[]);

  return (
    <div className="min-h-screen bg-[#020817] text-white flex">

      {/* Sidebar */}
      <Sidebar role="security" />

      {/* Main */}
      <div className="flex-1 p-8">

        {/* Heading */}
        <div className="mb-10">

          <h1 className="text-4xl font-black text-cyan-400">
            Security Dashboard
          </h1>

          <p className="text-slate-400 mt-2">
            QR Verification Portal
          </p>

        </div>

        {/* Top Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-10">

          {/* Scanner */}
          <div className="bg-slate-900 border border-cyan-500/20 rounded-3xl p-6">

            <h3 className="text-slate-400">
              Scanner
            </h3>

            <div className="flex items-center justify-between mt-4">

              <h2 className="text-3xl font-black text-cyan-400">
                Active
              </h2>

              <QrCode
                size={42}
                className="text-cyan-400"
              />

            </div>

          </div>

          {/* Verification */}
          <div className="bg-slate-900 border border-green-500/20 rounded-3xl p-6">

            <h3 className="text-slate-400">
              Verification
            </h3>

            <div className="flex items-center justify-between mt-4">

              <h2 className="text-3xl font-black text-green-400">
                Live
              </h2>

              <ShieldCheck
                size={42}
                className="text-green-400"
              />

            </div>

          </div>

          {/* Last Scan */}
          <div className="bg-slate-900 border border-yellow-500/20 rounded-3xl p-6">

            <h3 className="text-slate-400">
              Last Scan
            </h3>

            <div className="flex items-center justify-between mt-4">

              <h2 className="text-3xl font-black text-yellow-400">
                {
                  scanResult
                  ? "Detected"
                  : "Waiting"
                }
              </h2>

              <ScanLine
                size={42}
                className="text-yellow-400"
              />

            </div>

          </div>

          {/* Logs */}
          <div className="bg-slate-900 border border-purple-500/20 rounded-3xl p-6">

            <h3 className="text-slate-400">
              Total Logs
            </h3>

            <div className="flex items-center justify-between mt-4">

              <h2 className="text-3xl font-black text-purple-400">
                {logs.length}
              </h2>

              <History
                size={42}
                className="text-purple-400"
              />

            </div>

          </div>

        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-2 gap-8">

          {/* Scanner */}
          <div className="bg-slate-900 border border-cyan-500/10 rounded-3xl p-8">

            <h2 className="text-3xl font-black text-cyan-400 mb-6">
              Scan Student QR
            </h2>

            <div
              id="reader"
              className="overflow-hidden rounded-2xl"
            />

          </div>

          {/* Result */}
          <div className="bg-slate-900 border border-cyan-500/10 rounded-3xl p-8">

            <h2 className="text-3xl font-black text-cyan-400 mb-6">
              Verification Result
            </h2>

            {
              valid === null && (

                <div className="h-[350px] flex items-center justify-center text-slate-500">

                  Waiting For QR Scan...

                </div>

              )
            }

            {
              valid === false && (

                <div className="h-[350px] flex flex-col items-center justify-center">

                  <XCircle
                    size={90}
                    className="text-red-500"
                  />

                  <h2 className="text-4xl font-black text-red-500 mt-6">
                    Invalid Pass
                  </h2>

                </div>

              )
            }

            {
              valid && (

                <div className="flex flex-col items-center">

                  <CheckCircle
                    size={90}
                    className="text-green-500"
                  />

                  <h2 className="text-4xl font-black text-green-400 mt-6">
                    Pass Verified
                  </h2>

                  <div className="mt-8 w-full space-y-4">

                    <div className="bg-slate-800 rounded-2xl p-5">

                      <p className="text-slate-400">
                        Student ID
                      </p>

                      <h3 className="text-2xl font-bold mt-2">
                        {valid.studentId}
                      </h3>

                    </div>

                    <div className="bg-slate-800 rounded-2xl p-5">

                      <p className="text-slate-400">
                        Reason
                      </p>

                      <h3 className="text-2xl font-bold mt-2">
                        {valid.reason}
                      </h3>

                    </div>

                  </div>

                </div>

              )
            }

          </div>

        </div>

        {/* Logs */}
        <div className="mt-10">

          <h2 className="text-3xl font-black text-cyan-400 mb-6">
            Scan History
          </h2>

          <div className="space-y-4">

            {
              logs.map((log)=>(

                <div
                  key={log._id}
                  className="bg-slate-900 border border-cyan-500/10 rounded-2xl p-5 flex items-center justify-between"
                >

                  <div>

                    <h3 className="text-xl font-bold">
                      {log.studentId}
                    </h3>

                    <p className="text-slate-400 mt-1">
                      {log.reason}
                    </p>

                  </div>

                  <div className="text-right">

                    <p className="text-cyan-400 font-bold">
                      {new Date(
                        log.scannedAt
                      ).toLocaleString()}
                    </p>

                  </div>

                </div>

              ))
            }

          </div>

        </div>

      </div>

    </div>
  );
}