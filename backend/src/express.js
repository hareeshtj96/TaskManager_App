import express from "express";
import cors from "cors";
import http from "http";
import path from "path";
import cookieParser from "cookie-parser"


const expressConfig = (app) => {
    const server = http.createServer(app);

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());

    app.use(
        cors({
            origin: ["http://localhost:5174"],
            methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
            credentials: true,
            allowedHeaders: ["Content-Type", "Authorization"],
        })
    );
    return server
};

export default expressConfig;