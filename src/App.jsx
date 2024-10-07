import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

const App = () => {
  const [product, setProduct] = useState({
    name: '',
    image: '',
    price: ''
  });

  const [similarProducts, setSimilarProducts] = useState([]);
  
  // Replace with your Google API key and Search Engine ID
  const API_KEY = 'AIzaSyDniPaLzzpiRMWs8tMn0jVQekSvmxbTKMw';
  const SEARCH_ENGINE_ID = '60b55b45f88534570';

  useEffect(() => {
    const port = chrome.runtime.connect({ name: "popup" });
    console.log("Connection attempt made");

    port.onMessage.addListener((message) => {
      console.log("Message received in popup:", message);
      if (message.type === 'PRODUCT_INFO' && message.productInfo) {
        setProduct({
          name: message.productInfo.name || '',
          image: message.productInfo.imageSrc || '',
          price: message.productInfo.price || ''
        });
      }
    });

    // Request stored product info when popup opens
    chrome.storage.local.get(['productInfo'], (result) => {
      if (result.productInfo) {
        setProduct({
          name: result.productInfo.name || '',
          image: result.productInfo.imageSrc || '',
          price: result.productInfo.price || ''
        });
      }
    });

    return () => {
      port.disconnect();
    };
  }, []);

  // Function to search for similar products
  const searchSimilarProducts = async () => {
    console.log("button pressed!");

    if (!product.name) {
      alert('No product name available to search for similar products');
      return;
    }

    try {
      const response = await axios.get(
        `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${SEARCH_ENGINE_ID}&q=${product.name}+shop+-site:hm.com`
      );
      console.log(response.data.items);
      setSimilarProducts(response.data.items || []);
    } catch (error) {
      console.error('Error fetching similar products', error);
    }
  };

  return (
    <div className="app-container">
      <header className="header">
        <span className="lumu">Lumu for</span> <span className="hm">H&M</span>
      </header>
      
      <div className="product-container">
        <h2 className="product-name">{product.name || 'Product Name Not Available'}</h2>
        {product.image && <img src={product.image} alt={product.name} className="product-image" />}
        <p className="product-price">{product.price || 'Price Not Available'}</p>
      </div>

      <button className="search-button" onClick={searchSimilarProducts}>
        Search Similar Products
      </button>

      <div className="similar-products">
        {similarProducts.length > 0 ? (
          similarProducts.map((item, index) => (
            <div key={index} className="product-card">
              <h3 className="product-card-title">{item.title}</h3>
              {item.pagemap?.cse_image?.[0]?.src && (
                <img
                  src={item.pagemap.cse_image[0].src}
                  alt={item.title}
                  className="product-card-image"
                />
              )}
              <a href={item.link} target="_blank" rel="noopener noreferrer" className="view-product-button">
                View Product
              </a>
            </div>
          ))
        ) : (
          <p>No similar products found</p>
        )}
      </div>
    </div>
  );
};

export default App;