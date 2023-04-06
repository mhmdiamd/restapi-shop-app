import App from './app.js';
import dotenv from 'dotenv';
import ProductRouter from './src/product/product.routes.js';
import CategoryRouter from './src/category/category.routes.js';
import AuthRouter from './src/auth/seller/seller-auth.routes.js';
import UserRouter from './src/seller/seller.routes.js';
import CartRouter from './src/cart/cart.routes.js';
import TokenRouter from './src/auth/token/token.routes.js';
import CustomerRouter from './src/customer/customer.routes.js';
import CustomerAuthRouter from './src/auth/customer/customer-auth.routes.js';
import ShippingAddressRouter from './src/shippingAddress/shippingAddress.routes.js';
import OrderRouter from './src/order/order.routes.js';

dotenv.config();
process.setMaxListeners(0);

const app = new App([new ProductRouter(), new CategoryRouter(), new AuthRouter(), new UserRouter(), new CustomerAuthRouter(), new CustomerRouter(), new CartRouter(), new TokenRouter(), new ShippingAddressRouter(), new OrderRouter()], 3001);

app.listen();
