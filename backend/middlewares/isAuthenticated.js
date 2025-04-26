import jwt from "jsonwebtoken"
export const isAuthenticated = async (req,res,next) => {
    try {
        let token = req.cookies.jwt;
        if(!token)
        {
            return res.status(500).json({
                success : false,
                message : "User not Aunthicated"
            })
        }

        let decoded = await jwt.verify(token, process.env.SECRET_KEY);
        if(!decoded)
        {
            return res.status(500).json({
                success : false,
                message : "Invalid Token"
            })
        }

        req.id = decoded.userId;
        next()
    } catch (error) {
        return res.status(500).json({
            success : false,
            message : "Unathorised access",
            error
        })
    }
}