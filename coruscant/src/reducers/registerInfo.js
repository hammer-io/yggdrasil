import * as validator from '../utils/validator';

const registerInfo = (state = {
    username: "",
    email: "",
    password: "",
    usernameError: "",
    emailError: "",
    passwordError: "",
}, action) => {
    switch (action.type) {
        case 'SET_REGISTER_INFORMATION_USERNAME':
            var newState = {
                ...state,
                ...action.info
            }

            var usernameError = validator.validateUsername(newState.username);
            newState.usernameError = (usernameError===true)?"":usernameError;
            return newState
        case 'SET_REGISTER_INFORMATION_EMAIL':
            var newState = {
                ...state,
                ...action.info
            }

            var emailError = validator.validateEmail(newState.email);
            newState.emailError = (emailError===true)?"":emailError;
            return newState
        case 'SET_REGISTER_INFORMATION_PASSWORD':
            var newState = {
                ...state,
                ...action.info
            }
            var passwordError = validator.validatePassword(newState.password);
            newState.passwordError = (passwordError===true)?"":passwordError;
            return newState
        default:
            return state
    }
}

export default registerInfo