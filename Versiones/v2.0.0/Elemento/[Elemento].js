/**
 * @author diegofmo0802 <diegofmo0802@gmail.com>.
 * @description Añade una forma sencilla de crear elementos.
 * @license Apache-2.0
 */

class Elemento {
    static body = document.querySelector('body');
    static head = document.querySelector('head');
	/**
	 * Crea un elemento.
	 * @param {keyof HTMLElementTagNameMap} Tipo El tipo de elemento.
	 * @param {string?} Texto El texto que tendrá el elemento.
	 * @param {Object?} Atributos Los atributos que tendrá el elemento.
	 * @param {Object?} Eventos Los Eventos que tendrá el elemento.
	 * @param {Element[]?} Hijos Los Hijos que tendrá el elemento.
	 * @returns {Element}
	 */
	static Crear(Tipo, Texto = null, Atributos = null, Eventos = null, Hijos = null) {
		let Elemento = document.createElement(Tipo);
		if (Texto) Elemento.innerText = Texto;
		for (let Nombre in Atributos) Elemento.setAttribute(Nombre, Atributos[Nombre]);
		for (let Nombre in Eventos) Elemento.addEventListener(Nombre, Eventos[Nombre]);
		for (let Hijo in Hijos) Elemento.appendChild(Hijos[Hijo]);
		return Elemento;
	}
	/**
	 * Agrega multiples hijos a un elemento.
	 * @param {HTMLElement} Padre El elemento al que se le añadirán los hijos.
	 * @param {Array<Elemento>} Hijos Los elementos que se añadirán.
	 */
	static Agregar(Padre, Hijos) {
		for (let Hijo in Hijos) Padre.appendChild(Hijos[Hijo]);
		return Padre;
	}
}
export default Elemento;