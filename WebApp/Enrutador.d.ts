export namespace Enrutador {
    type Regla = {
        ID: string,
        Acciones: Map<string, (Ruta: string, Parámetros: string[]) => void>
    }
}
export class Enrutador {
    /** La lista de reglas de enrutamiento de la app. */
    private Reglas: Map<string, WebApp.Regla>;
    /**
     * Crea una instancia de Enrutador.
     * @param Reglas La/s regla/s de enrutamiento.
     */
    public constructor(...Reglas?: Array<Enrutador.Regla>);
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
export default Enrutador;