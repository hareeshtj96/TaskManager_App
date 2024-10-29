import { userRepository } from "../repository/index.js";

import {
    signupUseCase,
    verifyOtpUseCase,
    loginUseCase,
    addTaskUseCase,
    fetchTaskUseCase,
    dragTAskUseCase,
    googleRegisterUseCase,
    googleLoginUseCase,
    updateTaskUseCase,
    deleteTaskUseCase
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
    updateTaskUseCase: updateTaskUseCase,
    deleteTaskUseCase: deleteTaskUseCase
}

const repository = {
    userRepository
}

export default {
    useCase,
    repository
}