import fs from 'fs'

class CartManager {
  constructor(path) {
    this.path = path
    fs.existsSync(this.path) ? this.cart = JSON.parse(fs.readFileSync(this.path, 'utf-8')) : this.cart = [];
  }

  async createCart() {
    let newCart = {
      "products": []
    }

    this.cart.length === 0 ? newCart["id"] = 1 : newCart["id"] = this.cart[this.cart.length - 1]["id"] + 1
    this.cart.push(newCart)
    await fs.promises.writeFile(this.path, JSON.stringify(this.cart, null, '\t'))


  }

  async addToCart(CartId, ProductId, quantity) {
    let index = this.cart.findIndex(newCart => newCart.id === CartId)
    if (index === -1 || this.cart[index]["products"] === undefined) return false;
    let indexProduct = this.cart[index]["products"].findIndex(pid => pid.productId === ProductId)
    let exist = this.cart[index]["products"].some(pid => pid.productId === ProductId)


     if (exist) {
      this.cart[index]["products"][indexProduct]["quantity"] += quantity;
    } else {
      this.cart[index]["products"].push({ "productId": ProductId, "quantity": quantity })
    }
    

    await fs.promises.writeFile(this.path, JSON.stringify(this.cart, null, '\t'))
    return true;

  }


  getCart = (id) => {
    let newCart = this.cart.find(el => el.id === id)
    return newCart || false
  }

}


export default new CartManager('./newCart.json')