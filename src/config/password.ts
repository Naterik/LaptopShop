import bcrypt from 'bcrypt'
const saltRounds = 10;

const hashPassword = async (plainText: string) => {
    const hash = await bcrypt.hash(plainText, saltRounds)
    return hash
}

const comparePassword = async (plainText: string, hashPassword: string) => {
    return bcrypt.compare(plainText, hashPassword)
}

export { hashPassword, comparePassword }