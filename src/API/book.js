import axiosClient from "./axiosClient";

const bookAPI = {
    books:(page,limit,search)=>{
        const url = `/books?page=${page}&limit=${limit}&search=${search}`;
        return axiosClient.get(url);
    },
    createBook:(data)=>{
        const url = "/book";
        return axiosClient.post(url,data);
    },
    detailBook: (bookId)=>{
        const url = "/book/"+bookId;
        return axiosClient.get(url);
    },
    deleteBook: (bookId)=>{
        const url = "/book/"+bookId;
        return axiosClient.delete(url);
    },
    updateBook:(data,bookId)=>{
        const url = "/book/"+bookId;
        return axiosClient.put(url,data);
    }
}

export default bookAPI;