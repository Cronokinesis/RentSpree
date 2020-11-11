import mongoose from 'mongoose';
const { Schema } = mongoose;

export const SchemaProducts = new Schema({
    id: { type: Schema.Types.String, default: '' },
    name: { type: Schema.Types.String, default: '' },
    description: { type: Schema.Types.String, default: '' },
    price: { type: Schema.Types.Number, default: 0.0 },
    createdAt: { type: Schema.Types.Date, default: Date.now },
    updatedAt: { type: Schema.Types.Date, default: Date.now }
})