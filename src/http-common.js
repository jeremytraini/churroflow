import axios from "axios";

export default axios.create({
  baseURL: "http://churros.eba-pyyazat7.ap-southeast-2.elasticbeanstalk.com",
  headers: {
    "Content-type": "application/json"
  },
  mode: 'cors',
});
