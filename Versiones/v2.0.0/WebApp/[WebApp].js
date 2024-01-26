import Elemento from "../Elemento/[Elemento].js";
import Enrutador from "./Enrutador.js";

class WebApp {
    /** @type {string} La ruta base de la WebApp. */
    Base = null;
    /** @type {string} Src_Saml La ruta donde esta el modulo "Saml". */
    Src_Saml = null;
    /** @type {Enrutador} */
    Enrutador = null;
    /** @type {Enrutador} */
    Menú = null;
    /**
     * Crea una instancia de Saml WebApp.
     * @param {string} Base La ruta base de la WebApp.
     * @param {Array<Enrutador.Regla>} Reglas La/s regla/s de enrutamiento.
     */
    constructor(Base, Reglas) {
        this.Enrutador = new Enrutador();
        this.Menú = new Enrutador();
        this.Base = Base ? WebApp.LimpiarRuta(Base) : 'App';
        if (Reglas && Reglas.length > 0) this.AñadirReglas(...Reglas);
        console.log(window.location.pathname, this.Base, window.location.pathname.startsWith(`/${this.Base}`))
        if (! window.location.pathname.startsWith(this.Base)) this.CambiarRuta(this.Base);
    }
    /**@param {Array<Enrutador.Regla>} Reglas */
    AñadirReglas(...Reglas) {
        this.Enrutador.AñadirReglas(...Reglas);
        return this;
    }
    /**@param {Array<string>} IDs */
    EliminarReglas(...IDs) {
        this.Enrutador.EliminarReglas(...IDs);
        return this;
    }
    /**@param {string} Ruta */
    Enrutar(Ruta) {
        let Contenido = document.querySelector('#Contenido');
        if (! Contenido) return console.log('[WebApp] Error: La wen app debe tener un elemento div con id "Contenido".');
        Contenido.innerHTML = '';
        this.Enrutador.Enrutar(Ruta.startsWith(this.Base) ? Ruta.slice(this.Base.length + 1) : Ruta);
    }
    /**
     * Cambia la ruta de la aplicación.
     * @param {string} Ruta La ruta de la acción dentro de la aplicación.
     * @returns {void}
     */
    CambiarRuta(Ruta) {
        Ruta = WebApp.LimpiarRuta(Ruta);
        if (! Ruta.startsWith(this.Base)) Ruta = this.Base + Ruta;
        window.history.pushState(null, 'change', Ruta);
        this.Enrutar(Ruta);
    }
    /**
     * Cambia la ruta de la aplicación.
     * @param {string} Ruta La ruta de la acción dentro de la aplicación.
     * @param {Enrutador} Enrutador El enrutador que hará la actualización de estado.
     * @returns {void}
     */
    static CambiarRuta(Ruta, Enrutador) {
        Ruta = this.LimpiarRuta(Ruta);
        window.history.pushState(null, 'change', Ruta);
        Enrutador.Enrutar(Ruta);
    }
    /**
     * Limpia una ruta para que quede con una / al inicio y sin / al final.
     * @param {string} Ruta La ruta que deseas limpiar.
     * @returns {String}
     */
    static LimpiarRuta(Ruta) {
        Ruta = Ruta.startsWith('/') ? Ruta : `/${Ruta}`;
        Ruta = Ruta.endsWith('/') ? Ruta.slice(0, -1) : Ruta;
        Ruta.replace(/\/\//g, '/');
        return Ruta;
    }
    /**
     * Pone el Logo de carga en el elemento que se le de.
     * @param {Element} Contenedor El elemento donde se añadirá el logo de carga.
     * @param {string}  Src_Logo La ruta del ícono que tendrá el logo de carga.
     */
    static Cargando(Contenedor, Src_Logo = null) {
        let Logo = Contenedor.appendChild(Elemento.Crear('div', null, {class: 'WApp_Cargando'}, null, [
            Elemento.Crear('div', null, null, null, [
                Elemento.Crear('img', null, {class: '', src: Src_Logo ? Src_Logo : '/favicon.ico'}),
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
                Logo.classList.add('WApp_Desvanecer');
                if (Elemento) Elemento.setAttribute('style', `--Tiempo: ${Tiempo ?  Tiempo : 500}ms;`),
                Elemento.classList.add('WApp_Desvanecer');
                setTimeout(() => {
                    /**
                     * Le dará la animación de aparición vinculada al logo eliminado al elemento que se le pase.
                     * @param {Element} Elemento El elemento al que se le dará la animación de entrada.
                     * @returns {void}
                     */
                    PrRespuesta((Elemento) => {
                        if (Elemento) {
                            Elemento.setAttribute('style', `--Tiempo: ${Tiempo ?  Tiempo : 500}ms;`);
                            Elemento.classList.add('WApp_Aparecer');
                            setTimeout(() => {
                                Elemento.removeAttribute('style');
                                Elemento.classList.remove('WApp_Aparecer');
                            }, Tiempo ? Tiempo + 100 : 600);
                        }
                    });
                    Logo.remove();
                }, Tiempo ? Tiempo : 500);
            });
        };
    }
}
export default WebApp;