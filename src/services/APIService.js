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
  },
  {
    headers: {
      "Content-Type": "text/plain",
    },
  });
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
      "Authorization": "Bearer 7154eec1ef1ea9237c1376b93f645d39bd237fafc0a01d3c69fcfab74225f3af"
    }
  })
};

const FileUploadService = {
  login,
  register,
  invoiceProcessingQuery
};

export default FileUploadService;
