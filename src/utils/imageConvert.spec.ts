import * as sharp from 'sharp';
import { ImageConvert } from './imageConvert';

describe('ImageConvert.toAvif', () => {
  const convert = new ImageConvert();

  const jpeg = (width: number, height: number, orientation?: number) => {
    const image = sharp({
      create: { width, height, channels: 3, background: '#3a7' },
    }).jpeg();
    return (orientation ? image.withMetadata({ orientation }) : image).toBuffer();
  };

  it('converts to AVIF keeping the original resolution', async () => {
    const output = await convert.toAvif(await jpeg(4000, 3000));
    const metadata = await sharp(output).metadata();

    expect(metadata.format).toBe('heif'); // AVIF is reported as heif
    expect(metadata.compression).toBe('av1');
    expect([metadata.width, metadata.height]).toEqual([4000, 3000]);
  });

  it('produces smaller files at lower quality', async () => {
    // Noise so the encoder has detail to discard
    const noise = Buffer.alloc(800 * 600 * 3).map(() => Math.random() * 255);
    const input = await sharp(noise, { raw: { width: 800, height: 600, channels: 3 } })
      .jpeg({ quality: 95 })
      .toBuffer();

    const low = await convert.toAvif(input, 20);
    const standard = await convert.toAvif(input);
    const high = await convert.toAvif(input, 90);

    expect(low.length).toBeLessThan(standard.length);
    expect(standard.length).toBeLessThan(high.length);
  });

  it('applies the EXIF orientation of phone photos', async () => {
    // Stored sideways (landscape pixels) with "rotate 90°" orientation
    const output = await convert.toAvif(await jpeg(4000, 3000, 6));
    const metadata = await sharp(output).metadata();
    expect([metadata.width, metadata.height]).toEqual([3000, 4000]);
  });

  it('rejects files that are not images', async () => {
    await expect(convert.toAvif(Buffer.from('not an image'))).rejects.toThrow();
  });
});
