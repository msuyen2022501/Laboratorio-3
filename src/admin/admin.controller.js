import { response, request } from "express";
import bcryptjs from 'bcryptjs';
import Admin from '../admin/admin.model.js';

export const getAdmins = async (req = request, res = response) => {
    const { limite, desde } = req.query;
    const query = { estado: true };

    const [total, admins] = await Promise.all([
        Admin.countDocuments(query),
        Admin.find(query)
            .skip(Number(desde))
            .limit(Number(limite)),
    ]);

    res.status(200).json({
        total,
        admins,
    });
}

// Crea un nuevo usuario en la base de datos
export const createAdmin = async (req, res) => {
    const { nombre, correo, password, phone } = req.body;
    const admin = new Admin({ nombre, correo, password, phone });

    // Verifica si el correo ya existe en la base de datos

    // Encripta la contraseña
    const salt = bcryptjs.genSaltSync(); // Por defecto tiene 10 vueltas
    admin.password = bcryptjs.hashSync(password, salt);

    // Guarda los datos del nuevo usuario
    await admin.save();

    res.status(200).json({
        admin,
    });
}
