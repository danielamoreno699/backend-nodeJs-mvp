// import { NextFunction, Request, Response } from "express";

// interface RequestExt extends Request {
//     user?: {
//         role?: string;
//     };
// }

// const authRole = (role: string) => {
//     return (req: RequestExt, res: Response, next: NextFunction) => {
//         if (req.user?.role !== role) {
//             res.status(401).send("You are not authorized");
//         } else {
//             next();
//         }
//     };
// };

// export default authRole;
