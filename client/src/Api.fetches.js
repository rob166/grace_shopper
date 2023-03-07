


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

export const addProduct = async (cartId, quantity, pId) => {


    try {
        const resp = await fetch(`http://localhost:3001/api/products/${pId}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                cart: parseInt(cartId),
                quantity: quantity
            })
        });
        const data = await resp.json();

        console.log(data);
        return data;
    } catch (error) {
        console.error(error)
    }
}

export const makeNewCart = async (sessionId) => {
    try {
        console.log(sessionId)
        const resp = await fetch('http://localhost:3001/api/cart', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                session: sessionId,

            }),
        }
        );

        const json = await resp.json();
        console.log(json)
        return json
    } catch (error) {
        console.error(error)
    }
}

export const showItemsInCart = async (cartId) => {
    try {
        const resp = await fetch(`http://localhost:3001/api/cart/${cartId}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })

        const json = await resp.json()

        console.log(json)

        return json

    } catch (error) {
        console.error(error)
    }
}

export const makePurchase = async (quantity, total, cartId) => {
    try {
        const resp = await fetch(`http://localhost:3001/api/cart/${cartId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                quantity: quantity,
                total: total
            }),
        })
        const data = await resp.json()
        console.log(data)
        // return data
    } catch (error) {
        console.error(error)
    }
}

export const userPurchase = async(cartId,userId)=>{
    try{
        const resp = await fetch(`http://localhost:3001/api/cart/${cartId}`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
               userId:userId 
            })
           
        })
        const data = await resp.json()
        console.log(data)

    }catch(error){
        console.error(error)
    }
}