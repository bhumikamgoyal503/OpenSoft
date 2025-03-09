const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());


const NEWS_API_KEY = '21ed773b1fc241d9b82508d05969abbf';


app.get('/news', async (req, res) => {
  try {
    const category = req.query.category || 'general';
    const validCategories = ['general', 'business', 'entertainment', 'health', 'science', 'sports', 'technology'];
    
    if (!validCategories.includes(category)) {
      return res.status(400).json({ error: 'Invalid category' });
    }
    
    const response = await axios.get(`https://newsapi.org/v2/top-headlines`, {
      params: {
        country: 'us', // You can change this or make it dynamic
        category: category,
        apiKey: NEWS_API_KEY
      }
    });
    
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching news:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
    res.status(500).json({ error: 'Failed to fetch news', details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});