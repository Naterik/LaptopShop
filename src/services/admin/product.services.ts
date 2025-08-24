import { prisma } from 'config/client';

const handleCreateProduct = async (name: string, price: number, detailDesc: string, shortDesc: string, quantity: number, factory: string, target: string, image: string) => {
    try {
        const product = await prisma.product.create({
            data: {
                name,
                price,
                detailDesc,
                shortDesc,
                quantity: +quantity,
                factory,
                target,
                ...(image && { image: image })
            },
        })
        return product;
    } catch (e) {
        throw (e)
    }
}

const getAllProduct = async () => {
    try {
        const product = await prisma.product.findMany()
        return product
    } catch (e) {
        throw (e)
    }
}

const handleViewProduct = async (id: number) => {
    try {
        const product = await prisma.product.findUnique({
            where: {
                id,
            },
        })
        return product
    } catch (e) {
        console.log('error view Product', e)
    }
}
const handleUpdateProduct = async (id: number, name: string, price: number, detailDesc: string, shortDesc: string, quantity: number, factory: string, target: string, image: string) => {
    try {
        const updateProduct = await prisma.product.update({
            where: {
                id
            },
            data: {
                name,
                price,
                detailDesc,
                shortDesc,
                quantity: +quantity,
                factory,
                target,
                ...(image && { image: image })
            },
        })
        return updateProduct
    } catch (e) {
        console.log('error update product', e)
    }
}

const handleDeleteProduct = async (id: number) => {
    try {
        const deleteProduct = await prisma.product.delete({
            where: {
                id
            },
        })
        return deleteProduct
    } catch (e) {
        console.log('error delete product', e)
    }
}
export { handleCreateProduct, getAllProduct, handleViewProduct, handleUpdateProduct, handleDeleteProduct }