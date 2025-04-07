import Divider from "../components/Divider";
import GoogleLoginButton from "../components/GoogleLoginButton";
import LoginHeader from "../components/LoginHeader";
import useForm from "../hooks/useForm";
import { userSigninInformation, validateSignin } from "../utils/validate";

const LoginPage=()=>{
    const{values, errors, touched, getInputProps}=useForm<userSigninInformation>({
        initialValue:{
            email: "",
            password: "",
        },
        validate:validateSignin,
    });
    const handleSubmit=()=>{
        console.log(values);
    }

    const isDisabled=
        Object.values(errors||{}).some((error)=>error.length>0)||
        Object.values(values).some(value=>value==="");

    return (
        <div className="flex flex-col items-center justify-center h-full gap-4">
            <div className="flex flex-col gap-3">
                <LoginHeader/>
                <GoogleLoginButton/>
                <Divider/>
                <input 
                    {...getInputProps("email")}
                    className={`text-white bg-neutral-800 border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm`}
                    type={"email"}
                    placeholder={"이메일을 입력해주세요!"}
                     />
                {errors?.email && touched?.email && (
                    <div className="text-red-500 text-sm">{errors.email}</div>
                )}
                <input 
                    {...getInputProps("password")}
                    className={`text-white bg-neutral-800 border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm`}
                    type={"password"}
                    placeholder={"비밀번호를 입력해주세요!"}
                     />
                    {errors?.password && touched?.password && (
                    <div className="text-red-500 text-sm">{errors.password}</div>
                )}
                <button
                    type='button'
                    onClick={handleSubmit}
                    disabled={isDisabled}
                    className="w-full bg-pink-500 text-white py-3 rounded-md text-lg font-medium
                                hover:bg-pink-600 transition-colors cursur-pointer disabled:bg-gray-300"
                    >
                        로그인
                </button>
            </div>
            
        </div>
    );
};

export default LoginPage;