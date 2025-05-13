import { z } from 'zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { postSignup } from '../apis/auth';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { FaRegEyeSlash } from 'react-icons/fa';
import { FaRegEye } from 'react-icons/fa';
import { useState } from 'react';

// ✅ Zod 스키마 정의
const schema = z
    .object({
        email: z.string().email({ message: '올바른 이메일 형식이 아닙니다' }),
        password: z
            .string()
            .min(8, { message: '비밀번호는 8자 이상이어야 합니다.' })
            .max(20, { message: '비밀번호는 20자 이하여야 합니다.' }),
        passwordCheck: z
            .string()
            .min(8, { message: '비밀번호는 8자 이상이어야 합니다.' })
            .max(20, { message: '비밀번호는 20자 이하여야 합니다.' }),
        name: z.string().min(1, { message: '이름을 입력해주세요' }),
    })
    .refine((data) => data.password === data.passwordCheck, {
        message: '비밀번호가 일치하지 않습니다',
        path: ['passwordCheck'],
    });

type FormFields = z.infer<typeof schema>;

const SignupPage = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [passwordCheckVisible, setPasswordCheckVisible] = useState(false);

    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FormFields>({
        defaultValues: {
            name: '',
            email: '',
            password: '',
            passwordCheck: '',
        },
        resolver: zodResolver(schema),
        mode: 'onBlur',
    });
    const { mutate: signupMutation } = useMutation({
        mutationFn: postSignup,
        onSuccess: () => {
            alert('회원가입이 완료되었습니다.');
            navigate('/login');
        },
        onError: (error) => {
            console.error(error);
        },
    });
    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        const { ...rest } = data;

        signupMutation(rest);
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen gap-4">
            <div className="flex flex-col gap-3 p-6 bg-white rounded-md shadow-md w-[320px]">
                <input
                    {...register('email')}
                    className={`border w-full p-3 focus:border-[#807bff] rounded-md 
            ${errors.email ? 'border-red-500 bg-red-200' : 'border-gray-300'}`}
                    type="email"
                    placeholder="이메일"
                />
                {errors.email && (
                    <div className="text-red-500 text-sm">
                        {errors.email.message}
                    </div>
                )}

                <div className="relative flex flex-col w-full">
                    <div
                        className="absolute right-3 top-4"
                        onClick={() => setPasswordVisible(!passwordVisible)}
                    >
                        {passwordVisible ? (
                            <FaRegEye></FaRegEye>
                        ) : (
                            <FaRegEyeSlash></FaRegEyeSlash>
                        )}
                    </div>
                    <input
                        {...register('password')}
                        className={`border w-full p-3 focus:border-[#807bff] rounded-md 
              ${
                  errors.password
                      ? 'border-red-500 bg-red-200'
                      : 'border-gray-300'
              }`}
                        type={passwordVisible ? 'text' : 'password'}
                        placeholder="비밀번호"
                    />
                    {errors.password && (
                        <div className="text-red-500 text-sm">
                            {errors.password.message}
                        </div>
                    )}
                </div>

                <div className="relative flex flex-col w-full">
                    <div
                        className="absolute right-3 top-4"
                        onClick={() =>
                            setPasswordCheckVisible(!passwordCheckVisible)
                        }
                    >
                        {passwordCheckVisible ? (
                            <FaRegEye></FaRegEye>
                        ) : (
                            <FaRegEyeSlash></FaRegEyeSlash>
                        )}
                    </div>
                    <input
                        {...register('passwordCheck')}
                        className={`border w-full p-3 focus:border-[#807bff] rounded-md 
            ${
                errors.passwordCheck
                    ? 'border-red-500 bg-red-200'
                    : 'border-gray-300'
            }`}
                        type={passwordCheckVisible ? 'text' : 'password'}
                        placeholder="비밀번호 확인"
                    />
                    {errors.passwordCheck && (
                        <div className="text-red-500 text-sm">
                            {errors.passwordCheck.message}
                        </div>
                    )}
                </div>

                <input
                    {...register('name')}
                    className={`border w-full p-3 focus:border-[#807bff] rounded-md 
            ${errors.name ? 'border-red-500 bg-red-200' : 'border-gray-300'}`}
                    type="text"
                    placeholder="이름"
                />
                {errors.name && (
                    <div className="text-red-500 text-sm">
                        {errors.name.message}
                    </div>
                )}

                <button
                    disabled={isSubmitting}
                    type="button"
                    onClick={handleSubmit(onSubmit)}
                    className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-medium 
                    hover:bg-blue-700 transition-colors disabled:bg-gray-300"
                >
                    회원가입
                </button>
            </div>
        </div>
    );
};

export default SignupPage;
