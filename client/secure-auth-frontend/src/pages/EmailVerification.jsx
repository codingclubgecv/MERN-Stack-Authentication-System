import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EmailVerification = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("Verifying your email...");
  const [verified, setVerified] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("token");

    const verifyEmail = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/auth/verify-email?token=${token}`);
        setStatus("✅ Your email has been verified successfully!");
        setVerified(true);

        // Optional: Auto redirect to login after 3 seconds
        // setTimeout(() => {
        //   navigate("/");
        // }, 3000);
      } catch (err) {
        if (err.response && err.response.data && err.response.data.message) {
          setStatus(`❌ ${err.response.data.message}`);
        } else {
          setStatus("❌ Invalid or expired verification link.");
        }
        setVerified(false);
      }
    };

    if (token) {
      verifyEmail();
    } else {
      setStatus("❌ Verification token not found.");
    }
  }, [searchParams, navigate]);

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h2>{status}</h2>
      {verified && (
        <button onClick={() => navigate("/")} style={{ marginTop: "1rem", padding: "10px 20px", cursor: "pointer" }}>
          Go to Login
        </button>
      )}
    </div>
  );
};

export default EmailVerification;
