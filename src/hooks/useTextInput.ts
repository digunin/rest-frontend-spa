import { useState } from "react";

export const useTextInput = (password: boolean) => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const handleCLick = () => setPasswordVisibility((prev) => !prev);
  const type = !password || passwordVisibility ? "text" : "password";
  return { passwordVisibility, handleCLick, type };
};
