/**
 * @author diegofmo0802 <diegofmo0802@gmail.com>.
 * @description Añade una forma sencilla de crear elementos HTML a través de JS.
 * @license Apache-2.0
 */
export namespace Elemento {
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
export class Elemento {
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
export default Elemento;