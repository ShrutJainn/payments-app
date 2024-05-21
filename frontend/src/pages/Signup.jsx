import { useState } from "react";
import BottomWarning from "../components/BottomWarning";
import Button from "../components/Button";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import SubHeading from "../components/SubHeading";
import axios from "axios";

function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignup() {
    const { data } = await axios.post(
      "http://localhost:3000/api/v1/user/signup",
      { firstName, lastName, username, password }
    );
    const { token } = data;
    localStorage.setItem("token", token);
  }
  return (
    <div className=" bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className=" rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label="Sign Up" />
          <SubHeading text={"Enter your information to create an account"} />
          <InputBox
            onChange={(e) => setFirstName(e.target.value)}
            label={"First Name"}
            placeholder={"Shrut"}
          />
          <InputBox
            onChange={(e) => setLastName(e.target.value)}
            label={"Last Name"}
            placeholder={"Jain"}
          />
          <InputBox
            onChange={(e) => setUsername(e.target.value)}
            label={"Username"}
            placeholder={"shrut123"}
          />
          <InputBox
            onChange={(e) => setPassword(e.target.value)}
            label={"Password"}
            placeholder={"12345"}
          />
          <Button onClick={handleSignup} label={"Sign up"} />
          <BottomWarning
            text={"Already have an account?"}
            linkText={"Sign in"}
            link={"/signin"}
          />
        </div>
      </div>
    </div>
  );
}

export default Signup;
