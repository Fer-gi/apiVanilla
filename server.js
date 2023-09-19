import http  from 'http';
import controlers from './controllers/products.Controllers.js';

const server = http.createServer((req, res) => {
  if (req.url === '/api/products' && req.method === 'GET') {
    controlers.getProducts(req, res);
  } else if (req.url.match(/\/api\/products\/\w+/) && req.method === 'GET') {
    const id = req.url.split('/')[3];
    controlers.getProduct(req, res, id);
  } else if (req.url === '/api/products' && req.method === 'POST') {
    controlers.createProduct(req, res);
  } else if (req.url.match(/\/api\/products\/\w+/) && req.method === 'PUT') {
    const id = req.url.split('/')[3];
    controlers.updateProduct(req, res, id);
  } else if (req.url.match(/\/api\/products\/\w+/) && req.method === 'DELETE') {
    const id = req.url.split('/')[3];
    controlers.deleteProduct(req, res, id);
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(
      JSON.stringify({
        message: 'Route Not Found: Please use the api/products endpoint',
      })
    );
  }
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default server;