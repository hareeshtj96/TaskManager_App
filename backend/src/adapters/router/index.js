import express from "express";
import userRoute from './authenticationRouter/userRoute.js'

export const routes = (dependencies) => {
    const router = express.Router();

    router.use('/', userRoute(dependencies));

    return router;
}