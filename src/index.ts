import App from "./app"
import MainRoute from "./routes/main.route"

/**
 * The function `bootStrap` creates a new instance of the `App` class, adds a `MainRoute` to it, and
 * then starts listening for incoming requests.
 */
function bootStrap() {

    const app = new App([
        new MainRoute()
    ])

    app.listen()

}

bootStrap()