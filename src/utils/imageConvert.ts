import * as sharp from 'sharp';

export class ImageConvert {

  async toWebp(file) {
    return await sharp(file.buffer, { animated: true })
      .webp({ effort: 6 })
      .toBuffer();
  }
}
