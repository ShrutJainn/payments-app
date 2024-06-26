import { useEffect, useState } from "react";
import BottomWarning from "../components/BottomWarning";
import Button from "../components/Button";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import SubHeading from "../components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSignin() {
    const { data } = await axios.post(
      "http://localhost:3000/api/v1/user/signin",
      { username, password }
    );

    const { token } = data;
    localStorage.setItem("token", token);
    if (token) navigate("/");
  }
  return (
    <div className=" bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className=" rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label="Sign In" />
          <SubHeading text={"Enter your credentials to access your account"} />
          <InputBox
            onChange={(e) => setUsername(e.target.value)}
            label={"Username"}
            placeholder={"shrut"}
          />
          <InputBox
            onChange={(e) => setPassword(e.target.value)}
            label={"Password"}
          />
          <Button onClick={handleSignin} label={"Sign In"} />
          <BottomWarning
            text={"Don't have an account?"}
            linkText={"Sign up"}
            link={"/signup"}
          />
        </div>
      </div>
    </div>
  );
}

export default Signin;
