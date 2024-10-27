// Creating server instance and congif details
const serverConfig = (server, config) => {
    const startServer = () => {
        server.listen(config.port, () => {
            console.log(`Server is listening on port ${config.port}`)
        });
    }
    return {
        startServer
    }
}

export default serverConfig