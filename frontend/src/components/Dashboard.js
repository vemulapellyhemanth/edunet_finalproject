import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Dashboard() {
  const [items, setItems] = useState([]);
  const nav = useNavigate();

  // Fetch auctions function
  const fetchItems = useCallback(async () => {
    try {
      const res = await axios.get('http://localhost:5001/auctions');
      setItems(res.data);
    } catch (error) {
      console.error('Error fetching auctions:', error);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      nav('/signin'); // Redirect if not authenticated
      return;
    }

    fetchItems();
  }, [nav, fetchItems]); // ✅ Added dependencies

  // 🔹 Handle Logout
  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Remove token
    nav('/signin'); // Redirect to Sign In page
  };

  return (
    <div>
      
      <h2>Auction Dashboard</h2><br></br>
      <h1>Hemanth Vemulapally</h1><br></br>

      {/* Logout Button */}
      <button onClick={handleLogout} style={{ marginLeft: '10px', background: 'red', color: 'white' }}>
        Logout
      </button>&nbsp;&nbsp;&nbsp;

      <Link to="/post-auction">
        <button>Post New Auction</button>
      </Link>

      <ul>
        {items.map((item) => (
          <li key={item._id}>
            <Link to={`/auction/${item._id}`}>
              {item.itemName} - Current Bid: ${item.currentBid} {item.isClosed ? '(Closed)' : ''}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
