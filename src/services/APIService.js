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

// curl -X 'POST' \
//   'http://churros.eba-pyyazat7.ap-southeast-2.elasticbeanstalk.com/invoice_processing/lint/v2?invoice_id=1' \
//   -H 'accept: application/json' \
//   -H 'Authorization: Bearer eaa925a1e2fab3b35ccae15e430283b066ff8173d33e1ea27afb715c087472dd' \
//   -H 'Content-Type: application/json' \
//   -d '{
//   "name": "string",
//   "text": "string"
// }'
const getLintReport = (invoice_id, newInvoice) => {
  if (newInvoice) {
    return http.post("/invoice_processing/lint/v2",
    {
      name: 'test',
      text: newInvoice
    },
    {
      params: {
        invoice_id: invoice_id,
      }
    });
  } else {
    return http.post("/invoice_processing/lint/v2",
    null,
    {
      params: {
        invoice_id: invoice_id,
      }
    });
  }
};

const deleteInvoice = (id) => {
  return http.delete('/invoice_processing/delete/v2',
  {
    params: {
      invoice_id: parseInt(id),
    }
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
  getLintReport,
  deleteInvoice
};

export default FileUploadService;
