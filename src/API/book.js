import axiosClient from "./axiosClient";

const bookAPI = {
    books:(page,limit)=>{
        const url = `/books?page=${page}&limit=${limit}`;
        return axiosClient.get(url);
    },
    createBook:(data)=>{
        const url = "/book";
        return axiosClient.post(url,data);
    },
    detailBook: (bookId)=>{
        const url = "/book/"+bookId;
        return axiosClient.get(url);
    }
}

export default bookAPI;