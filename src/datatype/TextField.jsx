import React from "react";

const TextField = ({ name, placeholder, formData, onFormChange }) => {
  return (
    <div className="col-6 m-auto">
      <input
        type="text"
        name={name}
        placeholder={placeholder}
        value={formData[name]}
        onChange={onFormChange}
        className="form-control form-control-sm"
        htmlFor={name}
      />
    </div>
  );
};

export default TextField;
