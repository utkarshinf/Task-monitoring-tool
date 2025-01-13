import React, { useState } from "react";
import { logo2 } from "../../utils";
import { otpverification, sendOtp } from "../../services/apiService";
import VerifyOtp from "./VerifyOtp";

const ResetPassword = () => {
  const [email, setEmail] = useState(""); 
  const [message, setMessage] = useState(""); 
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false); 
    const [otp, setOtp] = useState(["", "", "", ""]);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
  
    const handleOtpChange = (index, value) => {
      if (value.length > 1) return;
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const enteredOtp = otp.join("");
      try {
        const response = await otpverification(email,enteredOtp);
        console.log("OTP verification response", response);
        setSuccess("OTP Verified Successfully!");
        setError("");
      } catch (err) {
        console.error(err);
        setError("Failed to Verify OTP. Try again.");
        setSuccess("");
      }
    };

  const handleInputChange = (e) => {
    setEmail(e.target.value); 
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setMessage("Please Enter a Valid Email address.");
      return;
    }
    console.log(email,"dedededededd")

    setLoading(true);
    setMessage(""); 

    try {
      const response = await sendOtp(email); 
      setMessage(response.message || "OTP sent successfully to your email!");
      setOtpSent(true); 
    } catch (error) {
      setMessage("Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="login_content d-flex justify-content-lg-end align-items-center position-relative">
      <div className="login_form d-flex flex-column align-items-center justify-content-center px-lg-5 position-relative">
        <img
          src={logo2}
          alt="Reality Assistant"
          className="position-absolute top-0 start-50 translate-middle-x mt-5"
        />
        {!otpSent ? (
          <form action="" className="w-100 px-5" onSubmit={handleSendOtp}>
            <h2 className="fw-bold text-center mb-0">Reset Your Password</h2>
            <p className="text-black-50 mb-5 text-center small_text">
              Your password will be reset by email.
            </p>
            <div className="mb-3">
              <input
                type="email"
                className="border border-black-50 border-2 border-bottom-0 p-2 rounded-2 w-100"
                placeholder="Enter your email address"
                value={email}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <button
                type="submit"
                className="text-uppercase w-100 py-2 border-0 primary_btn rounded-2"
                disabled={loading}
              >
                {loading ? "SENDING..." : "SEND OTP"}
              </button>
            </div>
            {message && (
              <p className="text-center mt-3" style={{ color: "red" }}>
                {message}
              </p>
            )}
          </form>
        ) : (
          // OTP has been sent, show the OTP verification component
          <VerifyOtp 
          otp={otp}
          handleSubmit={handleSubmit}
          handleOtpChange={handleOtpChange}
            error={error}
            success={success}

          />
        )}
      </div>
    </section>
  );
};

export default ResetPassword;
