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

### Instalación directa

Cuando estés en la página de creación de un customer journey, puedes abrir la devtools de tu navegador y pegar el contenido del archivo [cj-filler.user.js](https://github.com/jjavierrg/cj-filler/releases/latest/download/cj-filler.user.js) en la consola. Esto cargará el script en la página y podrás utilizarlo. Este método no es persistente, por lo que tendrás que repetirlo cada vez que recargues la página y tendrás que volver a este repositorio siempre que quieras obtener el script actualizado.

## Uso

Una vez instalado el script, puedes utilizarlo en cualquier página de customer journey. Cuando abras la página, verás que aparece un deplegable y un nuevo botón en la parte superior de la página. El deplegable te permite seleccionar el plan de ejecución que quieres utilizar, y el botón comenzará la ejecución automáticamente. El script rellenará los campos de la página con los valores del plan de ejecución seleccionado y avanzará automáticamente hasta el final del customer journey.

En caso de que el script no funcione correctamente, prueba a recargar la página y a ejecutarlo de nuevo.

## Soporte

Si tienes alguna pregunta o problema, puedes abrir un [issue](https://github.com/jjavierrg/cj-filler/issues) en este repositorio.

## Licencia

Este proyecto está licenciado bajo la Licencia Apache 2.0. Consulta el archivo [LICENSE](LICENSE) para obtener más información.
