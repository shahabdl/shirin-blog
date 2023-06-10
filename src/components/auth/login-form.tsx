"use client";
import {
  ErrorMessage,
  Field,
  Form,
  Formik,
  FormikHelpers,
  useFormik,
} from "formik";
import * as Yup from "yup";
import { AiOutlineLock, AiOutlineUser } from "react-icons/ai";
import FormInput from "./formInput";
import FormCheckbox from "./formCheckbox";

const LoginForm = () => {
  const submitLogin = (
    values: { email: string; password: string; remember: boolean },
    {
      setSubmitting,
    }: FormikHelpers<{
      email: string;
      password: string;
      remember: boolean;
    }>
  ) => {
    console.log(values.remember);
    setSubmitting(false);
  };

  return (
    <div className="h-full flex flex-col flex-wrap justify-center content-center">
      <div className="w-3/5">
        <h1 className="text-4xl font-light mb-8">LOGIN</h1>
        <Formik
          initialValues={{ email: "", password: "", remember: false }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email("Invalid email address")
              .required("Required"),
            password: Yup.string().required("Required"),
          })}
          onSubmit={submitLogin}
        >
          {() => (
            <Form>
              <div className="mb-6">
                <FormInput
                  name="email"
                  id="email"
                  placeholder="Email"
                  type="email"
                >
                  <AiOutlineUser />
                </FormInput>
              </div>
              <div className="mb-6">
                <FormInput
                  name="password"
                  id="password"
                  placeholder="Password"
                  type="password"
                >
                  <AiOutlineLock />
                </FormInput>
              </div>
              <div className="mb-8">
                <FormCheckbox name="remember">Remember Me!</FormCheckbox>
              </div>
              <button
                type="submit"
                className="w-full bg-red-400 font-light py-2 hover:bg-red-500 transition-colors duration-[0.3s]"
              >
                Log In
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginForm;
