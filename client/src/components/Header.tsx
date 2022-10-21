import React from "react";
import { Link } from "react-router-dom";
import { RootState } from "../store";
import { useSelector } from "react-redux";

function Header() {
  const isLoggedIn: boolean = useSelector(
    (state: RootState) => state.isLoggedIn
  );
  return (
    <div className="bg-blue-400 text-white flex justify-between p-2">
      <h3 className="text-3xl">MernAuth</h3>
      <div className="flex w-2/12 justify-evenly">
        <h4 className="rounded-xl p-2 hover:bg-blue-300 cursor-pointer">
          <Link to={"/login"}>Login</Link>
        </h4>
        <h4 className="rounded-xl p-2 hover:bg-blue-300 cursor-pointer">
          <Link to={"/signup"}>Signup</Link>
        </h4>
        {isLoggedIn && (
          <h4 className="rounded-xl p-2 hover:bg-blue-300 cursor-pointer">
            <Link to={"/"}>Logout</Link>
          </h4>
        )}{" "}
      </div>
    </div>
  );
}

export default Header;
