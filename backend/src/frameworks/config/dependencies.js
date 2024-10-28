import { userRepository } from "../repository/index.js";

import {
    signupUseCase,
    verifyOtpUseCase
} from "../../application/useCases/index.js"


const useCase = {
    signupUseCase: signupUseCase,
    verifyOtpUseCase: verifyOtpUseCase
}

const repository = {
    userRepository
}

export default {
    useCase,
    repository
}