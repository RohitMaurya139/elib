import app from "./src/app.ts";
import { config } from "./src/config/config.ts";



const startServer = async () => {


    const port =config.port

    app.listen(port, () => {
        console.log(`Listening on port: ${port}`);
    });
};

startServer();
