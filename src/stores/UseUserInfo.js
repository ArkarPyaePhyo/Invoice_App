import { create } from "zustand";


const UseUserInfo = create((set)=>({
    user : {},
    setUser : (user)=>set({user}),
    resetUser : ()=>set({user:{}})
}));

export default UseUserInfo;