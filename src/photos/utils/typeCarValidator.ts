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
    case 'taxi':
      return 8;
    case 'chiva':
      return 9;
    case 'furgon':
      return 10;
    case 'bala':
      return 11;
    case 'electrico':
      return 12;
    case 'hibrido':
      return 13;
    case 'articulado':
      return 14;
    case 'biarticulado':
      return 15;
    case 'padron':
      return 16;
    case 'empresarial':
      return 17;
    case 'escolar':
      return 18;
    case 'turismo':
      return 19;
    default:
      return 1;
  }
}
