import App from './app.js';
import dotenv from 'dotenv';
import ProductRouter from './src/product/product.routes.js';
import CategoryRouter from './src/category/category.routes.js';
import AuthRouter from './src/auth/seller/seller-auth.routes.js';
import UserRouter from './src/seller/seller.routes.js';
import SellerAuthRouter from './src/auth/seller/seller-auth.routes.js';
import BuyerAuthRouter from './src/auth/buyer/buyer-auth.routes.js';

dotenv.config();

const app = new App([new ProductRouter(), new CategoryRouter(), new AuthRouter(), new UserRouter(), new SellerAuthRouter(), new BuyerAuthRouter()], process.env.PORT);

app.listen();
