import { Schema, model } from 'mongoose';

const AdminSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El Nombre obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El Correo obligatorio']
    },
    password: {
        type: String,
        required: [true, 'Password obligatorio']
    },
    img: {
        type: String
    },
    role: {
        type: String,
        required: true,
        default: "ADMIN_ROLE"
    },
    estado: {
        type: Boolean,
        default: true
    }
});

AdminSchema.methods.toJSON = function () {
    const { __v, password, _id, ...admin } = this.toObject();
    admin.uid = _id;
    return admin;
}

const Admin = model('Admin', AdminSchema);
export default Admin;