import React from "react";
import getAPI from "../services/APIService";
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
import Modal from '@mui/material/Modal';
import CircularProgress from '@mui/material/CircularProgress';
import DoneIcon from '@mui/icons-material/Done';
import Grid from '@mui/material/Grid';
import { useAuth } from "../hooks/useAuth";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import IosShareIcon from '@mui/icons-material/IosShare';
import QRCode from "react-qr-code";
import TextField from '@mui/material/TextField';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import IconButton from '@mui/material/IconButton';

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
  const [invoiceData, setInvoiceData] = React.useState(null);
  const [invoiceExtracted, setInvoiceExtracted] = React.useState(null);
  const [invoiceChanged, setInvoiceChanged] = React.useState(true);
  const [exportReportId, setExportReportId] = React.useState(null);
  const [errorResponse, setErrorResponse] = React.useState([]);
  const [selectedText, setSelectedText] = React.useState("");
  const [diagnostics, setDiagnostics] = React.useState(null);
  const [msgs, setMsgs] = React.useState([{message: "empty", sender: "User"}]);

  const [open, setOpen] = React.useState(false);
  const [exportOpen, setExportOpen] = React.useState(false);

  const [gptAnswer, setGptAnswer] = React.useState(null);

  const [gptLoading, setGptLoading] = React.useState(false);
  const [exportLoading, setExportLoading] = React.useState(true);

  const APIService = getAPI();
  const navigate = useNavigate();

  const [showUpgradeModal, setShowUpgradeModal] = React.useState(false);
  const { user } = useAuth();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleCloseUpgrade = () => setShowUpgradeModal(false);
  const handleCloseExport = () => setExportOpen(false);

  React.useEffect(() => {
    APIService.getInvoice(props.invoiceId)
    .then((response) => {
      if (response.data) {
        setInvoiceExtracted(response.data);
        const invoiceData = normaliseLineEndings(response.data.text_content);
        setInvoiceData(invoiceData);
        updateMarkers(invoiceData);
      }
    })
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
    handleOpen();
    setGptLoading(true);
    setGptAnswer("Answer");
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
      setGptAnswer(data.choices[0].message.content.trim().replace(/\\n/g,'\n'));
      setGptLoading(false);
    });
  }

  document.addEventListener("mouseup", function() {
    var selectedText = window.getSelection().toString();
    setSelectedText(selectedText);
  });

  const updateMarkers = React.useCallback((alternate) => {
    console.log("user tier");
    console.log(user.tier);
    if (user.tier === 'Starter') {
      setShowUpgradeModal(true);
      return;
    }

    let currInvoiceData;

    if (!invoiceData) {
      currInvoiceData = alternate;
    } else {
      currInvoiceData = invoiceData;
    }
    APIService.getLintReport(props.invoiceId, currInvoiceData)
    .then((response) => {
      setInvoiceChanged(false);
      setDiagnostics(response.data);
      let errors = response.data.report;
      let diagnostics = [];

      errors.forEach(element => {
        const invoiceLines = currInvoiceData.split("\n");
        const elementLine = invoiceLines[element.line - 1];
        const numWhitespace = elementLine.length - elementLine.trimStart().length;
        const column = element.column ? element.column : numWhitespace;
        
        const from = invoiceLines.slice(0, element.line - 1).join("\n").length + 1 + column;
        const to = from + elementLine.length - column;

        // Create element from html
        let elm = document.createElement("div");
        elm.style.maxWidth = "300px";
        let rule = document.createElement("div");
        rule.innerText = element.rule_id;
        rule.style.fontWeight = "bold";
        elm.appendChild(rule);
        let message = document.createElement("p");
        message.innerHTML = element.message;
        message.style.marginBottom = "5px";
        elm.appendChild(message);

        if (element.suggestion) {
          let suggestionTitle = document.createElement("b");
          let suggestionText = document.createElement("p");
          suggestionTitle.innerText = "Our Suggestion";
          suggestionText.innerText = element.suggestion;
          elm.appendChild(suggestionTitle);
          elm.appendChild(suggestionText);
        }

        diagnostics.push({
          source: "Churros Validation API",
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
  }, [invoiceData]);

  function errorMarker(view) {
    let diagnostics = [];
    errorResponse.map((error) => diagnostics.push(error));

    return diagnostics;
  }

  const exportReport = React.useCallback(async () => {
    if (!invoiceData || !invoiceExtracted) {
      return;
    }

    setExportOpen(true);
    setExportLoading(true);
    
    try {
      const response = await APIService.invoiceUploadText(invoiceExtracted.name, invoiceData);
      const reportId = response.data.report_id;

      setExportReportId(reportId);
      setExportLoading(false);
    } catch (err) {
      setExportLoading(false);
      console.log(err);
      return;
    }
  }, [invoiceData]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        margin: '20px 0',
      }}
    >
      {!!invoiceData
      ? (
        <>
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
              <Button
                variant="outlined"
                color="primary"
                onClick={exportReport}
                sx={{
                  marginBottom: '20px',
                  width: '100%',
                }}
              >
                <IosShareIcon style={{ marginRight: '10px' }} />
                Export Report
              </Button>
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
                        <b>{field[1]}: </b>
                        <pre
                          style={{
                            display: 'inline',
                            backgroundColor: 'transparent',
                            border: 'none',
                          }}>
                          {invoiceExtracted[field[0]]}
                        </pre>
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
                opacity: 1,
            }}
            onClick={() => updateMarkers()}
            disabled={!invoiceChanged}
          >
            Run
            <PlayArrowIcon sx={{ ml: 1 }} />
          </Fab>
        </Box>

        <Modal
          open={exportOpen}
          onClose={handleCloseExport}
        >
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 500,
            bgcolor: 'background.paper',
            border: '1px solid silver',
            borderRadius: '20px',
            boxShadow: 24,
            p: 4,
          }}>
            <Typography variant="h6" component="h3" sx={{ mb: 2 }}>
              Exporting Report on Invoice "{invoiceExtracted.name}"
            </Typography>
            {(exportLoading)
            ? <>
              <Typography variant="body1" gutterBottom>
                Generating report...
              </Typography>
              <CircularProgress />
              </>
            : (
              <>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Button
                    variant="contained"
                    onClick={() => {
                      const url = APIService.getBaseUrl() + "export/pdf_report/v1?report_id=" + exportReportId;
                      window.open(url, '_blank');
                    }}
                  >
                    Download PDF
                  </Button>

                  <Button
                    variant="contained"
                    onClick={() => {
                      const url = APIService.getBaseUrl() + "export/csv_report/v1?report_id=" + exportReportId;
                      window.open(url, '_blank');
                    }}
                  >
                    Download CSV
                  </Button>

                  <Button
                    variant="contained"
                    onClick={() => {
                      const url = APIService.getBaseUrl() + "export/json_report/v1?report_id=" + exportReportId;
                      window.open(url, '_blank');
                    }}
                  >
                    Download JSON
                  </Button>
                </Box>
                <Typography variant="body1" gutterBottom sx={{ mt: 2 }}>
                  <b>OR</b> view it online here:
                </Typography>
                <TextField
                  value={APIService.getBaseUrl() + "export/html_report/v1?report_id=" + exportReportId}
                  InputProps={{
                    readOnly: true,
                    endAdornment: (
                      <IconButton
                        onClick={ () => {
                          const url = APIService.getBaseUrl() + "export/html_report/v1?report_id=" + exportReportId;
                          window.open(url, '_blank');
                        }}
                      >
                        <OpenInNewIcon />
                      </IconButton>
                    )
                  }}
                  sx={{ mb: 2, width: '100%' }}
                />
                <Typography variant="body1" gutterBottom>
                  <b>OR</b> scan this QR code to view it on your phone:
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center'
                  }}
                >

                  <QRCode
                    value={APIService.getBaseUrl() + "export/html_report/v1?report_id=" + exportReportId}
                  />
                </Box>
              </>
            )}
          </Box>
        </Modal>

        <Modal
          open={open}
          onClose={handleClose}
        >
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 500,
            bgcolor: 'background.paper',
            border: '1px solid silver',
            borderRadius: '20px',
            boxShadow: 24,
            p: 4,
          }}>
            <Typography variant="h6" component="h2">
              GPT Answer
            </Typography>
            {(gptLoading || !gptAnswer)
            ? <CircularProgress />
            : (
              <pre style={{
                mt: 2,
                whiteSpace: 'pre-wrap',
                backgroundColor: 'transparent',
                border: 'none',
                }}>
                {gptAnswer}
              </pre>
            )}
          </Box>
        </Modal>

        <Modal
          open={showUpgradeModal}
          onClose={handleCloseUpgrade}
        >
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 420,
            bgcolor: 'white',
            border: '2px solid #FFE7E5',
            borderRadius: '20px',
            boxShadow: 24,
            p: 4,
          }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              mb: '20px'
            }}
          >
            <ErrorIcon fontSize='large' sx={{ color: '#EA2D3F', pr: '10px' }} />
            <Typography variant="h6">
              Your must upgrade your account to use the validator!
            </Typography>
            </Box>
            <Typography variant="body1">
              Upgrading gets you awesome features like:
            </Typography>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'baseline',
                mb: 2,
              }}
            >
              <ul style={{listStyle: 'none'}}>
              {[
                'Upload, Store, Render, and Send Unlimited Invoices',
                'Invoice Data Manager',
                'Invoice Validator Interface',
                'Download Validation Report',
                'Inventory Actions',
                'Warehouse Analytics',
                'Ask GPT',
                'Warehouse Planning',
                'Delivery Heatmap View',
              ].map((line) => (
                  <Typography
                    component="li"
                    variant="subtitle1"
                    align="left"
                    key={line}
                  >
                    <Grid style={{ display: "flex" }}>
                        <DoneIcon />
                        <Typography>{line}</Typography>
                    </Grid>
                  </Typography>
                ))}
              </ul>
              
            </Box>
            <Button
              variant="contained"
              color="success"
              sx={{
                m: 'auto',
                display: 'block',
                textAlign: 'center',
                width: '100%',
              }}
              onClick={() => {
                navigate('/upgrade-account');
              }}
            >
              Upgrade Now!
            </Button>
          </Box>
        </Modal>
        </>
      ) : (
        <CircularProgress
          sx={{
            display: 'block',
            alignSelf: 'center',
            m: 'auto',
          }}
        />
      )
      }
    </Box>
  );
};

export default ValidatorBox;
