export default interface interfaceProduct {
  _id: string,
  name: string,
  description: string,
  father: {
    name: string,
    _id: string
  }
  active: Boolean
}