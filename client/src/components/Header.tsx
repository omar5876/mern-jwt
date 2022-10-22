import React from "react";
import { Link } from "react-router-dom";
import { authActions, RootState } from "../store";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import axios from "axios";

axios.defaults.withCredentials = true;

function Header() {
  const dispatch = useDispatch();
  const isLoggedIn: boolean = useSelector(
    (state: RootState) => state.isLoggedIn
  );

  const logout = () => {
    axios.get('http://localhost:4444/user/logout', {withCredentials: true})
    .then(res => {
      if (res.status === 200) {
        dispatch(authActions.logout())
      }
    })
    .catch(err => console.log(err))
  }
  return (
    <div className="bg-blue-400 text-white flex justify-between p-2">
      <h3 className="text-3xl">MernAuth</h3>
      <div className="flex w-2/12 justify-evenly">
        {!isLoggedIn && <><h4 className="rounded-xl p-2 hover:bg-blue-300 cursor-pointer">
          <Link to={"/login"}>Login</Link>
        </h4>
        <h4 className="rounded-xl p-2 hover:bg-blue-300 cursor-pointer">
          <Link to={"/signup"}>Signup</Link>
        </h4> </>}
        {isLoggedIn && (
          <h4 onClick={logout} className="rounded-xl p-2 hover:bg-blue-300 cursor-pointer">
            <Link to={"/"}>Logout</Link>
            
          </h4>
        )}{" "}
      </div>
    </div>
  );
}

export default Header;
