import express, { Express } from "express"
import 'dotenv/config'
import { getHomePage, getCreateUserPage, postCreateUser, postDeleteUser, getViewUser, postUpdateUser } from "controllers/user.controller";
import { getAdminOrderPage, getAdminProductPage, getAdminUserPage, getDashboardPage } from "controllers/admin/dashboard.controller";
import multer from "multer";
import fileUploadMiddleware from "src/middleware/multer";
import { getProductPage } from "controllers/client/product.controller";
import { getAdminCreateProductPage, postAdminCreateProduct } from "controllers/admin/product.controller";
const upload = multer({ dest: 'uploads/' })
const router = express.Router();
const webRoutes = (app: Express) => {
    router.get("/", getHomePage)
    router.get("/product/:id", getProductPage)

    router.get("/admin", getDashboardPage)
    router.get("/admin/user", getAdminUserPage)
    router.get("/admin/create-user", getCreateUserPage)
    router.post("/admin/create-user", fileUploadMiddleware("avatar"), postCreateUser);
    router.post("/admin/delete-user/:id", postDeleteUser)
    router.get("/admin/detail/:id", getViewUser)
    router.post("/admin/update-user", fileUploadMiddleware("avatar"), postUpdateUser)

    router.get("/admin/product", getAdminProductPage)
    router.get("/admin/create-product", getAdminCreateProductPage)
    router.post("/admin/create-product", fileUploadMiddleware("image", "images/products"), postAdminCreateProduct)

    router.get("/admin/order", getAdminOrderPage)
    app.use("/", router);//bắt đầu url với đường link/

}
export default webRoutes


