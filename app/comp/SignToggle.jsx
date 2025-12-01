"use client";

import React, { useEffect, useState } from "react";
import getUser from "../data/getUser";
import signOutAction from "../actions/signOutAction";
import signInAction from "../actions/signInAction";
import { LogIn, LogOut } from "lucide-react";

function SignToggle() {
  const [user, setSess] = useState();
  useEffect(() => {
    async function getAuth() {
      const authRes = await getUser();
      setSess(authRes);
      console.log(authRes);
    }
    getAuth();
  }, []);
  if (user) {
    return (
      <form className="w-full" action={signOutAction}>
        <button
          type="submit"
          className="p-3 flex items-center gap-2 bg-white rounded w-full "
        >
          <LogOut size={18} /> Logout
        </button>
      </form>
    );
  } else
    return (
      <form action={signInAction} className="w-full ">
        <button
          className="p-3 flex items-center gap-2 bg-white rounded w-full "
          type="submit"
        >
          <LogIn size={18} /> Login
        </button>
      </form>
    );
}

export default SignToggle;
