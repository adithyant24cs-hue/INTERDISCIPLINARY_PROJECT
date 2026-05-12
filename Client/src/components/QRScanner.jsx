import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect } from "react";

export default function QRScanner() {

  useEffect(() => {

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

    scanner.render(success, error);

    function success(result){
      alert("QR Scanned: " + result);
    }

    function error(err){
      console.log(err);
    }

    return () => {
      scanner.clear();
    };

  }, []);

  return (
    <div
      id="reader"
      className="bg-slate-900 p-4 rounded-xl"
    />
  );
}