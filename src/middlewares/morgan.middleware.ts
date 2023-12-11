import morgan, { StreamOptions } from "morgan";
import { NODE_ENV } from "../config";
import { logger } from "../utils/logger";

/* The `const stream` is an object of type `StreamOptions` that is used as a configuration option for
the `morgan` middleware. It specifies how the log messages should be written. */
const stream: StreamOptions = {
    write: (message: string) => 
        logger.http(message.substring(0, message.lastIndexOf("\n")))
}

/**
 * The function `skip` checks if the environment variable `NODE_ENV` is set to "development" and
 * returns `true` if it is not.
 * @returns The function `skip` returns a boolean value. It returns `true` if the `NODE_ENV`
 * environment variable is not set to "development", and `false` otherwise.
 */
const skip = () => {
    const env = NODE_ENV || "development"
    return env !== "development"
}

/* The code is creating a middleware function using the `morgan` library. The `morgan` function takes
two arguments: a log format string and an options object. */
const morganMiddleware = morgan(
    ":method :url :status :res[content-length] - :response-time ms",
    { stream, skip }
)

export default morganMiddleware