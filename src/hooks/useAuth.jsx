import { useContext } from "react";
import { AppData } from "../AuthContext/AuthContext";

const useAuth = () => {
  const data = useContext(AppData);
  return data;
};

export default useAuth;
