import axios from "axios";

const token = "06a23824a2e10ddb4518745522d9eebc75e4a392f8e06636f6df0658e0950156"

export default axios.create({
  baseURL: "http://churros.eba-pyyazat7.ap-southeast-2.elasticbeanstalk.com/",
  headers: {
    "Content-type": "application/json",
    'Authorization': 'Bearer ' + token,
  },
  mode: 'cors',
});
