export function typeCarValidator(value: string) {
  if (typeof value !== 'string') {
    throw new Error('El valor debe ser una cadena de texto');
  }

  switch (value) {
    case 'bus':
      return 1;
    case 'doble piso':
      return 2;
    case 'doble eje':
      return 3;
    case 'cuadruple eje':
      return 4;
    case 'microbus':
      return 5;
    case 'van':
      return 6;
    case 'buseton':
      return 7;
    case 'trompon':
      return 8;
    case 'camioneta':
      return 9;
    case 'taxi':
      return 10;
    case 'chiva':
      return 11;
    case 'furgon':
      return 12;
    case 'bala':
      return 13;
    case 'electrico':
      return 14;
    case 'hibrido':
      return 15;
    case 'articulado':
      return 16;
    case 'biarticulado':
      return 17;
    case 'padron':
      return 18;
    case 'empresarial':
      return 19;
    case 'escolar':
      return 20;
    case 'turismo':
      return 21;
    default:
      return 1;
  }
}
