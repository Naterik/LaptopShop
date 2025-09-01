import { Request, Response } from "express"
import { addProductToCart, deleteProductInCart, getDetailProduct, handlePlaceOrder, showCartDetailById, showHistoryOrderDetail, updateCartDetailBeforeCheckOut } from "services/client/item.services";
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

    if (!user) {
        return res.redirect("/login")
    }
    const cartDetails = await showCartDetailById(+user?.id)
    const totalPrice = await cartDetails.map(item => +item.price * +item.quantity)?.reduce((a, b) => a + b, 0)
    const cartId = cartDetails.length ? cartDetails[0].cartId : 0
    return res.render("client/product/cart", { cartDetails, totalPrice, cartId })
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
    const { cartId } = req.body
    if (!user) {
        return res.redirect("/login")
    }
    const currentCart: { id: string, quantity: string }[] = req?.body?.cartDetails ?? []
    await updateCartDetailBeforeCheckOut(currentCart, cartId)

    return res.redirect("/checkout")
}

const postPlaceOrder = async (req: Request, res: Response) => {
    const { user } = req;
    const { receiverName, receiverAddress, receiverPhone, totalPrice } = req.body
    if (!user) return res.redirect("/login")
    const message = await handlePlaceOrder(user.id, receiverName, receiverAddress, receiverPhone, totalPrice)
    if (message) { return res.redirect("/checkout") }
    return res.redirect("/thanks")
}

const getThanksPage = async (req: Request, res: Response) => {
    const { user } = req;
    if (!user) { return res.redirect("/login") }
    return res.render("client/product/thanks")
}
const getOrderHistory = async (req: Request, res: Response) => {
    const { user } = req
    const orders = await showHistoryOrderDetail(+user.id)
    return res.render("client/home/history", { orders })
}

const postAddToCartFromDetail = async (req: Request, res: Response) => {
    const { id } = req.params
    const { quantity } = req.body
    const { user } = req
    if (!user) { return res.redirect("/login") }
    await addProductToCart(+quantity, +id, user)
    return res.redirect(`/product/${id}`)
}

export { getProductDetail, postProductToCart, getCartPage, postDeleteProductInCart, postHandleCartToCheckOut, getCheckOutPage, postPlaceOrder, getThanksPage, getOrderHistory, postAddToCartFromDetail }