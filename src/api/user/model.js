import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
    gender: { type: String },
    name: {
        title: { type: String },
        first: { type: String },
        last: { type: String }
    },
    location: {
        street: { type: String },
        city: { type: String },
        state: { type: String },
        postcode: { type: String }
    },
    email: { type: String },
    dob: { type: Date },
    registered: { type: Date },
    phone: { type: String },
    cell: { type: String },
    nat: { type: String }

}, {
    timestamps: true,
});

const model = mongoose.model('User', userSchema);

export default model;