import fs from 'fs'

class ProductManager{
    constructor(fileName){ 
        this.path = fileName;
    };

    async getProducts(){
        try{
            if(fs.existsSync(this.path, 'utf-8')){
                let products = await fs.promises.readFile(this.path, 'utf-8');
                return JSON.parse(products);
            }else{
                return [];
            }

        }catch(error){
            console.log(error);
        }
    }


    async addProduct(title,description,price,thumbnail,code,stock){

        try{
            let product ={title,description,price,thumbnail,code,stock}
        let products = await this.getProducts();
        if (products.length === 0){
            product["id"] = 1;
            products.push(product)
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
        }
            else{
                let verification = products.find(prod => prod['code'] === code)
                if(!verification){
                    product ["id"] = products[products.length - 1]["id"]+1
                    products.push(product)
                    await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
                }
                else{
                    console.log ("Product already exist")
                }
            }
        }
        catch(e){
            console.log(e);
        }
    }

    async getProductById(prodId){
            try{
            let products = await this.getProducts();
            let prod = products.find((product) => product.id === prodId)
                if(prod != null){
                    return prod;
                }else{
                    console.log('Product not found');
                }
            }catch(e){
                console.log(e);
            }
        }

    async updateProduct(id, title, description, price, thumbnail, code, stock){
        try {
            let products = await this.getProducts();
            let prod = products.find(prod => prod['id'] === id);
            if (prod != null){
                prod.title = title;
                prod.description = description;
                prod.price = price;
                prod.thumbnail = thumbnail;
                prod.code = code;
                prod.stock = stock;
                await fs.promises.writeFile(this.path, JSON.stringify(products,null,'\t'))
            }
        } catch (e) {
            console.log(e);

        }
    }

    async deleteProduct(id){
        try {
            let products = await this.getProducts();
            let prod = products.find(prod => prod['id'] === id);
            if(prod!= null){
                products.splice(products.indexOf(prod), 1);
                await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
            }
        } catch (e) {
            console.log(e);

        }
    }

}

const fileName = "./src/Products.json";
const products = new ProductManager(fileName);

/* products.addProduct('Pan', 'panificado', 300, 'sin imagen', 'Ab1', 30)
products.addProduct('Salvado', 'panificado', 400, 'sin imagen', 'Ab2', 10)
products.addProduct('Facturas', 'confiteria', 600, 'sin imagen', 'Ac1', 15)
products.addProduct('Vigilantes', 'confiteria', 500, 'sin imagen', 'Ac2', 13)  */
export default new ProductManager('./Products.json')