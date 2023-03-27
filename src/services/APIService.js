import http from "../http-common";

const uploadText = (text, onUploadProgress) => {
  return http.post("/invoice/upload_text/v1",
  {
    name: "test",
    text: text
  },
  {
    headers: {
      "Content-Type": "text/plain",
    },
    onUploadProgress,
  });
};

const uploadFile = (file, onUploadProgress) => {
  let formData = new FormData();

  formData.append("file", file);

  return http.post("/invoice/upload_file/v1",
  formData,
  {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress,
  });
};

const getLintReport = (text, onUploadProgress) => {
  return http.post("/report/lint/v1",
  {
    name: "test",
    text: text
  },
  {
    headers: {
      "Content-Type": "text/plain",
    },
    onUploadProgress,
  });
};

const checkAliveness = () => {
  return http.get("/health_check/v1");
};

const FileUploadService = {
  uploadText,
  getLintReport,
  checkAliveness,
};

export default FileUploadService;
