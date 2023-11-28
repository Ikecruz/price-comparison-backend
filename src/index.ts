import App from "./app"
import MainRoute from "./routes/main.route"

function bootStrap() {

    const app = new App([
        new MainRoute()
    ])

    app.listen()

}

bootStrap()