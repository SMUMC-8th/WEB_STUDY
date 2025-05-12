import { useEffect } from 'react';
import useForm from '../hooks/useForm';
import { UserSigninInformation, validateSignin } from '../utils/validate';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // 필요하다면 여기에 useAuth import 추가
import googlelogo from '../images/googlelogo.svg';

const LoginPage = () => {
    const { login, accessToken } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (accessToken) {
            navigate('/');
        }
    }, [navigate, accessToken]);

    const { values, errors, touched, getInputProps } =
        useForm<UserSigninInformation>({
            initialValue: {
                email: '',
                password: '',
            },
            validate: validateSignin,
        });

    const handleSubmit = async () => {
        await login(values);
    };

    const handleGoogleLogin = () => {
        window.location.href =
            import.meta.env.VITE_SERVER_API_URL + 'v1/auth/google/login';
    };

    const isDisabled =
        Object.values(errors || {}).some((error: string) => error.length > 0) ||
        Object.values(values).some((value: string) => value === '');

    return (
        <div className="flex flex-col items-center justify-center h-screen gap-4 bg-gray-50">
            <div className="flex flex-col gap-3 p-6 bg-white shadow-md rounded-md w-[320px]">
                <input
                    {...getInputProps('email')}
                    name="email"
                    className={`border w-full p-3 focus:border-[#807bff] rounded-md 
            ${
                errors?.email && touched?.email
                    ? 'border-red-500 bg-red-200'
                    : 'border-gray-300'
            }`}
                    type="email"
                    placeholder="이메일"
                />
                {errors?.email && touched?.email && (
                    <div className="text-red-500 text-sm">{errors.email}</div>
                )}
                <input
                    {...getInputProps('password')}
                    name="password"
                    className={`border w-full p-3 focus:border-[#807bff] rounded-md 
            ${
                errors?.password && touched?.password
                    ? 'border-red-500 bg-red-200'
                    : 'border-gray-300'
            }`}
                    type="password"
                    placeholder="비밀번호"
                />
                <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isDisabled}
                    className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-medium 
                   hover:bg-blue-700 transition-colors disabled:bg-gray-300"
                >
                    로그인
                </button>
                <button
                    type="button"
                    onClick={handleGoogleLogin}
                    className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-medium cursor-pointer"
                >
                    <div className="flex items-center justify-center gap-4">
                        <img src={googlelogo} alt="Google Logo Image" />
                        <span>구글 로그인</span>
                    </div>
                </button>
            </div>
        </div>
    );
};

export default LoginPage;
