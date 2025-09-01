import { postAddProductToCartAPI } from "controllers/client/api.controller";
import express, { Express } from "express"

const router = express.Router();
const apiRoute = (app: Express) => {
    router.get("/add-product-to-cart", postAddProductToCartAPI),
        app.use("/api", router);
}
export { apiRoute }