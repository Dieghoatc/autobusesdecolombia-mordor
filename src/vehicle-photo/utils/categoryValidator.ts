export function categoryValidator(value: string): number {

  if (typeof value !== 'string') {
    throw new Error('El valor debe ser una cadena de texto');
  }

  switch (value) {
    case 'interdepartamental':
      return 1;
    case 'intermunicipal':
      return 2;
    case 'especial':
      return 3;
    case 'mixto':
      return 4;
    case 'nuestros recuerdos':
      return 5;
    case 'urbanos':
      return 6;
    case 'taxi':
      return 7;
    case 'estatal':
      return 8;
    default:
      return 1;
  }
}
