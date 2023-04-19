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
      "Authorization": "Bearer 759f3507cd066016a233d89ceb4bf952c4c1dcfab64396ae6f0a60607c9235b9"
    }
  })
};

const virtualWarehouseCoords = (n_clusters, from_date, to_date) => {
  return http.get("/virtual_warehouse_coords",
  {
    params: {
      n_clusters: n_clusters,
      from_date: from_date,
      to_date: to_date
    },
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer 759f3507cd066016a233d89ceb4bf952c4c1dcfab64396ae6f0a60607c9235b9"
    }
  })
};

const FileUploadService = {
  login,
  register,
  invoiceProcessingQuery,
  virtualWarehouseCoords
};

export default FileUploadService;
