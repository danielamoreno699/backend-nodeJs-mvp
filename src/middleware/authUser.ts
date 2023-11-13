import { NextFunction, Request, Response } from "express";


const authUser = (req: Request, res: Response, next: NextFunction) => {
    if (req.body == null) {
    res.status(403)
    return res.send("you need to sign in");
    }
    next();
}

export default authUser;