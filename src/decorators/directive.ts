import {DirectiveMetadata} from "../types";

/**
 * @param metadata Un tableau contenant le selecteur et les providers de la directive
 * @constructor
 */
export function Directive(metadata:DirectiveMetadata) {
    return function (decoratedClass) {
        decoratedClass["selector"] = metadata.selector
        decoratedClass["providers"] = metadata.providers

        return decoratedClass;
    }
}
