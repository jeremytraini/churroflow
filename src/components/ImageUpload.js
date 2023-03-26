import React, { useState, useEffect } from "react";
import APIService from "../services/APIService";

const ImageUpload = () => {
  const [currentFile, setCurrentFile] = useState(undefined);
  const [previewImage, setPreviewImage] = useState(undefined);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");
  const [invoiceData, setInvoiceData] = useState([]);

  // useEffect(() => {
  //   UploadService.getFileList().then((response) => {
  //     // setImageInfos(response.data);
  //     console.log(response.data);
  //   });
  // }, []);



  const selectFile = (event) => {
    setCurrentFile(event.target.files[0]);
    setPreviewImage(URL.createObjectURL(event.target.files[0]));
    setProgress(0);
    setMessage("");
  };

  const upload = () => {
    setProgress(0);

    // Set invoiceData to text of xml file in currentFile
    const reader = new FileReader();
    reader.onload = function (e) {
      setInvoiceData(e.target.result);
    };

    reader.readAsText(currentFile);

    APIService.upload(currentFile, (event) => {
      setProgress(Math.round((100 * event.loaded) / event.total));
    }).then((response) => {
      setMessage(response.data.report_id);
      return APIService.getReport(response.data.report_id);
    }).then((report) => {
      console.log(report.data);
    }).catch((err) => {
      setProgress(0);

      if (err.response && err.response.data && err.response.data.message) {
        setMessage(err.response.data.message);
      } else {
        setMessage("Could not upload the invoice!");
      }

      setCurrentFile(undefined);
    });
  };

  return (
    <div>
      <div className="row">
        <div className="col-8">
          <label className="btn btn-default p-0">
            <input type="file" accept=".xml" onChange={selectFile} />
          </label>
        </div>

        <div className="col-4">
          <button
            className="btn btn-success btn-sm"
            disabled={!currentFile}
            onClick={upload}
          >
            Upload
          </button>
        </div>
      </div>

      {currentFile && (
        <div className="progress my-3">
          <div
            className="progress-bar progress-bar-info"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin="0"
            aria-valuemax="100"
            style={{ width: progress + "%" }}
          >
            {progress}%
          </div>
        </div>
      )}

      {previewImage && (
        <div>
          <img className="preview" src={previewImage} alt="" />
        </div>
      )}

      {message && (
        <div className="alert alert-secondary mt-3" role="alert">
          {message}
        </div>
      )}

      {invoiceData && (
        <div className="card mt-3">
          <div className="card-header">Invoice text:</div>
            <div className="card-body">
              {invoiceData}
            </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
