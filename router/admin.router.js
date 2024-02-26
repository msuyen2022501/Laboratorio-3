import { Router } from 'express';
import { check } from 'express-validator';
import { validarCampos } from '../middlewares/validar-campos.js';
import { existenteEmail } from '../helpers/db-validators.js';
import { adminPost, adminLogin } from '../controllers/admin.controller.js';

const router = Router();

router.post(
    "/",
    [
        check("nombre", "El nombre es obligatorio").not().isEmpty(),
        check("password", "El password debe tener más de 6 letras").isLength({ min: 6 }),
        check("correo", "El correo debe ser un correo").isEmail(),
        check("correo").custom(existenteEmail),
        validarCampos,
    ], adminPost);

router.post(
    "/login",
    [
        check('correo', 'Este correo no es valido').isEmail(),
        check('password', 'La Password es necesaria.').not().isEmpty(),
        validarCampos,
    ],
    adminLogin);

export default router;
