
import { Request, Response } from "express"
import { handleCreateUserAPI, handleGetAllUser, handleGetUserById, handleLoginUser, handlePutUserByIdAPI } from "services/client/api.services"
import { addProductToCart } from "services/client/item.services"
const postAddProductToCartAPI = async (req: Request, res: Response) => {
    const { quantity, productId } = req.body
    const { user } = req
    const currentSum = user?.sumCart ?? 0
    const newSum = +currentSum + (+quantity)
    await addProductToCart(+quantity, +productId, user)
    res.status(200).json({
        data: newSum
    })
}

const getAllUsersAPI = async (req: Request, res: Response) => {
    const allUsers = await handleGetAllUser();
    const { user } = req
    console.log('user :>> ', user);
    return res.status(200).json({
        data: allUsers
    })

}

const getUserByIdAPI = async (req: Request, res: Response) => {
    const { id } = req.params
    const userById = await handleGetUserById(+id)
    return res.status(200).json({
        data: userById
    })
}

const putUserById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { fullName, username } = req.body;
    const putUser = await handlePutUserByIdAPI(+id, fullName, username);
    return res.status(200).json({
        data: "update"
    })
}

const postLoginUser = async (req: Request, res: Response) => {
    const { username, password } = req.body
    try {
        const access_token = await handleLoginUser(username, password)
        return res.status(200).json({
            data: {
                access_token
            }
        })
    } catch (error) {
        return res.status(401).json({
            data: null,
            message: error.message
        })
    }

}
const fetchAccountAPI = async (req: Request, res: Response) => {
    const { user } = req
    return res.status(200).json({
        data: {
            user
        }
    })
}

const getCreateUserAPI = async (req: Request, res: Response) => {
    const { fullName, email, password, confirmPassword } = req.body
    if (password !== confirmPassword) {
        return res.status(401).json({
            message: "Password not match"
        })
    }
    try {
        const createUser = await handleCreateUserAPI(fullName, email, password, confirmPassword)
        return res.status(200).json({
            data: createUser,
            message: "Create user success"
        })
    } catch (error) {
        return res.status(401).json({
            message: "Not create user"
        })
    }

}

export { postAddProductToCartAPI, getAllUsersAPI, getUserByIdAPI, putUserById, postLoginUser, fetchAccountAPI, getCreateUserAPI }