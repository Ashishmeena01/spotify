    import React, { useEffect, useState } from 'react'

    export function FakeStorePage() {
        const [products, setProducts] = React.useState([]);
        const [searchValue, setSearchValue] = React.useState('');
        const [filteredProducts, setFilteredProducts] = React.useState([]);
        const [loading, setLoading] = React.useState(true);
        const [test,setTest] = useState("FakeStore");

        function fetchProducts() {
            fetch('https://fakestoreapi.com/products')
                .then((response) => response.json())
                .then((data) => {
                    setProducts(data);
                    setLoading(false);
                }
                )
                .catch((error) => {
                    console.error('Error fetching products:', error);
                    setLoading(false);
                }).finally(() => {
                    console.log('fetchProducts called');
                })
        }

        function filterProducts() {
            const filtered = products.filter((product) => product.title.toLowerCase().includes(searchValue.toLowerCase()));
            setFilteredProducts(filtered);
        }

        
        useEffect(()=>{
            fetchProducts();
            let lastTime = Date.now();


            const ev = () =>{
                console.log("scrolling");
                let currTime = Date.now();

                if(currTime - lastTime >= 2000){
                    console.log("setting the timeer");
                    setTest(`${lastTime}:headliner`);
                    lastTime = currTime;
                }
            }

            document.addEventListener("scroll",ev);

            return () => document.removeEventListener("scroll",ev);

        },[])

        React.useEffect(() => {
            let timeout = setTimeout(() => {
                console.log('searchValue changed', searchValue);
                 filterProducts()
            }, 500)

        return () => clearInterval(timeout);
        }, [searchValue]);

        return (
            <div className="bg-black text-white p-4">
                <h1 className='sticky top-2'>{test}</h1>
                <input
                    className="border border-gray-300 rounded p-2 mb-4 w-full"
                    type="text"
                    placeholder="Search products..."
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                />

                <ul className="space-y-4">
                    {
                        filteredProducts.length ? filteredProducts.map((product) =>
                        ( 
                            <li key={product.id}>
                                <h2>{product.title}</h2>
                                <p>{product.description}</p>
                                <p>Price: ${product.price}</p>
                            </li>
                        )): <div>No products found.</div> ?? (
                            products.length ? products.map((product) =>
                            (
                                <li key={product.id}>
                                    <h2>{product.title}</h2>
                                    <p>{product.description}</p>
                                    <p>Price: ${product.price}</p>
                                </li>
                            )
                            ) : (
                                <p>No products found.</p>
                            )
                        )
                    }
                </ul>
            </div>
        )
    }

    export default FakeStorePage