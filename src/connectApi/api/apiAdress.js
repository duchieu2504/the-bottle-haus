import axiosClient from "./axiosClient";
class ApiAdress {
    getApiAdress = (_id) => {
        return axiosClient.get(`address/${_id}`);
    };
    postApiAdress = (data) => {
        console.log(data);
        return axiosClient({
            method: "POST",
            url: "address",
            data: data,
        });
    };
    editApiAdress = (_id) => {
        return axiosClient.get(`address/${_id}/edit`);
    };
    putApiAdress = (id, data) => {
        console.log(data);
        return axiosClient({
            method: "PUT",
            url: `address/${id}`,
            data: data,
        });
    };
    getApiAdressDefault = (_id) => {
        return axiosClient.get(`address/${_id}/default`);
    };
}
const apiAdress = new ApiAdress();
export default apiAdress;
