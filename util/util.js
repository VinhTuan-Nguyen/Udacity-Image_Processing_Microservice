import fs from "fs";
import Jimp from "jimp";

// filterImageFromURL
// helper function to download, filter, and save the filtered image locally
// returns the absolute path to the local image
// INPUTS
//    inputURL: string - a publicly accessible url to an image file
// RETURNS
//    an absolute path to a filtered image locally saved file
export async function filterImageFromURL(inputURL, index) {
  if (!fs.existsSync(process.env.LOCAL_PATH)) {
    fs.mkdirSync(process.env.LOCAL_PATH)
  }
  return new Promise(async (resolve, reject) => {
    try {
      const photo = await Jimp.read(inputURL);
      const outpath = "./tmp/filtered." + index + ".jpg";
      await photo
        .resize(256, 256) // resize
        .quality(60) // set JPEG quality
        .greyscale() // set greyscale
        .write(outpath, (img) => {
          resolve(outpath);
        });
    } catch (error) {
      reject(error);
    }
  });
}

export function validateURL(url) {
  let pattern = /\/\/(\S+?(?:jpe?g|png|gif))/ig;
  return url.match(pattern);
}