import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { toast } from "react-toastify";
import axios from "axios";
import DeleteBox from "./DeleteBox";
import { useState } from "react";
import Button from "react-bootstrap/Button";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const SortableItem = ({
  index,
  id,
  tableData,
  setTableData,
  formId,
  setUpdateItem,
  setFormData,
  formData,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id });

  const [enable, setEnable] = useState(true);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const deleteRecord = async (index, val) => {
    // if (window.confirm("Are you sure to delete this item?") === true) {
    setEnable(!enable);
    const values = { ...tableData };
    // const id = values?.formControls[index]?.controlId;
    console.log(tableData);
    const id = values?.formId;
    const updatedFormcontrol = values?.formControls.map((obj) => {
      if (obj.controlId === val.controlId) {
        obj.visibility = !val.visibility;
      }
      return obj;
    });
    console.log(updatedFormcontrol);
    const values2 = { ...tableData, formControls: updatedFormcontrol };

    if (id) {
      axios
        // .delete(`${BASE_URL}api/v1/${formId}/formControls/${id}`)

        .put(`${BASE_URL}admin-service/api/v2/forms/${id}`, values2, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then(function (res) {
          toast.success(
            res.data.formControls[index].visibility
              ? "enabled Successfully!"
              : "disabled Successfully! "
          );

          setTableData(values2);
          console.log(res);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      // values2.formControls.splice(index, 1);
      // setTableData(values2);
    }

    setUpdateItem(0);
    // } else {
    //   return;
    // }
  };

  const renderRecord = (index) => {
    console.log(index);
    const values = tableData.formControls[index];
    setFormData(values);
    console.log(values);
    setUpdateItem(index + 1);
  };

  return (
    <tr className="" key={index} ref={setNodeRef} style={style}>
      <td className="px-1 text-center" scope="row">
        <button
          className="btn shadow-none px-2 py-0"
          {...attributes}
          {...listeners}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-list"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
            />
          </svg>
        </button>
      </td>
      <td className="px-1">
        <button
          className="btn shadow-none px-2 py-0"
          onClick={() => renderRecord(index)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-pencil-square"
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
      <td className="px-1 text-center" scope="row">
        {/* <DeleteBox deleteRecord={deleteRecord} index={index} /> */}
        <Button
          variant={enable ? "secondary btn-sm ms-1" : "primary btn-sm ms-1"}
          onClick={() => deleteRecord(index, id)}
        >
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-trash"
            viewBox="0 0 16 16"
          >
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
            <path
              fill-rule="evenodd"
              d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
            />
          </svg> */}
          {id.visibility ? "off" : "on"}
        </Button>
      </td>

      <td className="px-1 text-center" scope="row">
        {id.sequence}
      </td>
      <td className="px-1">{id?.caption}</td>
      <td className="px-1"> {id?.dataType}</td>
      <td className="px-1"> {id?.tooltip}</td>

      <td className="px-1 text-center">{id?.minValue}</td>
      <td className="px-1 text-center">{id?.equalTo}</td>
      <td className="px-1 text-center">{id?.maxValue}</td>
    </tr>
  );
};

export default SortableItem;
