import React from "react";

const DeleteBox = ({ deleteRecord, index }) => {
  return (
    <div>
      <div className="can-toggle can-toggle--size-small">
        <input
          id="b"
          type="checkbox"
          onChange={(e) => deleteRecord(e, index)}
        />
        <label for="b">
          <div
            className="can-toggle__switch"
            data-checked="off"
            data-unchecked="on"
          ></div>
          <div className="can-toggle__label-text"></div>
        </label>
      </div>
    </div>
  );
};

export default DeleteBox;
