import './fonts';
import * as path from 'path';
import * as sharp from 'sharp';
import { Injectable } from '@nestjs/common';

import { AVIF_EFFORT, DEFAULT_AVIF_QUALITY } from '../../utils/imageConvert';
import { createWatermarkText } from './watermark-text';

// Watermark and logo widths, relative to the photo width
const TEXT_WIDTH_RATIO = 0.4;
const LOGO_WIDTH_RATIO = 0.17;

const LOGO_PATH = path.join(process.cwd(), 'assets', 'logo.png');

@Injectable()
export class PhotoWatermarkService {
  // Adds the logo (bottom left) and the author and city (bottom right), and converts
  // the photo to AVIF at its original resolution, like ImageConvert.toAvif.
  async markPhoto(
    buffer: Buffer,
    author: string,
    location?: string,
    quality = DEFAULT_AVIF_QUALITY,
  ): Promise<Buffer> {
    // Apply the EXIF orientation (phone photos). Raw pixels, so the only lossy step
    // is the final AVIF encoding.
    const { data, info } = await sharp(buffer)
      .rotate()
      .raw()
      .toBuffer({ resolveWithObject: true });

    const text = await sharp(
      createWatermarkText(author, location, Math.max(1, Math.round(info.width * TEXT_WIDTH_RATIO))),
    )
      .png()
      .toBuffer();

    const logo = await sharp(LOGO_PATH)
      .resize({ width: Math.max(1, Math.round(info.width * LOGO_WIDTH_RATIO)) })
      .png()
      .toBuffer();

    return sharp(data, {
      raw: { width: info.width, height: info.height, channels: info.channels },
    })
      .composite([
        { input: text, gravity: 'southeast' },
        { input: logo, gravity: 'southwest' },
      ])
      .avif({ quality, effort: AVIF_EFFORT })
      .toBuffer();
  }
}
