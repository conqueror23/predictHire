import jwt from 'jsonwebtoken'
export const SECRETE_KEY = "encryption secrete here"; 
export const genToken= async (tokenContent:Object)=>{
    return jwt.sign(
        tokenContent,
        SECRETE_KEY,
        {expiresIn: "24h" }
      );
}

export const ifAdminToken=async (token:string)=>{
    const verifiedToken = await jwt.verify(token,SECRETE_KEY)
    return  verifiedToken.role ==='admin'?true:false
}