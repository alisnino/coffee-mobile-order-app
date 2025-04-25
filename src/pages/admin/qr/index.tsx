import React from "react";
import QRCode from "react-qr-code";

const QRCodePage: React.FC = () => {
  const url = `https://${import.meta.env.VITE_DEV_NGROK_URL}`;
  console.log(url);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "white",
        padding: "20px",
      }}
    >
      <QRCode
        value={url}
        size={256}
        style={{
          padding: "20px",
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      />
    </div>
  );
};

export default QRCodePage;
