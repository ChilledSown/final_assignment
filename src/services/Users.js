import users from "../data/users.json"

export const getUsers = async () => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    return storedUsers;
};

export const addUsers = async (newUser) => {
    const storedUsers = await getUsers();
    storedUsers.push(newUser);
    localStorage.setItem("users", JSON.stringify(storedUsers));
    return storedUsers;
};
