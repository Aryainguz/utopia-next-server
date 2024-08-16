// utils/cloudinary.js
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: 'dlauprc9e',
    api_key: '398767317679783',
    api_secret: 'O8Cou8B1HMYE2UH5_tfAOag68uQ',
    secure: true,
  });

export default cloudinary;
