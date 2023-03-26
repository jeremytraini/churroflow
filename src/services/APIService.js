import http from "../http-common";

// const URL = "http://churros.eba-pyyazat7.ap-southeast-2.elasticbeanstalk.com";
const URL = "http://localhost:8000";

const uploadText = (text, onUploadProgress) => {
  // Post with parameters name = "hello", and text = "world"
  return http.post(URL + "/invoice/upload_text/v1",
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

  return http.post(URL + "/invoice/upload_file/v1",
  formData,
  {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress,
  });
};

const getReport = (reportId) => {
  return http.get(URL + "/export/json_report/v1", {
    params: {
      report_id: reportId,
    },
  });
};

const checkAliveness = () => {
  return http.get(URL + "/health_check/v1");
};

const FileUploadService = {
  uploadText,
  getReport,
  checkAliveness,
};

export default FileUploadService;
