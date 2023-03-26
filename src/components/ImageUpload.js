import React, { useState, useEffect } from "react";
import APIService from "../services/APIService";

import CodeMirror from '@uiw/react-codemirror';
import { xml } from '@codemirror/lang-xml';



const ImageUpload = () => {
  const onChange = React.useCallback((value, viewUpdate) => {
    setInvoiceChanged(true);
  }, []);

  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");
  const [invoiceData, setInvoiceData] = useState("");
  const [invoiceChanged, setInvoiceChanged] = useState(false);

  const run = () => {
    APIService.uploadText(invoiceData, (event) => {
      setProgress(Math.round((100 * event.loaded) / event.total));
    }).then((response) => {
      return APIService.getReport(response.data.report_id);
    }).then((report) => {
      setInvoiceChanged(false);
      console.log(report.data);
    }).catch((err) => {
      setProgress(0);

      if (err.response && err.response.data && err.response.data.message) {
        setMessage(err.response.data.message);
      } else {
        setMessage("Could not upload the invoice!");
      }

    });
  }

  const upload = (event) => {
    if (!event.target.files[0]) {
      return;
    }
    
    setProgress(0);

    // Set invoiceData to text of xml file in currentFile
    const reader = new FileReader();
    reader.onload = function (e) {
      setInvoiceData(e.target.result);
    };

    reader.readAsText(event.target.files[0]);

    setInvoiceChanged(true);
  };

  return (
    <>
      <div className="row h-100">
        <div className="col-md-5 col-lg-2 d-md-block bg-light sidebar collapse">
          <label className="btn btn-success btn-sm">
            <input type="file" accept=".xml" onChange={upload} />
          </label>

          {/* {true && (
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
          )} */}

          {message && (
            <div className="alert alert-secondary mt-3" role="alert">
              {message}
            </div>
          )}
        </div>

        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-1">
          <CodeMirror
            value={invoiceData}
            style={{
              outline: "none"
              }}
            height="100%"
            extensions={[xml()]}
            onChange={onChange}
          />
          { invoiceChanged && (
            <button className="btn btn-success btn-lg" id="run-button" onClick={run}>Run</button>
          )}
        </main>
      </div>
    </>
  );
};

export default ImageUpload;
