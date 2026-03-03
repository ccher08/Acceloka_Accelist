"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const goToBookingHistory = () => {
    const lastId = localStorage.getItem("lastBookedTicketId");
    if (lastId) {
      router.push(`/booked/${lastId}`);
    } else {
      alert("No recent booking found.");
    }
  };

  return (

    <>
      {/* Import Font Poppins via Google Fonts */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;800&display=swap');
      `}} />
    
      <div
        style={{
          minHeight: "100vh",
          background: "radial-gradient(circle at top left, #4f46e5, #1e1b4b)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
          fontFamily: "'Inter', system-ui, sans-serif",
        }}
      >
        {/* Glow Effect Decorator */}
        <div style={{
          position: 'absolute',
          width: '300px',
          height: '300px',
          background: 'rgba(79, 70, 229, 0.4)',
          filter: 'blur(100px)',
          borderRadius: '50%',
          top: '10%',
          left: '10%'
        }} />

        <div
          style={{
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(10px)",
            padding: "60px 40px",
            borderRadius: "24px",
            width: "100%",
            maxWidth: "540px",
            textAlign: "center",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
            position: "relative",
            zIndex: 1,
            border: "1px solid rgba(255, 255, 255, 0.3)",
          }}
        >
          

          <h1 style={{ 
            fontSize: "42px", 
            fontWeight: "800", 
            color: "#3e4b81", 
            letterSpacing: "-1px",
            marginBottom: "8px" 
          }}>
            Acceloka
          </h1>

          <p style={{ 
            color: "#6b7280", 
            fontSize: "18px",
            lineHeight: "1.6",
            marginBottom: "40px",
            maxWidth: "90%",
            marginRight: "auto",
            marginLeft: "auto"
          }}>
            Explore the world and book your favorite events in just a few clicks.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <Link href="/available-ticket" style={{ textDecoration: 'none' }}>
              <button
                style={{
                  width: "100%",
                  padding: "18px",
                  backgroundColor: "#4f46e5",
                  color: "white",
                  border: "none",
                  borderRadius: "16px",
                  cursor: "pointer",
                  fontWeight: "600",
                  fontSize: "17px",
                  fontFamily: "'Poppins', sans-serif",
                  position: "relative",
                  overflow: "hidden",
                  transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                  boxShadow: "0 10px 20px -5px rgba(79, 70, 229, 0.4)",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px) scale(1.02)";
                  e.currentTarget.style.backgroundColor = "#4338ca";
                  e.currentTarget.style.boxShadow = "0 20px 30px -5px rgba(79, 70, 229, 0.6)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0) scale(1)";
                  e.currentTarget.style.backgroundColor = "#4f46e5";
                  e.currentTarget.style.boxShadow = "0 10px 20px -5px rgba(79, 70, 229, 0.4)";
                }}
              >
                View Available Tickets
              </button>
            </Link>

            <button
              onClick={goToBookingHistory}
              style={{
                width: "100%",
                padding: "18px",
                backgroundColor: "#4f46e5",
                color: "white",
                border: "none",
                borderRadius: "16px",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "17px",
                fontFamily: "'Poppins', sans-serif",
                position: "relative",
                overflow: "hidden",
                transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                boxShadow: "0 10px 20px -5px rgba(79, 70, 229, 0.4)",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-8px) scale(1.02)";
                e.currentTarget.style.backgroundColor = "#4338ca";
                e.currentTarget.style.boxShadow = "0 20px 30px -5px rgba(79, 70, 229, 0.6)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0) scale(1)";
                e.currentTarget.style.backgroundColor = "#4f46e5";
                e.currentTarget.style.boxShadow = "0 10px 20px -5px rgba(79, 70, 229, 0.4)";
              }}
            >
              Booking History
            </button>
          </div>

          <div style={{ marginTop: "32px", borderTop: "1px solid #f3f4f6", paddingTop: "24px" }}>
            <p style={{ fontSize: "14px", color: "#9ca3af" }}>
              Trusted by travelers worldwide
            </p>
          </div>
        </div>
      </div>
    </>
  );
}