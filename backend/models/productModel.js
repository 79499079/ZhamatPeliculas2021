import mongoose from 'mongoose';
const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    comment: { type: String, required: true },
    rating: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);
const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    actores: { type: String, required: true },
    argumento: { type: String, required: true },
    genero: { type: String, required: true },
    calidad: {type: String, required: true},
    idioma: {type: String, required: true},
    year: {type: Number, required: true} ,
    precio: { type: Number, required: true },    
    countInStock: { type: Number, required: true },   
    image: { type: String, required: true },
    nuevo: {type: Boolean, default: true, required: true}, 
    seller: { type: mongoose.Schema.Types.ObjectID, ref: 'User' },    
    rating: { type: Number, required: true },
    numReviews: { type: Number, required: true },
    reviews: [reviewSchema],
  },
  {
    timestamps: true,
  }
);
const Product = mongoose.model('Product', productSchema);

export default Product;
