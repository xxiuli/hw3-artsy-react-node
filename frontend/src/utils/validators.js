export const validateFullname = (value) => {
    if (!value.trim()) return "Full name is required";
    return "";
  };
  
export const validateEmail = (value) => {
    if (!value.trim()) return "Email is required";

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(value)) return "Email must be valid.";
 
    return "";
};
  
export const validatePassword = (value) => {
    if (!value.trim()) return "Password is required";
    // if (value.length < 6) return "Password must be at least 6 characters";
    return "";
};
  