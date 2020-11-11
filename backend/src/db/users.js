import mongoose from 'mongoose';
const { Schema } = mongoose;

export const SchemaUsers = new Schema({
    email: { type: Schema.Types.String, lowercase: true, trim: true },
    username: { type: Schema.Types.String, lowercase: true, trim: true, unique: true },
    password: { type: Schema.Types.String },
    firstName: Schema.Types.String,
    lastName: Schema.Types.String,
    createdAt: { type: Schema.Types.Date, default: Date.now },
    updatedAt: { type: Schema.Types.Date, default: Date.now }
})