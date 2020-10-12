export function getUserInfo(){
    return JSON.parse(localStorage.getItem("userInfo"));
}

export function getAuthHeader() {
    return { headers: { Authorization: `Bearer ${getUserInfo()['access_token']}` }};
}