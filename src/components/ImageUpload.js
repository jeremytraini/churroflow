import React, { useState, useEffect } from "react";
import APIService from "../services/APIService";

import CodeMirror from '@uiw/react-codemirror';
import { xml } from '@codemirror/lang-xml';

const ImageUpload = () => {
  // const onChange = React.useCallback((value, viewUpdate) => {
  //   console.log('value:', value);
  // }, []);

  const [currentFile, setCurrentFile] = useState(undefined);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");
  const [invoiceData, setInvoiceData] = useState(undefined);

  // useEffect(() => {
  //   UploadService.getFileList().then((response) => {
  //     // setImageInfos(response.data);
  //     console.log(response.data);
  //   });
  // }, []);

  const selectFile = (event) => {
    setCurrentFile(event.target.files[0]);
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
      // setMessage(response.data.report_id);
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

        <div className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
          <label className="btn btn-default p-0">
            <input type="file" accept=".xml" onChange={selectFile} />
          </label>

          <button
            className="btn btn-success btn-sm"
            disabled={!currentFile}
            onClick={upload}
          >
            Upload
          </button>
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

          {message && (
            <div className="alert alert-secondary mt-3" role="alert">
              {message}
            </div>
          )}
        </div>

        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-1">
          {invoiceData && (
            <CodeMirror
              value={invoiceData}
              style={{outline: "none"}}
              height="1000px"
              extensions={[xml()]}
              // onChange={onChange}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default ImageUpload;
