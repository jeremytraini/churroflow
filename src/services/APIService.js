import http from "../http-common";

const login = (email, password) => {
  return http.post("/invoice/upload_text/v1",
  {
    name: "test",
    text: text
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
    text: text
  },
  {
    headers: {
      "Content-Type": "text/plain",
    },
  });
};

const FileUploadService = {
  login,
  register,
};

const checkAliveness = () => {
  return http.get("/health_check/v1");
};

export default FileUploadService;
