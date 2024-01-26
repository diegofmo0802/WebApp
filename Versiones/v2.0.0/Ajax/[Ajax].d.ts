/**
 * @author diegofmo0802 <diegofmo0802@gmail.com>.
 * @description Añade una forma sencilla de hacer peticiones AJAX.
 * @license Apache-2.0
 */
export namespace Ajax {
	type Método = 'GET' | 'POST' | 'PUT' | 'DELETE';
}
export class Ajax {
	/**
	 * Realiza una petición Ajax a un sitio web.
	 * @param Url La url del sitio donde se hará la petición.
	 * @param Método El método con el que se hará la consulta.
	 * @param Datos Los datos que se enviaran en la petición.
	 */
	static Consultar(Url: string, Método?: Ajax.Método, Datos?: object): Promise<string>;
	/**
	 * Crea un FormData con los datos.
	 * @param Datos Los datos con los que se hará el FormData.
	 */
	static FormData(Datos: object): FormData;
}
export default Ajax;