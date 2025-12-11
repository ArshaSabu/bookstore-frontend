import SERVERURL from "./serverURL"
import commonAPI from "./commonAPI"

//register
export const registerAPI = async (reqBody)=> {
    return await commonAPI("POST", `${SERVERURL}/register`, reqBody) //reBody-username,email,password is passed $ reqHeader is not needed
}

//login
export const loginAPI = async (reqBody)=> {
    return await commonAPI("POST", `${SERVERURL}/login`, reqBody) //reBody-username,email,password is passed $ reqHeader is not needed
}

//google login
export const googleLoginAPI = async(reqBody)=>{
    return await commonAPI("POST", `${SERVERURL}/google-login`,reqBody)
}

//get book in home
export const getHomeBookAPI = async() =>{
    return await commonAPI("GET", `${SERVERURL}/home-books`)
}

//------------------- USER -------------------

//add book
export const addBookAPI = async (reqBody,reqHeader)=>{
    return await commonAPI("POST", `${SERVERURL}/add-book`, reqBody, reqHeader)
}

//get all books
export const getAllBooksAPI = async(searchKey, reqHeader)=>{
    return await commonAPI("GET",`${SERVERURL}/all-books?search=${searchKey}`,{},reqHeader)
}

//get a book
export const getABookAPI = async (bookid, reqHeader) => {
    return await commonAPI("GET", `${SERVERURL}/view-books/${bookid}`, {}, reqHeader)
}

//get user added book
export const getUserBookAPI = async(reqHeader)=>{
    return await commonAPI("GET",`${SERVERURL}/userbooks`,{},reqHeader)
}

//delete a user added book
export const deleteUserAddedBookAPI = async(id)=>{
    return await commonAPI("DELETE",`${SERVERURL}/delete-book/${id}`)
}

//get user brought bokk
export const getUserBroughtBookAPI = async (reqHeader) =>{
    return await commonAPI("GET", `${SERVERURL}/user-brought-book`,{}, reqHeader)
}

//update user profile
export const updateUserProfileAPI = async(reqBody,reqHeader) =>{
    return await commonAPI("PUT",`${SERVERURL}/update-user-profile`,reqBody,reqHeader)
}

//make-payment via viewbook
export const makePaymentAPI= async(reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${SERVERURL}/make-payment`,reqBody,reqHeader)
}

//----------------------ADMIN-------------------------------------------------------------------
//get all books
export const getAllBooksAdminAPI = async ()=>{
    return await commonAPI("GET", `${SERVERURL}/get-allbooks`)
}

//approve book
export const approveBookStatusAPI = async(id)=>{
    return await commonAPI("PUT",`${SERVERURL}/update-book/${id}`)
}

//get all users
export const getAllUsersAPI = async(reqHeader)=>{
    return await commonAPI("GET",`${SERVERURL}/get-allusers`,{},reqHeader)
}

//update admin profile
export const updateAdminProfileAPI =async(reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${SERVERURL}/update-admin-profile`,reqBody,reqHeader)
}

