import { forwardRef, InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
	return (
		<input
			{...props}
			ref={ref}
			className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500"
		/>
	);
});

Input.displayName = 'Input';
