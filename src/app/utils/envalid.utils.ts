import dotenv from "dotenv";
import { cleanEnv, EnvError, EnvMissingError, num, str } from "envalid";
import path from "path";

// Declaring path for specific .env files
dotenv.config({ path: path.join(process.cwd(), ".env") });

const env = cleanEnv(process.env, {
    NODE_ENV: str({ choices: ['development', 'test', 'production', 'staging'] }),
    PORT: num({ default: 5000, docs: "The port on which the server will run" }),
    // DEBUG: bool({ docs: "Enable debug mode", default: false, choices: [true, false], requiredWhen: (env) => env.NODE_ENV === 'development' }),

}, {
    reporter: ({ errors, env }) => {


        if (Object.keys(errors).length > 0) {
            for (const [key, err] of Object.entries(errors)) {

                if (err instanceof EnvMissingError) {
                    console.error(`❌ Missing env: ${key}`)
                }
                else if (err instanceof EnvError) {
                    console.error(`⚠️ Invalid value for ${key}: ${err.message}`)
                }

                else {
                    console.error(`Unknown error for ${key}`)
                }
            }

            // VERY IMPORTANT: exit manually on errors
            process.exit(1)
        }
    }
});

export default env;