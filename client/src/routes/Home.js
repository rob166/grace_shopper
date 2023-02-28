import { useEffect, useState } from 'react';
import { showProducts } from '../Api.fetches';
const Home = () => {
  const [products, setProducts] = useState([]);
  const showProd = async () => {
    const resp = await showProducts();
    setProducts(resp);
  };
  useEffect(() => {
    showProd();
  }, []);

  return products ? (
    products.map((p) => <div>{p.name}</div>)
  ) : (
    <div>no work</div>
  );
};

export default Home;
