import type { IAuthPayload } from "../../lib/authGuard.js"
export {}

declare global {
    namespace Express {
        export interface Request {
            user?: IAuthPayload
        }
    }
}
