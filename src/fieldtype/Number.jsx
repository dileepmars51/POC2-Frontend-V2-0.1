import React from "react";

const Number = ({ onFormChange, formData }) => {
  return (
    <div className="row mb-2">
      <div className="col-4">
        <div className="">
          <label className="form-label infoLabel mb-1">Lesser Than</label>
        </div>
        <div className="">
          <input
            type="text"
            className="form-control form-control-sm"
            htmlFor="data-type"
            name="minValue"
            onChange={onFormChange}
            value={formData?.minValue}
          ></input>
        </div>
      </div>
      <div className="col-4">
        <div className="">
          <label className="form-label infoLabel mb-1">Equal To</label>
        </div>
        <div className="">
          <input
            type="text"
            className="form-control form-control-sm"
            htmlFor="data-type"
            name="equalTo"
            onChange={onFormChange}
            value={formData?.equalTo}
          ></input>
        </div>
      </div>
      <div className="col-4">
        <div className="">
          <label className="form-label infoLabel mb-1">Greater Than</label>
        </div>
        <div className="">
          <input
            type="text"
            className="form-control form-control-sm"
            htmlFor="data-type"
            name="maxValue"
            onChange={onFormChange}
            value={formData?.maxValue}
          ></input>
        </div>
      </div>
    </div>
  );
};

export default Number;
