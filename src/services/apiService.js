const API_BASE_URL = "https://www.zoowixo.com/taskmanage/api/user-login";

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
    const response = await fetch(
      "https://www.zoowixo.com/taskmanage/api/user-send-otp",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }
    );
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
    const response = await fetch(
      "https://www.zoowixo.com/taskmanage/api/user-verify-otp",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ email: email, otp: enteredOtp }),
      }
    );
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
    const response = await fetch(
      "https://www.zoowixo.com/taskmanage/api/get-all-sop-master",
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      }
    );
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
    const response = await fetch(
      "https://www.zoowixo.com/taskmanage/api/get-all-campaign-task-sop-mapping",
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      }
    );
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

export const getTeams = async () => {
  try {
    const response = await fetch(
      "https://www.zoowixo.com/taskmanage/api/get-all-team",
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to get all the Teams");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in getting all the Teams", error);
    throw error;
  }
};

export const getTasks = async () => {
  try {
    const response = await fetch(
      "https://www.zoowixo.com/taskmanage/api/get-all-task",
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to get all the teams");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in getting all the teams ", error);
    throw error;
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await fetch(
      "https://www.zoowixo.com/taskmanage/api/user-registration",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to Add new User: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in Adding new User:", error.message);
    throw error;
  }
};
export const createSop = async (newSopData) => {
  try {
    const response = await fetch(
      "https://www.zoowixo.com/taskmanage/api/create-sop-master",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newSopData),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create SOP");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in Creating SOP:", error.message);
    throw error;
  }
};

export const createTask = async (newTaskData) => {
  try {
    const response = await fetch(
      "https://www.zoowixo.com/taskmanage/api/create-task",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.Stringify(newTaskData),
      }
    );
    if(!response.ok){
      const errorData = await response.json()
      throw new Error(errorData.message || "Failed to create SOP")
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in Creatin task",error.message)

  }
};
