import { Request, Response, NextFunction } from 'express';
import { UserI } from '../interfaces/interface';
import User from '../models/usuarioModel';
import jwt from 'jsonwebtoken';

export const todosUsuarios = async (req: any, res: Response): Promise<any> => {
    const { offset = 0 } = req.query;
    try {
        const usuarios = await User.findAll(
            {
                limit: 10,
                offset
            }
        );
        return res.json(usuarios);
    } catch (error) {
        console.log('error :>> ', error);
        return res.status(400).json({ok:false, error});
    }
};

export const crear = async (req: Request, res: Response): Promise<any> => {
    const { nombre, apellido, edad, password } = req.body;
    
    if(!nombre || !apellido || !edad || !password) return res.status(400).json({ok:false, msj: 'faltan datos'});
    try {
        const usuario = await User.create({nombre, apellido, edad, password});
        return res.json(usuario);
    } catch (error) {
        return res.status(400).json({ok:false, error});
    }
};

export const obtener = async(req: Request, res: Response): Promise<any> => {
    const { id } = req.params;
    try {
        const user = await User.findByPk(id);
        return res.json(user)
    } catch (error) {
        return res.status(400).json({ok:false, error});
    }
};

export const update = async (req: Request, res: Response): Promise<any> => {
    const { id, usuario, apellido, edad, password } = req.body;
    if(!id ||!usuario || !apellido || !edad || !password) return res.status(400).json({ok:false, msj: 'no hy dtos'})
    try {
        User.update({nombre:usuario, apellido, edad, password}, {where: {id}})
        return res.json({})
    } catch (error) {
        return res.status(400).json({ok:false, error});
    }
};
export const deleteUser = async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;
    if(!id) return res.status(400).json({ok:false, msj:'faltan datos'});
    try {
        const data = await User.destroy({where: {id}});
        return res.json(data);
    } catch (error) {
        return res.status(400).json({ok:false, error});
    }
};

export const login = async (req: Request, res: Response): Promise<any> => {
    const { usuario = 'pepe', password= '123456' } = req.body;
    if(!usuario || !password) return res.status(404).json({ok:false, msj:' no se encuentr el usuriuoaaaa'});
    // res.status(400).json({ok:false, msj:'ocurrio un error'});
    try {
        const usuarioDB = await User.findOne({where: {nombre: usuario}});
        if(!usuarioDB) return res.status(401).json({ok:false, msj:'no se encuentr el usurio'});
        const token = jwt.sign({usuarioDB}, '123456');
        // usuarioDB.password = '';
        return res.json({token, usuario: usuarioDB});
    } catch (error) {
        return res.status(401).json({ok:false, msj: 'no se encuentssssra el usurio', error});
    }
}