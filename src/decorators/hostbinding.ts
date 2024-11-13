import set from "lodash/set";

/**
 * Permet de lier une propriété de la directive à une propriété de l'élément HTML à laquelle ma directive est liée
 *
 * Exemple #1 :
 * @HostBinding('placeholder')
 * placeholderText = 'Hello World'
 *
 * Exemple #2 :
 * @HostBinding('style.borderColor')
 * borderColor = 'purple'
 *
 * @param attrName L'attribut que l'on souhaite lier à la propriété de la directive
 * @constructor
 */
export function HostBinding(attrName) {
    return function (decoratedClass, propName) {
        const originalFunctionInit = decoratedClass["init"] || function(){}

        decoratedClass["init"] = function () {
            set(this.element, attrName, this[propName])
            originalFunctionInit.call(this)
        }
    }
}
