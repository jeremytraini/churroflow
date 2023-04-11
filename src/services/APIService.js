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
