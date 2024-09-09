import { UseFormRegisterReturn } from 'react-hook-form';

interface Props {
  label: string;
  placeholder?: string;
  description?: string;
  type?: 'password' | 'text' | 'date';
  register?: UseFormRegisterReturn<any>;
  error?: any;
}

const ERR_STYLE = 'border-red focus:border-red';

function Input({ label, placeholder, description, register, error, type = 'text' }: Props) {
  return (
    <div className="flex flex-col gap-1">
      <label className="font-700 flex flex-col gap-2 text-14">
        {label}
        <input
          type={type}
          {...register}
          placeholder={placeholder}
          className={`focus:outline-none focus:border-primary h-[54px] p-4 font-400 border border-gray-4 rounded-md placeholder:text-gray-3 + ${
            error ? ERR_STYLE : null
          }`}
        />
      </label>
      {!error && description && <p className="text-gray-2 text-12">{description}</p>}
      {error && <p className="text-12 text-red">{error.message}</p>}
    </div>
  );
}

export default Input;
