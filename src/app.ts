// Framework
import {PhoneNumberDirective} from "./directives/phone-number.directive";
import {CreditCardDirective} from "./directives/card-number.directive";

const directives = [PhoneNumberDirective, CreditCardDirective];

directives.forEach(directive => {
    const elements = document.querySelectorAll<HTMLInputElement>(directive.selector);

    elements.forEach(element => {
        if (element) {
            const directiveInstance = new directive(element)
            directiveInstance.init();
        }
    })
})



