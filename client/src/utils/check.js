export const isLoggedIn = ()=>{
    if(localStorage.getItem('token')){
        return true
    }
    return false
}
export const baseURL = ()=>{
    return 'https://job-finder-app-4foa.onrender.com'
}