import {Router} from 'express'
import CartManager from '../utils/CartManager.js'
import ProductManager from '../utils/ProductManager.js'

const router = Router()


router.get('/:cid', (req, res)=> {
    const cid = parseInt(req.params.cid)
    CartManager.getCart(cid)
    ? res.status(200).json(CartManager.getCart(cid))
    : res.status(404).json({Error:"Cart not found"})
})


router.post('/', (req,res) => {
    CartManager.createCart()
    res.status(200).send({Info: "Carrito creado"})
})


router.post('/:cid/product/:pid', async(req,res) => {
const {cid,pid} = req.params
const {quantity} = req.body
//Validacion si el producto existe
let validator= ProductManager.getProducts.some(el => el.id ===Number(pid))
if (!validator){
    res.status(404).json({error:"Product doesn´t exist"})
}
else{
    await CartManager.addToCart(Number(cid), Number(pid),quantity)
    ? res.status(201).json({Info: `Products add to cart ${Number(cid)} `})
    : res.status(400).json({error: "An error has occurred processing your request"})
}})

export default router

