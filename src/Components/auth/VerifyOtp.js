import React, { useState } from "react";
import { logo2 } from "../../utils";
import { otpverification } from "../../services/apiService";

const VerifyOtp = (items) => {  // Receive email as prop
const {otp,success,handleOtpChange,handleSubmit,error} = items

  return (
    <>
      <section className="login_content d-flex justify-content-lg-end align-items-center position-relative">
        <div className="login_form d-flex flex-column align-items-center justify-content-center px-lg-5 position-relative">
          <img
            src={logo2}
            alt="Reality Assistant"
            className="position-absolute top-0 start-50 translate-middle-x mt-5"
          />
          <form action="" className="w-100 px-5" onSubmit={handleSubmit}>
            <h2 className="fw-bold text-center mb-0">Enter 4 Digits Code</h2>
            <p className="text-black-50 mb-5 text-center small_text">
              Enter the 4 digits code that you received on your email.
            </p>
            <div className="mb-4">
              <p className="text-center">Verification code for </p>  {/* Show email */}
              <div className="d-flex justify-content-center">
                {otp.map((value, index) => (
                  <input
                    key={index}
                    type="text"
                    className="border border-black-50 border-2 border-bottom-0 p-2 rounded-2 otp-box me-3"
                    maxLength="1"
                    value={value}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                  />
                ))}
              </div>
            </div>
            <div className="d-flex justify-content-center">
              <button className="text-uppercase  px-5 py-2 border-0 primary_btn rounded-2">
                VERIFY
              </button>
            </div>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}
          </form>
        </div>
      </section>
    </>
  );
};

export default VerifyOtp;
