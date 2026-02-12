import { ICJ } from '../core/ICJ';

// Importa automáticamente todos los archivos .ts del directorio actual excepto index.ts
// @ts-ignore: require.context es específico de webpack
const requireModule = require.context('.', false, /^\.\/(?!index\.ts$).*\.ts$/);

// Crea el array de planes desde los módulos encontrados
const plans: ICJ[] = requireModule.keys().map((fileName: string) => {
  return requireModule(fileName).default;
});

export default plans;
