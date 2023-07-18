import React, { useState, useEffect } from "react";
import TextField from "../datatype/TextField";
import LabelField from "../datatype/LabelField";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import DateField from "../datatype/DateField";
import FilledFormData from "../components/FilledFormData";
import axios from "axios";
import { toast } from "react-toastify";
import moment from "moment/moment";
import RadioButton from "../datatype/RadioButton";
import CheckBox from "../datatype/CheckBox";
import File from "../datatype/File";
import Email from "../datatype/Email";
import DataList from "../fieldtype/DataList";

const FillForm = ({
  updateForm,
  availableForm,
  screenTitle,
  formId,
  formCaption,
}) => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const MIN_FILE_SIZE = process.env.REACT_APP_MIN_FILE_SIZE;
  const MAX_FILE_SIZE = process.env.REACT_APP_MAX_FILE_SIZE;

  console.log(MIN_FILE_SIZE, "initials checks", MAX_FILE_SIZE, "===", BASE_URL);
  console.log(process.env, "process-----");

  const [formData, setFormData] = useState({});
  const [tableData, setTableData] = useState({ records: [] });
  const [updateItem, setUpdateItem] = useState(0);
  const [startDate, setStartDate] = useState(new Date());
  const [isAdded, setAdd] = useState(false);
  const [selectedFile, setSelectedFile] = useState({});
  const [errorMsg, setErrorMsg] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // const formId = availableForm[updateForm].formId;

  const onFormChange = (e, date) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData({ ...formData, [name]: value });
  };

  const onDateChange = (date, name) => {
    setFormData({ ...formData, [name]: date.valueOf() });
    setStartDate(date);
  };

  const handleReset = () => {
    const key = Object.keys(formData);
    const values = { ...formData };

    for (let i = 0; i < key.length; i++) {
      values[key[i]] = "";
    }

    setFormData(values);
    setUpdateItem(0);
  };

  const validateEmail = () => {
    const pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    if (!pattern.test(formData.Email))
      alert("Please provide a valid email address");
    else alert("Logged In Successfull!");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    validateSelectedFile();
    // validateEmail();

    const values = { ...formData, formId: formId, formCaption: formCaption };

    console.log(values);
    console.log(values.id);
    // delete values.id;

    if (tableData.length === 0) setUpdateItem(0);

    //adding fields data into the list
    if (updateItem === 0) {
      await axios
        // .post(`${BASE_URL}api/v1/table/${formId}/records`, values, {
        .post(`${BASE_URL}transact-service/api/v2/forms/${formId}`, values, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then(function (res) {
          console.log(res);
          toast.success(`Record Stored Successfully!`);
          setAdd(!isAdded);
        })
        .catch(function (error) {
          toast.error(error?.response?.data?.message);

          console.log(error);
        });
    } else {
      //updating existing field entry
      await axios
        .put(
          `${BASE_URL}api/v1/table/${formId}/records?id=${formData.id}`,
          values,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then(function (res) {
          toast.success(`Updated Successfully!`);
          setAdd(!isAdded);
        })
        .catch(function (error) {
          toast.error(` ${error?.response?.data?.message} `);
          console.log(error);
        });
    }

    handleReset();
    setUpdateItem(0);
  };

  const handleFileChange = (event) => {
    if (event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
      console.log(event.target.files[0].name);
      console.log(event.target.files[0]);
    }

    // validateSelectedFile();
  };

  const validateSelectedFile = () => {
    console.log(BASE_URL, "=========base");
    // console.log(MIN_FILE_SIZE, "--check---", MAX_FILE_SIZE);
    console.log("validating......");
    console.log(selectedFile, "...size...");
    // const MIN_FILE_SIZE = 1024; // 1MB
    // const MAX_FILE_SIZE = 5120; // 5MB

    if (!selectedFile) {
      setErrorMsg("Please choose a file");
      setIsSuccess(false);
      return;
    }

    const fileSizeKiloBytes = selectedFile.size / 1024;
    console.log(selectedFile.size);
    if (fileSizeKiloBytes < MIN_FILE_SIZE) {
      setErrorMsg("File size is less than minimum limit");
      alert("File size is less than minimum limit");
      setIsSuccess(false);
      return;
    }
    if (fileSizeKiloBytes > MAX_FILE_SIZE) {
      setErrorMsg("File size is greater than maximum limit");
      alert("File size is greater than 10 Mb");
      setIsSuccess(false);
      return;
    }

    setErrorMsg("");
    setIsSuccess(true);
  };

  const renderItem = (value, name, cname) => {
    switch (value.toLowerCase()) {
      case "textfield":
        console.log(cname);
        return (
          <TextField
            name={cname}
            placeholder={value.placeholder}
            onFormChange={onFormChange}
            formData={formData}
          />
        );

      case "date":
        return (
          <DateField
            name={name}
            onDateChange={(date, name) => onDateChange(date, name)}
            // setStartDate={setStartDate}
            // startDate={moment(startDate).format("MM-DD-YYYY")}
            formData={formData}
          />
        );

      case "number":
        return (
          <TextField
            name={value.placeholder}
            placeholder={value.placeholder}
            onFormChange={onFormChange}
            formData={formData}
          />
        );

      case "radiobutton":
        return <RadioButton />;

      case "checkbox":
        return <CheckBox />;

      case "file":
        return <File handleFileChange={handleFileChange} />;
      case "list":
        return <DataList onFormChange={onFormChange} />;
      case "email":
        return <Email onFormChange={onFormChange} />;
      default:
        break;
    }
  };

  const getData = async () => {
    await axios
      .get(`${BASE_URL}transact-service/api/v2/forms/`)
      .then(function (res) {
        const values = res?.data?.reverse();
        setTableData(values);
      })
      .catch(function (error) {
        console.log(error);
        toast.error(`Fetching Data Failed `);
      });
  };

  useEffect(() => {
    // getData();
  }, [formId, isAdded]);

  return (
    <>
      <div className="col-sm-8 bg-white m-auto">
        <h4>{screenTitle}</h4>
        <div className="card m-2 shadow  mb-2 bg-body rounded">
          <div className="card-body p-0">
            <div className="row">
              <form onSubmit={handleSubmit}>
                <div className="col-12 p-1">
                  <div className="bg-light p-2">
                    <div>
                      <Card className="w-100 border-2 mb-2">
                        <Card.Body>
                          <div className="row mb-2">
                            {availableForm?.length > 0 &&
                              availableForm?.[updateForm]?.formControls.map(
                                (value, index) => (
                                  <div className="col-6 mb-2" key={index}>
                                    <LabelField
                                      label={value.caption}
                                      tooltip={value.tooltip}
                                    />
                                    {renderItem(
                                      value.dataType,
                                      value.caption.split(" ").join(""),
                                      value.controlName
                                    )}
                                  </div>
                                )
                              )}
                            <div className="row">
                              <div className="d-flex justify-content-end">
                                <Button
                                  variant="btn btn-outline-primary btn-sm"
                                  onClick={handleReset}
                                >
                                  Reset
                                </Button>
                                <Button
                                  variant="primary btn-sm ms-1"
                                  type="submit"
                                >
                                  Save
                                </Button>
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
                  {tableData?.length > 0 && (
                    <FilledFormData
                      tableData={tableData}
                      availableForm={availableForm}
                      updateForm={updateForm}
                      setTableData={setTableData}
                      setUpdateItem={setUpdateItem}
                      setFormData={setFormData}
                      formId={formId}
                    />
                  )}
                </div>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default FillForm;
