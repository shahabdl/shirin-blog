import { useField } from "formik";
import { FC, ReactNode, useEffect } from "react";
import "./formCheckbox.css";
interface Props {
  children: ReactNode;
  name: string;
}
const FormCheckbox: FC<Props> = ({ children, ...props }) => {
  const [field, meta] = useField({ ...props, type: "checkbox" });
  return (
    <div className="font-light">
      <label className="flex items-center gap-3">
        <input type="checkbox" {...field} {...props} className="hidden" />
        <div
          className={`w-[15px] h-[15px] border-black border-[1px] checkbox ${
            field.checked ? "checked" : ""
          }`}
        ></div>
        <p>{children}</p>
      </label>
      <div>{meta.touched && meta.error ? `${meta.error}` : null}</div>
    </div>
  );
};

export default FormCheckbox;
