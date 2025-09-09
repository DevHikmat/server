import bcrypt from "bcrypt";

export const hashedPassword = (pass: string) => {
    const saltCount = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(pass, saltCount);
}

export const comparePassword = (pass: string, hashPass:string) => {
    return bcrypt.compareSync(pass, hashPass);
}