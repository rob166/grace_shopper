

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