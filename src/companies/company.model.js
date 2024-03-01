import mongoose from 'mongoose';

const companySchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, "El nombre es obligatorio"],
    },
    correo: {
        type: String,
        required: [true, "El correo es obligatorio"],
        unique: true,
      },
    descripcion: {
        type: String,
        required: [true, "La descripcion es obligatoria"]
    },
    contacto: {
        type: Number,
        required: [true, "El contacto es obligatorio"]
    },
    categoria: {
        type: String,
        required: [true, "La categoria es obligatoria"]
    },
    trayectoria: {
        type: Number,
        required: [true, "La trayectoria es obligatoria"]
    },
    nivelImpacto: {
        type: String,
        required: [true, "El nivelImpacto es obligatorio"]
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

companySchema.methods.toJSON = function () {
    const { __v, ...companies } = this.toObject();
    return companies;
};

export default mongoose.model('Company', companySchema);