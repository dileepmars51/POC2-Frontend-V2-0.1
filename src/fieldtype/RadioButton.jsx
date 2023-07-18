import React from "react";
import { useState } from "react";

const RadioButton = ({ onFormChange, formData, size }) => {
  const [inputFields, setInputSize] = useState([1]);

  const increaseCount = () => {
    let values = [...inputFields];
    values.push(inputFields[inputFields.length - 1] + 1);
    setInputSize(values);
  };

  const deleteInputField = (index) => {
    let values = [...inputFields];
    values.splice(index, 1);
    setInputSize(values);
  };

  return (
    <div className="row mb-2">
      {inputFields.length > 0 &&
        inputFields.map((val, index) => (
          <div className="col-4">
            <div className="">
              <label className="form-label infoLabel mb-1">
                Option{index + 1}
              </label>
            </div>
            <div className="">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  htmlFor="data-type"
                  name={`option${index + 1}`}
                  onChange={onFormChange}
                  //   value={formData?.val02}
                />
                <button
                  className="btn btn-outline-danger btn-sm"
                  type="button"
                  id="button-addon2"
                  onClick={() => deleteInputField(index)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-x"
                    viewBox="0 0 16 16"
                  >
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}

      <div className="col-4">
        <div>
          <span>‎ </span>
        </div>
        <button
          class="btn btn-outline-primary btn-sm ms-1"
          onClick={increaseCount}
          type="button"
        >
          New
        </button>
      </div>
    </div>
  );
};

export default RadioButton;
