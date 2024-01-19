/**
 * @author diegofmo0802 <diegofmo0802@gmail.com>.
 * @description Añade una clase que gestiona eventos
 * @license Apache-2.0
 */

class Events {
    /**@type {import('./Events').default.ListenerList} */
    Listeners = new Map();
    /**
     * Añade un evento al EventManager.
     * @param { string } EventName El nombre del evento.
     * @param { import('./Events').default.CallBack } CallBack El CallBack que se ejecutara.
     */
    on(EventName, CallBack) {
        if (! this.Listeners.has(EventName)) {
            this.Listeners.set(EventName, new Set());
        }
        this.Listeners.get(EventName).add(CallBack);
    }
    /**
     * Elimina un evento del EventManager.
     * @param { string } EventName El nombre del evento a eliminar.
     * @param { import('./Events').default.CallBack } CallBack El CallBack del evento a eliminar.
     */
    off(EventName, CallBack) {
        if (this.Listeners.has(EventName)) {
            if (this.Listeners.get(EventName).has(CallBack)) {
                this.Listeners.get(EventName).delete(CallBack);
            }
        }
    }
    /**
     * Elimina todos los CallBacks de un evento.
     * @param {string} EventName El nombre del evento al que se le eliminaran los CallBacks.
     */
    offAll(EventName) {
        if (this.Listeners.has(EventName)) {
            this.Listeners.delete(EventName);
        }
    }
    /**
     * Ejecuta un evento.
     * @param { string } EventName El nombre del evento a ejecutar.
     * @param { Array<any> } Args Los argumentos que se le pasaran a los CallBacks.
     */
    Exec(EventName, ...Args) {
        if (this.Listeners.has(EventName)) {
            this.Listeners.get(EventName).forEach((CallBack) => CallBack(...Args));
        }
    }
}
export default Events;