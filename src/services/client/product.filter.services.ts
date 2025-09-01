import { PrismaClient } from '@prisma/client';
import { prisma } from "config/client"

const filterMinPrice = async (minPrice: string) => {
    return await prisma.product.findMany({
        where: {
            price: {
                gte: +minPrice,
            },
        },
    })
}
const filterMaxPrice = async (maxPrice: string) => {
    return await prisma.product.findMany({
        where: {
            price: {
                lte: +maxPrice,
            },
        },
    })
}

const filterFactoryApple = async (apple: string) => {
    return await prisma.product.findMany({
        where: {
            factory: {
                equals: apple
            }
        }
    })
}
const filterFactoryAppleAndDell = async (factory: string[]) => {
    return await prisma.product.findMany({
        where: {
            factory: {
                in: factory
            }
        }
    })
}
const filterPriceRange = async (min: number, max: number) => {
    return await prisma.product.findMany({
        where: {
            price: {
                lte: max,
                gte: min
            }
        },
    });
}
const filterPriceInTwoRange = async () => {
    return await prisma.product.findMany({
        where: {
            OR: [
                {
                    price: {
                        gte: 10000000,
                        lte: 15000000
                    }
                },
                {
                    price: {
                        gte: 16000000,
                        lte: 20000000
                    }
                }

            ]
        },
    });
}

const sortPriceASC = async () => {
    return await prisma.product.findMany({
        orderBy: {
            price: 'asc'
        }
    })
}

const getProductWithFilter = async (page: number, pageSize: number, target: string, factory: string, price: string, sort: string) => {
    let whereClause: any = {}
    if (factory) {
        const factoryInput = factory.split(",")
        whereClause.factory = {
            in: factoryInput
        }
    }
    if (target) {
        const targetInput = target.split(",")
        whereClause.target = {
            in: targetInput
        }
    }
    if (price) {
        const priceCondition = []
        const priceInput = price.split(",")
        for (let i = 0; i < priceInput.length; i++) {
            switch (priceInput[i]) {
                case ("duoi-10-trieu"):
                    priceCondition.push({ "price": { "lt": 10000000 } });
                    break;
                case ("10-15-trieu"):
                    priceCondition.push({ "price": { "gte": 10000000, "lte": 15000000 } });
                    break;
                case ("15-20-trieu"):
                    priceCondition.push({ "price": { "gte": 15000000, "lte": 20000000 } });
                    break;
                case ("tren-20-trieu"):
                    priceCondition.push({ "price": { "gt": 20000000 } });
                    break;
            }
        }
        whereClause.OR = priceCondition
    }

    let orderByClause: any = {}
    if (sort) {
        if (sort === "gia-tang-dan") {
            orderByClause = {
                price: "asc"
            }
        }
        if (sort === "gia-giam-dan") {
            orderByClause = {
                price: "desc"
            }
        }
    }

    const skip = (page - 1) * pageSize
    const [products, count] = await prisma.$transaction([
        prisma.product.findMany({
            skip,
            take: pageSize,
            where: whereClause,
            orderBy: orderByClause
        }),
        prisma.product.count({ where: whereClause })
    ]);
    const totalPages = Math.ceil(count / pageSize)
    return {
        products, totalPages
    }


}

export { filterMinPrice, filterMaxPrice, filterFactoryApple, filterFactoryAppleAndDell, filterPriceRange, filterPriceInTwoRange, sortPriceASC, getProductWithFilter }