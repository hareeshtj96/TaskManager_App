import dotenv from "dotenv";
dotenv.config();

export default {
    port: process.env.PORT || 7000,
    mongo: {
        uri: process.env.MONGODBURI
    }
}