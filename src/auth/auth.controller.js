import bcryptjs from 'bcryptjs';
import Admin from '../admin/admin.model.js'
import { generarJWT } from '../helpers/generate-jwt.js'; 

export const login = async (req, res) => {
    const { correo, password } = req.body;

  try {
    //verificar si el email existe:
    const admin = await Admin.findOne({ correo });

    if (!admin) {
      return res.status(400).json({
        msg: "Credenciales incorrectas, Correo no existe en la base de datos",
      });
    }
    //verificar si el ususario está activo
    if (!admin.estado) {
      return res.status(400).json({
        msg: "El usuario no existe en la base de datos",
      });
    }
    // verificar la contraseña
    const validPassword = bcryptjs.compareSync(password, admin.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: "La contraseña es incorrecta",
      });
    }
    //generar el JWT
    const token = await generarJWT( usuario.id);

    res.status(200).json({
      msg: 'Login Ok!!!',
      usuario,
      token
    });

  } catch (e) {
    console.log(e);
    res.status(500).json({
      msg: "Comuniquese con el administrador",
    });
  }
}