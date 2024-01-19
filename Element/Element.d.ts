/**
 * @author diegofmo0802 <diegofmo0802@gmail.com>.
 * @description Añade una forma sencilla de crear elementos HTML a través de JS.
 * @license Apache-2.0
 */

export namespace Element {
    namespace Events {
        type EvHTMLElement = {
            click?:    (this: HTMLElement, Evento: MouseEvent) => void
            keyup?:    (this: HTMLElement, Evento: MouseEvent) => void
            keydown?:  (this: HTMLElement, Evento: MouseEvent) => void
            keypress?: (this: HTMLElement, Evento: MouseEvent) => void
            scroll?:   (this: HTMLElement, Evento: Event)      => void
        };
        type EvHTMLTextAreaElement = {
            click?:    (this: HTMLTextAreaElement, Evento: MouseEvent) => void
            keyup?:    (this: HTMLTextAreaElement, Evento: MouseEvent) => void
            keydown?:  (this: HTMLTextAreaElement, Evento: MouseEvent) => void
            keypress?: (this: HTMLTextAreaElement, Evento: MouseEvent) => void
        }
    }
    type Type = keyof HTMLElementTagNameMap;
    type Structure = {
        Type: Type,
        Text?: string,
        Attribs?: object,
        Events?: Element.Events.EvHTMLElement,
        Childs?: Array<Structure>
    }
}
export class Element {
    public static body: HTMLElement;
    public static head: HTMLElement;
    /**
     * Crea un elemento HTML.
     * @param Type El tipo de elemento.
	 * @param Text El texto que tendrá el elemento (or html).
     * @param Attribs Los atributos que tendrá el elemento.
     * @param Events Los Eventos que tendrá el elemento.
     * @param Childs Los Hijos que tendrá el elemento.
     */
    public static New(Type: Element.Type, Text?: string, Attribs?: object, Events?: Element.Events.EvHTMLElement, Childs?: Array<HTMLElement>): HTMLElement;
    public static New(Tipo: 'textarea',                  Texto?: string, Atributos?: object, Eventos?: Element.Events.EvHTMLTextAreaElement, Hijos?: Array<HTMLElement>): HTMLTextAreaElement;
    /**
     * Crea un elemento complejo (para no tener mucha redundancia en el `Elemento.Crear()`).
     * @param Structure La estructura del elemento que desea crear
     */
    public static Structure(Structure: Element.Structure): HTMLElement;
	/**
	 * Agrega multiples hijos a un elemento.
	 * @param Parent El elemento al que se le añadirán los hijos.
	 * @param Childs Los elementos que se añadirán.
	 */
	public static Append(Parent: HTMLElement, Childs: Array<Element>): HTMLElement
    /**
     * Elimina todo el contenido de un elemento.
     * @param Element El elemento al que se le eliminara su contenido.
     */
    public static Clean(Element: HTMLElement): HTMLElement
}
export default Element;