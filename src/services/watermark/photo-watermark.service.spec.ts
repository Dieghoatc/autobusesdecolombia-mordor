import * as sharp from 'sharp';
import { PhotoWatermarkService } from './photo-watermark.service';

describe('PhotoWatermarkService', () => {
  const service = new PhotoWatermarkService();

  const jpeg = (width: number, height: number, orientation?: number) => {
    const image = sharp({
      create: { width, height, channels: 3, background: '#3a7' },
    }).jpeg({ quality: 95 });
    return (orientation ? image.withMetadata({ orientation }) : image).toBuffer();
  };

  // Mean absolute pixel difference of a region between two images of the same size
  const regionDiff = async (a: Buffer, b: Buffer, region: sharp.Region) => {
    const [pa, pb] = await Promise.all(
      [a, b].map((img) => sharp(img).extract(region).removeAlpha().raw().toBuffer()),
    );
    let sum = 0;
    for (let i = 0; i < pa.length; i++) sum += Math.abs(pa[i] - pb[i]);
    return sum / pa.length;
  };

  it('returns an AVIF at the original resolution', async () => {
    const output = await service.markPhoto(await jpeg(3000, 2000), 'Ana', 'Bogotá');
    const metadata = await sharp(output).metadata();

    expect(metadata.compression).toBe('av1');
    expect([metadata.width, metadata.height]).toEqual([3000, 2000]);
  });

  it('draws the logo bottom-left and the text bottom-right, leaving the rest untouched', async () => {
    const input = await jpeg(1200, 800);
    const output = await service.markPhoto(input, 'Diego Tejedor', 'Bogotá D.C.');

    const bottomRight = { left: 900, top: 740, width: 280, height: 50 };
    const bottomLeft = { left: 10, top: 740, width: 180, height: 50 };
    const top = { left: 400, top: 50, width: 400, height: 300 };

    expect(await regionDiff(input, output, bottomRight)).toBeGreaterThan(10);
    expect(await regionDiff(input, output, bottomLeft)).toBeGreaterThan(10);
    expect(await regionDiff(input, output, top)).toBeLessThan(3);
  });

  it('applies the EXIF orientation of phone photos', async () => {
    const output = await service.markPhoto(await jpeg(1200, 800, 6), 'Ana');
    const metadata = await sharp(output).metadata();
    expect([metadata.width, metadata.height]).toEqual([800, 1200]);
  });

  it('accepts names with characters that are special in SVG', async () => {
    await expect(
      service.markPhoto(await jpeg(600, 400), 'Juan & Hijos <Fotos>', 'Cúcuta "Norte"'),
    ).resolves.toBeInstanceOf(Buffer);
  });

  it('rejects files that are not images', async () => {
    await expect(service.markPhoto(Buffer.from('not an image'), 'Ana')).rejects.toThrow();
  });
});
