import { forwardRef } from "react";

interface PropsField {
  isNumber?: boolean;
  id?: string;
  label?: string;
  placeholder?: string;
  type?: string;
  error?: string;
}

export const DateField = forwardRef<HTMLInputElement, PropsField>(
  ({ isNumber, id, label, placeholder, type, error, ...rest }, ref) => {
    return (
      <div>
        <label
          htmlFor={id}
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          {label}
        </label>
        <input
          type={"date"}
          ref={ref}
          placeholder={placeholder}
          className={
            "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg   block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
          }
          id={id}
          {...rest}
        />
        <div className="text-red-400 min-h-5 text-sm mt-1">
          {error && error}
        </div>
      </div>
    );
  }
);

DateField.displayName = "InputField";
