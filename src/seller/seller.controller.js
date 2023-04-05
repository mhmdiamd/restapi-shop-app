import { auth, createAndUpload, updatePhoto } from '../../Config/googleDrive.config.js';
import HttpException from '../utils/Exceptions/http.exceptions.js';
import { successResponse } from '../utils/Helpers/response.js';
import SellerModel from './seller.model.js';

class SellerController {
  #sellerModel = new SellerModel();
  ENDPOINT = 'api/v1/sellers';

  // Get all Seller
  getAllSeller = async (req, res, next) => {
    try {
      const sellers = await this.#sellerModel.getAllSeller();

      successResponse(res, 200, 'Get all Sellers success!', sellers);
    } catch (err) {
      next(new HttpException(err.status, err.message));
    }
  };

  // Get Seller By Id
  getSellerById = async (req, res, next) => {
    const { id } = req.params;
    try {
      // const seller = await setOrGetCache(`${this.ENDPOINT}/${id}`, async () => {
      //   return await this.#sellerModel.getSellerById(id);
      // });

      const seller = await this.#sellerModel.getSellerById(id);
      successResponse(res, 200, `Get seller with ID ${id} success!`, seller);
    } catch (err) {
      console.log(err);
      next(new HttpException(err.status, err.message));
    }
  };

  // Delete Seller
  deleteSellerById = async (req, res, next) => {
    const { id } = req.params;
    try {
      await this.#sellerModel.deleteSellerById(id);
      successResponse(res, 200, 'Seller success deleted!', { mesage: 'Seller deleted!' });
      // await clearRedisCache(`${this.ENDPOINT}/${id}`);
    } catch (err) {
      next(new HttpException(err.status, err.message));
    }
  };

  // Update Seller By Id
  updateSellerById = async (req, res, next) => {
    const { id } = req.params;
    const photo = req.file;
    try {
      let data
      if(photo) {
        const currentUser = await this.#sellerModel.getSellerById(id)
        // Upload to Google Drive
        let photoId = currentUser.photo
        if(photoId == 'photodefault.jpg'){
          const uploadPhoto = await createAndUpload(auth, photo);
          // Create file name
          const photoUrl = `https://drive.google.com/uc?id=${uploadPhoto.id}`;  
          data = { ...req.body, photo: photoUrl };
        }else {
          photoId = currentUser.photo.split('=')[1]
          await updatePhoto(auth, photo, photoId);
          data = { ...req.body };
        }  
      }else {
        data = { ...req.body };
      }

      await this.#sellerModel.updateSellerById(id, data);
      successResponse(res, 200, `Success updated seller with id ${id}`, { message: `Seller Updated!` });
    } catch (err) {
      next(new HttpException(err.status, err.message));
    }
  };
}

export default SellerController;
