import Enrutador from "./Enrutador.js";
/**
 * La clase WebApp ayuda a tener una mejor gestión de las rutas de la app
 * también ayuda a tener un mejor orden a la ora de elaborar interfaces de usuario
 * a traves de JS por lo que podrás enfocarte en desarrollar cada interfaz por separado
 * ademas de que tendrás la opción de crear menus contextuales o de navegación de una forma mucho mas sencilla.
 */
export class WebApp {
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
export default WebApp;