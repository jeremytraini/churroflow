import http from "../http-common";

// const URL = "http://churros.eba-pyyazat7.ap-southeast-2.elasticbeanstalk.com";
const URL = "http://localhost:8000";

const upload = (file, onUploadProgress) => {
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



const FileUploadService = {
  upload,
  getReport,
};

export default FileUploadService;
