import express, { Express } from "express"
import 'dotenv/config'
import { getHomePage, getCreateUserPage, postCreateUser, postDeleteUser, getViewUser, postUpdateUser } from "controllers/user.controller";
import { getAdminOrderPage, getAdminProductPage, getAdminUserPage, getDashboardPage } from "controllers/admin/dashboard.controller";
import fileUploadMiddleware from "src/middleware/multer";
import { getProductDetail } from "controllers/client/product.controller";
import { getAdminCreateProductPage, getAdminViewProduct, postAdminCreateProduct, postAdminDeleteProduct, postAdminUpdateProduct } from "controllers/admin/product.controller";
import { getLoginPage, getRegisterPage, getSuccessRedirectPage, postLogout, postRegister } from "controllers/client/auth.controller";
import passport from "passport";
import { isAdmin, isLogin } from "middleware/auth";

const router = express.Router();
const webRoutes = (app: Express) => {
    router.get("/", getHomePage)
    router.get("/product/:id", getProductDetail)

    router.get("/success-redirect", getSuccessRedirectPage)
    router.get("/login", isLogin, getLoginPage);
    router.get("/register", getRegisterPage);
    router.post("/register", postRegister);
    router.post('/login', passport.authenticate('local', {
        successRedirect: '/success-redirect',
        failureRedirect: '/login',
        failureMessage: true,
    }));
    router.post("/logout", postLogout);

    router.get("/admin", isAdmin, getDashboardPage)
    router.get("/admin/user", getAdminUserPage)
    router.get("/admin/create-user", getCreateUserPage)
    router.post("/admin/create-user", fileUploadMiddleware("avatar"), postCreateUser);

    router.get("/admin/detail/:id", getViewUser)
    router.post("/admin/update-user", fileUploadMiddleware("avatar"), postUpdateUser)
    router.post("/admin/delete-user/:id", postDeleteUser)

    router.get("/admin/product", getAdminProductPage)
    router.get("/admin/create-product", getAdminCreateProductPage)
    router.post("/admin/create-product", fileUploadMiddleware("image", "images/products"), postAdminCreateProduct)
    router.get("/admin/detail-product/:id", getAdminViewProduct)
    router.post("/admin/update-product", fileUploadMiddleware("image", "images/products"), postAdminUpdateProduct)
    router.post("/admin/delete-product/:id", postAdminDeleteProduct);

    router.get("/admin/order", getAdminOrderPage)
    app.use("/", isAdmin, router);//bắt đầu url với đường link/

}
export default webRoutes


