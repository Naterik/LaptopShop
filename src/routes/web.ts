import express, { Express } from "express"
import 'dotenv/config'
import { getCreateUserPage, getHomePage, getTest, postCreateUser } from "controllers/user.controller";
const router = express.Router();
const webRoutes = (app: Express) => {
    router.get("/", getHomePage)
    router.get("/test", getTest)
    router.get("/create-user", getCreateUserPage)
    router.post("/handle-create-user", postCreateUser);
    app.use("/", router);//bắt đầu url với đường link/

}
export default webRoutes


