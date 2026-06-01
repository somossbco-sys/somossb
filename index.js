const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/shopify', async (req, res) => {
  const { endpoint } = req.query;
  if (!endpoint) return res.status(400).json({ error: 'endpoint required' });

  const shop = process.env.SHOP_DOMAIN;
  const token = process.env.SHOPIFY_TOKEN;

  try {
    const r = await fetch(
      `https://${shop}/admin/api/2024-01/${endpoint}`,
      { headers: { 'X-Shopify-Access-Token': token } }
    );
    const data = await r.json();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Proxy Somos SB corriendo');
});
