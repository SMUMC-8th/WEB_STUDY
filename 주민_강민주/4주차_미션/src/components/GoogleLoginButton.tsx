const GoogleLoginButton=()=>{
    return(
        <button className="w-full flex items-center justify-center gap-2 border border-white text-white py-2 rounded
            hover:bg-white/10 transition">
                <img
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                    alt="Google"
                    className="w-5 h-5"
                />
                구글 로그인
            </button>
    );
};

export default GoogleLoginButton;