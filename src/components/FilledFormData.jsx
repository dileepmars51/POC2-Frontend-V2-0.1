import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import moment from "moment/moment";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const FilledFormData = ({
  tableData,
  availableForm,
  updateForm,
  setTableData,
  setFormData,
  setUpdateItem,
  formId,
}) => {
  const deleteRecord = async (index, id) => {
    if (window.confirm("Are you sure to delete the record?") === true) {
      await axios
        .delete(`${BASE_URL}api/v1/table/${formId}/records/${id}`)
        // .delete(`${BASE_URL}transact-service/api/v2/forms/${id}`)
        .then(function (response) {
          const values = [...tableData];
          values.splice(index, 1);
          setTableData(values);
          console.log(response);
          toast.success(` Deleted Successfully!`);
        })
        .catch(function (error) {
          console.log(error);
          toast.error(` ${error?.response?.data?.message} `);
        });
    } else {
      return;
    }
  };

  const listItem = (val, index) => {
    const table = { ...tableData[index] };
    delete table.id;

    let row = [];
    let key = [];

    availableForm[updateForm]?.fields?.map((value, index) => {
      key.push(value.caption.split(" ").join(""));

      let intVal = parseInt(table[key[index]]);
      let date = new Date(intVal).toLocaleDateString();
      date = moment(date).format("DD MMM YYYY");

      row.push(
        <td className="p-2">
          {date === "Invalid date" ? table[key[index]] : date}
        </td>
      );
    });

    return row;
  };

  const renderRecord = (index) => {
    setUpdateItem(index + 1);
    setFormData(tableData[index]);
  };

  return (
    <>
      <div className="col-12 bg-light">
        <div className="row p-1">
          <div className="col-12">
            <div className="row bg-light pe-2 tableFixHead">
              <table className="data-table table table-hover">
                <thead>
                  <tr>
                    <th className="px-2">&nbsp;</th>
                    <th className="px-2">&nbsp;</th>

                    {availableForm?.length > 0 &&
                      availableForm[updateForm]?.formControls.map(
                        (value, index) => (
                          <th className="px-2" scope="col" key={index}>
                            {value.caption}
                          </th>
                        )
                      )}
                  </tr>
                </thead>
                <tbody className="data-table align-middle">
                  {tableData.length > 0 &&
                    tableData.map((value, index) => (
                      <tr
                        className=""
                        key={index}
                        onClick={() => renderRecord(index)}
                      >
                        <td className="p-0">
                          <button className="btn shadow-none px-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              class="bi bi-pencil-square"
                              viewBox="0 0 16 16"
                            >
                              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                              <path
                                fill-rule="evenodd"
                                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                              />
                            </svg>
                          </button>
                        </td>
                        <td className="p-0">
                          <button
                            className="btn shadow-none px-2"
                            onClick={() => deleteRecord(index, value.id)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              class="bi bi-trash"
                              viewBox="0 0 16 16"
                            >
                              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                              <path
                                fill-rule="evenodd"
                                d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                              />
                            </svg>
                          </button>
                        </td>
                        {listItem(value, index)}
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilledFormData;
