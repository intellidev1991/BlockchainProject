import axios from "axios/index";

const ServiceApi = axios;
ServiceApi.defaults.baseURL = "https://api.stackexchange.com/2.3";

export { ServiceApi };
