import React from "react";

type InputFieldProps = {
	id: string;
	type?: string;
	required?: boolean;
	label?: string;
};

const InputField = ({ id, type = "text", required = false, label }: InputFieldProps) => {
	return (
		<>
			<label htmlFor={id}>
				{label} {required && <span style={{ color: "rgb(187, 30, 30)" }}>*</span>}
			</label>
			<input id={id} name={id} type={type} required={required} />
		</>
	);
};

export default InputField;
