import axios from "axios";

class GetAllProvince {
    getAllprovince = (url) => {
        return axios.get(url);
    };
}
const apiProvinces = new GetAllProvince();
export default apiProvinces;
