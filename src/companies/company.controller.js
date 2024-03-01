import { response, request } from "express";
import Company from '../companies/company.model.js';

export const getCompanies = async (req = request, res = response) => {
    const { limite, desde } = req.query;
    const query = { estado: true };

    const [total, companies] = await Promise.all([
        Company.countDocuments(query),
        Company.find(query)
            .skip(Number(desde))
            .limit(Number(limite)),
    ]);

    res.status(200).json({
        total,
        companies,
    });
}

export const postCompaniesByTrayectoria = async (req, res) => {
    try {
        const { trayectoria } = req.body;

        if (!trayectoria) {
            return res.status(400).json({ error: "Falta el parámetro 'trayectoria' en el cuerpo de la solicitud" });
        }

        const companies = await Company.find({ trayectoria });

        res.status(200).json({ companies });
    } catch (error) {
        console.error("Error al obtener las empresas por años de trayectoria:", error);
        res.status(500).json({ error: "Error al obtener las empresas por años de trayectoria" });
    }
}

export const postCompaniesByCategoria = async (req, res) => {
    try {
        const { categoria } = req.body;

        if (!categoria) {
            return res.status(400).json({ error: "Falta el parámetro 'categoria' en el cuerpo de la solicitud" });
        }

        const companies = await Company.find({ categoria });

        res.status(200).json({ companies });
    } catch (error) {
        console.error("Error al obtener las empresas por categoría:", error);
        res.status(500).json({ error: "Error al obtener las empresas por categoría" });
    }
};

export const postCompaniesByNivelImpacto = async (req, res) => {
    try {
        const { nivelImpacto } = req.body;

        if (!nivelImpacto) {
            return res.status(400).json({ error: "Falta el parámetro 'nivelImpacto' en el cuerpo de la solicitud" });
        }

        const companies = await Company.find({ nivelImpacto });

        res.status(200).json({ companies });
    } catch (error) {
        // Manejar errores
        console.error("Error al obtener las empresas por nivel de impacto:", error);
        res.status(500).json({ error: "Error al obtener las empresas por nivel de impacto" });
    }
};

export const postCompany = async (req, res) => {
    const { nombre, descripcion, contacto, categoria, trayectoria, nivelImpacto, correo } = req.body;

    const existingCompany = await Company.findOne({ nombre, correo });

    if (existingCompany) {
        return res.status(400).json({ error: "Ya existe una empresa con el mismo correo y nombre" });
    }

    const company = new Company({ nombre, descripcion, contacto, categoria, trayectoria, nivelImpacto, correo});
    await company.save();

    res.status(200).json({ company });
};

export const editCompany = async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, contacto, categoria, trayectoria, nivelImpacto, correo } = req.body;

    try {
        if (!id || (!nombre && !descripcion && !contacto && !categoria && !trayectoria && !nivelImpacto && !correo)) {
            return res.status(400).json({ error: "Se requiere el ID de la empresa y al menos uno de los campos para actualizar" });
        }

        const empresaActualizada = await Company.findByIdAndUpdate(id, 
            { nombre, descripcion, contacto, categoria, trayectoria, nivelImpacto, correo },
            { new: true }
        );

        if (!empresaActualizada) {
            return res.status(404).json({ error: "Empresa no encontrada" });
        }

        res.status(200).json({ empresa: empresaActualizada });
    } catch (error) {   
        console.error(error);
        res.status(500).json({ error: "Error al actualizar la empresa" });
    }
} 
