import React, { useState } from "react";
import { logo2 } from "../../utils";
import { FaEyeSlash } from "react-icons/fa";

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    // Add logic to handle password change
    console.log("Form data:", formData);
  };

  return (
    <section className="login_content d-flex justify-content-lg-end align-items-center position-relative">
      <div className="login_form d-flex flex-column align-items-center justify-content-center px-lg-5 position-relative">
        <img
          src={logo2}
          alt="Reality Assistant"
          className="position-absolute top-0 start-50 translate-middle-x mt-5"
        />
        <form action="" className="w-100 px-5" onSubmit={handleChangePassword}>
          <h2 className="fw-bold text-center mb-5">Change Password</h2>
          <p>Enter new password below to complete the reset process</p>
          <div className="mb-3">
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="border border-black-50 border-2 border-bottom-0 p-2 rounded-2 w-100"
              placeholder="New Password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3 position-relative w-full">
            <input
              type="password"
              className="border border-black-50 border-2 border-bottom-0 p-2 rounded-2 w-100"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
            />
            <span className="position-absolute end-0 top-50 translate-middle-y me-4 text-black-50 ">
              <FaEyeSlash />
            </span>
          </div>
          <div>
            <button className="text-uppercase w-100 py-2 border-0 primary_btn rounded-2">
              Change Password
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ChangePassword;
