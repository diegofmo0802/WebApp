/**
 * @author diegofmo0802 <diegofmo0802@gmail.com>.
 * @description Los tipos del modulo WebApp v2.0.0
 * @license Apache-2.0
 *
 * Puedes importar el usando
 * En el HTML: <script type="module" src="https://diegofmo0802.github.io/WebApp/Versiones/v2.0.0/WebApp.js"></script>
 * En JS import WebApp from 'https://diegofmo0802.github.io/WebApp/Versiones/v2.0.0/WebApp.js'
 */
declare module 'https://diegofmo0802.github.io/WebApp/Versiones/v2.0.0/WebApp.js' {
    namespace Ajax {
        type Método = 'GET' | 'POST' | 'PUT' | 'DELETE';
    }
    namespace Elemento {
        namespace Eventos {
            type EvHTMLElement = {
                click?:    (this: HTMLElement, Evento: MouseEvent) => void
                keyup?:    (this: HTMLElement, Evento: MouseEvent) => void
                keydown?:  (this: HTMLElement, Evento: MouseEvent) => void
                keypress?: (this: HTMLElement, Evento: MouseEvent) => void
            };
            type EvHTMLTextAreaElement = {
                click?:    (this: HTMLTextAreaElement, Evento: MouseEvent) => void
                keyup?:    (this: HTMLTextAreaElement, Evento: MouseEvent) => void
                keydown?:  (this: HTMLTextAreaElement, Evento: MouseEvent) => void
                keypress?: (this: HTMLTextAreaElement, Evento: MouseEvent) => void
            }
        }
    }
    namespace Enrutador {
        type Regla = {
            ID: string,
            Acciones: Map<string, (Ruta: string, Parámetros: string[]) => void>
        }
    }
    class Ajax {
        /**
         * Realiza una petición Ajax a un sitio web.
         * @param Url La url del sitio donde se hará la petición.
         * @param Método El método con el que se hará la consulta.
         * @param Datos Los datos que se enviaran en la petición.
         */
        static Consultar(Url: string, Método?: Ajax.Método, Datos?: object): Promise<string>;
        /**
         * Crea un FormData con los datos.
         * @param Datos Los datos con los que se hará el FormData.
         */
        static FormData(Datos: object): FormData;
    }
    class Elemento {
        static body: HTMLElement;
        static head: HTMLElement;
        /**
         * Crea un elemento HTML.
         * @param Tipo El tipo de elemento.
         * @param Texto El texto que tendrá el elemento.
         * @param Atributos Los atributos que tendrá el elemento.
         * @param Eventos Los Eventos que tendrá el elemento.
         * @param Hijos Los Hijos que tendrá el elemento.
         */
        static Crear(Tipo: keyof HTMLElementTagNameMap, Texto?: string, Atributos?: object, Eventos?: Elemento.Eventos.EvHTMLElement, Hijos?: Array<HTMLElement>): HTMLElement;
        static Crear(Tipo: 'textarea',                  Texto?: string, Atributos?: object, Eventos?: Elemento.Eventos.EvHTMLTextAreaElement, Hijos?: Array<HTMLElement>): HTMLTextAreaElement;
        /**
         * Agrega multiples hijos a un elemento.
         * @param Padre El elemento al que se le añadirán los hijos.
         * @param Hijos Los elementos que se añadirán.
         */
        static Agregar(Padre: HTMLElement, Hijos: Array<Elemento>): HTMLElement
    }
    class Enrutador {
        /** La lista de reglas de enrutamiento de la app. */
        private Reglas: Map<string, Enrutador.Regla>;
        /**
         * Crea una instancia de Enrutador.
         * @param Reglas La/s regla/s de enrutamiento.
         */
        public constructor(...Reglas: Array<Enrutador.Regla>);
        /**
         * Enruta la petición a una ruta y ejecuta la función definida para ella.
         * @param Ruta La ruta que desea enrutar.
         */
        public Enrutar(Ruta: string): void;
        /**
         * Añade una/varias regla/s de enrutamiento.
         * @param Reglas La/s regla/s de enrutamiento.
         */
        public AñadirReglas(...Reglas: Array<Enrutador.Regla>): Enrutador;
        /**
         * Elimina una/varias regla/s de enrutamiento.
         * @param IDs La/s id de la/s regla/s.
         */
        public EliminarReglas(...IDs: string[]): Enrutador;
    }
    class WebApp {
        /** La ruta base de la WebApp. */
        private Base: string;
        /** La ruta donde esta el modulo "Saml". */
        private Src_Saml: string;
        /** El enrutador principal de la app. */
        private Enrutador: Enrutador;
        /**
         * Crea una instancia del gestor WebApp.
         * @param Base La ruta base de la App.
         * @param Reglas La/s regla/s de enrutamiento.
         */
        public constructor(Base: string, Reglas?: Array<Enrutador.Regla>);
        /**
         * Cambia la ruta de la aplicación.
         * @param Ruta La ruta de la acción dentro de la aplicación.
         */
        public CambiarRuta(Ruta: string): void;
        /**
         * Enruta la petición a una ruta y añade el contenido suministrado.
         * @param Ruta La ruta que desea enrutar.
         */
        public Enrutar(Ruta: string): void;
        /**
         * Añade una/varias regla/s de enrutamiento.
         * @param Reglas La/s regla/s de enrutamiento.
         */
        public AñadirReglas(...Reglas: Array<Enrutador.Regla>): WebApp;
        /**
         * Elimina una/varias regla/s de enrutamiento.
         * @param IDs La/s id de la/s regla/s.
         */
        public EliminarReglas(...IDs: string[]): WebApp;
        /**
         * Cambia la ruta de la aplicación.
         * @param Ruta La ruta de la acción dentro de la aplicación.
         * @param Enrutador El enrutador que hará la actualización de estado.
         */
        public static CambiarRuta(Ruta: string, Enrutador: Enrutador): void;
        /**
         * Cambia la ruta de la aplicación.
         * @param Ruta La ruta de la acción dentro de la aplicación.
         */
        public static LimpiarRuta(Ruta: String): string;
        /**
         * Pone el Logo de carga en el elemento que se le de.
         * @param Contenedor El elemento donde se añadirá el logo de carga.
         * @param Src_Logo La ruta del ícono que tendrá el logo de carga.
         */
        public static Cargando(Contenedor: Element, Src_Logo?: string): /**
             * Elimina el logo de carga asociado a ella.
             * @param Elemento El elemento al que se le dará la animación de salida.
             * @param Tiempo El tiempo en `ms` de la animación final.
             */ (Elemento?: Element, Tiempo?: number
        ) => Promise</**
             * Le dará la animación de aparición vinculada al logo eliminado al elemento que se le pase.
             * @param Elemento El elemento al que se le dará la animación de entrada.
             */ (Elemento?: Element) => void>;
    }
    export {Ajax, Elemento, WebApp};
    export default WebApp;
}