import { fetchAccountAPI, getAllUsersAPI, getCreateUserAPI, getUserByIdAPI, postAddProductToCartAPI, postLoginUser, putUserById } from "controllers/client/api.controller";
import express, { Express } from "express"
import { checkValidToken } from "middleware/jwt";

const router = express.Router();
const apiRoute = (app: Express) => {
    router.get("/add-product-to-cart", postAddProductToCartAPI),
        router.get("/users", getAllUsersAPI)
    router.get("/users/:id", getUserByIdAPI)
    router.post("/users", getCreateUserAPI)
    router.put("/users/:id", putUserById)
    router.post("/login", postLoginUser)
    router.get("/account", fetchAccountAPI)
    app.use("/api", checkValidToken, router);
}
export { apiRoute }