import axios from "axios";

export const registration = async( login, password) =>{
    try{
        const responce = await axios.post("http://localhost:5000/auth/registration", {
            "userName": login,
            "password": password
        })
        alert(responce.data.message)
    } catch(e){
        console.log(e);
    }

}

export const login_test = ( login, password) =>{
    return async (dispatch) =>{
        try{
            const responce = await axios.post("http://localhost:5000/auth/login", {
                "userName": login,
                "password": password
            })
           console.log(responce.data)
        } catch(e){
            console.log(e);
          
        }
    }


}