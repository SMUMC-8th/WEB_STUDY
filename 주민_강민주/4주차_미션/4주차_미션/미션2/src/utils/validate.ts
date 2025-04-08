export type userSigninInformation={
    email: string;
    password: string;
};

export type userSignupEmailOnly={
    email:string;
};

export type userSignupPasswordOnly={
    password:string;
    confirmPassword:string;
};

function validateUser(values: userSigninInformation){
    const errors={
        email: "",
        password: "",
    };

    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
        values.email
        )
    ) {
        errors.email='올바른 이메일 형식을 입력해주세요.';
    }

    if (!(values.password.length>=8)){
        errors.password='비밀번호는 8자 이상이어야 합니다';
    }

    return errors;
}

function validateEmailOnly(values:userSignupEmailOnly){
    const errors={
        email:"",
    };

    if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
        values.email
        )
    ) {
        errors.email='올바른 이메일 형식을 입력해주세요.';
    }

    return errors;
}

function validatePasswordOnly(values: userSignupPasswordOnly){
    const errors={
        password: "",
        confirmPassword: "",
    };

    if(values.password.length < 8) {
        errors.password = "비밀번호는 8자 이상이어야 합니다.";
      }
    
      if (values.password !== values.confirmPassword) {
        errors.confirmPassword = "비밀번호가 일치하지 않습니다.";
      }

      return errors;
}

function validateSignin(values: userSigninInformation){
    return validateUser(values);
}

export {validateSignin, validateEmailOnly, validatePasswordOnly};