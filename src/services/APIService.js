import http from "../http-common";


const login = (email, password) => {
  return http.post("/invoice/upload_text/v1",
  {
    name: "test",
    text: email
  },
  {
    headers: {
      "Content-Type": "text/plain",
    },
  });
};

const register = (name, email, password) => {
  return http.post("/invoice/upload_text/v1",
  {
    name: "test",
    text: email
  });
};

const listValidInvoices = (verbose) => {
  return http.get("/invoice_processing/list_all/v2",
  {
    params: {
      is_valid: true,
      verbose: verbose,
    }
  })
};

const listInvalidInvoices = (verbose) => {
  return http.get("/invoice_processing/list_all/v2",
  {
    params: {
      is_valid: false,
      verbose: verbose,
    }
  })
};

const invoiceProcessingQuery = (query, from_date, to_date) => {
  return http.get("/invoice_processing/query/v2",
  {
    params: {
      query: query,
      from_date: from_date,
      to_date: to_date
    }
  })
};

const uploadInvoice = (name, invoice) => {
  return http.post("/invoice_processing/upload_text/v2",
  {
    name: name,
    text: invoice
  });
};

const getInvoice = (id) => {
  // curl -X 'POST' \
  // 'http://churros.eba-pyyazat7.ap-southeast-2.elasticbeanstalk.com/invoice_processing/get/v2?invoice_id=1&verbose=true' \
  // -H 'accept: application/json' \
  // -H 'Authorization: Bearer eaa925a1e2fab3b35ccae15e430283b066ff8173d33e1ea27afb715c087472dd' \
  // -d ''
  return http.post("/invoice_processing/get/v2",
  {},
  {
    params: {
      invoice_id: parseInt(id),
      verbose: true
    }
  });
};

const getLintReport = (id, newInvoice) => {
  // newInvoice in body
  return http.post("/invoice_processing/lint/v2",
  {
    [newInvoice ? "new_invoice" : ""]: newInvoice,
  },
  {
    invoice_id: parseInt(id),
  });
};

const FileUploadService = {
  login,
  register,
  invoiceProcessingQuery,
  listValidInvoices,
  listInvalidInvoices,
  uploadInvoice,
  getInvoice,
  getLintReport
};

export default FileUploadService;
