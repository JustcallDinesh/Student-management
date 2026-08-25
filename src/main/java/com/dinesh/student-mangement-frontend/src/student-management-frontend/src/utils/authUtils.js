import { jwtDecode } from "jwt-decode";

export const getUserFromToken = (token) => {
  if (!token) {
    console.log("Token :"+token)
    return null;
  }

  try {
    console.log(jwtDecode(token))
    return jwtDecode(token);
  } catch (error) {
    console.error("Failed to decode JWT:", error);
    return null;
  }
};

export const getUserRole = (token) => {
  const decodedToken = getUserFromToken(token);

  console.log(decodedToken)
  if (!decodedToken) {
    return null;
  }

  return decodedToken.role || decodedToken.roles || null;
};