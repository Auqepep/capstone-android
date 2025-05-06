import Button from "../../components/button.jsx";
import { Link } from "react-router-dom";
import SignUp from "../pages/SignUp";
export default function Login() {
    return (    
    <>
    <div style= {{ backgroundColor: '#f7fbfa'}} className="min-h-screen flex justify-center items-center">
        <div style= {{ backgroundColor: '#f7fbfa'}} className="rounded-lg shadow-lg shadow-black/30 h-96 pl-8 space-y-3 w-[350px] flex flex-col justify-center">
            <form className="space-y-3" action="">
<div>
    <p className="font-bold text-3xl tracking-wide">LOGIN</p>
</div>
<div className="mr-5">
    <p className="text-zinc-600 font-semibold">Email</p>
    <input className="rounded-full outline-none h-10 px-5 border border-sm w-full" type="text" placeholder="Email" required/>
</div>
<div className="mr-5">
    <p className="text-zinc-600 font-semibold">Password</p>
    <input className="rounded-full outline-none h-10 px-5 border border-sm w-full" type="password" placeholder="Password" />
</div>
<div className="flex space-y-1.5 gap-5 mt-1">
    <input type="checkbox" />
    <p className="mb-2">Remember me?</p>
</div>
<div className="mr-5">
<Button title="Login" to="/login" className="py-2 px-32 text-sm w-full" condition={true}/>
    <p className="text-end mt-5">Forgot Password?</p>
</div>
<div>
    <p className="text-zinc-500">Don’t have an Account? <span className="text-black font-bold underline underline-offset-4"><Link to="/signUp" element={<SignUp/>}>Sign Up</Link></span></p>
</div>
            </form> 
        </div>
        </div>
    </>
    );
    }