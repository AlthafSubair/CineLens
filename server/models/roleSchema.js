import mongoose from 'mongoose';

const roleSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    url: { type: String, required: true },
    public_id: { type: String, required: true },
},{ timestamps: true })

const Role = mongoose.model('Role', roleSchema);
export default Role;