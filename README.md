# WebApp manager
Hola! soy [diegofmo0802](https://diegofmo0802.github.io).<br/>
Como comente  anteriormente en mi perfil, WebApp manager permitirá:

- [x] Manejo de peticiones `AJAX`.
- [ ] Manipulación de elementos del DOM.
- [ ] Gestión de cache y disponibilidad sin conexión través de `ServiceWorker`.
  - [ ] Herramienta que permita generar un JSON con los archivos cacheables.
  - [ ] Permitir guardar en cache algunas peticiones a API`s.
<br/>

Es posible que algunos de los puntos anteriores se subdividan en proyectos diferentes<br/>
o que se cree un gestor de paquetes para implementar las funcionalidades dentro del mismo<br/>
<br/><br/><br/>

## Sobre el proyecto
Actualmente tengo en local una copia del proyecto con varias de las funcionalidades<br/>
este comenzó como un proyecto personal y con fines de práctica de pensamiento lógico<br/>
por lo tanto no tiene las mejores prácticas ni la mejor documentación, sin embargo<br/>
publicaré el código de esta manera e iré modificando para corregir esto.
<br/><br/>

**Futuras correcciones**
- [ ] **en proceso** Documentar clases y funciones.
- [ ] **en proceso** Traducir la documentación actual al inglés.
- [ ] Cambiar los nombres de variables, funciones, clases y descripciones a inglés.
- [ ] Buscar y corregir malas practicas.
<br/><br/>

Esto es todo por el momento, [diegofmo0802](https://diegofmo0802.github.io) se retira.
<br/><br/><br/>

# Documentación 
<!-- Por el momento iré enlistonado las funcionalidades agregadas para documentar todo debidamente en el futuro. -->
Para empezar a usar el modulo debes descargar los tipos e importar el modulo.<br/>

## Descargar los tipos
- v1.0.0 - No disponible
- v2.0.0 - <a download href="/Versiones/v2.0.0/WebApp.d.ts">Descargar</a>

## Importar y usar el modulo
Para usar el modulo primero debes descargar los tipos del modulo<br/>
Esto ayudara a que tu editor de código comprenda el modulo y te ofrezca</br>
ayudas de auto completado.

### Descargar Tipos
> [!NOTE]
> Debes tener en el directorio raíz de tu proyecto el archivo `WebApp.d.ts` de la version que usarás.
> ```
> - Proyecto raíz
> | - WebApp.d.ts
> | - index.html
> | - src/
>   | - main.js
> ```
> Este archivo es necesario para que tu editor de código aprenda sobre el modulo y te brinde ayudas al escribir.
<br/><br/>

### Enlaces de importación del modulo
<table>
    <tr>
        <th>Versión</th>
        <th>Enlace</th>
    </tr>
    <tr>
        <td>v1.0.0</td>
        <td>No disponible</td>
    </tr>
    <tr>
        <td>v2.0.0</td>
        <td>https://diegofmo0802.github.io/WebApp/v2.0.0/WebApp.js</td>
    </tr>
</table>

### Importar modulo
Una vez tengas los tipos en tu directorio raíz podemos importar el modulo.<br/>
Para esto usa uno de los enlaces proporcionados en la tabla de arriba.
<br/></br>

antes de empegar, podemos importar varias cosas:

- `Elementos`: Permite crear elementos de forma dinámica **(Se documentara a fondo en el futuro)**.
- `Ajax`: Permite hacer peticiones AJAX fácilmente **(Se documentara a fondo en el futuro)**.
- `WebApp`: Permite crear enrutadores y gestionar la WebApp **(Se documentara a fondo en el futuro)**.

> [!WARNING]
> Aun no se define de forma correcta como funcionara la parte de gestión de `WebApp` por lo que este no se documentará aun
> ya que esta sujeto a cambios de manera muy frecuente, sin embargo `Elemento` y `Ajax` si se documentaran ya que son mas estables
> aunque solo están en el inicio de su desarrollo

Ahora expliquemos como importar el modulo

- Si harás la lógica en una etiqueta HTML:
  ```html
  <script type="module">
    import WebApp from 'https://diegofmo0802.github.io/WebApp/v2.0.0/WebApp.js';
  </script>
  ```
- Si lo harás en un archivo aparte:
  **Archivo.html**:
  ```html
  <script type="module" src="Archivo.js"></script>
  ```
  **Archivo.js**
  ```js
  import WebApp from 'https://diegofmo0802.github.io/WebApp/v2.0.0/WebApp.js';
  ```
<br/><br/><br/>

## Uso de Elemento
Por el momento es algo simple y permite crear HTMLElement´s en una sola linea e incluso anidados complejos.
> [!NOTE]
> Por el momento se recomienda usar para crear objetos que necesiten tener eventos y a los que no se les quiera asignar una ID
> o para cargar de forma dinámica datos atrae de ajax y poder plasmarlos.
> aun asi se puede usar en la situación que desees.
<br/><br/>

### sintaxis
- `Elemento.Crear`
  Acepta 5 parámetros
  <table>
      <tr>
          <th>Parámetro</th>
          <th>Tipo</th>
          <th>null?</th>
          <th>Descripción</th>
      </tr>
      <tr>
            <td>Tipo</td>
            <td>string</td>
            <td>No</td>
            <td>Es el tipo de elemento por ej: `div`, `a`, `img`</td>
      </tr>
      <tr>
            <td>Texto</td>
            <td>string</td>
            <td>Si</td>
            <td>El texto del elemento, si no tendrá usar null</td>
      </tr>
      <tr>
            <td>Atributo</td>
            <td>Object</td>
            <td>Si</td>
            <td>Los atributos del elemento ej: `{class: 'MiClase'}`, si no tendrá usar null.</td>
      </tr>
      <tr>
            <td>Eventos</td>
            <td>Object</td>
            <td>Si</td>
            <td>Los eventos del elemento ej: `{click: () => console.log("presionado")}`, si no tendrá usar null.</td>
      </tr>
      <tr>
            <td>Hijos</td>
            <td>Array</td>
            <td>Si</td>
            <td>Los Hijos del elemento ej: `[Elemento.Crear('p', 'Hola')]`, si no tendrá usar null.`</td>
      </tr>
  </table>
<br/><br/>

### Ejemplos
- Para crear un elemento div con clase "contenedor"
  ```js
  import { Elemento } from 'https://diegofmo0802.github.io/WebApp/v2.0.0/WebApp.js';

  let MiDiv = Elemento.Crear('div', null, {class: "contenedor"});
  Elemento.body.appendChild(MiDiv);
  ```
- Para crear un formulario que reciba el nombre y envié una alerta con el
  ```js
  import { Elemento } from '/WebApp.js';
  let Nombre = Elemento.Crear('input', null, {type: 'text', placeholder: 'Nombre:'});
  let Formulario = Elemento.Crear('div', null, {class: "formulario"}, null, [
    Nombre,
    Elemento.Crear('button', 'Saludar!', null, {click: () => {
        alert('Hola! ' + Nombre.value);
    }})
  ]);
  window.E = Elemento;
  Elemento.body.appendChild(Formulario);
  ```
<br/><br/>

## Uso de Ajax
Por el momento es algo simple y permite hacer peticiones http.
<br/><br/>

### Sintaxis
`Ajax.Consultar`
  Acepta 3 parámetros
  <table>
      <tr>
          <th>Parámetro</th>
          <th>Tipo</th>
          <th>null?</th>
          <th>Descripción</th>
      </tr>
      <tr>
            <td>Url</td>
            <td>string</td>
            <td>No</td>
            <td>la url a donde realizará la consulta</td>
      </tr>
      <tr>
            <td>Método</td>
            <td>string</td>
            <td>Si</td>
            <td>El método HTTP ej: `GET`, `POST`, etc</td>
      </tr>
      <tr>
            <td>Datos</td>
            <td>Object</td>
            <td>Si</td>
            <td>Los datos que se enviaran: se envían por POST como FormData ej: `{user: 'diegofmo0802', psw: '1234'}`</td>
      </tr>
  </table>
<br/><br/>

### Ejemplos
- Petición GET para ver mis proyectos.
  ```
  import { Ajax } from './WebApp.js';
  Ajax.Consultar('https://diegofmo0802.github.io/source/data/projects.json', 'GET').then((data) => {
    let Proyectos = JSON.parse(data);
    console.log(Proyectos);
  }).catch(console.error);
  ```
- Petición POST para LogIn
  ```js
  // Estará disponible próximamente.
  ```