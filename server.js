import express from 'express'
import productRoutes from './routes/products.routes.js'
import cartRoutes from './routes/carts.routes.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req,res)=>{
    res.send('Hi, how are You?')})
    
app.use('/products', productRoutes)
app.use('/carts', cartRoutes)

app.listen(8080, () => console.log('Running on port 8080'))