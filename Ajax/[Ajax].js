/**
 * @author diegofmo0802 <diegofmo0802@gmail.com>.
 * @description Añade una forma sencilla de hacer peticiones AJAX.
 * @license Apache-2.0
 */
class Ajax {
	/**
	 * Realiza una petición Ajax a un sitio web.
	 * @param {string} Url La url del sitio donde se hará la petición.
	 * @param {('GET'|'POST'|'PUT'|'DELETE')?} Método El método con el que se hará la consulta.
	 * @param {{}?} Datos Los datos que se enviaran en la petición.
	 * @returns {Promise<string>}
	 */
	static Consultar(Url, Método = null, Datos = null) {
		return new Promise((PrRespuesta, PrError) => {
			let Ajax = new XMLHttpRequest;
			Ajax.open(Método ? Método : 'GET', Url);
			Ajax.addEventListener('error', (Error) => { PrError('Error al realizar la petición'); });
			Ajax.addEventListener('readystatechange', () => {
				if (Ajax.readyState == 4 && Ajax.status == 200) {
					PrRespuesta(Ajax.responseText);
				}
			});
			Ajax.send(this.FormData(Datos));
		});
	}
	/**
	 * Crea un FormData con los datos.
	 * @param {{}} Datos Los datos con los que se hará el FormData.
	 * @returns {FormData}
	 */
	static FormData(Datos) {
		let Form = new FormData;
		for (let Nombre in Datos) {
			Form.append(Nombre, Datos[Nombre]);
		}
		return Form;
	}
}
export default Ajax;