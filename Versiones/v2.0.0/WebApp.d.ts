/**
 * @author diegofmo0802 <diegofmo0802@gmail.com>.
 * @description Los tipos del modulo WebApp
 * @module saml.webapp
 * @license Apache-2.0
 */

import Ajax from './Ajax/Ajax.js';
import Element from './Element/Element.js';
import Events from './Events/Events.js';
import WebApp from './WebApp/WebApp.js';

/*
 * Puedes importar el usando
 * En el HTML: <script type="module" src="https://diegofmo0802.github.io/WebApp/WebApp.js"></script>
 * En JS import WebApp from 'https://diegofmo0802.github.io/WebApp/WebApp.js'
 */
declare module 'https://diegofmo0802.github.io/WebApp/WebApp.js' {
    export { Ajax, Element, Events, WebApp };
    export default WebApp;
}
export { Ajax, Element, Events, WebApp };
export default WebApp;