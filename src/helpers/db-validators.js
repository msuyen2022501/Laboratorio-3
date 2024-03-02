import Admin from '../admin/admin.model.js';

export const existenteEmail = async (correo = '') => {
    const existeEmail = await Admin.findOne({ correo });

    if (existeEmail) {
        throw new Error(`El email ${correo} ya fue registrado`);
    }
}