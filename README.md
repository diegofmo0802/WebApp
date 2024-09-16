# WebApp manager
Hello! I am [diegofmo0802](https://diegofmo0802.github.io).<br/>
As I mentioned earlier on my profile, WebApp manager will allow:

- [x] Handling `AJAX` requests.
- [x] Manipulation of DOM elements.
- [ ] Cache management and offline availability via `ServiceWorker`.
  - [ ] Tool to generate a JSON with cacheable files.
  - [ ] Allow caching some API requests.


Some of the points mentioned above may be subdivided into different projects, or a package manager may be created to implement the features within the same project.<br/>



## About the project
I currently have a local copy of the project with several functionalities. This project started as a personal project to practice logical thinking.<br/>
Therefore, it may not follow the best practices or have the best documentation. However, I will publish the code as it is and gradually update and improve it.



**Future corrections**
- [x] Documenting classes and functions.
- [x] Translating the current documentation to English.
- [x] Rename variables, functions, classes, and descriptions to English.
- [ ] Find and correct bad practices.



That's all for now, [diegofmo0802](https://diegofmo0802.github.io) signing off.



#Documentation
## download and import the module
**With npm**
- in command prompt or terminal
  ```npm
  npm install my.webapp
  ```
- import in your project
  ```ts
  import WebApp from "my.webapp";
  ```

**using github package**
- download the package in [github packages](https://github.com/diegofmo0802/WebApp/packages)
- unzip the package and paste the files in your project
  ```text
  - project file
  | - WebApp  // the webApp module
  | - all files of the project
  | - WebApp.js // the main file of the module
  - main.js // your main file
  ```
- import in your project
  - **Recommended** using js/ts file in module mode
   ```ts
    import WebApp from "./WebApp/WebApp.js";
    ```
  - using HTML file
   ```html
   <script type="module" src="./WebApp/WebApp.js"></script>
   ```
**cloning the repository**
- in command prompt or terminal
  ```git
  git clone https://github.com/diegofmo0802/WebApp.git
  ```
- open the WebApp folder
- install dependencies/dev-dependencies using npm
  ```npm
  npm install
  ```
- compile the project
  ```npm
  npm run build
  ```
- import in your project
  ```ts
  import WebApp from "./WebApp/build/WebApp.js";
  ```

## usage
to create an instance of WebApp

- create an main container in your html
  ```HTML
  <div id="app"></div>
  ```
- in your js/ts file import the module and create an instance of WebApp
  ```ts
  import WebApp from "./WebApp/WebApp.js";
  // hre you can create ain instance of multiple methods
  // 1. using auto query selection
  const app = WebApp.getInstance("#app");
  // 2. using an HTML element
  const mainContainer = document.getElementById("app");
  if (!mainContainer) throw new Error("main container not found");
  const app = WebApp.getInstance(mainContainer);
  // 3. creating an new element of WebApp.Element
  import WebApp, { Element } from "./WebApp/WebApp.js";
    // method 1
    const mainContainer = Element.get("#app");
    if (!mainContainer) throw new Error("main container not found");
    const app = WebApp.getInstance(mainContainer);
    // method 2
    const mainContainer = Element.new("div");
    mainContainer.setAttribute("id", "app");
    const app = WebApp.getInstance(mainContainer);
    mainContainer.appendTo(document.body);
  ```
- structure your app
  ```ts
  const HomeBtn = Element.new("button", "Home").on("click", () => app.router.setPage("/"));
  const menuOptions = Element.structure({
    type: 'div', attribs: { id: 'menuOptions' }, childs: [
      HomeBtn,
      Element.new('button', 'About').on('click', () => app.router.setPage('/about')),
      { type: 'button', text: 'Contact', events: {
        click: () => app.router.setPage('/contact')
      }}
    ]
  });
  const session = Element.structure({
      type: 'div', attribs: { id: 'session' }
  });
  const menu = Element.structure({
      type: 'div', attribs: { id: 'menu' }, childs: [
          Element.new('a', null, { href: '/' }, childs: [
            Element.new('img', null, { src: './assets/logo.png' })
          ]),
          menuOptions, session
      ]
  });
  const content = Element.new('div').setAttribute('id', 'content');

  app.renderRoot(menu, content /*, ... if you have more root components/elements */);
  ```
- add your more used elements to easy access
  ```ts
  app.setComponents({
    menu: menu,
    content: content,
    'menu.options': menuOptions,
    session: session
  });
  ```
- in other js/ts file create an renderer `my_renderer.ts`
  ```ts
  import WebApp from "./WebApp/WebApp.js";
  const app = WebApp.getInstance();
  export function my_renderer(parameters: {[key: string]?: string}): void {
    // i want to render an image on my component content and remove the menu options
    const content = app.getComponent("content");
    const menu = app.getComponent("menu.options");
    if (!content || !menu) throw new Error("content or menu not found");
    content.render(Element.new("img", null, { src: "./assets/logo.png" }));
    menu.clean();
    // render and clean are functions of WebApp.Component
    // if you want to access to the WebAppElement that you did pass to app.setComponents() you can use:
    const contentElement = content.getElement();
    // and if you want to access to HTMLElement use
    const contentHTMLElement = contentElement.HTMLElement;
  }
  ```
- add routing rules to your app
  ```ts
  app.addRenderer('/', my_renderer);
  // you can get url parameters using rule parameters using ${parameter}
  app.addRenderer('/usr/$id/profile', my_renderer);
  // for get this parameter in you renderer you use the parameter in the render function
  function my_renderer(parameters: {[key: string]?: string}): void {
    // parameters is an object with the parameters
    const id = parameters.id;
    // do something with id
  }
  ```
## need help?

you can write me in
- Discord: **`@diegofmo0802`**
- [Email](mailto:diegofmo0802@gmail.com?subject=WebApp%20manager%20help)
- [GitHub](https://github.com/diegofmo0802)