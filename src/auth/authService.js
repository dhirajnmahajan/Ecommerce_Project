import bcrypt from "bcryptjs-react"

const saltRounds = 10

export const ConvertHashPassword = async (textPassword) => {
    const salt = await bcrypt.genSaltSync(saltRounds)
    const hashPassword = await bcrypt.hash(textPassword, salt)
    // console.log(hashPassword);

    return hashPassword;
};

export const ComparePassword = async (newPassword, hashedPassword) => {
    const comparedPass = await bcrypt.compare(newPassword, hashedPassword)
    // console.log(comparedPass);

    return comparedPass;

}

