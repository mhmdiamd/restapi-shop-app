import { createAndUpload, updatePhoto, auth } from '../../Config/googleDrive.config.js';
import HttpException from '../utils/Exceptions/http.exceptions.js';
import { successResponse } from '../utils/Helpers/response.js';
import CustomerModel from './customer.model.js';

class CustomerController {
  #customerModel = new CustomerModel();
  #ENDPOINT = 'api/v1/customers';

  // Get all Customer
  getAllCustomer = async (req, res, next) => {
    try {
      const customers = await this.#customerModel.getAllCustomer();
      successResponse(res, 200, 'Get all Customer success!', customers);
    } catch (err) {
      next(new HttpException(err.status, err.message));
    }
  };

  // Get Customer By Id
  getCustomerById = async (req, res, next) => {
    const { id } = req.params;
    try {
      const customer = await this.#customerModel.getCustomerById(id);
      successResponse(res, 200, `Get customer with ID ${id} success!`, customer);
    } catch (err) {
      next(new HttpException(err.status, err.message));
    }
  };

  // Delete Customer
  deleteCustomerById = async (req, res, next) => {
    const { id } = req.params;
    try {
      await this.#customerModel.deleteCustomerById(id);
      successResponse(res, 200, `Delete customer with ID ${id} success!`, { message: 'Customer Deleted!' });
    } catch (err) {
      next(new HttpException(err.status, err.message));
    }
  };

  // Update Customer By Id
  updateCustomerById = async (req, res, next) => {
    const { id } = req.params;
    const photo = req.file
    try {
      let data
      if(photo) {
        const currentUser = await this.#customerModel.getCustomerById(id)
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
      const customer = await this.#customerModel.updateCustomerById(id, data);
      successResponse(res, 200, `Update customer with ID ${id} success!`, { message: 'Customer Updated!' });
    } catch (err) {
      next(new HttpException(err.status, err.message));
    }
  };
}

export default CustomerController;
