import { createAction, props } from "@ngrx/store"
import { loginModel, user, userInfo, usermodel } from "../Model/usermodel"

// export const load_user='[user page]load user'
// export const load_user_success='[user page]load user success'
// export const load_user_failure='[user page]load user failure'
// export const register_user='[user page]load user'
// export const register_user_success='[user page]load user success'
export const login_user='[user page]load user'
export const login_user_success='[user page]load user success'


// export const loaduser=createAction(load_user)
// export const loaduserSuccess=createAction(load_user_success,props<{list:user[]}>())
// export const loaduserfailure=createAction(load_user_failure,props<{errormessage:string}>())
// export const registeruser=createAction(register_user,props<{inputdata:user}>())
// export const registerusersuccess=createAction(register_user_success,props<{inputdata:user}>())
export const loginUser=createAction(login_user,props<{data:loginModel}>())
export const loginUserSuccess=createAction(login_user_success,props<{data:userInfo}>())