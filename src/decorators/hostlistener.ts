/**
 * Permet de lier une méthode de la directive à un évènement qui aura lieu sur un élément HTML
 * @param eventName L'évènement auquel on souhaite réagir et lier la méthode
 *
 * @param eventParams Le tableau des paramètres dont on a besoin pour lancer la fonction
 * Exemple :
 * @HostListener("input", ["event.target])
 * onClick(target){}
 *
 */
export function Hostlistener(eventName: string, eventParams: string[] = []) {
    return function (decoratedClass, methodName) {

        const originalFunctionInit = decoratedClass["init"] || function () {};

        decoratedClass["init"] = function () {
            this.element.addEventListener(eventName, (event) => {
                const paramsToSend = eventParams.map(param => eval(param.toString()));
                this[methodName](...paramsToSend)
            })

            originalFunctionInit.call(this)
        }
    }
}
