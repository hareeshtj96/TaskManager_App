import { userRepository } from "../repository/index.js";

import {
    signupUseCase,
    verifyOtpUseCase,
    loginUseCase,
    addTaskUseCase
} from "../../application/useCases/index.js"



const useCase = {
    signupUseCase: signupUseCase,
    verifyOtpUseCase: verifyOtpUseCase,
    loginUseCase: loginUseCase,
    addTaskUseCase: addTaskUseCase
}

const repository = {
    userRepository
}

export default {
    useCase,
    repository
}