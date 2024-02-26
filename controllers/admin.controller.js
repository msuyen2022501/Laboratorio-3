import bcryptjs from 'bcryptjs';
import Admin from '../models/admin.js';
import { generarJWT } from "../helpers/generar-jwt.mjs";

const adminPost = async (req, res) => {
    const { nombre, correo, password, role } = req.body;

    try {
        const adminExistente = await Admin.findOne({ nombre, estado: true });

        if (adminExistente) {
            return res.status(400).json({
                msg: 'Ya existe un admin activo con este nombre'
            });
        }

        const salt = bcryptjs.genSaltSync();
        const hashedPassword = bcryptjs.hashSync(password, salt);

        const admin = new Admin({ nombre, correo, password: hashedPassword, role });
 
        await admin.save(); 
 
        res.status(200).json({ 
            admin
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
}

const adminLogin = async (req, res) => {
    const { correo, password } = req.body;

    try {
        const admin = await Admin.findOne({ correo });

        if (!admin) {
            return res.status(400).json({
                msg: 'Admin no encontrado'
            });
        }

        if(!admin.estado){
            return res.status(400).json({
                msg: 'Admin borrado de la base de datos'
            });
        }

        const passwordValido = bcryptjs.compareSync(password, admin.password);

        if (!passwordValido) {
            return res.status(400).json({
                msg: 'Contraseña incorrecta'
            });
        }

        const token = await generarJWT(admin.id);

        res.status(200).json({
            msg_1: 'Inicio de sesión exitoso',
            msg_2: 'Bienvenido '+ admin.nombre,
            msg_3: 'Este su token =>'+ token,
        });

    } catch(e) {
        console.log(e);
        res.status(500).json({
            msg: 'Error inesperado'
        });
    }
}

export {
    adminPost,
    adminLogin
}
