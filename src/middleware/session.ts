import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt.handle';
 
interface RequestExt extends Request {
    user?: {
        email?: string;
        role?: string;
    };
}

// decode JWT token from payload
const checkJwt = (req: RequestExt, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization || req.headers['x-access-token'] || req.headers.Authorization || '';

    if (typeof authHeader === 'string' && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];
        const decodedToken = verifyToken(token);

        if (decodedToken) {
            const { role, email } = decodedToken;
            req.user = { email, role };
            next();
        }else{
            res.status(401);
            res.send({error: 'you are not authorized'});
        }
    }else{
        res.status(401);
        res.send({error: 'you are not authorized'});
    }

};


// check if user is admin or not
const authRole = (role: string) => {
    return (req: RequestExt, res: Response, next: NextFunction) => {
        if (req.user?.role !== role) {
            res.status(401).send("You are not authorized");
        } else {
            next();
        }
    };
};




export { checkJwt, authRole };


 // try{
    //     const jwtByUser = req.headers['authorization'] || '';
    //     const jwt = jwtByUser.split(' ').pop();
    //     const isUser = verifyToken(`${jwt}`)
    //     if(!isUser){
    //         res.status(401)
    //         res.send({error: 'you are not authorized'})
    //     }else{
    //         req.user = isUser;
    //         next()
    //     }
    // } catch(error){
    //     res.status(401)
    //     res.send({error: 'you are not authorized'})
    // }