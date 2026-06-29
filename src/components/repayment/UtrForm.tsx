import { useState } from "react";

const BUSINESS_WHATSAPP_NUMBER = "91XXXXXXXXXX"; // TODO: Replace with real number

interface UtrFormProps {
  name: string;
  amount: string;
  upi: string;
}

export default function UtrForm({ name, amount, upi }: UtrFormProps) {
  const [mobile, setMobile] = useState("");
  const [utr, setUtr] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleSubmit = () => {
    if (!mobile || !utr) {
      alert("Please fill in both Mobile Number and UTR/Reference Number.");
      return;
    }
    const message = `Payment Confirmation%0AName: ${name}%0AAmount: ₹${amount}%0AUTR/Ref No: ${utr}%0AMobile: ${mobile}`;
    window.open(`https://wa.me/${BUSINESS_WHATSAPP_NUMBER}?text=${message}`, "_blank");
  };

  const upiLink = `upi://pay?pa=${upi}&pn=${name}&am=${amount}&cu=INR`;

  return (
    <div style={{ fontFamily: "sans-serif", maxWidth: 420, margin: "0 auto", padding: "16px" }}>

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{ fontSize: 22, fontWeight: "bold", color: "#1a1a2e" }}>Secure Gateway</div>
        <div style={{ fontSize: 13, color: "#666", marginTop: 4 }}>Direct UPI Transfer — not a payment gateway</div>
      </div>

      {/* Payment For */}
      <div style={{ background: "#f0f4ff", borderRadius: 10, padding: "12px 16px", marginBottom: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontSize: 11, color: "#888", textTransform: "uppercase", letterSpacing: 1 }}>Payment For</div>
          <div style={{ fontSize: 18, fontWeight: "bold", color: "#1a1a2e" }}>{name}</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 11, color: "#888", textTransform: "uppercase", letterSpacing: 1 }}>Amount Due</div>
          <div style={{ fontSize: 24, fontWeight: "bold", color: "#2563eb" }}>₹{amount}</div>
        </div>
      </div>

      {/* Step 1 */}
      <div style={{ background: "#1d4ed8", borderRadius: 10, padding: "14px 16px", marginBottom: 12 }}>
        <div style={{ color: "#93c5fd", fontSize: 12, fontWeight: "bold", marginBottom: 8 }}>STEP 1 — Copy Payment Details</div>

        <div style={{ background: "rgba(255,255,255,0.1)", borderRadius: 8, padding: "10px 14px", marginBottom: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ color: "#bfdbfe", fontSize: 11 }}>Amount</div>
            <div style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>₹{amount}</div>
          </div>
          <button
            onClick={() => copyToClipboard(amount, "amount")}
            style={{ background: copied === "amount" ? "#22c55e" : "#fff", color: copied === "amount" ? "#fff" : "#1d4ed8", border: "none", borderRadius: 6, padding: "6px 14px", fontWeight: "bold", cursor: "pointer", fontSize: 13 }}
          >
            {copied === "amount" ? "Copied!" : "Copy"}
          </button>
        </div>

        <div style={{ background: "rgba(255,255,255,0.1)", borderRadius: 8, padding: "10px 14px", marginBottom: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ color: "#bfdbfe", fontSize: 11 }}>UPI / VPA</div>
            <div style={{ color: "#fff", fontWeight: "bold", fontSize: 14 }}>{upi}</div>
          </div>
          <button
            onClick={() => copyToClipboard(upi, "upi")}
            style={{ background: copied === "upi" ? "#22c55e" : "#fff", color: copied === "upi" ? "#fff" : "#1d4ed8", border: "none", borderRadius: 6, padding: "6px 14px", fontWeight: "bold", cursor: "pointer", fontSize: 13 }}
          >
            {copied === "upi" ? "Copied!" : "Copy"}
          </button>
        </div>

        <div style={{ background: "rgba(255,255,255,0.1)", borderRadius: 8, padding: "10px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ color: "#bfdbfe", fontSize: 11 }}>Name</div>
            <div style={{ color: "#fff", fontWeight: "bold", fontSize: 14 }}>{name}</div>
          </div>
          <button
            onClick={() => copyToClipboard(name, "name")}
            style={{ background: copied === "name" ? "#22c55e" : "#fff", color: copied === "name" ? "#fff" : "#1d4ed8", border: "none", borderRadius: 6, padding: "6px 14px", fontWeight: "bold", cursor: "pointer", fontSize: 13 }}
          >
            {copied === "name" ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>

      {/* Step 2 */}
      <div style={{ background: "#0f172a", borderRadius: 10, padding: "14px 16px", marginBottom: 12 }}>
        <div style={{ color: "#94a3b8", fontSize: 12, fontWeight: "bold", marginBottom: 10 }}>STEP 2 — Send Payment via UPI App</div>
        <a
          href={upiLink}
          style={{ display: "block", background: "#2563eb", color: "#fff", textAlign: "center", borderRadius: 8, padding: "12px", fontWeight: "bold", fontSize: 15, textDecoration: "none", marginBottom: 10 }}
        >
          Pay Now via UPI App
        </a>
        <div style={{ color: "#64748b", fontSize: 12, textAlign: "center" }}>
          ⚠️ Please note your UTR / Reference Number after payment
        </div>
      </div>

      {/* Step 3 */}
      <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 10, padding: "14px 16px", marginBottom: 16 }}>
        <div style={{ color: "#1e293b", fontSize: 12, fontWeight: "bold", marginBottom: 12 }}>STEP 3 — Confirm Your Payment</div>

        <div style={{ marginBottom: 10 }}>
          <label style={{ fontSize: 12, color: "#64748b", display: "block", marginBottom: 4 }}>Mobile Number (10 digits)</label>
          <input
            type="tel"
            maxLength={10}
            placeholder="Enter your mobile number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
            style={{ width: "100%", padding: "10px 12px", border: "1px solid #cbd5e1", borderRadius: 8, fontSize: 14, boxSizing: "border-box" }}
          />
        </div>

        <div style={{ marginBottom: 14 }}>
          <label style={{ fontSize: 12, color: "#64748b", display: "block", marginBottom: 4 }}>UTR / Reference Number</label>
          <input
            type="text"
            placeholder="Enter after completing payment"
            value={utr}
            onChange={(e) => setUtr(e.target.value)}
            style={{ width: "100%", padding: "10px 12px", border: "1px solid #cbd5e1", borderRadius: 8, fontSize: 14, boxSizing: "border-box" }}
          />
        </div>

        <button
          onClick={handleSubmit}
          style={{ width: "100%", background: "#0f172a", color: "#fff", border: "none", borderRadius: 8, padding: "13px", fontWeight: "bold", fontSize: 15, cursor: "pointer" }}
        >
          Submit via WhatsApp
        </button>
      </div>

      {/* Footer */}
      <div style={{ textAlign: "center", fontSize: 11, color: "#94a3b8" }}>
        This page facilitates a direct UPI transfer. It is not a bank or licensed payment gateway.
      </div>

    </div>
  );
}
