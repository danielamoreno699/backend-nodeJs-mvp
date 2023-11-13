import { NextFunction, Request, Response } from "express";

const authRole = (role: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (req.body.role !== role) {
        res.status(401)
        return res.send("you are not authorized");
        }
        next();
    };
};

export { authRole };