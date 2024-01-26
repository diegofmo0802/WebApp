/**
 * @author diegofmo0802 <diegofmo0802@gmail.com>.
 * @description Añade una forma sencilla de crear elementos.
 * @license Apache-2.0
 */

class Element {
    static body = document.querySelector('body');
    static head = document.querySelector('head');
	/**
	 * Crea un elemento.
	 * @param {keyof HTMLElementTagNameMap} Type El tipo de elemento.
	 * @param {string?} Text El texto que tendrá el elemento (or html).
	 * @param {Object?} Attribs Los atributos que tendrá el elemento.
	 * @param {Object?} Events Los Eventos que tendrá el elemento.
	 * @param {Element[]?} Childs Los Hijos que tendrá el elemento.
	 * @returns {Element}
	 */
	static New(Type, Text = null, Attribs = null, Events = null, Childs = null) {
		let Element = document.createElement(Type);
		if (Text) Element.innerHTML = Text;
		for (let Attrib in Attribs) Element.setAttribute(Attrib, Attribs[Attrib]);
		for (let Event in Events) Element.addEventListener(Event, Events[Event]);
		for (let Child in Childs) Element.appendChild(Childs[Child]);
		return Element;
	}
    /**
     * Crea un elemento complejo (para no tener mucha redundancia en el `Elemento.Crear()`).
     * @param {import('./Element').Element.Structure} Structure La estructura del elemento que desea crear
     */
    static Structure(Structure) {
		let Childs = [];
		if (Structure.Childs && Structure.Childs.length > 0) {
			for (let Child of Structure.Childs) {
				Childs.push(this.Structure(Child));
			}
		}
		return this.New(
			Structure.Type ?? 'span',
			Structure.Text ?? null,
			Structure.Attribs ?? null,
			Structure.Events ?? null,
			Childs ?? null
		);  
	}
	/**
	 * Agrega multiples hijos a un elemento.
	 * @param {HTMLElement} Parent El elemento al que se le añadirán los hijos.
	 * @param {Array<Element>} Childs Los elementos que se añadirán.
	 */
	static Append(Parent, Childs) {
		for (let Child of Childs) Parent.appendChild(Child);
		return Parent;
	}
    /**
     * Elimina todo el contenido de un elemento.
     * @param {HTMLElement} Element El elemento al que se le eliminara su contenido.
     */
    static Clean(Element) {
		Element.innerText = '';
		return Element;
	}
}
export default Element;