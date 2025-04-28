import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import API from "../utils/api";
import { useNavigate, Link } from "react-router-dom";

export default function OtpLogin() {
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [countdown, setCountdown] = useState(0);
  const navigate = useNavigate();

  // Countdown effect
  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  const formatTime = seconds => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const sendOtp = async () => {
    try {
      const res = await API.post("/auth/send-otp", { email });
      toast.success(res.data.message);
      setOtpSent(true);
      setOtp("");

      const { lastOtpSentAt, cooldown } = res.data;
      if (lastOtpSentAt && cooldown) {
        const timeElapsed = Math.floor((Date.now() - new Date(lastOtpSentAt)) / 1000);
        const timeLeft = Math.max(cooldown - timeElapsed, 0);
        setCountdown(timeLeft);
      } else {
        setCountdown(0);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send OTP");
    }
  };

  const verifyOtp = async () => {
    try {
      const res = await API.post("/auth/verify-otp", { email, otp });
      localStorage.setItem("token", res.data.token);
      toast.success("Login successful");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid OTP");
    }
  };

  const handleAction = () => {
    if (otpSent) {
      verifyOtp();
    } else {
      sendOtp();
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login with OTP</h2>
      <div className="col-md-6">

        {/* Email input stays always visible */}
        <input
          className="form-control my-2"
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          disabled={otpSent} // Optional: lock email after OTP sent
        />

        {/* OTP input only shows after email is verified */}
        {otpSent && (
          <input
            className="form-control my-2"
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={e => setOtp(e.target.value)}
          />
        )}

        {/* Button switches label based on stage */}
        <button
          className={`btn ${otpSent ? "btn-primary" : "btn-success"}`}
          onClick={handleAction}
          disabled={!email.trim() || (otpSent && !otp.trim())}
        >
          {otpSent ? "Verify OTP" : countdown > 0 ? `Resend OTP in ${formatTime(countdown)}` : "Send OTP"}
        </button>

        {/* Resend OTP option if needed */}
        {otpSent && countdown === 0 && (
          <button className="btn btn-link mt-2" onClick={sendOtp}>Resend OTP</button>
        )}

        {/* Countdown visible while waiting */}
        {otpSent && countdown > 0 && (
          <p className="text-muted mt-2">You can resend OTP in {formatTime(countdown)}</p>
        )}

        <div className="mt-3">
          <Link to="/">Login with Password</Link> |
          <Link to="/register" className="ms-2">Register</Link>
        </div>
      </div>
    </div>
  );
}
