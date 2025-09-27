import React from "react";
import "./Input.scss";

type InputProps = {
  label?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string | null;
};

const Input: React.FC<InputProps> = ({ label, type = "text", placeholder, value, onChange, error }) => {
  return (
    <div className="input-container">
      {label && <label className="input-label">{label}</label>}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="input-field"
      />
      {error && <span className="input-error-text">{error}</span>}
    </div>
  );
};

export default Input;
