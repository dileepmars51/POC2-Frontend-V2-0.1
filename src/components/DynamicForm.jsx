import React, { useEffect, useState, createContext } from "react";
import TableData from "./TableData";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import FillForm from "../crud/FillForm";
import axios from "axios";
import DeleteForm from "../crud/DeleteForm";
import { toast } from "react-toastify";
import Number from "../fieldtype/Number";
import Slider from "../fieldtype/Slider";
import Dropdown from "../fieldtype/Dropdown";
import DataList from "../fieldtype/DataList";
import RadioButton from "../fieldtype/RadioButton";
import CheckBox from "../fieldtype/CheckBox";

const FormContext = createContext();
const BASE_URL = process.env.REACT_APP_BASE_URL;

const DynamicForm = () => {
  const [formData, setFormData] = useState({});
  const [tableData, setTableData] = useState({ formControls: [] });
  const [availableForm, setAvailableForm] = useState({});
  const [updateItem, setUpdateItem] = useState(0);
  const [formState, setFormState] = useState({});
  const [selectedFieldType, setFieldType] = useState(false);
  const [size, setSize] = useState("");
  const [enable, setEnable] = useState(true);

  const optionList = [
    {
      label: "TextField",
      val: "TextField",
    },
    {
      label: "Date",
      val: "Date",
    },
    {
      label: "Number",
      val: "Number",
    },
    {
      label: "RadioButton",
      val: "RadioButton",
    },
    {
      label: "CheckBox",
      val: "CheckBox",
    },
    {
      label: "Slider",
      val: "Slider",
    },
    {
      label: "List",
      val: "List",
    },
    {
      label: "DataList",
      val: "DataList",
    },
    {
      label: "File",
      val: "File",
    },
    {
      label: "Email",
      val: "Email",
    },
  ];

  const onFormChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name === "size") setSize(value);
    // if (name === "dataType" && value === "Number") setNumberSelected(true);
    // if (name === "dataType" && value !== "Number") setNumberSelected(false);
    if (name === "dataType") setFieldType(value);
    console.log(name, ": ", value);
    setFormData({ ...formData, [name]: value });
  };

  /**
   * checks if entry already exist or not
   * with same label name
   */
  const doesItemExist = () => {
    let isItemExist;

    for (let i = 0; i < tableData?.formControls?.length; i++) {
      if (tableData?.formControls[i]?.caption === formData?.caption)
        isItemExist = true;
    }

    return isItemExist;
  };

  const deleteForm1 = async (id) => {
    console.log("enable ? " + enable);
    setEnable(!enable);
    let obj = availableForm.find((obj) => obj.formId == id);

    console.log(obj);
    const deleteFormData = {
      formId: id,
      formCaption: obj.formCaption,
      formDescription: obj.formDescription,
      formVisibility: enable ? false : true,
      formControls: obj.formControls,
    };

    await axios
      .put(`${BASE_URL}admin-service/api/v2/forms/${id}`, deleteFormData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(function (res) {
        toast.success(
          `${
            formData?.formCaption ||
            availableForm[formState?.formIndex]?.formCaption
          } ${
            res.data.formVisibility
              ? "enabled Successfully!"
              : "disabled Successfully"
          }}`
        );
        const values = [...availableForm];
        values.splice(formState?.formIndex, 1);
        values.splice(formState?.formIndex, 0, res?.data);
        setAvailableForm(values);
      })
      .catch(function (error) {
        toast.error(` ${error?.response?.data?.message} `);
        console.log(error);
      });
  };

  const doesFormExist = () => {
    let isFormExist;

    for (let i = 0; i < availableForm.length; i++) {
      if (availableForm[i].formCaption === formData?.formCaption)
        isFormExist = true;
    }

    return isFormExist;
  };

  const handleReset = () => {
    setFormData({
      caption: "",
      dataType: "TextField",
      formCaption: formData?.formCaption,
      formDescription: formData?.formDescription,
      tooltip: "",
      minValue: 0,
      equalTo: 0,
      maxValue: 0,
    });
    setUpdateItem(0);
    // setNumberSelected(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (doesItemExist() && updateItem === 0) {
      alert("Item Already Exist!");
      return;
    }
    if (tableData?.formControls?.length === 0) setUpdateItem(0);

    //adding formControls data into the list
    if (updateItem === 0) {
      const values = {
        ...formData,
        visibility: true,
        sequence: tableData.formControls.length + 1,
      };
      setTableData((prevState) => ({
        formControls: [...prevState.formControls, values],
      }));

      console.log(values);
    } else {
      //updating selected record
      const values = { ...tableData };
      values.formControls[updateItem - 1].caption = formData?.caption;
      values.formControls[updateItem - 1].dataType = formData?.dataType;
      values.formControls[updateItem - 1].tooltip = formData?.tooltip;
      values.formControls[updateItem - 1].val01 = formData?.val01;
      values.formControls[updateItem - 1].val02 = formData?.val02;
      values.formControls[updateItem - 1].val03 = formData?.val03;
      console.log(values);
      setTableData(values);
    }

    // console.log(values)
    handleReset();
    setUpdateItem(0);
  };

  const createNewForm = () => {
    setFormState({
      ...formState,
      formIndex: -1,
      screenTitle: "Create",
      loadFillForm: false,
      isNewForm: true,
      loadDeleteForm: false,
    });
    setFormData({
      dataType: "",
      caption: "",
      visibility: true,
      pattern: "string",
      minValue: 0,
      equalTo: 0,
      maxValue: 0,
    });
    setTableData({ formControls: [] });
  };

  const saveForm = async () => {
    const formValues = {
      formCaption: formData?.formCaption,
      formDescription: formData?.formDescription,
      formVisibility: true,
    };
    const values = { ...formValues, ...tableData };
    const values2 = {
      formCaption: "string",
      formDescription: "string",
      formControls: [
        {
          caption: "string",
          tooltip: "string",
          dataType: "CHECK_BOX",
          sequence: 0,
          minValue: "0",
          equalTo: "0",
          maxValue: "0",
          step: 0,
          placeHolder: "string",
          defaultValue: "string",
          visibility: true,
          pattern: "string",
          multiAttributes: [
            {
              caption: "string",
              value: "string",
              checked: false,
            },
            {
              caption: "string",
              value: "string",
              checked: true,
            },
            {
              caption: "string",
              value: "string",
              checked: false,
            },
          ],
        },
      ],
    };

    console.log(values);

    await axios
      .post(`${BASE_URL}admin-service/api/v2/forms/`, values, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(function (res) {
        console.log(res);

        if (res.status === 200 || res.status === 201) {
          toast.success(`${formData?.formCaption} Created Successfully!`);
          setAvailableForm([...availableForm, res?.data]);
        } else {
          toast.error(` ${res?.data?.message} `);
        }
      })
      .catch(function (error) {
        toast.error(` ${error?.response?.data?.message} `);
        console.log(error);
      });
  };

  const updateForm = async (id, values) => {
    const formControlsData = [...tableData.formControls];

    for (let i = 0; i < formControlsData.length; i++) {
      formControlsData[i].sequence = i + 1;
    }

    // const temp = {
    //   formId: 6,
    //   formCaption: "xyz1",
    //   formDescription: "uu",
    //   formVisibility: true,
    //   formControls: [
    //     {
    //       controlId: 5,
    //       controlName: "lastname_5",
    //       caption: "lastname",
    //       tooltip: "nndj",
    //       dataType: "TextField",
    //       sequence: 1,
    //       maxValue: 0,
    //       minValue: 0,
    //       equalTo: 0,
    //       step: 0,
    //       placeHolder: null,
    //       defaultValue: null,
    //       pattern: null,
    //       visibility: false,
    //       controlMultiAttributes: [],
    //     },
    //   ],
    // };

    const updatedFormData = {
      formId: id,
      formCaption: formData.formCaption || values.formCaption,
      formDescription: formData.formDescription || values.formDescription,
      formVisibility: true,
      formControls: formControlsData,
    };
    console.log("===", values);

    await axios
      .put(`${BASE_URL}admin-service/api/v2/forms/${id}`, updatedFormData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(function (res) {
        toast.success(
          `${
            formData?.formCaption ||
            availableForm[formState?.formIndex]?.formCaption
          }  Updated Successfully!`
        );
        const values = [...availableForm];
        values.splice(formState?.formIndex, 1);
        values.splice(formState?.formIndex, 0, res?.data);
        setAvailableForm(values);
      })
      .catch(function (error) {
        toast.error(` ${error?.response?.data?.message} `);
        console.log(error);
      });
  };

  // saving/updating the form
  const generateForm = async () => {
    if (tableData?.formControls.length === 0) return; //form must have one entry
    if (doesFormExist() && formState?.formIndex < 0) {
      alert("Form already exist with the same name!");
      return;
    }

    //cheking if entered form_name exist or not
    if (!doesFormExist() && formState?.formIndex < 0) {
      console.log(tableData);
      saveForm();
    }

    //updates the caption and description
    if (formState?.formIndex >= 0) {
      const values = {
        formId: 0,
        formCaption:
          formData?.formCaption ||
          availableForm[formState?.formIndex]?.formCaption,
        formDescription:
          formData?.formDescription ||
          availableForm[formState?.formIndex]?.formDescription,
        formControls: tableData?.formControls,
        formVisibility: tableData?.formVisibility,
      };

      const id = availableForm[formState?.formIndex]?.formId;
      updateForm(id, values);
    }

    //releasing resources
    setFormState({ ...formState, isNewForm: false });
    setFormData({});
    setTableData({ formControls: [] });
  };

  const renderDefinedForm = async (index) => {
    setFormState({
      ...formState,
      screenTitle: "Update",
      loadFillForm: false,
      formId: availableForm[index]?.formId,
      isNewForm: true,
      loadDeleteForm: false,
      formIndex: index,
    });

    await axios
      .get(
        `${BASE_URL}admin-service/api/v2/forms/${availableForm[index]?.formId}`
      )
      .then(function (res) {
        console.log(res?.data);
        setTableData(res?.data);
      })
      .catch(function (error) {
        console.log(error);
      });

    const formValues = {
      formCaption: availableForm[index]?.formCaption,
      formDescription: availableForm[index]?.formDescription,
    };

    setFormData(formValues);
    setEnable(availableForm[index].formVisibility);
  };
  //deleteing form control
  // const deleteFormControl = async () => {
  //   const formControlsData = [...tableData.formControls];
  //   const deleteFormData = {
  //     formId: id,
  //     formCaption: formData.formCaption || values.formCaption,
  //     formDescription: formData.formDescription || values.formDescription,
  //     formVisibility: true,
  //     formControls: formControlsData,
  //   };
  //   console.log("===", values);

  //   await axios
  //     .put(`${BASE_URL}admin-service/api/v2/forms/${id}`, deleteFormData, {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     })
  //     .then(function (res) {
  //       toast.success(
  //         `${
  //           formData?.formCaption ||
  //           availableForm[formState?.formIndex]?.formCaption
  //         }  deleted Successfully!`
  //       );
  //       const values = [...availableForm];
  //       values.splice(formState?.formIndex, 1);
  //       values.splice(formState?.formIndex, 0, res?.data);
  //       setAvailableForm(values);
  //     })
  //     .catch(function (error) {
  //       toast.error(` ${error?.response?.data?.message} `);
  //       console.log(error);
  //     });
  // };
  const deleteForm = (index) => {
    setFormState({
      ...formState,
      isNewForm: false,
      loadDeleteForm: true,
      loadFillForm: false,
      formIndex: index,
    });
    const formValues = {
      formCaption: availableForm[index]?.formCaption,
      formDescription: availableForm[index]?.formDescription,
      status: "delete",
    };
    setTableData(availableForm[index]);
    setFormData(formValues);
  };

  const selectForm = (index) => {
    setFormState({
      ...formState,
      isNewForm: false,
      loadDeleteForm: false,
      loadFillForm: true,
      formIndex: index,
      screenTitle: `Fill ${availableForm[index]?.formCaption}`,
      formId: availableForm[index].formId,
      formCaption: availableForm[index].formCaption,
    });
  };

  const renderSelectedField = (fieldType) => {
    switch (fieldType) {
      case "Number":
        return <Number onFormChange={onFormChange} formData={formData} />;

      case "Slider":
        return <Slider />;

      case "List":
        return (
          <Dropdown
            onFormChange={onFormChange}
            formData={formData}
            size={size}
          />
        );

      case "DataList":
        return <DataList onFormChange={onFormChange} formData={formData} />;

      case "RadioButton":
        return <RadioButton onFormChange={onFormChange} formData={formData} />;

      case "CheckBox":
        return <CheckBox onFormChange={onFormChange} formData={formData} />;
      default:
        break;
    }
  };

  const getData = async () => {
    await axios
      .get(`${BASE_URL}admin-service/api/v2/forms`)
      .then(function (res) {
        console.log(res?.data);
        setAvailableForm(res?.data);
      })
      .catch(function (error) {
        console.log(error);
        toast.error(`Fetching Data Failed `);
      });
  };

  useEffect(() => {
    setFormState({
      loadFillForm: false,
      loadDeleteForm: false,
      isNewForm: false,
      screenTitle: "",
      formId: -1,
      formIndex: -1,
    });
    getData();
  }, []);

  return (
    <FormContext.Provider value={tableData}>
      <div className="container-fluid">
        <div className="row vh-100">
          <div className="col-sm-2 mb-3 mb-sm-0 bg-light border-end">
            <div className="d-flex flex-column">
              <div className="mt-3 text-center">
                <button
                  className="btn btn-primary btn-sm"
                  onClick={createNewForm}
                  data-testid="create"
                >
                  + Create New Form
                </button>
              </div>
              <div className="mt-4 bg-white text-center">
                <div className="p-1 border-bottom fw-bold">Manage Forms</div>

                {availableForm?.length > 0 &&
                  availableForm?.map((val, index) => (
                    <div className="d-flex justify-content-between border-bottom">
                      <div className="p-2">{val.formCaption}</div>

                      <div className="d-flex flex-row-reverse bd-highlight">
                        {/* <button
                          className="btn shadow-none px-2"
                          onClick={() => deleteForm(index)}
                        >
                          <a title="Delete Form">
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
                          </a>
                        </button> */}
                        <button
                          className="btn shadow-none px-2"
                          onClick={() => selectForm(index)}
                        >
                          <a title="Fill Form">
                            <svg
                              width="1em"
                              height="1em"
                              xmlns="http://www.w3.org/2000/svg"
                              shape-rendering="geometricPrecision"
                              text-rendering="geometricPrecision"
                              image-rendering="optimizeQuality"
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              viewBox="0 0 441 512.02"
                            >
                              <path d="M324.87 279.77c32.01 0 61.01 13.01 82.03 34.02 21.09 21 34.1 50.05 34.1 82.1 0 32.06-13.01 61.11-34.02 82.11l-1.32 1.22c-20.92 20.29-49.41 32.8-80.79 32.8-32.06 0-61.1-13.01-82.1-34.02-21.01-21-34.02-50.05-34.02-82.11s13.01-61.1 34.02-82.1c21-21.01 50.04-34.02 82.1-34.02zM243.11 38.08v54.18c.99 12.93 5.5 23.09 13.42 29.85 8.2 7.01 20.46 10.94 36.69 11.23l37.92-.04-88.03-95.22zm91.21 120.49-41.3-.04c-22.49-.35-40.21-6.4-52.9-17.24-13.23-11.31-20.68-27.35-22.19-47.23l-.11-1.74V25.29H62.87c-10.34 0-19.75 4.23-26.55 11.03-6.8 6.8-11.03 16.21-11.03 26.55v336.49c0 10.3 4.25 19.71 11.06 26.52 6.8 6.8 16.22 11.05 26.52 11.05h119.41c2.54 8.79 5.87 17.25 9.92 25.29H62.87c-17.28 0-33.02-7.08-44.41-18.46C7.08 432.37 0 416.64 0 399.36V62.87c0-17.26 7.08-32.98 18.45-44.36C29.89 7.08 45.61 0 62.87 0h173.88c4.11 0 7.76 1.96 10.07 5l109.39 118.34c2.24 2.43 3.34 5.49 3.34 8.55l.03 119.72c-8.18-1.97-16.62-3.25-25.26-3.79v-89.25zm-229.76 54.49c-6.98 0-12.64-5.66-12.64-12.64 0-6.99 5.66-12.65 12.64-12.65h150.49c6.98 0 12.65 5.66 12.65 12.65 0 6.98-5.67 12.64-12.65 12.64H104.56zm0 72.3c-6.98 0-12.64-5.66-12.64-12.65 0-6.98 5.66-12.64 12.64-12.64h142.52c3.71 0 7.05 1.6 9.37 4.15a149.03 149.03 0 0 0-30.54 21.14H104.56zm0 72.3c-6.98 0-12.64-5.66-12.64-12.65 0-6.98 5.66-12.64 12.64-12.64h86.2c-3.82 8.05-6.95 16.51-9.29 25.29h-76.91zm217.38 76.85-42.81 11.41 6.17-45.93 36.64 34.52zm-27.2-44.95 42.04-47.95c.7-.82 1.74-1.31 2.82-1.34.68-.02 1.34.12 1.93.44l32.62 29.65c.64.6 1.04 1.44 1.05 2.34.03.99-.39 1.97-1.15 2.62l-42.8 48.76-36.56-34.52h.05z" />
                            </svg>
                          </a>
                        </button>

                        <button
                          className="btn shadow-none px-2"
                          onClick={() => renderDefinedForm(index)}
                        >
                          <a title="Update Form">
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
                          </a>
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {formState?.loadFillForm && (
            <FillForm
              updateForm={formState?.formIndex}
              availableForm={availableForm}
              screenTitle={formState?.screenTitle}
              formId={formState?.formId}
              formCaption={formState?.formCaption}
            />
          )}

          {formState?.loadDeleteForm && (
            <DeleteForm
              tableData={tableData}
              formData={formData}
              availableForm={availableForm}
              setAvailableForm={setAvailableForm}
              setFormState={setFormState}
              formState={formState}
            />
          )}

          {formState?.isNewForm && (
            <div className="col-sm-8 bg-white m-auto">
              <h4>
                {formState?.screenTitle} {formData?.formCaption}
              </h4>
              <div className="card m-2 shadow  mb-2 bg-body rounded">
                <div className="card-body p-0">
                  <div className="row">
                    <form onSubmit={handleSubmit}>
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
                                        onChange={onFormChange}
                                        name="formCaption"
                                        value={formData?.formCaption}
                                        required
                                        //readOnly={!formData?.formVisibility}
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
                                        hthandleSubmitmlFor="description"
                                        onChange={onFormChange}
                                        name="formDescription"
                                        value={formData?.formDescription}
                                        required
                                        //readOnly={!formData?.formVisibility}
                                      ></input>
                                    </div>
                                    <br />
                                    <div className="d-flex justify-content-end">
                                      <Button
                                        variant={
                                          enable
                                            ? "secondary btn-sm ms-1"
                                            : "primary btn-sm ms-1"
                                        }
                                        onClick={() =>
                                          deleteForm1(formState?.formId)
                                        }
                                      >
                                        {enable ? "Disable" : "Enable"}
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </Card.Body>
                            </Card>

                            <Card className="w-100 border-2 mb-2">
                              <Card.Body>
                                <div className="row mb-2">
                                  <div className="col-4">
                                    <div className="">
                                      <label className="form-label infoLabel mb-1">
                                        Field Name
                                      </label>
                                      <span className="text-danger">*</span>
                                    </div>
                                    <div className="">
                                      <input
                                        id="label"
                                        type="text"
                                        placeholder="Label Name"
                                        className="form-control form-control-sm"
                                        htmlFor="display-label"
                                        onChange={onFormChange}
                                        name="caption"
                                        value={formData?.caption}
                                        //readOnly={!formData?.formVisibility}
                                        required
                                      ></input>
                                    </div>
                                  </div>
                                  <div className="col-4">
                                    <div className="">
                                      <label className="form-label infoLabel mb-1">
                                        Field Type
                                      </label>
                                      <span className="text-danger">*</span>
                                    </div>
                                    <div className="">
                                      <select
                                        className="form-select form-select-sm"
                                        onChange={onFormChange}
                                        name="dataType"
                                        required
                                        //readOnly={!formData.formVisibility}
                                      >
                                        <option selected disabled value="">
                                          Select...
                                        </option>
                                        {optionList &&
                                          optionList.map((item) =>
                                            item?.label?.toLowerCase() ===
                                            formData?.dataType?.toLowerCase() ? (
                                              <option selected value={item.val}>
                                                {item.label}
                                              </option>
                                            ) : (
                                              <option
                                                key={item.val}
                                                value={item.val}
                                              >
                                                {item.label}
                                              </option>
                                            )
                                          )}
                                      </select>
                                    </div>
                                  </div>
                                  <div className="col-4">
                                    <div className="">
                                      <label className="form-label infoLabel mb-1">
                                        Tooltip
                                        <span className="px-1">
                                          <a title="The tooltip description you type here will be displayed this way next to this field. If not needed, do not add any input">
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="16"
                                              height="16"
                                              fill="darkblue"
                                              class="bi bi-info-circle"
                                              viewBox="0 0 16 16"
                                            >
                                              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path>

                                              <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path>
                                            </svg>
                                          </a>
                                        </span>
                                      </label>
                                    </div>
                                    <div className="">
                                      <input
                                        id="label-name"
                                        type="text"
                                        placeholder="Tooltip Description"
                                        className="form-control form-control-sm"
                                        htmlFor="tooltip"
                                        onChange={onFormChange}
                                        name="tooltip"
                                        value={formData?.tooltip}
                                        //readOnly={!formData.visibility}
                                      ></input>
                                    </div>
                                  </div>
                                </div>
                                {selectedFieldType !== "" &&
                                  // <Number
                                  //   onFormChange={onFormChange}
                                  //   formData={formData}
                                  // />
                                  renderSelectedField(selectedFieldType)}

                                <div className="d-flex justify-content-end">
                                  <Button
                                    variant="btn btn-outline-primary btn-sm"
                                    // type="reset"
                                    onClick={handleReset}
                                  >
                                    Reset
                                  </Button>
                                  <Button
                                    variant="primary btn-sm ms-1"
                                    type="submit"
                                  >
                                    Add Field
                                  </Button>
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
                        {tableData?.formControls?.length > 0 && (
                          <TableData
                            tableData={tableData}
                            setTableData={setTableData}
                            setUpdateItem={setUpdateItem}
                            setFormData={setFormData}
                            formData={formData}
                            formId={formState?.formId}
                          />
                        )}
                      </div>

                      <div className="row p-2">
                        <div className="col-12 d-flex flex-row-reverse">
                          <div>
                            <button
                              className="btn btn-primary btn-sm"
                              onClick={generateForm}
                            >
                              Save Form
                            </button>
                          </div>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </FormContext.Provider>
  );
};

export default DynamicForm;
