import fs from 'fs';

export const deletePhoto = (dir, data) => {
  const photoArray = data.photo.split('/');
  // Get Last array
  const lastData = photoArray.length - 1;
  // Remove fto using fs (File System!)
  fs.rmSync(`${dir}/${photoArray[lastData]}`, {
    force: false,
  });
};
