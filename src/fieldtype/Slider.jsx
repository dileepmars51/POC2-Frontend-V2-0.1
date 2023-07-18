import React from "react";

const Slider = ({ onFormChange, formData }) => {
  return (
    <div className="row mb-2">
      <div className="col-4">
        <div className="">
          <label className="form-label infoLabel mb-1">Min</label>
        </div>
        <div className="">
          <input
            type="text"
            className="form-control form-control-sm"
            htmlFor="data-type"
            name="min"
            onChange={onFormChange}
            value={formData?.val01}
          ></input>
        </div>
      </div>
      <div className="col-4">
        <div className="">
          <label className="form-label infoLabel mb-1">Max</label>
        </div>
        <div className="">
          <input
            type="text"
            className="form-control form-control-sm"
            htmlFor="data-type"
            name="max"
            onChange={onFormChange}
            value={formData?.val02}
          ></input>
        </div>
      </div>
    </div>
  );
};

export default Slider;
