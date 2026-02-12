# Proyecto Customer Journey Filler

[![Licencia](https://img.shields.io/badge/Licencia-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![Estado del proyecto](https://img.shields.io/badge/Estado-Activo-brightgreen.svg)](https://github.com/jjavierrg/cj-filler)
[![Versión](https://img.shields.io/github/v/release/jjavierrg/cj-filler)](https://github.com/jjavierrg/cj-filler/releases/latest/)
[![Build Status - GitHub Actions](https://github.com/jjavierrg/cj-filler/actions/workflows/publish.yml/badge.svg)](https://github.com/jjavierrg/cj-filler/actions/workflows/publish.yml)

## Descripción

Este proyecto proporciona un script para utilizar en tampermonkey que rellena los campos automáticamente del customer journey, permitiendo incluso seleccionar qué plan de ejecución se va a utilizar.

## Instalación

Puedes utilizar este script de dos maneras:

### Instalación con tampermonkey

Este método es el más recomendado, ya que permite que el script se actualice automáticamente y que se ejecute en todas las páginas de customer journey de manera transparente.

Para utilizar el script, primero debes instalar la extensión de tampermonkey en tu navegador. Puedes encontrarla en los siguientes enlaces:
[Chrome](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo),
[Firefox](https://addons.mozilla.org/es/firefox/addon/tampermonkey/),
[Opera](https://addons.opera.com/es/extensions/details/tampermonkey-beta/),
[Edge](https://microsoftedge.microsoft.com/addons/detail/tampermonkey/iikmkjmpaadaobahmlepeloendndfphd),
[Safari](https://apps.apple.com/es/app/tampermonkey/id1482490089?mt=12).

Una vez instalada la extensión, puedes instalar el script haciendo click en el siguiente enlace:

[![Instalar](https://img.shields.io/badge/Instalar%20script-blue?style=for-the-badge)](https://github.com/jjavierrg/cj-filler/releases/latest/download/cj-filler.user.js)

Esto abrirá una página en la que podrás ver el código del script. Haz click en el botón de instalar y la extensión se encargará de instalar el script en tu navegador. A partir de ahora, el script se ejecutará automáticamente en todas las páginas de customer journey.

#### Actualización del script

El script se actualizará automáticamente cada vez que se publique una nueva versión. Si quieres actualizarlo manualmente, puedes hacerlo desde la página de tampermonkey en tu navegador. Para ello, haz click en el icono de tampermonkey y selecciona la opción "Check for userscript updates" dentro del menú "Utilities". Esto abrirá una nueva página en la que podrás ver todos los scripts instalados y actualizarlos manualmente. Para actualizar únicamente el script de customer journey filler, lo puedes hacer desde la sección "updates" en el tab "settings" de la ficha del script.

### Instalación directa

Cuando estés en la página de creación de un customer journey, puedes abrir la devtools de tu navegador y pegar el contenido del archivo [cj-filler.user.js](https://github.com/jjavierrg/cj-filler/releases/latest/download/cj-filler.user.js) en la consola. Esto cargará el script en la página y podrás utilizarlo. Este método no es persistente, por lo que tendrás que repetirlo cada vez que recargues la página y tendrás que volver a este repositorio siempre que quieras obtener el script actualizado.

## Uso

Una vez instalado el script, puedes utilizarlo en cualquier página de customer journey. Cuando abras la página, verás que aparecen varios controles en la parte superior de la página:

- **Selector de plan**: Desplegable que te permite seleccionar el plan de ejecución que quieres utilizar.
- **Checkbox "Auto submit CJ"**: Permite controlar si el script debe enviar automáticamente el formulario al final del recorrido.
- **Botón "Fill CJ"**: Inicia la ejecución del plan seleccionado, rellenando automáticamente los campos.
- **Botón "Record CJ"**: Permite grabar un nuevo plan de ejecución basado en tus interacciones.

### Ejecutar un plan existente

Selecciona el plan deseado del desplegable y haz clic en "Fill CJ". El script rellenará los campos de la página con los valores del plan de ejecución seleccionado y avanzará automáticamente hasta el final del customer journey.

En caso de que el script no funcione correctamente, prueba a recargar la página y a ejecutarlo de nuevo.

### Grabar un nuevo plan

La funcionalidad de grabación te permite crear nuevos planes de ejecución de manera automática basándote en tus interacciones con la página:

1. **Iniciar la grabación**: Haz clic en el botón "⏺ Record CJ". El botón cambiará a "⏹ Stop Recording" para indicar que la grabación está activa.

2. **Realizar el recorrido**: Interactúa con la página normalmente:
   - Escribe en los campos de texto
   - Selecciona opciones de los desplegables
   - Haz clic en los botones para avanzar
   - Completa todo el customer journey hasta el final

3. **Detener la grabación**: Haz clic en "⏹ Stop Recording" cuando hayas completado el recorrido.

> [!TIP]
> Si detienes la grabación sin haber realizado ninguna interacción (plan vacío), el sistema te preguntará si deseas mostrar el último plan grabado previamente en la sesión. Esto te permite recuperar una grabación anterior en caso de que hayas detenido la grabación por error.

4. **Revisar y guardar**: Se mostrará un modal con el código JSON del plan grabado. Este código incluye:
   - Todas las acciones realizadas (clics, escrituras, selecciones)
   - Los selectores automáticos para cada elemento
   - La acción de envío final

5. **Copiar el plan**: Haz clic en "Copy to Clipboard" para copiar el código JSON del plan.

6. **Crear el archivo**: Crea un nuevo archivo en la carpeta `src/plans/` con el contenido copiado. Por ejemplo: `src/plans/mi-nuevo-plan.ts`. El archivo debe exportar un objeto de tipo `ICJ` con la estructura:

```typescript
import { ActionType } from "../enums/actions";
import { ICJ } from "../core/ICJ";

export default <ICJ>{
  name: "Nombre descriptivo del plan",
  actions: [
    // Acciones grabadas...
  ],
  isEnabledForLocation: (location: string) =>
    location.includes("url-especifica"),
  submitAction: {
    // Acción final de envío...
  },
};
```

7. **Compilar**: Ejecuta `npm run build` para compilar el proyecto. El plan se agregará automáticamente al listado sin necesidad de modificar el archivo `index.ts`.

> [!WARNING]
> La grabación captura automáticamente las interacciones más comunes, pero puede que necesites ajustar manualmente algunos selectores o acciones para casos específicos. Asegúrate de revisar y probar el plan grabado antes de usarlo en producción.

## Soporte

Si tienes alguna pregunta o problema, puedes abrir un [issue](https://github.com/jjavierrg/cj-filler/issues) en este repositorio.

## Licencia

Este proyecto está licenciado bajo la Licencia Apache 2.0. Consulta el archivo [LICENSE](LICENSE) para obtener más información.
