const getAllProduct = async()=>{
    try{
        const {rows:products }= await client.query(`
        SELECT * FROM product;`)

        return products
    }catch(error){
        console.error(error)
    }
};

const getProductById = async(id)=> {
    try{
        const {rows:[product]}=await client.query(`
        SELECT * FROM products
        WHERE id=$1`,[id]);

        return product
    }catch(error){
        console.error(error);
    }
};

