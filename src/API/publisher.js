import axiosClient from "./axiosClient";

const publisherAPI = {
    publishers:()=>{
        const url = "/publishers";
        return axiosClient.get(url);
    },
}

export default publisherAPI;