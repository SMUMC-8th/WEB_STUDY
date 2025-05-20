import { useState } from "react";

type Props={
    onComplete:(nickname:string)=>void;
};

const SignupProfileStep=({onComplete}:Props)=>{
    const [nickname, setNickname]=useState("");

    const isDisabled=nickname.trim()==="";

    const handleSubmit=()=>{
        onComplete(nickname);
    };

    return(
        <div className="flex flex-col items-center gap-4">
            <img
                src="https://www.pngarts.com/files/10/Default-Profile-Picture-Download-PNG-Image.png"
                alt="profile"
                className="w-30 h-30 rounded-full object-cover border border-gray-300 shadow"/>

            <input
                className="text-white bg-neutral-800 border border-[#ccc] w-[300px] p-[15px] focus:border-[#807bff] rounded-sm text-center"
                type="text"
                value={nickname}
                onChange={(e)=>setNickname(e.target.value)}
                placeholder="닉네임을 입력해주세요!"
                />

            <button
                onClick={handleSubmit}
                disabled={isDisabled}
                className="w-full bg-pink-500 text-white py-3 rounded-md text-lg font-medium
                        hover:bg-pink-600 transition-colors disabled:bg-gray-300"
            >
                회원가입 완료
            </button>
        </div>
    );
};

export default SignupProfileStep;