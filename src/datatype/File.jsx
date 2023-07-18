import React from "react";

const File = ({ handleFileChange }) => {
  return (
    <>
      <div className="col-6 m-auto">
        <div className="mb-3">
          <input
            className="form-control form-control-sm"
            id="formFileSm"
            type="file"
            onChange={handleFileChange}
          />
        </div>
      </div>
    </>
  );
};

export default File;
