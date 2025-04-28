export class ConvertImageToWebP {
  async convertImageToWebP(image: File): Promise<Blob> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const reader = new FileReader();

      reader.onload = (e) => {
        img.src = e.target?.result as string;

        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');

          if (ctx) {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            canvas.toBlob((blob) => {
              if (blob) {
                resolve(blob);
              } else {
                reject('Error al convertir la imagen');
              }
            }, 'image/webp');
          } else {
            reject('Error al obtener el contexto del canvas');
          }
        };
      };
      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(image);
    });
  }
}
