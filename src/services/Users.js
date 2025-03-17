import axios from "axios";
const userAPI = "http://localhost:3001/users"
export const getUsers = async () => {
    try{
        const res = await axios.get(userAPI);
        return res.data
    }catch(error){
        console.log(error)
    }
};

export const addUsers = async (newUser) => {
    try{
        const res = await axios.post(userAPI, newUser);
        return res.data
    }catch(error){
        console.log(error)
    }
};

export const checkEmailExist = async (email) => {
    if (!email) return false;
    try {
        const res = await axios.get(`${userAPI}?email=${email}`); 
        return res.data.length > 0 ? res.data[0] : false;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export const resetPassword = async (id, newPassword) => {
    try {
        const res = await axios.patch(`${userAPI}/${id}`, { password: newPassword });
        return res.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}


