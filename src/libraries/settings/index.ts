import axios from "axios";
(window as any).axios = axios;
axios.defaults.baseURL = process.env.VUE_APP_DATA_SERVICE_URL;