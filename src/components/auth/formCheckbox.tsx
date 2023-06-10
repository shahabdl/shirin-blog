import { useField } from "formik";
import { FC, ReactNode } from "react";
interface Props {
  children: ReactNode;
  name: string;
}
const FormCheckbox: FC<Props> = ({ children, ...props }) => {
  const [field, meta] = useField({ ...props, type: "checkbox" });
  return (
    <div className="font-light">
      <label>
        <input type="checkbox" {...field} {...props} />
        {children}
      </label>
      <div>{meta.touched && meta.error ? `${meta.error}` : null}</div>
    </div>
  );
};

export default FormCheckbox;
