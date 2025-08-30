import { Request, Response } from "express"
import { addProductToCart, deleteProductInCart, getDetailProduct, handlePlaceOrder, showCartDetailById, updateCartDetailBeforeCheckOut } from "services/client/item.services";
const getProductDetail = async (req: Request, res: Response) => {
    const { id } = req.params;
    const product = await getDetailProduct(+id)
    return res.render("client/product/detail", { product })
}

const postProductToCart = async (req: Request, res: Response) => {
    const { id } = req.params
    const { user } = req;
    if (user) {
        await addProductToCart(1, +id, user)
    } else return res.redirect("/login")
    return res.redirect("/")
}

const getCartPage = async (req: Request, res: Response) => {
    const { user } = req;
    const cartDetails = await showCartDetailById(user?.id)
    if (!user) {
        return res.redirect("/login")
    }
    const totalPrice = await cartDetails.map(item => +item.price * +item.quantity)?.reduce((a, b) => a + b, 0)

    return res.render("client/product/cart", { cartDetails, totalPrice })
}

const postDeleteProductInCart = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { user } = req
    if (user) {
        await deleteProductInCart(+id, user.id, user.sumCart)
    } else {
        return res.redirect("/login")
    }
    return res.redirect("/cart")
}

const getCheckOutPage = async (req: Request, res: Response) => {
    const { user } = req;
    const cartDetails = await showCartDetailById(user?.id)
    if (!user) {
        return res.redirect("/login")
    }
    const totalPrice = await cartDetails.map(item => +item.price * +item.quantity)?.reduce((a, b) => a + b, 0)

    return res.render("client/product/checkout", { cartDetails, totalPrice })
}
const postHandleCartToCheckOut = async (req: Request, res: Response) => {
    const { user } = req;
    if (!user) {
        return res.redirect("/login")
    }
    const currentCart: { id: string, quantity: string }[] = req?.body?.cartDetails ?? []
    await updateCartDetailBeforeCheckOut(currentCart)

    return res.redirect("/checkout")
}

const postPlaceOrder = async (req: Request, res: Response) => {
    const { user } = req;
    const { receiverName, receiverAddress, receiverPhone, totalPrice } = req.body
    if (!user) return res.redirect("/login")
    await handlePlaceOrder(user.id, receiverName, receiverAddress, receiverPhone, totalPrice)
    return res.redirect("/thanks")
}

const getThanksPage = async (req: Request, res: Response) => {
    const { user } = req;
    if (!user) { return res.redirect("/login") }
    return res.render("client/product/thanks")
}

export { getProductDetail, postProductToCart, getCartPage, postDeleteProductInCart, postHandleCartToCheckOut, getCheckOutPage, postPlaceOrder, getThanksPage }