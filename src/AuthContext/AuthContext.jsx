import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase.config";
import useAxiosPublic from "../hooks/useAxiosPublic";
export const AppData = createContext(null);

const AuthContext = ({ children }) => {
  const [loading, setloading] = useState(true);
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const googleProvider = new GoogleAuthProvider();
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setloading(false);
      if (user) {
        const userData = { email: user.email };
        axiosPublic.post("/jwt", userData).then((res) => {
          if (res.data.token) {
            localStorage.setItem("access-token", res.data.token);
          }
        });
        axiosPublic
          .get(`/userRole?email=${user?.email}`)
          .then((res) => setUserRole(res.data?.role));
      } else {
        localStorage.removeItem("access-token");
      }
    });
    return () => unsubscribe();
  }, [axiosPublic]);

  const createUser = (email, password) => {
    setloading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const login = (email, password) => {
    setloading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const googleSignIn = () => {
    setloading(true);
    return signInWithPopup(auth, googleProvider);
  };
  const updateUser = (name, photoUrl) => {
    setloading(true);
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoUrl,
    });
  };
  const logout = () => {
    setloading(true);
    return signOut(auth);
  };

  const allData = {
    loading,
    createUser,
    login,
    googleSignIn,
    updateUser,
    logout,
    user,
    userRole,
  };
  return <AppData.Provider value={allData}>{children}</AppData.Provider>;
};

export default AuthContext;
//createUser, updateUser, login, googleSignIn,
