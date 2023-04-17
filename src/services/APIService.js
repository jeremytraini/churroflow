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
      "Authorization": "Bearer b0a39099231244bcb72c0198187cbcd7c9090eef9a15ce209d96a9240e6a520b"
    }
  })
};

const FileUploadService = {
  login,
  register,
  invoiceProcessingQuery
};

export default FileUploadService;
