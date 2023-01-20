import { google } from 'googleapis';
import fs from 'fs';

const SCOPES = [
  'https://www.googleapis.com/auth/drive',
  'https://www.googleapis.com/auth/drive.appdata',
  'https://www.googleapis.com/auth/drive.file',
  ' https://www.googleapis.com/auth/drive.scripts',
  'https://www.googleapis.com/auth/drive.metadata',
];

const auth = new google.auth.GoogleAuth({
  keyFile: '../credentials.json',
  scopes: SCOPES,
});

async function createAndUpload(auth) {
  const driveService = google.drive({ version: 'v3', auth });

  const fileMetaData = {
    name: 'js.png',
    parents: ['1ySvzVte_BhCmGBTQy5Q1kiyrlk-dUwT1'],
  };

  const media = {
    mimeType: 'image/png',
    body: fs.createReadStream('js.png'),
  };

  let response = await driveService.files.create({
    resource: fileMetaData,
    media: media,
    fields: 'id',
  });

  switch (response.status) {
    case 200:
      console.log('file created id : ', response.data.id);
      break;
    default:
      console.error('Error creating file : ', response.errors);
      break;
  }
}

async function deletePhoto(auth) {
  const driveService = google.drive({ version: 'v3', auth });
  return new Promise((resolve, reject) => {
    const response = driveService.files.delete({
      fileId: '1k3Ni4XOtu6PrjBufhhUwgfcX8yCl6VMG',
    });

    if (!response) {
      reject(response);
    }
    resolve(response);
  });
}

async function updatePhoto(auth) {
  const driveService = google.drive({ version: 'v3', auth });
  return new Promise((resolve, reject) => {
    const fileMetaData = {
      name: 'myphoto.png',
      parents: ['1ySvzVte_BhCmGBTQy5Q1kiyrlk-dUwT1'],
    };
    const media = {
      mimeType: 'image/png',
      body: fs.createReadStream('myphoto.png'),
    };

    const response = driveService.files.update({
      fileId: '1cPPf0KaclMxZt5jN3bc4Wq7GDFmmMWoH',
      media: media,
      fields: 'id',
    });

    if (!response) {
      reject(response);
    }
    resolve(response);
  });
}

createAndUpload(auth)
  .then((res) => console.log(res))
  .catch((err) => console.log(err));

// updatePhoto(auth)
//   .then((res) => {
//     console.log('Success updated!');
//     console.log(res.data.id);
//   })
//   .catch((err) => {
//     console.log(err);
//     console.log('err');
//   });

// deletePhoto(auth)
//   .then((res) => {
//     console.log('Success deleted!');
//     console.log(res.data.id);
//   })
//   .catch((err) => console.log(err));

// const app = express();
// app.use(express.json());

// app.get('/', (req, res) => {});

// app.listen(3000, () => {
//   console.log(`Google drive was running!`);
// });
