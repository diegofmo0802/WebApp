/**
 * @author diegofmo0802 <diegofmo0802@gmail.com>.
 * @description Añade una clase que gestiona eventos
 * @license Apache-2.0
 */

declare namespace Events {
    type CallBack = (...Args: Array<any>) => void
    type ListenerList = Map<string, Set<CallBacks>>
};

declare class Events {
    private Listeners: Events.ListenerList
    public constructor()
    /**
     * Añade un evento al EventManager.
     * @param EventName El nombre del evento.
     * @param CallBack El CallBack que se ejecutara.
     */
    public on(EventName: string, CallBack: Events.CallBack): void
    /**
     * Elimina un evento del EventManager.
     * @param EventName El nombre del evento a eliminar.
     * @param CallBack El CallBack del evento a eliminar.
     */
    public off(EventName: string, CallBack: Events.CallBack): void
    /**
     * Elimina todos los CallBacks de un evento.
     * @param EventName El nombre del evento al que se le eliminaran los CallBacks.
     */
    public offAll(EventName: string): void
    /**
     * Ejecuta un evento.
     * @param EventName El nombre del evento a ejecutar.
     * @param Args Los argumentos que se le pasaran a los CallBacks.
     */
    public Exec(EventName: string, ...Args: Array<any>): void
}
export default Events;