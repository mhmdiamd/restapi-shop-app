import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import errorMiddleware from './src/utils/Middlewares/error.middleware.js';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cluster from 'cluster';
import os from 'os';
import process from 'process';
import path from 'path';
import multer from 'multer';
import { fileURLToPath } from 'url';
import { config } from 'dotenv';

class App {
  filename = fileURLToPath(import.meta.url);
  dirname = path.dirname(this.filename);
  upload = multer();

  constructor(routers, port) {
    this.app = express();
    this.port = port;

    this.#initialiseMiddleware();
    this.#initialiseRouters(routers);
    this.#initialiseErrorHandling();
  }

  // Initialise Middleware
  #initialiseMiddleware() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors({ 
      origin: process.env.ORIGIN_DOMAIN, 
      credentials: true,
      method: "GET, POST, PUT, DELETE"
    }));

    this.app.use(helmet());
    this.app.use(morgan('dev'));
    this.app.use(cookieParser());
    // Static file for pruduct images
    this.app.use(process.env.PRODUCT_UPLOAD_DIR, express.static(path.join(this.dirname, 'Public/Images/Products')));
    this.app.use(process.env.CATEGORY_UPLOAD_DIR, express.static(path.join(this.dirname, 'Public/Images/Categories')));
    this.app.use(process.env.SELLER_PROFILE_UPLOAD_DIR, express.static(path.join(this.dirname, 'Public/Images/Profiles/Sellers')));
    this.app.use(process.env.CUSTOMER_PROFILE_UPLOAD_DIR, express.static(path.join(this.dirname, 'Public/Images/Profiles/Customers')));
  }
  z;
  #initialiseErrorHandling() {
    this.app.use(errorMiddleware);
    this.app.use((req, res, next) => {
      res.status(404).json({
        message: 'Routes not found!',
      });
    });
  }

  // Initialise Controllers
  #initialiseRouters(routers) {
    routers.forEach((router) => {
      this.app.use('/api/v1', router.router);
    });
  }

  // Lister Server
  listen() {
    // if (cluster.isPrimary) {
    //   for (let i = 0; i < os.cpus().length; i++) {
    //     cluster.fork();
    //   }

    //   cluster.addListener('exit', (worker, code, signal) => {
    //     console.log(`Worker with id ${worker.id} is exit`);
    //     cluster.fork();
    //   });
    // }

    // if (cluster.isWorker) {
    //   this.app.listen(this.port, () => {
    //     console.log(`Server Running with worker id ${process.pid} on port ${this.port} with`);
    //   });
    // }
    this.app.listen(this.port, () => {
      console.log(`Server Running with worker id ${process.pid} on port ${this.port} with`);
    });
  }
}

export default App;
