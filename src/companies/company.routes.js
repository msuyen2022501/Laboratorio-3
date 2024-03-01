import { Router } from "express";
import { check } from "express-validator";
import { getCompanies, postCompany, editCompany, postCompaniesByTrayectoria, postCompaniesByCategoria, postCompaniesByNivelImpacto } from "./company.controller.js";
import { existenteEmail } from "../helpers/db-validators.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";

const router = Router();

router.get("/",validarJWT, getCompanies);

router.post(
    "/",
    validarJWT,
    [
        check("nombre", "El nombre es obligatorio").not().isEmpty(),
        check("descripcion", "La descripción es obligatoria").not().isEmpty(),
        check("contacto", "El contacto es obligatorio").not().isEmpty(),
        check("categoria", "La categoría es obligatoria").not().isEmpty(),
        check("trayectoria", "La trayectoria es obligatoria").not().isEmpty(),
        check("nivelImpacto", "La nivelImpacto es obligatoria").not().isEmpty(),
        check("correo", "Este no es un correo válido").isEmail(),
        check("correo").custom(existenteEmail),
        validarCampos,
    ],
    postCompany
);

router.put("/:id", validarJWT, editCompany);

router.post('/trayectoria', validarJWT, postCompaniesByTrayectoria);

router.post('/categoria', validarJWT, postCompaniesByCategoria);

router.post('/nivelImpacto', validarJWT, postCompaniesByNivelImpacto);


export default router;