/**
 * @typedef {{ID: string, Acciones: Map<string, (Ruta: string, Parámetros: string[]) => void>}} Regla
 */
class Enrutador {
    /**@type {Map<string, Regla>}*/
    Reglas = null;
    /**@param {Array<Regla>} Reglas */
    constructor(...Reglas) {
        this.Reglas = new Map();
        if (Reglas && Reglas.length > 0) this.AñadirReglas(...Reglas);
    }
    /**@param {string} Ruta */
    Enrutar(Ruta) {
        Ruta = Ruta.startsWith('/') ? Ruta.slice(1) : Ruta;
        Ruta = Ruta.endsWith('/') ? Ruta.slice(0, 1) : Ruta;
        let [Controlador, Acción, ...Parámetros] = Ruta.split('/');
        if (! Controlador) return;
        if (this.Reglas.has(Controlador)) {
            let R_Controlador = this.Reglas.get(Controlador);
            if (R_Controlador.Acciones.has(Acción)) {
                R_Controlador.Acciones.get(Acción)(Ruta, Parámetros);
            } else if (R_Controlador.Acciones.has(Controlador)) {
                console.log('[WRN]', `No hay una acción asociada a "${Controlador}/${Acción}"`);
                R_Controlador.Acciones.get(Controlador)(Ruta, Parámetros);
            } else {
                console.log('[ENR]', `No hay una acción asociada a "${Controlador}/${Acción}"`);
            }
        } else {
            console.log('[ENR]', `No hay un controlador para "${Controlador}"`);
        }
    }
    /**@param {Array<Regla>} Reglas */
    AñadirReglas(...Reglas) {
        Reglas.forEach((Regla) => {
            this.Reglas.set(Regla.ID, Regla);
        });
        return this;
    }
    /**@param {Array<string>} IDs */
    EliminarReglas(...IDs) {
        IDs.forEach((ID) => {
            if (this.Reglas.has(ID)) this.Reglas.delete(ID);
        });
        return this;
    }
}
export default Enrutador;