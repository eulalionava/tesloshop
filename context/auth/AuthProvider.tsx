import { FC, useEffect, useReducer } from "react";
import { useSession,signOut } from "next-auth/react";
import { useRouter } from "next/router";
import Cookies from 'js-cookie';
import { IUser } from "../../interfaces/user";
import { AuthContext } from "./AuthContext";
import { authReducer } from "./authReducer";
import { tesloApi } from "../../api";
import axios from "axios";

export interface AuthState{
    isLoggedIn:boolean,
    user?:IUser
}

const AUTH_INITIAL_STATE:AuthState = {
    isLoggedIn:false,
    user:undefined
}


export const AuthProvider = ({children})=>{
    const [state,dispatch] = useReducer(authReducer,AUTH_INITIAL_STATE);
    const { data,status } = useSession();
    const router = useRouter();

    useEffect(()=>{
        if(status === 'authenticated'){
            console.log({user:data.user});
            dispatch({type:'[Auth] - login',payload:data?.user as IUser});

        }
    },[status,data]);

    // useEffect(()=>{
    //     checkToken();
    // },[]);

    const checkToken = async()=>{
        if(!Cookies.get('token')){
            return
        }

        try {
            const { data }  = await tesloApi.get('/user/validate-token');
            const {token,user} = data;
            Cookies.set('token',token);
            dispatch({type:'[Auth] - login',payload:user});
            
        } catch (error) {
            Cookies.remove('token');
        }

    }
    
    const loginUser = async(email:string,password:string):Promise<boolean>=>{
        try {
            const {data} = await tesloApi.post('/user/login',{email,password}); 
            const {token,user} = data;
            Cookies.set('token',token);
            dispatch({type:'[Auth] - login',payload:user});
            return true;
        } catch (error) {
            return false
        }
    }

    const registerUser = async(name:string, email:string,password:string):Promise<{hasError:boolean,message?:string}>=>{
        try {
            const {data} = await tesloApi.post('/user/register',{name,email,password}); 
            const {token,user} = data;
            Cookies.set('token',token);
            dispatch({type:'[Auth] - login',payload:user});
            return {
                hasError:false
            }

        } catch (error) {
            if(axios.isAxiosError(error)){
                return {
                    hasError:true,
                    message:error.response.data.message
                }
            }

            return {
                hasError:true,
                message:'No se pudo crear el usuario - intente nuevamente'
            }
        }
    }

    const logout = ()=>{
        // Cookies.remove('token');
        Cookies.remove('cart');
        Cookies.remove('firsName');
        Cookies.remove('lastName');
        Cookies.remove('address');
        Cookies.remove('address2');
        Cookies.remove('zip');
        Cookies.remove('city');
        Cookies.remove('contry');
        Cookies.remove('phone');
        // router.reload();
        signOut();
    }



    return (
        <AuthContext.Provider value={{
            ...state,
            loginUser,
            registerUser,
            logout
        }}>
            { children }
        </AuthContext.Provider>
    )
};