import axiosClient from "./axiosClient";

const authorAPI = {
    authors:()=>{
        const url = "/authors";
        return axiosClient.get(url);
    }
}

export default authorAPI;