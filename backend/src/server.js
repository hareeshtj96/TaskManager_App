
// Creating server instance and congif details
const serverConfig = (server, config) => {
    const startServer = () => {
        server.listen(config.port, '0.0.0.0', () => {
            console.log(`Server is listening on port ${config.port}`)
        });
    }
    return {
        startServer
    }
}

export default serverConfig