import Admin from '../admin/admin.model';

export const existenteEmail = async (correo = '') => {
    const existeEmail = await Admin.findOne({ correo });

    if (existeEmail) {
        throw new Error(`El email ${correo} ya fue registrado`);
    }
}

export const existeAdminById = async (id = '') => {
    const existeAdmin = await Admin.findById(id);

    if (!existeAdmin) {
        throw new Error(`El ID: ${id} No existe`);
    }
}