import mongoose from 'mongoose';

// Definir el esquema para el modelo de usuario
const AdminSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es obligatorio"],
  },
  correo: {
    type: String,
    required: [true, "El correo es obligatorio"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "La contraseña es obligatoria"],
  },
  img: {
    type: String,
  },
  phone: {
    type: String,
    minLength: 8,
    maxLength: 8,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ["ADMIN_ROLE"],
    default: "ADMIN_ROLE"
  },
  estado: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: true,
  },
});

// Modificar el método toJSON para excluir campos no deseados en la respuesta
AdminSchema.methods.toJSON = function () {
  const { __v, password, _id, ...admin } = this.toObject();
  admin.uid = _id;
  return admin;
};

// Exportar el modelo de usuario
export default mongoose.model('Admin', AdminSchema);