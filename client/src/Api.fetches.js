

export const showProducts = async () => {
    try {
        const resp = await fetch('http://localhost:3001/api/products', {
            headers: {
                'Content-Type': 'application/json',
            },
        })

        const data = await resp.json()


        console.log(data)
        return data
    } catch (error) {
        console.error(error)
    }
};

export const showSingleProd = async (id) => {
    try {
        const resp = await fetch(`http://localhost:3001/api/products/${id}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await resp.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log(error)
    }
}

export const addProduct = async (cartId, quantity, pId)=>{


        try {
            const resp = await fetch(`http://localhost:3001/api/products/${pId}`, {
                method: "PATCH",
                body: JSON.stringify({
                    cart: `${cartId}`,
                    quantity: `${quantity}`
                })
            });
            const data = await resp.json();

            console.log(data);
            return data;
}catch(error){
    console.error(error)
}
}