import React from "react";
import APIService from "../services/APIService";

import CodeMirror from '@uiw/react-codemirror';
import { xml } from '@codemirror/lang-xml';
import {linter, lintGutter, Diagnostic} from "@codemirror/lint";

const gptAPIKey = "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";

const ValidatorBox = ({invoiceId}) => {
  const [progress, setProgress] = React.useState(0);
  const [message, setMessage] = React.useState("");
  const [invoiceData, setInvoiceData] = React.useState("");
  const [invoiceChanged, setInvoiceChanged] = React.useState(false);
  const [errorResponse, setErrorResponse] = React.useState([]);
  const [selectedText, setSelectedText] = React.useState("");
  const [msgs, setMsgs] = React.useState([{message: "empty", sender: "User"}]);

  const fetchInvoice = async () => {
    const response = await APIService.getInvoice(invoiceId);
    if (response.data) {
      setInvoiceData(response.data.text_content);
    }
  }

  React.useEffect(() => {
    fetchInvoice();
  }, []);

  const normaliseLineEndings = (str, normalized = '\n') =>
    str.replace(/\r?\n/g, normalized);

  const sendGptMsg = async (message) => {
     const newMessage = {
       message: "Explain this \"" + message + "\"",
       sender: "user"
     }
     const final = [...msgs, newMessage];
     setMsgs(final);
     await sendMessageToGpt(final);
  }
  
  const systemMessage = {
    role: "system",
    content: "Answer the question as an expert in PEPPOL e-invoicing"
  }

  async function sendMessageToGpt(all_msgs) {
    let mapped_messages = all_msgs.map((messageObj) => {
      return {role: "user", content: messageObj.message};
    });
    const apiRequestBody = {
      "model": "gpt-3.5-turbo",
      "messages": [systemMessage, ...mapped_messages]
    }
    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + gptAPIKey,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(apiRequestBody)
    }).then((data) => {
      return data.json();
    }).then((data) => {
      const modal = document.createElement("div");
      modal.classList.add("modal");
      const content = document.createElement("div");
      content.classList.add("modal-content");
      const closeBtn = document.createElement("span");
      closeBtn.classList.add("close");
      closeBtn.innerHTML = "&times;";
      closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
      });
      const responseText = document.createElement("p");

      responseText.innerHTML = data.choices[0].message.content.trim().replace(/\n/g, "<br/>");
      content.appendChild(closeBtn);
      content.appendChild(responseText);
      modal.appendChild(content);
      document.body.appendChild(modal);

      modal.style.display = "block";
    });
  }

  document.addEventListener("mouseup", function() {
    var selectedText = window.getSelection().toString();
    setSelectedText(selectedText);
  });

  const updateMarkers = () => {
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

  return (
    <>
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
                  }}
      />
      {invoiceChanged && (
        <button className="btn btn-success btn-lg" id="run-button" onClick={updateMarkers}>Run</button>
      )}
      {selectedText && (
        <button className="btn btn-info" id="gpt-button" onClick={() => sendGptMsg(selectedText)}>Ask GPT?</button>
      )}
    </>
  );
};

export default ValidatorBox;
