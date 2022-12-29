import { Router } from "express";
import { uploader } from "../utils/Multer.js";
import ProductManager from "../utils/ProductManager.js";

const router = Router()


router.get('/', (request,response)=>{
    response.send('Hi, how are You?')})

router.get('/products', async (req, res )=>{
try {
    let limit = req.query.limit
    if(limit != null || limit > 0) {
        const products = await ProductManager.getProducts();
        const productsLimit = products.slice(0, limit);
        res.status(202).json(productsLimit);
    }else{
        const products = await ProductManager.getProducts();
        res.status(200).json(products);
    }
} catch (error) {
    res.status(400).send(console.log("Error: ", error))
}
})

router.get('/products/:pid', async (req,res) =>{

    try { 
        let {pid} = req.params;
        let product = await ProductManager.getProductById(parseInt(pid))
        res.status(200).json(product)
        
    } catch (e) {
        res.status(400).send(console.log("Error:", e))
    }})

router.get('*', (req,res)=>{
    res.status(404).send('Page not found,check path')


router.post('/products', uploader.single('thumbnail'), async(req,res)=>{
    const {title,description,category,price,thumbnail,code,stock} = req.body
    !req.file && res.status(400).send({status: "error", error: "could not be stored"})
    await ProductManager.addProduct(title,description,category,price,req.file.path,code,stock)
    ?res.status(200).json({info:"Product has been uploaded"})
    :res.status(406).json({info: "Product already exist"})
})
})

    router.put ('/products', async(req,res) => {
        const {id, title, description, price, thumbnail, code, stock} = req.body
        await ProductManager.updateProduct(id, title, description, price, thumbnail, code, stock)
        ? res.status(200).json({info: "Product has been update"})
        : res.status(400).json ({error: "Could not be modified, check the information"})
    })

    router.delete('/:pid', async (req, res) => {
        let pid = parseInt(req.params.pid)
        await ProductManager.deleteProduct(pid) 
        ? res.status(200).json({ info: "Product has been deleted" })
        : res.status(400).json({ error: "Could not be found by ID " })
      })
      
      export default router;