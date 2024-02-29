import { Router } from "express";
import { check } from "express-validator";
import {
  getAdmins,
  createAdmin
} from "./admin.controller.js";
import {
  existenteEmail,
  esRoleValido
} from "../helpers/db-validators.js";
import { validarCampos } from "../middlewares/validar-campos.js";

const router = Router();

// Ruta para obtener la lista de usuarios
router.get("/", getAdmins);

// Ruta para crear un nuevo usuario
router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("password", "El password debe ser mayor a 6 caracteres").isLength({
      min: 6,
    }),
    check("correo", "Este no es un correo válido").isEmail(),
    check("correo").custom(existenteEmail),
    check("role").custom(esRoleValido),
    check("phone","El teléfono debe de contener 8 números").isLength({min: 8, max:8}),
    validarCampos,
  ],
  createAdmin
);

export default router;