import * as sharp from 'sharp';

// Same defaults as Squoosh (squoosh.app) for AVIF: quality 50 at the original
// resolution. Reduces phone photos by ~95% with no visible difference at normal size.
export const DEFAULT_AVIF_QUALITY = 50;
// sharp effort 3 = libaom speed 6, the speed Squoosh uses (about 5x faster than effort 4,
// with almost the same size)
export const AVIF_EFFORT = 3;

export class ImageConvert {

  async toWebp(file) {
    return await sharp(file.buffer, { animated: true })
      .webp({ effort: 6 })
      .toBuffer();
  }

  // Converts any supported image (JPG, PNG, WebP, AVIF...) to AVIF at its original
  // resolution. Applies the EXIF orientation so phone photos are not rotated.
  async toAvif(buffer: Buffer, quality = DEFAULT_AVIF_QUALITY): Promise<Buffer> {
    return sharp(buffer)
      .rotate()
      .avif({ quality, effort: AVIF_EFFORT })
      .toBuffer();
  }
}
