import  { useState, useEffect } from 'react';
import axios from 'axios';

const ViewItems = () => {
  const [items, setItems] = useState([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);

  const priceRanges = [
    { label: '10 - 50', min: 10, max: 50 },
    { label: '50 - 100', min: 50, max: 100 },
    { label: '100 - 500', min: 100, max: 500 },
    { label: '500 - 1000', min: 500, max: 1000 }
  ];

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

  const handlePriceRangeChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedPriceRanges([...selectedPriceRanges, value]);
    } else {
      setSelectedPriceRanges(selectedPriceRanges.filter(range => range !== value));
    }
  };

  const filterItemsByPriceRange = (item) => {
    if (selectedPriceRanges.length === 0) return true;
    const itemPrice = item.originalPrice;
    return selectedPriceRanges.some(range => {
      const [min, max] = range.split('-').map(Number);
      return itemPrice >= min && itemPrice <= max;
    });
  };

  const filteredItems = items.filter(filterItemsByPriceRange);

  return (
    <div className="flex">
      <div className="w-full">
        <h2>Items List</h2>
        <ul className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <li key={item._id}>
              {item.imageUrl && <img src={`http://localhost:5000/${item.imageUrl}`} alt={item.name} className="w-full h-48 object-cover rounded-t-lg" />}
              <p> Name : {item.name} </p>
              <p>Price : {item.originalPrice}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="ml-4">
        <h3>Filter by Price Range</h3>
        <ul>
          {priceRanges.map(({ label }) => (
            <li key={label}>
              <label>
                <input
                  type="checkbox"
                  value={label}
                  onChange={handlePriceRangeChange}
                  checked={selectedPriceRanges.includes(label)}
                />
                {label}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ViewItems;
