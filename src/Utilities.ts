/**
 * @author diegofmo0802 <diegofmo0802@gmail.com>.
 * @description append utilities to webapp.
 * @module saml.webapp
 * @license Apache-2.0
 */

export class Utilities {
    /**
     * create a debounced function to prevent multiple calls in a short period of time.
     * @param func The function to debounce.
     * @param delay The delay in milliseconds.
     * @returns The debounced function.
     */
    public static debounce<FN extends Utilities.debounceFunction>(func: FN, delay: number = 500): Utilities.debounceResult<FN> {
        let timeOutID: number | undefined;
        function debounced(...args: Parameters<FN>): void {
            if (timeOutID) clearTimeout(timeOutID);
            function timeOut(): void {
                func(...args);
                clearTimeout(timeOutID);
            }
            timeOutID = setTimeout(timeOut, delay);
        }
        return debounced;
    }
}

export namespace Utilities {
    export type debounceFunction = (...args: any) => void;
    export type debounceResult<FN extends debounceFunction> = (...args: Parameters<FN>) => void;
}

export default Utilities;