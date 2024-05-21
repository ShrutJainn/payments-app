import BottomWarning from "../components/BottomWarning";
import Button from "../components/Button";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import SubHeading from "../components/SubHeading";

function Signin() {
  return (
    <div className=" bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className=" rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label="Sign In" />
          <SubHeading text={"Enter your credentials to access your account"} />
          <InputBox label={"Email"} placeholder={"shrut@gmail.com"} />
          <InputBox label={"Password"} />
          <Button label={"Sign In"} />
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
