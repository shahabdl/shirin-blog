import { useField } from "formik";
import { FC, ReactNode } from "react";
interface Props {
  children?: ReactNode;
  id: string;
  name: string;
  type: "email" | "text" | "password";
  placeholder: string;
}

const FormInput: FC<Props> = ({ children, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <div className="border-b-black border-b-[1px] flex gap-2 justify-center content-center items-center">
        {children}
        <input
          {...field}
          {...props}
          className="w-full focus-visible:outline-none font-light"
        />
      </div>
      <div className="font-light text-sm h-[20px] mt-1 text-red-700">
        {meta.touched && meta.error ? `${meta.error}` : null}
      </div>
    </>
  );
};

export default FormInput;
