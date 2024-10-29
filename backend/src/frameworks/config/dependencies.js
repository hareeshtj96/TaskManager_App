import { userRepository } from "../repository/index.js";

import {
    signupUseCase,
    verifyOtpUseCase,
    loginUseCase,
    addTaskUseCase,
    fetchTaskUseCase,
    dragTAskUseCase,
    googleRegisterUseCase,
    googleLoginUseCase
} from "../../application/useCases/index.js"



const useCase = {
    signupUseCase: signupUseCase,
    verifyOtpUseCase: verifyOtpUseCase,
    loginUseCase: loginUseCase,
    addTaskUseCase: addTaskUseCase,
    fetchTaskUseCase: fetchTaskUseCase,
    dragTAskUseCase: dragTAskUseCase,
    googleRegisterUseCase: googleRegisterUseCase,
    googleLoginUseCase: googleLoginUseCase,
}

const repository = {
    userRepository
}

export default {
    useCase,
    repository
}