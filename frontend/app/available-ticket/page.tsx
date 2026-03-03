"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function AvailableTicketPage() {
    const [Tickets, setTickets] = useState<any[]>([]);
    const [CategoryName, setCategoryName] = useState("");
    const [TicketCode, setTicketCode] = useState("");
    const [TicketName, setTicketName] = useState("");
    const [Price, setPrice] = useState("");
    const [EventDateStart, setDateStart] = useState("");
    const [EventDateEnd, setDateEnd] = useState("");
    const [OrderBy, setOrderBy] = useState("TicketCode");
    const [OrderState, setOrderState] = useState("asc");

    const fetchTickets = async () => {
        try {
            const query = new URLSearchParams();
            if (CategoryName) query.append("CategoryName", CategoryName);
            if (TicketCode) query.append("TicketCode", TicketCode);
            if (TicketName) query.append("TicketName", TicketName);
            if (Price) query.append("Price", Price);
            if (EventDateStart) query.append("EventDateStart", EventDateStart);
            if (EventDateEnd) query.append("EventDateEnd", EventDateEnd);
            query.append("OrderBy", OrderBy);
            query.append("OrderState", OrderState);
            query.append("Page", page.toString());
            
            const res = await fetch(`https://localhost:7117/api/v1/get-available-ticket?${query.toString()}`);
            const data = await res.json();
            setTickets(data.tickets ?? data);
        } catch (error) {
            console.error("Error fetching tickets:", error);
        }
    };

    const labelStyle: React.CSSProperties = { fontSize: "11px", fontWeight: "700", color: "#94a3b8", letterSpacing: "1px", marginBottom: "8px", display: "block" };
    const inputStyle: React.CSSProperties = { border: "1px solid #e2e8f0", background: "#f8fafc", padding: "12px", borderRadius: "12px", outline: "none", fontSize: "14px", width: "100%" };
    const navButtonStyle: React.CSSProperties = {
        display: "inline-flex", // Mencegah tombol melar selebar layar
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
        width: "fit-content",
    };

    const [isAsc, setIsAsc] = useState(OrderState === "asc");

    const toggleOrder = () => {
        const newState = isAsc ? "desc" : "asc";
        setIsAsc(!isAsc);
        setOrderState(newState);
        
        setTimeout(() => fetchTickets(), 0); 
    };

    const [page, setPage] = useState(1);


    useEffect(() => { fetchTickets(); }, []);
    useEffect(() => { fetchTickets(); }, [page]);

    return (
        <>
            {/* Import Font */}
            <style dangerouslySetInnerHTML={{ __html: `
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;800&display=swap');
            `}} />

            <div style={{ 
                fontFamily: "'Poppins', sans-serif", 
                minHeight: "100vh", 
                background: "#f8fafc", 
                color: "#1e293b" 
            }}>
                {/* --- Header --- */}
                <div style={{ 
                    background: "linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%)", 
                    padding: "80px 20px 100px", 
                    textAlign: "center", 
                    color: "white",
                    position: "relative",
                    overflow: "hidden"
                }}>
                    {/* Floating Back Button */}
                    <Link href="/" style={{ textDecoration: "none" }}>
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
                            Home
                        </div>
                    </Link>

                    <h1 style={{ 
                        fontSize: "48px", 
                        fontWeight: "800", 
                        marginBottom: "12px",
                        letterSpacing: "-2px",
                        textShadow: "0 4px 12px rgba(0,0,0,0.1)"
                    }}>
                        Where to <span style={{ color: "#86c3ff" }}>Next?</span>
                    </h1>
                    
                    <p style={{ 
                        fontSize: "18px", 
                        opacity: 0.9, 
                        maxWidth: "550px", 
                        margin: "0 auto",
                        lineHeight: "1.6",
                        fontWeight: "300"
                    }}>
                        Find the best events, hotels, and travel deals. <br/> 
                        <strong>Secure your booking now!</strong>
                    </p>
                </div>

                {/* --- CONTENT SECTION --- */}
                <div style={{ maxWidth: "1100px", margin: "-50px auto 40px", padding: "0 20px", position: "relative", zIndex: 5 }}>
                    
                    {/* Filter Card */}
                    <div style={{ 
                        background: "rgba(255, 255, 255, 0.95)", 
                        backdropFilter: "blur(20px)", 
                        borderRadius: "24px", 
                        padding: "35px", 
                        boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                        border: "1px solid rgba(255,255,255,0.7)"
                    }}>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "20px" }}>
                            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                <label style={{ fontSize: "11px", fontWeight: "700", color: "#94a3b8", letterSpacing: "1px" }}>CATEGORY</label>
                                <input 
                                    style={{ border: "1px solid #e2e8f0", background: "#f8fafc", padding: "12px", borderRadius: "12px", outline: "none", fontSize: "14px" }} 
                                    placeholder="Ex: Hotel" 
                                    value={CategoryName} 
                                    onChange={(e) => setCategoryName(e.target.value)} 
                                />
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                <label style={{ fontSize: "11px", fontWeight: "700", color: "#94a3b8", letterSpacing: "1px" }}>TICKET NAME</label>
                                <input 
                                    style={{ border: "1px solid #e2e8f0", background: "#f8fafc", padding: "12px", borderRadius: "12px", outline: "none", fontSize: "14px" }} 
                                    placeholder="Search event name" 
                                    value={TicketName} 
                                    onChange={(e) => setTicketName(e.target.value)} 
                                />
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                <label style={{ fontSize: "11px", fontWeight: "700", color: "#94a3b8", letterSpacing: "1px" }}>MAX PRICE</label>
                                <input 
                                    type="number" 
                                    style={{ border: "1px solid #e2e8f0", background: "#f8fafc", padding: "12px", borderRadius: "12px", outline: "none", fontSize: "14px" }} 
                                    placeholder="Rp" 
                                    value={Price} 
                                    onChange={(e) => setPrice(e.target.value)} 
                                />
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                <label style={{ fontSize: "11px", fontWeight: "700", color: "#94a3b8", letterSpacing: "1px" }}>ORDER BY</label>
                                <select 
                                    style={{ border: "1px solid #e2e8f0", background: "#f8fafc", padding: "12px", borderRadius: "12px", outline: "none", fontSize: "14px", cursor: "pointer" }} 
                                    value={OrderBy} 
                                    onChange={(e) => setOrderBy(e.target.value)}
                                >
                                    <option value="TicketCode">Ticket Code</option>
                                    <option value="Price">Price</option>
                                    <option value="EventDate">Date</option>
                                </select>
                            </div>
                            <br></br>
                            <div>
                                <label style={labelStyle}>START DATE</label>
                                <input type="date" style={inputStyle} value={EventDateStart} onChange={(e) => setDateStart(e.target.value)} />
                            </div>
                            <div>
                                <label style={labelStyle}>END DATE</label>
                                <input type="date" style={inputStyle} value={EventDateEnd} onChange={(e) => setDateEnd(e.target.value)} />
                            </div>
                        </div>

                        <button 
                            onClick={fetchTickets}
                            style={{ 
                                marginTop: "25px", 
                                width: "100%", 
                                padding: "16px", 
                                background: "#4f46e5", 
                                color: "white", 
                                border: "none", 
                                borderRadius: "14px", 
                                fontWeight: "600", 
                                fontSize: "16px",
                                cursor: "pointer",
                                transition: "all 0.3s ease",
                                boxShadow: "0 10px 20px -5px rgba(79, 70, 229, 0.4)"
                            }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.backgroundColor = "#4338ca";
                                e.currentTarget.style.transform = "scale(1.01)";
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.backgroundColor = "#4f46e5";
                                e.currentTarget.style.transform = "scale(1)";
                            }}
                        >
                            Search Now
                        </button>
                    </div>

                    <div style={{ 
                        display: "flex", 
                        justifyContent: "space-between", 
                        alignItems: "center", 
                        marginTop: "50px", 
                        marginBottom: "20px" 
                    }}>

                        {/* Toggle Sorting 3 Stripes */}
                        <button 
                            onClick={toggleOrder}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                                background: "white",
                                border: "1px solid #e2e8f0",
                                padding: "8px 16px",
                                borderRadius: "10px",
                                cursor: "pointer",
                                fontWeight: "600",
                                fontSize: "14px",
                                color: "#4f46e5",
                                transition: "all 0.3s ease",
                                boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)"
                            }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.backgroundColor = "#f8fafc";
                                e.currentTarget.style.borderColor = "#4f46e5";
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.backgroundColor = "white";
                                e.currentTarget.style.borderColor = "#e2e8f0";
                            }}
                        >
                            {/* Icon 3 Stripes */}
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="4" y1="6" x2="20" y2="6"></line>
                                <line x1="4" y1="12" x2="20" y2="12"></line>
                                <line x1="4" y1="18" x2="20" y2="18"></line>
                            </svg>
                            {OrderState === "asc" ? "Descending (A-Z)" : "Ascending (Z-A)"}
                        </button>
                    </div>

                    {/* Tickets Grid */}
                    <div style={{ 
                        marginTop: "40px", 
                        display: "grid", 
                        gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", 
                        gap: "30px" 
                    }}>
                        {Tickets.length > 0 ? (
                            Tickets.map((ticket, index) => (
                                <Link
                                    key={index} href={`/book-ticket?code=${ticket.ticketCode}`} style={{ textDecoration: "none" }}
                                >

                                    <div style={{
                                        background: "white", 
                                        borderRadius: "24px", 
                                        overflow: "hidden", 
                                        boxShadow: "0 10px 30px rgba(0,0,0,0.03)",
                                        transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                                        cursor: "pointer",
                                        border: "1px solid #f1f5f9",
                                        position: "relative"
                                    }}
                                    onMouseOver={(e) => {
                                        e.currentTarget.style.transform = "translateY(-10px)";
                                        e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.08)";
                                    }}
                                    onMouseOut={(e) => {
                                        e.currentTarget.style.transform = "translateY(0)";
                                        e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.03)";
                                    }}
                                    >
                                        {/* Card Header Color */}
                                        <div style={{ 
                                            height: "8px", 
                                            background: "linear-gradient(to right, #6366f1, #3b82f6)" 
                                        }} />
                                        
                                        <div style={{ padding: "24px" }}>
                                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
                                                <span style={{ 
                                                    fontSize: "10px", 
                                                    fontWeight: "700", 
                                                    background: "#eef2ff", 
                                                    color: "#4f46e5", 
                                                    padding: "5px 12px", 
                                                    borderRadius: "20px",
                                                    textTransform: "uppercase"
                                                }}>
                                                    {ticket.categoryName}
                                                </span>
                                                <span style={{ fontSize: "12px", color: "#cbd5e1", fontWeight: "600" }}>#{ticket.ticketCode}</span>
                                            </div>

                                            <h3 style={{ fontSize: "20px", fontWeight: "600", color: "#1e293b", marginBottom: "8px" }}>{ticket.ticketName}</h3>
                                            
                                            <p style={{ fontSize: "14px", color: "#64748b", display: "flex", alignItems: "center", gap: "6px", marginBottom: "20px" }}>
                                                <span>📅</span> {new Date(ticket.eventDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                                            </p>
                                            
                                            <div style={{ 
                                                display: "flex", 
                                                justifyContent: "space-between", 
                                                alignItems: "flex-end", 
                                                borderTop: "1px dashed #e2e8f0", 
                                                paddingTop: "20px" 
                                            }}>
                                                <div>
                                                    <p style={{ fontSize: "11px", color: "#94a3b8", fontWeight: "600", marginBottom: "4px" }}>BEST DEALS</p>
                                                    <p style={{ fontSize: "22px", fontWeight: "600", color: "#4f46e5", margin: 0 }}>
                                                        <span style={{ fontSize: "14px", fontWeight: "600" }}>Rp</span> {Number(ticket.price).toLocaleString("id-ID")}
                                                    </p>
                                                </div>
                                                <div style={{ textAlign: "right" }}>
                                                    <div style={{ 
                                                        fontSize: "12px", 
                                                        fontWeight: "600", 
                                                        color: ticket.remainingQuota < 10 ? "#ef4444" : "#22c55e",
                                                        background: ticket.remainingQuota < 10 ? "#fef2f2" : "#f0fdf4",
                                                        padding: "4px 10px",
                                                        borderRadius: "8px"
                                                    }}>
                                                        {ticket.remainingQuota} left
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "80px 20px" }}>
                                <div style={{ fontSize: "50px", marginBottom: "10px" }}>🔍</div>
                                <h3 style={{ fontWeight: "600", color: "#64748b" }}>No ticket matched.</h3>
                                <p style={{ color: "#94a3b8", fontSize: "14px" }}>Try changing the search keywords or filters.</p>
                            </div>
                        )}
                    </div>
                    
                    {/* Pagination */}
                    <div style={{ 
                        display: "flex", 
                        justifyContent: "center", 
                        alignItems: "center", 
                        gap: "16px", 
                        marginTop: "60px",
                        paddingBottom: "40px" 
                    }}>
                        {/* Button Previous */}
                        <button 
                            onClick={() => setPage(page - 1)} 
                            disabled={page === 1}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                                padding: "10px 20px",
                                background: page === 1 ? "#e2e8f0" : "white",
                                color: page === 1 ? "#94a3b8" : "#4f46e5",
                                border: "1px solid #e2e8f0",
                                borderRadius: "12px",
                                fontWeight: "600",
                                fontSize: "14px",
                                cursor: page === 1 ? "not-allowed" : "pointer",
                                transition: "all 0.3s ease",
                                boxShadow: page === 1 ? "none" : "0 4px 6px -1px rgba(0,0,0,0.05)"
                            }}
                            onMouseOver={(e) => {
                                if (page !== 1) {
                                    e.currentTarget.style.transform = "translateX(-4px)";
                                    e.currentTarget.style.borderColor = "#4f46e5";
                                }
                            }}
                            onMouseOut={(e) => {
                                if (page !== 1) {
                                    e.currentTarget.style.transform = "translateX(0)";
                                    e.currentTarget.style.borderColor = "#e2e8f0";
                                }
                            }}
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M15 18l-6-6 6-6"/>
                            </svg>
                            Prev
                        </button>

                        {/* Page Indicator */}
                        <div style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            background: "#4f46e5",
                            color: "white",
                            width: "40px",
                            height: "40px",
                            borderRadius: "10px",
                            fontWeight: "700",
                            fontSize: "14px",
                            boxShadow: "0 10px 15px -3px rgba(79, 70, 229, 0.4)"
                        }}>
                            {page}
                        </div>

                        {/* Button Next */}
                        <button 
                            onClick={() => setPage(page + 1)}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                                padding: "10px 20px",
                                background: "white",
                                color: "#4f46e5",
                                border: "1px solid #e2e8f0",
                                borderRadius: "12px",
                                fontWeight: "600",
                                fontSize: "14px",
                                cursor: "pointer",
                                transition: "all 0.3s ease",
                                boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)"
                            }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.transform = "translateX(4px)";
                                e.currentTarget.style.borderColor = "#4f46e5";
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.transform = "translateX(0)";
                                e.currentTarget.style.borderColor = "#e2e8f0";
                            }}
                        >
                            Next
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M9 18l6-6-6-6"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}