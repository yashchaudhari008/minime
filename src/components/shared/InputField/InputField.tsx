import { ChangeEvent } from "react";

type InputFieldProps = {
	id: string;
	type?: string;
	required?: boolean;
	label?: string;
	value?: string;
	setValue: (value: string) => void;
};

const InputField = ({
	id,
	type = "text",
	required = false,
	label,
	value,
	setValue,
}: InputFieldProps) => {
	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
	};
	return (
		<>
			<label htmlFor={id}>
				{label} {required && <span style={{ color: "rgb(187, 30, 30)" }}>*</span>}
			</label>
			<input
				id={id}
				name={id}
				type={type}
				value={value}
				required={required}
				onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
			/>
		</>
	);
};

export default InputField;
