import React, { useState, useEffect } from "react";
import APIService from "../services/APIService";

import CodeMirror from '@uiw/react-codemirror';
import { xml } from '@codemirror/lang-xml';
import {linter, lintGutter, Diagnostic} from "@codemirror/lint";

const ImageUpload = () => {

  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");
  const [invoiceData, setInvoiceData] = useState("");
  const [invoiceChanged, setInvoiceChanged] = useState(false);
  const [errorResponse, setErrorResponse] = useState([]);

  const normaliseLineEndings = (str, normalized = '\n') =>
    str.replace(/\r?\n/g, normalized);

  const upload = (event) => {
    if (!event.target.files[0]) {
      return;
    }
    
    setProgress(0);

    // Set invoiceData to text of xml file in currentFile
    const reader = new FileReader();
    reader.onload = function (e) {
      // Set code mirror value to xml file
      setInvoiceData(normaliseLineEndings(e.target.result));
      setInvoiceChanged(true);
    };

    reader.readAsText(event.target.files[0]);

  };

  // const fixXpath = (string) => {
  //   const repl = (match, element_name) => {
  //     return '/*[local-name()=\'' + element_name + '\'][';
  //   }
  
  //   var pattern = /\/\*\:([A-Za-z]+)\[/g;
  //   return string.replace(pattern, repl);
  // }

  // const getCharWithXPath = (xpath) => {
  //   const xml = invoiceData;
  //   const parser = new DOMParser();
  //   const xmlDoc = parser.parseFromString(xml, "text/xml");
  //   // const namespaceResolver = xmlDoc.createNSResolver(xmlDoc.documentElement);
  //   console.log(xmlDoc);
  //   console.log(xpath);
  //   console.log(fixXpath(xpath));

  //   const node = xmlDoc.evaluate(fixXpath(xpath), xmlDoc, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    
  //   // Get start and end character of node within xml
  //   const range = document.createRange();
  //   range.selectNode(node);
  //   const nodeStart = range.startOffset + node.parentNode.tagName.length + 2; // add 2 for the opening tag '<' and the space after the tag name
  //   const nodeEnd = nodeStart + node.toString().length;
  //   const start = xml.indexOf("<", nodeStart - node.parentNode.tagName.length - 2);
  //   const end = xml.indexOf(">", nodeEnd - node.parentNode.tagName.length - 1) + 1;

  //   console.log(start);
  //   console.log(end);

  //   return [start, end];
  // }

  const updateMarkers = () => {
    // console.log(invoiceData);
    APIService.getLintReport(invoiceData, (event) => {
      setProgress(Math.round((100 * event.loaded) / event.total));
    }).then((response) => {
      setInvoiceChanged(false);

      let errors = response.data.report;
      let diagnostics = [];

      errors.forEach(element => {
        const invoiceLines = invoiceData.split("\n");
        const elementLine = invoiceLines[element.line - 1];
        const numWhitespace = elementLine.length - elementLine.trimStart().length;
        const column = element.column ? element.column : numWhitespace;
        
        const from = invoiceLines.slice(0, element.line - 1).join("\n").length + 1 + column;
        const to = from + elementLine.length - column;

        // Create element from html
        let elm = document.createElement("div");
        let rule = document.createElement("div");
        rule.innerText = element.rule_id;
        rule.style.fontWeight = "bold";
        elm.appendChild(rule);
        let message = document.createElement("div");
        message.innerHTML = element.message;
        elm.appendChild(message);

        if (element.suggestion) {
          let suggestion = document.createElement("div");
          suggestion.innerText = "Suggestion: " + element.suggestion;
          elm.appendChild(suggestion);
        }

        diagnostics.push({
          source: "Churros API",
          from: from,
          to: to,
          message: element.message,
          severity: element.severity,
          renderMessage: () => elm,
        });
      });

      setErrorResponse(diagnostics);

    }).catch((err) => {
      setProgress(0);
      console.log(err);
      if (err.response && err.response.data && err.response.data.message) {
        setMessage(err.response.data.message);
      } else {
        setMessage("Could not upload the invoice!");
      }

    });
  }

  function errorMarker(view) {
    let diagnostics = [];
    errorResponse.map((error) => diagnostics.push(error));

    return diagnostics;
  }


  const editor = (
    <CodeMirror
            value={invoiceData}
            style={{
              outline: "none",
              border: "1px solid silver"
              }}
            height="100%"
            extensions={[xml(), linter(errorMarker), lintGutter()]}
            onChange={(value, viewUpdate) => {
                        setInvoiceChanged(true);
                        setInvoiceData(value);
                        // updateMarkers();
                      }}
          />
  );

  

  return (
    <>
      <div className="row h-100">
        <div className="col-md-5 col-lg-2 d-md-block bg-light sidebar collapse text-center">
          <label className="btn btn-success btn-sm d-block" for="file-upload">Import invoice</label>
          <input id="file-upload" className="d-none" type="file" accept=".xml" onChange={upload} />

          {!invoiceChanged && (
            <>
              <button className="btn btn-outline-primary btn-sm w-20">Download as PDF</button>
              <button className="btn btn-outline-primary btn-sm w-20">Download as CSV</button>
              <button className="btn btn-outline-primary btn-sm w-20">Download as HTML</button>
              <button className="btn btn-outline-primary btn-sm w-20">Download as JSON</button>
            </>
          )}
          <label className="btn btn-success btn-sm d-block" for="file-upload">FAQ's</label>
          
          <div>
            <img style={{ width: 180, height: 300 }} src="https://cafedelites.com/wp-content/uploads/2020/05/Churros-Recipe-IMAGE-124.jpg" alt="Churro Image" />
          </div>
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
          {editor}
          { invoiceChanged && (
            <button className="btn btn-success btn-lg" id="run-button" onClick={updateMarkers}>Run</button>
          )}
        </main>
      </div>
    </>
  );
};

export default ImageUpload;
