import React from "react";
import APIService from "../services/APIService";
import Box from '@mui/material/Box';
import CodeMirror from '@uiw/react-codemirror';
import { xml } from '@codemirror/lang-xml';
import {linter, lintGutter, Diagnostic} from "@codemirror/lint";
import Typography from '@mui/material/Typography';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Fab from '@mui/material/Fab';
import WarningIcon from '@mui/icons-material/Error';
import ErrorIcon from '@mui/icons-material/Cancel';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import InfoIcon from '@mui/icons-material/Info';

const gptAPIKey = "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";

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}));

const ValidatorBox = (props) => {
  const [progress, setProgress] = React.useState(0);
  const [message, setMessage] = React.useState("");
  const [invoiceData, setInvoiceData] = React.useState("");
  const [invoiceExtracted, setInvoiceExtracted] = React.useState(null);
  const [invoiceChanged, setInvoiceChanged] = React.useState(true);
  const [errorResponse, setErrorResponse] = React.useState([]);
  const [selectedText, setSelectedText] = React.useState("");
  const [diagnostics, setDiagnostics] = React.useState(null);
  const [msgs, setMsgs] = React.useState([{message: "empty", sender: "User"}]);



  const fetchInvoice = () => {
    APIService.getInvoice(props.invoiceId)
    .then((response) => {
      if (response.data) {
        setInvoiceExtracted(response.data);
        setInvoiceData(normaliseLineEndings(response.data.text_content));
      }
    })
  }

  React.useEffect(() => {
    fetchInvoice();
    // updateMarkers();
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
    APIService.getLintReport(props.invoiceId, invoiceData)
    .then((response) => {
      setInvoiceChanged(false);
      setDiagnostics(response.data);
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
      APIService.getInvoice(props.invoiceId)
      .then((response) => {
        if (response.data) {
          setInvoiceExtracted(response.data);
        }
      })
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
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        margin: '20px 0',
      }}
    >
      <CodeMirror
        value={invoiceData}
        style={{
          outline: "none",
          border: "1px solid silver",
          width: "70%",
          }}
        height="100%"
        extensions={[xml(), linter(errorMarker), lintGutter()]}
        onChange={(value, viewUpdate) => {
                    setInvoiceChanged(true);
                    setInvoiceData(value);
                  }}
      />
      <Box
        sx={{
          width: '30%',
          backgroundColor: 'white',
          borderRadius: '0 30px 30px 0',
          border: '1px solid silver',
          borderLeft: 'none',
          padding: '20px',
        }}
      >
        <Typography component="h1" variant="h5" sx={{ marginBottom: '20px' }}>
          Invoice Details
        </Typography>
        {!!invoiceExtracted &&
          <>
            <Typography variant="body1" gutterBottom>
              <b>Name: </b>{invoiceExtracted.name}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <b>Added: </b>{invoiceExtracted.date_added}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <b>Last edited: </b>{invoiceExtracted.date_last_modified}
            </Typography>
            <Typography variant="body1" marginBottom={'20px'} gutterBottom>
              <b>Validity: </b>
              {(!!diagnostics && diagnostics.report.every((diagnostic) => diagnostic.severity !== "error") || (!diagnostics && invoiceExtracted.is_valid))
              ? <span style={{
                backgroundColor: "#56cb32",
                color: 'white',
                padding: '4px',
                margin: '2px',
                borderRadius: '3px',
                width: '80px',
                textAlign: 'center',
                fontWeight: 'bold',
                }}>VALID</span>
              : <span style={{
                backgroundColor: "#f44336",
                color: 'white',
                padding: '4px',
                margin: '2px',
                borderRadius: '3px',
                width: '80px',
                textAlign: 'center',
                fontWeight: 'bold',
                }}>INVALID</span>}
            </Typography>
            {invoiceExtracted.is_valid &&
              <>
                <Typography variant="body1" gutterBottom>
                  <b>Extracted data: </b>
                </Typography>
                {[
                  ['customer_abn', 'Customer ABN'],
                  ['customer_contact_email', 'Customer Contact Email'],
                  ['customer_contact_name', 'Customer Contact Name'],
                  ['customer_contact_phone', 'Customer Contact Phone'],
                  ['customer_name', 'Customer Name'],
                  ['delivery_date', 'Delivery Date'],
                  ['delivery_latitude', 'Delivery Latitude'],
                  ['delivery_longitude', 'Delivery Longitude'],
                  ['due_date', 'Due Date'],
                  ['invoice_end_date', 'Invoice End Date'],
                  ['invoice_start_date', 'Invoice Start Date'],
                  ['invoice_title', 'Invoice Title'],
                  ['issue_date', 'Issue Date'],
                  ['order_id', 'Order ID'],
                  ['supplier_abn', 'Supplier ABN'],
                  ['supplier_latitude', 'Supplier Latitude'],
                  ['supplier_longitude', 'Supplier Longitude'],
                  ['supplier_name', 'Supplier Name']
                ].map((field) => {
                  return (
                    <Typography variant="body2" gutterBottom>
                      <b>{field[1]}: </b><pre style={{ display: 'inline' }}>{invoiceExtracted[field[0]]}</pre>
                    </Typography>
                  )
                })}

              </>
            }
            <Box>
              {!!diagnostics && diagnostics.report.length > 0 &&
                <Typography variant="body1" gutterBottom>
                  <b>Errors found:</b>
                </Typography>}
              {!!diagnostics && 
                diagnostics.report.sort((a, b) => {
                  if (a.severity === b.severity) {
                    return 0;
                  } else if (a.severity === 'warning') {
                    return 1;
                  } else {
                    return -1;
                  }
                }).map((error, index) => {
                return (
                  <HtmlTooltip
                    title={
                      !!error.suggestion &&
                        <>
                          <Typography color="inherit" variant="body2" fontWeight='bold'>Suggestion</Typography>
                          <Typography color="inherit" variant="body2">{error.suggestion}</Typography>
                        </>
                    }
                    arrow
                    placement="left"
                    
                  >
                    <Box
                      key={index}
                      sx={{
                        backgroundColor: error.severity === 'warning' ? '#FFF5E5' : '#FFE7E5',
                        borderRadius: '10px',
                        padding: '10px',
                        marginBottom: '10px',
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}
                      >
                        {error.severity === 'warning'
                          ? <WarningIcon sx={{ color: '#FFC048' }} />
                          : <ErrorIcon sx={{ color: '#EA2D3F' }} />}
                        <Typography variant="body1" fontWeight='bold' sx={{ pl: '5px' }}>
                          {error.rule_id}
                        </Typography>
                      </Box>
                      <Typography variant="body2" gutterBottom>
                        {error.message}
                      </Typography>
                    </Box>
                  </HtmlTooltip>
                )
              })}
            </Box>
          </>
        }
        {selectedText && (
          <Fab
            size="large"
            variant="extended"
            color="primary"
            style={{
                margin: 0,
                top: 'auto',
                right: 60,
                bottom: 120,
                left: 'auto',
                position: 'fixed',
            }}
            onClick={() => sendGptMsg(selectedText)}
          >
            Ask GPT
            <InfoIcon sx={{ ml: 1 }} />
          </Fab>
        )}
        <Fab
          size="large"
          variant="extended"
          color="success"
          style={{
              margin: 0,
              top: 'auto',
              right: 60,
              bottom: 60,
              left: 'auto',
              position: 'fixed',
          }}
          onClick={updateMarkers}
        >
          Run
          <PlayArrowIcon sx={{ ml: 1 }} />
        </Fab>
      </Box>
      
    </Box>
  );
};

export default ValidatorBox;
