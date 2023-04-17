import http from "../http-common";

const token = "06a23824a2e10ddb4518745522d9eebc75e4a392f8e06636f6df0658e0950156"

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
  },
  {
    headers: {
      "Content-Type": "text/plain",
    },
  });
};

const listValidInvoices = (verbose) => {
  return http.get("/invoice_processing/list_all/v2",
  {
    params: {
      is_valid: true,
      verbose: verbose,
    },
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    }
  })
};

const listInvalidInvoices = (verbose) => {
  return http.get("/invoice_processing/list_all/v2",
  {
    params: {
      is_valid: false,
      verbose: verbose,
    },
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
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
    },
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    }
  })
};

const uploadInvoice = (name, invoice) => {
  return http.post("/invoice_processing/upload_text/v2",
  {
    name: name,
    text: invoice
  },
  {
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    },
  });
};

const FileUploadService = {
  login,
  register,
  invoiceProcessingQuery,
  listValidInvoices,
  listInvalidInvoices,
  uploadInvoice,
};

export default FileUploadService;
