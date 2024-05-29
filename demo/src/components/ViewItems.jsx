import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewItems = () => {
  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/stockitems');
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    
    }
  };

  useEffect(() => {
    fetchItems();
  }, []); 

  return (
    <div>
      <h2>Items List</h2>
      <ul className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <li key={item._id}>
            {item.imageUrl && <img src={`http://localhost:5000/${item.imageUrl}`} alt={item.name} className="w-full h-48 object-cover rounded-t-lg" />}
            <p> Name : {item.name} </p>
            <p>Price : {item.originalPrice}</p>
          </li>
        ))}
      </ul>
      
    </div>
  );
};

export default ViewItems;
