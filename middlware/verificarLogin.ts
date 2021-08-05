import { Request, Response, NextFunction } from 'express';
import jwt, { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';

export default async (req: any, res: Response, next: NextFunction) => {
    console.log('entro l middlwre');
    const tok = req.headers.token;
    console.log('tok :>> ', tok);
    if( !tok ) return res.status(401).json({ok:false, msj: 'no tiene token'});
    console.log('tok :>> ', tok);
    try {
        req.usuario = jwt.verify(tok, '123456', {complete: true});
        next();
    } catch (error) {
        if( error instanceof JsonWebTokenError ){
            return res.status(401).json({ok:false, msj: 'token Invalido JsonWebTokenError', error});
        } else if( error instanceof TokenExpiredError ){
            return res.status(401).json({ok:false, msj: 'token expiro TokenExpiredError', error});
        }
    }
}