export default interface interfaceProduct {
  name: String,
  description: String,
  price: Number,
  images: [String],
  category: {
    name: String
  },
  brand: {
    name: String
  },
  active: Boolean
}