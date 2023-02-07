export default interface interfaceProduct {
  _id: string,
  name: string,
  description: string,
  price: number,
  stock: number,
  images: [string],
  category: {
    name: string
  },
  brand: {
    name: string
  },
  active: Boolean
}