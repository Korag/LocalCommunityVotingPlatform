export const getJWTtoken = () => {
    return 'Bearer ' + localStorage.getItem("jwt_token");
};