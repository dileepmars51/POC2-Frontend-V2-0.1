import React from "react";
import Card from "react-bootstrap/Card";
import axios from "axios";
import { toast } from "react-toastify";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const DeleteForm = ({
  tableData,
  formData,
  availableForm,
  setAvailableForm,
  setFormState,
  formState,
}) => {
  const deleteRecord = async () => {
    if (window.confirm("Are you sure to delete?") === true) {
      await axios
        .delete(`${BASE_URL}admin-service/api/v2/forms/${tableData?.formId}`, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then(function (response) {
          console.log(response);
          const values = [...availableForm];
          values.splice(formState?.index, 1);
          setAvailableForm(values);
          setFormState({ ...formState, loadDeleteForm: false });
          toast.success(`${formData?.formCaption} Deleted Successfully!`);
        })
        .catch(function (error) {
          console.log(error);
          toast.error(` ${error?.response?.data?.message} `);
          console.log(error?.response?.data?.message);
        });
    } else {
      return;
    }
  };
  return (
    <div className="col-sm-8 bg-white m-auto">
      <h4>Delete {tableData?.formCaption}</h4>
      <div className="card m-2 shadow  mb-2 bg-body rounded">
        <div className="card-body p-0">
          <div className="row">
            <form>
              <div className="col-12 p-1">
                <div className="bg-light p-2">
                  <div>
                    <Card className="w-100 border-2 mb-2">
                      <Card.Body>
                        <div className="row">
                          <div className="col-6">
                            <div className="">
                              <label className="form-label infoLabel mb-1">
                                Form Name
                              </label>
                              <span className="text-danger">*</span>
                            </div>
                            <div className="">
                              <input
                                type="text"
                                placeholder="Enter Form Name"
                                className="form-control form-control-sm"
                                htmlFor="caption"
                                name="caption"
                                value={formData?.formCaption}
                                disabled
                              ></input>
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="">
                              <label className="form-label infoLabel mb-1">
                                Form Description
                                <span className="text-danger">*</span>
                              </label>
                            </div>
                            <div className="">
                              <input
                                type="text"
                                placeholder="Enter Form Name"
                                className="form-control form-control-sm"
                                name="description"
                                value={formData?.formDescription}
                                disabled
                              ></input>
                            </div>
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  </div>
                </div>
              </div>
            </form>
          </div>

          <Card className="w-100 border-0">
            <Card.Body className="p-2 border-0 ">
              <div className="row px-2">
                <div className="col-12 bg-light">
                  <div className="row p-1">
                    <div className="col-12">
                      <div className="row bg-light pe-2 tableFixHead">
                        <table className="data-table table table-hover">
                          <thead>
                            <tr>
                              <th className="px-0" scope="col">
                                Sequence
                              </th>
                              <th className="px-0" scope="col">
                                Field Name
                              </th>
                              <th className="px-0" scope="col">
                                Field Type
                              </th>
                              <th className="px-0" scope="col">
                                Lesser Than
                              </th>
                              <th className="px-0" scope="col">
                                Equal To
                              </th>
                              <th className="px-0" scope="col">
                                Greater Than
                              </th>
                            </tr>
                          </thead>
                          <tbody className="data-table align-middle">
                            {tableData?.formControls?.length > 0 &&
                              tableData?.formControls.map((value, index) => (
                                <tr className="" key={index}>
                                  <td className="p-0 text-center" scope="row">
                                    {" "}
                                    {index + 1}
                                  </td>
                                  <td className="p-0">{value.caption}</td>
                                  <td className="p-0"> {value.dataType}</td>

                                  <td className="p-0">{value.minValue}</td>
                                  <td className="p-0">{value?.equalTo}</td>
                                  <td className="p-0">{value?.maxValue}</td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row p-2">
                <div className="col-12 d-flex flex-row-reverse">
                  <div>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={deleteRecord}
                    >
                      Delete Form
                    </button>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DeleteForm;
