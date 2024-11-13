/**
 * Permet de récupérer une information dans l'attribut d'un élément auquel est rattaché moa directive
 *
 * @param attrName l'attribut dans lequel on veut récupérer une information
 * @constructor
 */
export function Input(attrName: string) {
    return function (decoratedClass, propName: string) {
        const originalFunctionInit: Function = decoratedClass["init"] || function () {};

        decoratedClass["init"] = function () {
            if (this.element.hasAttribute(`[${attrName}]`)) {
                this[propName] = this.element.getAttribute(`[${attrName}]`) !== 'false';
            }

            if (this.element.hasAttribute(attrName)) {
                this[propName] = this.element.getAttribute(attrName)
            }

            originalFunctionInit.call(this)
        }
    }
}
