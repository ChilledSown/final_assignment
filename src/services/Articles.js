import axios from "axios"

const articleAPI = "http://localhost:3001/articles"

export const getArticle = async () => {
    try{
        const res = await axios.get(articleAPI);
        console.log("Data from API: ", res)
        return res.data;
    }catch(error){
        console.error(error)
    }
}