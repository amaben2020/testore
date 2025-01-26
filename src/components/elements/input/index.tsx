// import Eye from '@/components/icons/eye';
// import EyeOff from '@/components/icons/eye-off';
// import { Label } from '@medusajs/ui';
// import React, { useEffect, useImperativeHandle, useState } from 'react';

// type InputProps = Omit<
//   Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
//   'placeholder'
// > & {
//   label: string;
//   errors?: Record<string, unknown>;
//   touched?: Record<string, unknown>;
//   name: string;
//   topLabel?: string;
// };

// const Input = React.forwardRef<HTMLInputElement, InputProps>(
//   ({ type, name, label, touched, required, topLabel, ...props }, ref) => {
//     const inputRef = React.useRef<HTMLInputElement>(null);
//     const [showPassword, setShowPassword] = useState(false);
//     const [inputType, setInputType] = useState(type);

//     useEffect(() => {
//       if (type === 'password' && showPassword) {
//         setInputType('text');
//       }

//       if (type === 'password' && !showPassword) {
//         setInputType('password');
//       }
//     }, [type, showPassword]);

//     useImperativeHandle(ref, () => inputRef.current!);

//     return (
//       <div className="flex flex-col w-full">
//         {topLabel && (
//           <Label className="mb-2 txt-compact-medium-plus">{topLabel}</Label>
//         )}
//         <div className="relative z-0 flex w-full txt-compact-medium">
//           <input
//             type={inputType}
//             name={name}
//             placeholder=" "
//             required={required}
//             className="block w-full px-4 pt-4 pb-1 mt-0 border rounded-md appearance-none h-11 bg-ui-bg-field focus:outline-none focus:ring-0 focus:shadow-borders-interactive-with-active border-ui-border-base hover:bg-ui-bg-field-hover"
//             {...props}
//             ref={inputRef}
//           />
//           <label
//             htmlFor={name}
//             onClick={() => inputRef.current?.focus()}
//             className="absolute flex items-center justify-center px-1 mx-3 transition-all duration-300 top-3 -z-1 origin-0 text-ui-fg-subtle"
//           >
//             {label}
//             {required && <span className="text-rose-500">*</span>}
//           </label>
//           {type === 'password' && (
//             <button
//               type="button"
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute right-0 px-4 transition-all duration-150 outline-none text-ui-fg-subtle focus:outline-none focus:text-ui-fg-base top-3"
//             >
//               {showPassword ? <Eye /> : <EyeOff />}
//             </button>
//           )}
//         </div>
//       </div>
//     );
//   }
// );

// Input.displayName = 'Input';

// export default Input;

import Eye from '@/components/icons/eye';
import EyeOff from '@/components/icons/eye-off';
import { Label } from '@medusajs/ui';
import React, { useEffect, useImperativeHandle, useState } from 'react';

type InputProps = Omit<
  Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
  'placeholder'
> & {
  label: string;
  errors?: Record<string, unknown>;
  touched?: Record<string, unknown>;
  name: string;
  topLabel?: string;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ type, name, label, touched, required, topLabel, ...props }, ref) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [inputType, setInputType] = useState(type);
    const [hasValue, setHasValue] = useState(false);

    useEffect(() => {
      if (type === 'password' && showPassword) {
        setInputType('text');
      }

      if (type === 'password' && !showPassword) {
        setInputType('password');
      }
    }, [type, showPassword]);

    useImperativeHandle(ref, () => inputRef.current!);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setHasValue(!!e.target.value);
      if (props.onChange) {
        props.onChange(e);
      }
    };

    return (
      <div className="flex flex-col w-full">
        {topLabel && (
          <Label className="mb-2 txt-compact-medium-plus">{topLabel}</Label>
        )}
        <div className="relative z-0 flex w-full txt-compact-medium">
          <input
            type={inputType}
            name={name}
            placeholder=" "
            required={required}
            className="block w-full px-4 pt-4 pb-1 mt-0 border rounded-md appearance-none h-11 bg-ui-bg-field focus:outline-none focus:ring-0 focus:shadow-borders-interactive-with-active border-ui-border-base hover:bg-ui-bg-field-hover"
            {...props}
            ref={inputRef}
            onChange={handleInputChange}
          />
          <label
            htmlFor={name}
            onClick={() => inputRef.current?.focus()}
            className={`absolute flex items-center justify-center px-1 mx-3 transition-all duration-300 top-3 -z-1 origin-0 text-ui-fg-subtle ${
              hasValue || inputRef.current?.value
                ? 'transform -translate-y-4 scale-75 text-ui-fg-base'
                : ''
            }`}
          >
            {label}
            {required && <span className="text-rose-500">*</span>}
          </label>
          {type === 'password' && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-0 px-4 transition-all duration-150 outline-none text-ui-fg-subtle focus:outline-none focus:text-ui-fg-base top-3"
            >
              {showPassword ? <Eye /> : <EyeOff />}
            </button>
          )}
        </div>
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
