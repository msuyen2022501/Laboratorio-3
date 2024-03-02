import jwt from 'jsonwebtoken';
import Admin from '../admin/admin.model.js';

export const validarJWT = async (req, res, next) => {
    const token = req.header("x-token");

    if (!token) {
        return res.status(401).json({
            msg: "No hay token en la petición",
        });
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        const admin = await Admin.findById(uid);

        if (!admin) {
            return res.status(401).json({
                msg: 'Administrador no existe en la base de datos'
            });
        }

        if (!admin.estado) {
            return res.status(401).json({
                msg: 'Token no válido - administrador con estado:false'
            });
        }

        req.admin = admin;

        next();
    } catch (e) {
        console.log(e);
        res.status(401).json({
            msg: "Token no válido",
        });
    }
}