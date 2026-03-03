"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function BookedDetailPage() {
  const params = useParams();
  const id = params.id;

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [revoking, setRevoking] = useState<{ [ticketCode: string]: boolean }>({});
  const [revokeQty, setRevokeQty] = useState<{ [ticketCode: string]: number }>({});
  const [editQty, setEditQty] = useState<{ [ticketCode: string]: number }>({});
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (!id) return;
    const fetchBooked = async () => {
      try {
        const res = await fetch(`https://localhost:7117/api/v1/get-booked-ticket/${id}`);
        const result = await res.json();
        setData(result);
        document.title = `Booking Details - #${id.toString().toUpperCase()}`;
      } catch (error) {
        console.error("Error fetching detail:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBooked();
  }, [id]);

  /* REVOKE */
  const handleRevoke = async (ticketCode: string, qty: number) => {
    if (!id) return;
    if (!confirm(`Are you sure you want to revoke ${qty} ticket(s) for ${ticketCode}?`)) return;

    try {
      setRevoking(prev => ({ ...prev, [ticketCode]: true }));
      const res = await fetch(
        `https://localhost:7117/api/v1/revoke-ticket/${id}/${ticketCode}/${qty}`,
        { method: "DELETE" }
      );

      const result = await res.json();
      if (!res.ok) {
        alert(result.detail || "Failed to revoke ticket");
        return;
      }

      alert("Ticket revoked successfully!");
      const refreshed = await fetch(`https://localhost:7117/api/v1/get-booked-ticket/${id}`);
      setData(await refreshed.json());
    } catch (error) {
      console.error(error);
      alert("Something went wrong while revoking ticket.");
    } finally {
      setRevoking(prev => ({ ...prev, [ticketCode]: false }));
    }
  };

  /* EDIT */
  const handleEdit = async (ticketCode: string) => {
    if (!id) return;
    const newQty = editQty[ticketCode];
    if (!newQty || newQty < 1) {
      alert("Quantity must be at least 1");
      return;
    }

    try {
      setUpdating(true);
      const res = await fetch(
        `https://localhost:7117/api/v1/edit-booked-ticket/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            items: [{ ticketCode: ticketCode, quantity: newQty }]
          })
        }
      );

      const result = await res.json();
      if (!res.ok) {
        alert(result.detail || "Failed to update ticket");
        return;
      }

      alert("Ticket updated successfully!");
      const refreshed = await fetch(`https://localhost:7117/api/v1/get-booked-ticket/${id}`);
      setData(await refreshed.json());
    } catch (err) {
      console.error(err);
      alert("Something went wrong while updating ticket.");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", fontFamily: "Poppins" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ border: "4px solid #f3f3f3", borderTop: "4px solid #4f46e5", borderRadius: "50%", width: "40px", height: "40px", animation: "spin 1s linear infinite", margin: "0 auto 20px" }} />
        <p style={{ color: "#4f46e5", fontWeight: "600" }}>Fetching your order...</p>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }` }} />
    </div>
  );

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700;800&display=swap');
        body { background: #f0f4ff; margin: 0; padding: 0; }
        @media print { .no-print { display: none; } body { background: white; } }
      ` }} />

      <div style={{ fontFamily: "'Poppins', sans-serif", minHeight: "100vh", paddingBottom: "50px" }}>
        
        {/* Header Section */}
        <div style={{ 
          background: "linear-gradient(135deg, #1e1b4b 0%, #4338ca 100%)", 
          padding: "80px 20px 150px", textAlign: "center", color: "white", position: "relative"
        }}>
          <div style={{ fontSize: "50px", marginBottom: "10px" }}>✅</div>
          <h1 style={{ fontSize: "32px", fontWeight: "800", margin: "0", letterSpacing: "-1px" }}>You're All Set!</h1>
          <p style={{ opacity: 0.8, fontWeight: "300", maxWidth: "500px", margin: "10px auto" }}>We recommend saving your booking ID for reference.</p>
        </div>

        {/* Main Content */}
        <div style={{ maxWidth: "700px", margin: "-100px auto 0", padding: "0 20px" }}>
          <div style={{ 
            background: "white", borderRadius: "32px", overflow: "hidden",
            boxShadow: "0 20px 40px rgba(0,0,0,0.08)", position: "relative"
          }}>
            
            {/* Booking Info */}
            <div style={{ padding: "40px", borderBottom: "2px dashed #e2e8f0", textAlign: "center" }}>
              <span style={{ color: "#818cf8", fontSize: "12px", fontWeight: "700", letterSpacing: "2px", textTransform: "uppercase" }}>Booking Reference</span>
              <h2 style={{ fontSize: "28px", color: "#1e1b4b", margin: "8px 0", fontFamily: "monospace" }}>#{id?.toString().toUpperCase()}</h2>
              <div style={{ display: "inline-flex", alignItems: "center", background: "#dcfce7", color: "#15803d", padding: "6px 16px", borderRadius: "50px", fontSize: "12px", fontWeight: "700", marginTop: "10px" }}>
                <span style={{ width: "8px", height: "8px", background: "#22c55e", borderRadius: "50%", marginRight: "8px" }}></span>
                CONFIRMED
              </div>
            </div>

            {/* Ticket Items */}
            <div style={{ padding: "40px" }}>
              <h3 style={{ fontSize: "13px", color: "#94a3b8", fontWeight: "700", marginBottom: "20px", textTransform: "uppercase", letterSpacing: "1px" }}>Order Summary</h3>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {Array.isArray(data) && data.map((category: any, idx: number) => (
                  <div key={idx} style={{ border: "1px solid #f1f5f9", borderRadius: "24px", padding: "24px", background: "#eeefef" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                      <h4 style={{ margin: 0, color: "#4f46e5", fontSize: "18px", fontWeight: "700" }}>{category.categoryName}</h4>
                      <div style={{ background: "#4f46e5", color: "white", padding: "4px 12px", borderRadius: "10px", fontSize: "12px", fontWeight: "600" }}>
                        {category.qtyPerCategory} Ticket(s)
                      </div>
                    </div>
                    
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                      {category.tickets.map((ticket: any, tIdx: number) => (
                        <div key={tIdx} style={{ 
                          background: "white", borderRadius: "20px", border: "1px solid #eef2ff", overflow: "hidden"
                        }}>
                          <div style={{ padding: "20px", display: "flex", justifyContent: "space-between", alignItems: "start" }}>
                            <div>
                              <p style={{ margin: 0, fontWeight: "700", fontSize: "15px", color: "#1e1b4b" }}>{ticket.ticketName}</p>
                              <p style={{ margin: "4px 0 0 0", fontSize: "12px", color: "#64748b", fontFamily: "monospace" }}>Code: {ticket.ticketCode}</p>
                            </div>
                            <div style={{ textAlign: "right" }}>
                              <p style={{ margin: 0, fontSize: "11px", color: "#94a3b8", fontWeight: "700" }}>EVENT DATE</p>
                              <p style={{ margin: 0, fontSize: "13px", color: "#1e1b4b", fontWeight: "600" }}>{ticket.eventDate}</p>
                            </div>
                          </div>

                          {/* ACTION SECTION (REVOKE & UPDATE) */}
                          <div className="no-print" style={{ padding: "0 20px 20px", display: "flex", flexDirection: "column", gap: "10px" }}>
                            
                            {/* UPDATE SUB-SECTION */}
                            <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px", background: "#f0f7ff", borderRadius: "14px", border: "1px solid #d0e7ff" }}>
                              <span style={{ fontSize: "11px", fontWeight: "800", color: "#2563eb", flex: 1 }}>TOTAL TICKETS</span>
                              <input 
                                type="number" 
                                min={1} 
                                max={category.qtyPerCategory + (ticket.remainingQuota || 0)} 
                                value={editQty[ticket.ticketCode] ?? ticket.quantity} 
                                onChange={(e) => setEditQty(prev => ({ ...prev, [ticket.ticketCode]: Number(e.target.value) }))}
                                style={{ width: "60px", padding: "6px", borderRadius: "8px", border: "1px solid #a5b4fc", textAlign: "center", fontWeight: "600", outline: "none" }}
                              />
                              <button 
                                onClick={() => handleEdit(ticket.ticketCode)}
                                disabled={updating}
                                style={{ padding: "7px 15px", background: "#2563eb", color: "white", border: "none", borderRadius: "10px", cursor: "pointer", fontSize: "12px", fontWeight: "700" }}
                              >
                                {updating ? "..." : "Update"}
                              </button>
                            </div>

                            {/* REVOKE SUB-SECTION */}
                            <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px", background: "#fff1f2", borderRadius: "14px", border: "1px solid #ffe4e6" }}>
                              <span style={{ fontSize: "11px", fontWeight: "800", color: "#e11d48", flex: 1 }}>REVOKE QTY</span>
                              <input 
                                type="number" 
                                min={1} 
                                max={category.qtyPerCategory} 
                                value={revokeQty[ticket.ticketCode] ?? 1} 
                                onChange={(e) => setRevokeQty(prev => ({ ...prev, [ticket.ticketCode]: Number(e.target.value) }))}
                                style={{ width: "60px", padding: "6px", borderRadius: "8px", border: "1px solid #fecaca", textAlign: "center", fontWeight: "600", outline: "none" }}
                              />
                              <button 
                                onClick={() => handleRevoke(ticket.ticketCode, revokeQty[ticket.ticketCode] ?? 1)}
                                disabled={revoking[ticket.ticketCode]}
                                style={{ padding: "7px 15px", background: "#e11d48", color: "white", border: "none", borderRadius: "10px", cursor: "pointer", fontSize: "12px", fontWeight: "700" }}
                              >
                                {revoking[ticket.ticketCode] ? "..." : "Revoke"}
                              </button>
                            </div>

                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ position: "absolute", left: "-15px", top: "125px", width: "30px", height: "30px", borderRadius: "50%", background: "#f0f4ff", boxShadow: "inset -5px 0 5px rgba(0,0,0,0.02)" }} />
            <div style={{ position: "absolute", right: "-15px", top: "125px", width: "30px", height: "30px", borderRadius: "50%", background: "#f0f4ff", boxShadow: "inset 5px 0 5px rgba(0,0,0,0.02)" }} />

            <div style={{ padding: "0 40px 40px", textAlign: "center" }}>
              <p style={{ fontSize: "12px", color: "#94a3b8", margin: 0 }}>Please have a valid ID ready and show this digital confirmation.</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="no-print" style={{ marginTop: "30px", display: "flex", gap: "15px" }}>
            <button 
              onClick={() => window.print()}
              style={{ 
                flex: 1, padding: "16px", background: "white", color: "#1e1b4b", 
                border: "2px solid #e2e8f0", borderRadius: "18px", fontWeight: "700", 
                cursor: "pointer", transition: "all 0.2s", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px"
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
              Print Details
            </button>
            <Link href="/" style={{ flex: 1, textDecoration: "none" }}>
              <button style={{ 
                width: "100%", padding: "16px", background: "#4f46e5", color: "white", 
                border: "none", borderRadius: "18px", fontWeight: "700", cursor: "pointer",
                boxShadow: "0 10px 20px -5px rgba(79, 70, 229, 0.4)", transition: "transform 0.2s"
              }}>
                Return to Home
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}