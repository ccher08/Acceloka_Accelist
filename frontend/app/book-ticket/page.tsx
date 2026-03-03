"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function BookingPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const ticketCode = searchParams.get("code");

  const [ticket, setTicket] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<any>(null);

  useEffect(() => {
    if (!ticketCode) return;
    const fetchTicket = async () => {
      try {
        const res = await fetch(`https://localhost:7117/api/v1/get-available-ticket?TicketCode=${ticketCode}`);
        const data = await res.json();
        if (Array.isArray(data)) setTicket(data[0]);
        else if (data.tickets) setTicket(data.tickets[0]);
        else setTicket(data);
      } catch (error) { console.error("Error fetching ticket:", error); }
    };
    fetchTicket();
  }, [ticketCode]);

  const subtotal = ticket ? ticket.price * quantity : 0;

  const handleBooking = async () => {
  if (!ticketCode) return;

  try {
    setLoading(true);
    setError(null);

    const res = await fetch(`https://localhost:7117/api/v1/book-ticket`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: [{ ticketCode, quantity }]
      }),
    });

    const data = await res.json();

    
    console.log("BOOKING RESPONSE:", data);

    if (!res.ok) {
      setError(data.detail || "Booking failed");
      return;
    }

    setSuccess(data);
    localStorage.setItem("lastBookedTicketId", data.bookedTicketGroupId);

  } catch {
    setError("Something went wrong.");
  } finally {
    setLoading(false);
  }
};

  
  const labelStyle: React.CSSProperties = { fontSize: "11px", fontWeight: "700", color: "#818cf8", letterSpacing: "1px", marginBottom: "8px", display: "block" };
  const inputStyle: React.CSSProperties = { border: "1px solid #e0e7ff", background: "#f5f7ff", padding: "14px", borderRadius: "12px", outline: "none", fontSize: "16px", width: "100%", fontFamily: "inherit", color: "#1e1b4b" };

  if (ticket === null) return (
    <div style={{ textAlign: "center", padding: "100px", fontFamily: "Poppins", color: "#4f46e5" }}>
      <div className="spinner"></div>
      <p>Fetching ticket details...</p>
    </div>
  );

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;800&display=swap');
        body { background: #f8faff; margin: 0; }
      ` }} />

      <div style={{ fontFamily: "'Poppins', sans-serif", minHeight: "100vh", color: "#1e1b4b" }}>
        
        {/* Header Section */}
        <div style={{ 
          background: "radial-gradient(circle at top left, #4f46e5, #1e1b4b)", 
          padding: "100px 20px 140px", textAlign: "center", color: "white", position: "relative", overflow: "hidden"
        }}>

          <div style={{ position: 'absolute', width: '300px', height: '300px', background: 'rgba(99, 102, 241, 0.3)', filter: 'blur(100px)', borderRadius: '50%', top: '-50px', right: '-50px' }} />

          {/* Floating Back Button */}
                    <Link href="/available-ticket" style={{ textDecoration: "none" }}>
                        <div 
                            style={{
                                position: "absolute",
                                top: "30px",
                                left: "30px",
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                                background: "rgba(255, 255, 255, 0.15)",
                                backdropFilter: "blur(10px)",
                                padding: "10px 20px",
                                borderRadius: "30px",
                                color: "white",
                                fontSize: "14px",
                                fontWeight: "600",
                                border: "1px solid rgba(255, 255, 255, 0.3)",
                                transition: "all 0.3s ease",
                                cursor: "pointer",
                                zIndex: 10
                            }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.background = "rgba(255, 255, 255, 0.3)";
                                e.currentTarget.style.transform = "translateX(-5px)";
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.background = "rgba(255, 255, 255, 0.15)";
                                e.currentTarget.style.transform = "translateX(0)";
                            }}
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M19 12H5M12 19l-7-7 7-7"/>
                            </svg>
                            Back
                        </div>
                    </Link>

          <h1 style={{ fontSize: "48px", fontWeight: "800", marginBottom: "12px", letterSpacing: "-1px" }}>
             <span style={{ color: "#c7d2fe" }}>Almost There...</span>
          </h1>
          <p style={{ fontSize: "18px", opacity: 0.8, fontWeight: "300" }}>Make sure everything looks right before you proceed.</p>
        </div>

        {/* Checkout Card */}
        <div style={{ maxWidth: "700px", margin: "-80px auto 40px", padding: "0 20px", position: "relative", zIndex: 5 }}>
          <div style={{ 
            background: "white", borderRadius: "28px", 
            padding: "40px", boxShadow: "0 25px 50px -12px rgba(30, 27, 75, 0.15)", border: "1px solid #eef2ff"
          }}>
            
            {/* Ticket Info Section */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "30px", borderBottom: "1px solid #f1f5f9", paddingBottom: "25px" }}>
              <div>
                <span style={{ fontSize: "10px", fontWeight: "700", background: "#ebedf6", color: "#4f46e5", padding: "5px 12px", borderRadius: "20px", textTransform: "uppercase" }}>
                  {ticket.categoryName}
                </span>
                <h2 style={{ fontSize: "26px", fontWeight: "700", marginTop: "12px", color: "#1e1b4b" }}>{ticket.ticketName}</h2>
                <p style={{ fontSize: "14px", color: "#64748b", marginTop: "5px" }}>📅 {new Date(ticket.eventDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
              </div>
              <div style={{ textAlign: "right" }}>
                <p style={labelStyle}>TICKET CODE</p>
                <p style={{ fontWeight: "600", color: "#4f46e5", fontSize: "18px" }}>#{ticket.ticketCode}</p>
              </div>
            </div>

            {/* Form Section */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "25px", marginBottom: "30px" }}>
              <div>
                <label style={labelStyle}>QUANTITY</label>
                <input 
                  type="number" min={1} max={ticket.remainingQuota} value={quantity} 
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  style={inputStyle}
                />
                <p style={{ fontSize: "12px", color: "#94a3b8", marginTop: "8px" }}>Available Quota: <strong>{ticket.remainingQuota}</strong></p>
              </div>
              <div>
                <label style={labelStyle}>PRICE PER UNIT</label>
                <div style={{ ...inputStyle, background: "#f8faff", color: "#4f46e5", fontWeight: "600", border: "1px dashed #c7d2fe" }}>
                  Rp {Number(ticket.price).toLocaleString("id-ID")}
                </div>
              </div>
            </div>

            
            <div style={{ background: "linear-gradient(to right, #f5f7ff, #eef2ff)", borderRadius: "20px", padding: "30px", marginBottom: "30px", border: "1px solid #e0e7ff" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontWeight: "600", color: "#64748b" }}>Order Total</span>
                <span style={{ fontSize: "29px", fontWeight: "700", color: "#4f46e5" }}>
                  <span style={{ fontSize: "16px" }}>Rp</span> {subtotal.toLocaleString("id-ID")}
                </span>
              </div>
            </div>

            
            {error && (
              <div style={{ background: "#fff1f2", color: "#e11d48", padding: "15px", borderRadius: "12px", marginBottom: "20px", fontSize: "14px", textAlign: "center", border: "1px solid #ffe4e6", fontWeight: "600" }}>
                ⚠️ {error}
              </div>
            )}

            {success && (
              <div style={{ background: "#f0fdf4", color: "#16a34a", padding: "25px", borderRadius: "16px", marginBottom: "20px", border: "1px solid #dcfce7", textAlign: "center" }}>
                <div style={{ fontSize: "40px", marginBottom: "10px" }}>✨</div>
                <h4 style={{ margin: "0 0 5px 0", fontSize: "20px" }}>Booking Successful.</h4>
                <p style={{ fontSize: "14px", opacity: 0.8 }}>Get ready for an unforgettable experience!</p>
              </div>
            )}

            
            {!success ? (
              <button
                onClick={handleBooking} disabled={loading}
                style={{
                  width: "100%", padding: "20px", background: "#4f46e5",
                  color: "white", border: "none", borderRadius: "18px", fontWeight: "600", fontSize: "17px",
                  cursor: "pointer", transition: "all 0.3s ease", boxShadow: "0 10px 20px -5px rgba(79, 70, 229, 0.4)"
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = "#4338ca";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = "#4f46e5";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                {loading ? "Processing..." : "Confirm Booking"}
              </button>
            ) : (
              <button 
                onClick={() => router.push(`/booked/${success.bookedTicketGroupId}`)}
                style={{ width: "100%", padding: "18px", background: "#35306d", color: "white", border: "none", borderRadius: "18px", fontWeight: "600", cursor: "pointer", fontSize: "16px" }}
              >
                View Booked Tickets
              </button>
            )}

          </div>
        </div>
      </div>
    </>
  );
}