import React from "react";

const CheckBox = () => {
  return (
    <>
      <div className="col-6 m-auto d-flex">
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="checkbox"
            id="inlineCheckbox1"
            defaultValue="option1"
          />
          <label className="form-check-label" htmlFor="inlineCheckbox1">
            React
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="checkbox"
            id="inlineCheckbox2"
            defaultValue="option2"
          />
          <label className="form-check-label" htmlFor="inlineCheckbox2">
            Node
          </label>
        </div>
      </div>
    </>
  );
};

export default CheckBox;
