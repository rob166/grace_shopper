const getAllItemsInCart = async (cartId) => {
    try {
        const { rows: cart } = await client.query(`
        SELECT * FROM products
        WHERE cart_id=$1;`, [cartId]);
        return cart
    } catch (error) {
        console.error(error)
    }
};

const updateCart = async 
