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

// curl -X 'GET' \
  // 'http://localhost:8000/invoice_processing/query/v2?query=numActiveCustomers&from_date=2021-12-12&to_date=2023-12-12' \
  // -H 'accept: application/json' \
  // -H 'Authorization: Bearer 7212d9ca6db2c4f2077e32b78c2dd5700a6850349afa8ca254a1837329f9f97b'

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
      "Authorization": "Bearer 7212d9ca6db2c4f2077e32b78c2dd5700a6850349afa8ca254a1837329f9f97b"
    }
  })
};

const FileUploadService = {
  login,
  register,
  invoiceProcessingQuery
};

export default FileUploadService;
