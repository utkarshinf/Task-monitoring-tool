const API_BASE_URL = "https://zoowixo.com/api/user-login";

export const loginUser = async (credentials) => {
  try {
    const response = await fetch(API_BASE_URL, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    if (!response.ok) {
      throw new Error("Failed to Login");
    }
    return await response.json();
  } catch (error) {
    console.error("Login error", error);
    throw error;
  }
};

export const sendOtp = async (email) => {
  console.log(email, "emememeemem");
  try {
    const response = await fetch("http://zoowixo.com/api/user-send-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    if (!response.ok) {
      throw new Error("Failed to send OTP");
    }
    return await response.json();
  } catch (error) {
    console.error("Send OTP error", error);
    throw error;
  }
};

export const otpverification = async (email, enteredOtp) => {
  try {
    const response = await fetch("http://zoowixo.com/api/user-verify-otp", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ email: email, otp: enteredOtp }),
    });
    if (!response.ok) {
      throw new Error("Failed to verify OTP");
    }
  } catch (error) {
    console.error("Error in verifying OTP", error);
    throw error;
  }
};

export const getAllSopMater = async () => {
  try {
    const response = await fetch("http://zoowixo.com/api/get-all-sop-master", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to get all SOP master");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Errror in getting all the SOP master", error);
    throw error;
  }
};

export const getSopTaskMap = async () => {
  try {
    const response = await fetch("http://zoowixo.com/api/get-all-campaign-task-sop-mapping", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to get all the SOP Tasks");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in getting all the SOP Task list", error);
    throw error;
  }
};
