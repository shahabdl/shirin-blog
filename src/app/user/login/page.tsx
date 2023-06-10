import Image from "next/image";
import Link from "next/link";
import LoginForm from "shb/components/auth/login-form";
const Login = () => {
  return (
    <div className="bg-zinc-300 w-screen h-[calc(100vh-60px)] grid justify-center content-center">
      <div className="w-[70vw] h-max bg-white grid grid-cols-2 items-center shadow-xl">
        <div className="grid p-5 justify-items-center gap-5 h-min bg-red-400">
          <Image
            src="/auth/login.webp"
            alt="a man trying to login in phone"
            width={261}
            height={405}
            className="m-0 p-0 leading-0 w-[60%]"
          />
          <div className="text-center text-white font-light text-2xl">
            <p>New User?</p>
            <Link
              href={"/user/signup"}
              className="text-white font-light text-xl underline underline-offset-4"
            >
              Create Account
            </Link>
          </div>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
