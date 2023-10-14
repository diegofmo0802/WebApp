/**
* @author diegofmo0802 <diegofmo0802@gmail.com>.
* @description Añade una forma sencilla de crear WebApps.
* @license Saml
* @module Saml/WebApp
*/

import Elemento from "../Elemento/[Elemento].js";

export default class WebApp {
    /**@type {string} Contiene la ruta base de la aplicación. */
    Base = null;
    /**@type {Map<string, Map<string, function(Array<string>):void>>} Contiene los Controladores de enrutamiento de la app.  */
    Controladores = null;
    /**
     * Crea las bases de una web app.
     * @param {string} Base La ruta base de la aplicación.
     */
    constructor(Base) {
        this.Base = WebApp.LimpiarRuta(Base);
        this.Controladores = new Map();
    }
    /**
     * Cambia la ruta de la aplicación y ejecuta su acción.
     * @param {string} Ruta La ruta de la acción dentro de la aplicación.
     * @returns {void}
     */
    Acción(Ruta) {
        Ruta = WebApp.LimpiarRuta(Ruta);
        window.history.pushState(null, 'change', this.Base.slice(0, -1) + Ruta);
        this.Enrutar();
    }
    /**
     * Enruta la url de la app hacia su respectivo controlador y acción.
     * @returns {void}
     */
    Enrutar() {
        let Ruta = WebApp.LimpiarRuta(window.location.pathname.slice(this.Base.length));
        let [Controlador = null, Acción = null, ...Parámetros] = Ruta.split('/').slice(1, -1);
        let Enrutado = Controlador && Acción
        ? this.Controladores.has(Controlador)
            ? (this.Controladores.get(Controlador).has(Acción))
                ? true
                : false
            : false
        : false;
        if (Enrutado) this.Controladores.get(Controlador).get(Acción)(Parámetros)
        else if (window.location.pathname == '/') this.Acción('/');
    }
    ServiceWorker(Ruta) {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register(Ruta ? Ruta : '/[Aplicación].js').then((Registro) => {
                if (Registro.installing) {
                    console.log('[Worker] Instalando');
                } else if (Registro.waiting) {
                    console.log('[Worker] Esperando');
                } else if (Registro.active) {
                    console.log('[Worker] Activo');
                }
            }).catch((Error) => {
                console.log('[Worker] Error', Error);
            });
        } else {
            console.log('[WebApp] El navegador no es compatible con ServiceWorker´s');
        }
    }
    /**
     * Cambia la ruta de la aplicación.
     * @param {string} Ruta La ruta de la acción dentro de la aplicación.
     * @returns {void}
     */
    static CambiarRuta(Ruta) {
        Ruta = this.LimpiarRuta(Ruta);
        window.history.pushState(null, 'change', Ruta);
    }
    /**
     * Pone el Logo de carga en el elemento que se le de.
     * @param {Element} Contenedor El elemento donde se añadirá el logo de carga.
     */
    static Cargando(Contenedor) {
        let Logo = Contenedor.appendChild(Elemento.Crear('div', null, {class: 'Cargando'}, null, [
            Elemento.Crear('div', null, null, null, [
                Elemento.Crear('img', null, {class: '', src: '/Src/Recursos/Íconos/Saml/[Ícono] - SM - 960.png'}),
                Elemento.Crear('span', null),
                Elemento.Crear('span', null)
            ])
        ]));
        /**
         * Elimina el logo de carga asociado a ella.
         * @param {Element} Elemento El elemento al que se le dará la animación de salida.
         * @param {number} Tiempo El tiempo en `ms` de la animación final.
         * @returns {Promise<function(Element):void>} Se cumplirá cuando se desvanezca el logo.
         */
        return (Elemento = null, Tiempo = null) => {
            return new Promise((PrRespuesta, PrError) => {
                Logo.setAttribute('style', `--Tiempo: ${Tiempo ?  Tiempo : 500}ms;`);
                Logo.classList.add('Desvanecer');
                if (Elemento) Elemento.setAttribute('style', `--Tiempo: ${Tiempo ?  Tiempo : 500}ms;`),
                Elemento.classList.add('Desvanecer');
                setTimeout(() => {
                    /**
                     * Le dará la animación de aparición vinculada al logo eliminado al elemento que se le pase.
                     * @param {Element} Elemento El elemento al que se le dará la animación de entrada.
                     * @returns {void}
                     */
                    PrRespuesta((Elemento) => {
                        if (Elemento) {
                            Elemento.setAttribute('style', `--Tiempo: ${Tiempo ?  Tiempo : 500}ms;`);
                            Elemento.classList.add('Aparecer');
                            setTimeout(() => {
                                Elemento.removeAttribute('style');
                                Elemento.classList.remove('Aparecer');
                            }, Tiempo ? Tiempo + 100 : 600);
                        }
                    });
                    Logo.remove();
                }, Tiempo ? Tiempo : 500);
            });
        };
    }
    /**
     * Crea la sección `Opciones` del menú.
     * @param {Array<{Acción?: function(Event):void, ID: string, Ícono?: string, Texto?: string}>} Botones Los botones que tendrá el menú. 
     * @returns {Element}
     */
    static CrearMenú(...Botones) {
        let Hijos = [];
        Botones.forEach((Botón) => {
            Hijos.push(Elemento.Crear(
                'button', null,
                {id: Botón.ID, class: 'Botón', alt: `Ícono para el botón ${Botón.Texto ? Botón.Texto : Botón.ID}`, Ícono: Botón.Ícono ? true : false},
                Botón.Acción ? {click: Evento => Botón.Acción(Evento)} : null, [
                    ...Botón.Ícono ? [
                        Elemento.Crear('img', null, {src: Botón.Ícono})
                    ] : [], ...Botón.Texto ? [
                        Elemento.Crear('span', Botón.Texto)
                    ] : []
                ]
            ));
        });
        return Elemento.Crear('div', null, {id: 'Opciones'}, null, Hijos);
    }
    /**
     * Crea la estructura de la webApp.
     * @returns {Element}
     */
    static CrearEstructura() {
        return Elemento.Crear('div', null, {id: 'Aplicación'}, null, [
            Elemento.Crear('div', null, {id: 'Menú'}, null, [
                Elemento.Crear('button', null, {id: 'BTN_Menú', class: 'Botón', Ícono: true}, {click: () => {
                    let Menú = document.querySelector('#Menú');
                    let Estado = Menú.getAttribute('Activo');
                    Menú.setAttribute('Activo', Estado && Estado == 'true' ? 'false' : 'true');
                }}, [
                    Elemento.Crear('img', null, {src: '/favicon.ico'}),
                    Elemento.Crear('span', 'Menú')
                ]),
                Elemento.Crear('div', null, {id: 'Sesión'}),
                Elemento.Crear('div', null, {id: 'Opciones'})
            ]),
            Elemento.Crear('div', null, {id: 'Contenido'}),
            Elemento.Crear('div', null, {id: 'Footer'})
        ]);
    }
    /**
     * Limpia una ruta (Hace que inicie y termine en `/`).
     * @param {string} Ruta La ruta que se limpiara.
     * @returns {string}
     */
    static LimpiarRuta(Ruta) {
        Ruta = Ruta.startsWith('/') ? Ruta : '/' + Ruta;
        Ruta = Ruta.endsWith('/') ? Ruta : Ruta + '/';
        return decodeURI(Ruta);
    }
}