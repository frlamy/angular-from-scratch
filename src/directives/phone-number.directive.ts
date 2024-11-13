import {Formatter} from "../services/formatter";
import {Directive} from "../decorators/directive";
import {Input} from "../decorators/input";
import {Hostlistener} from "../decorators/hostlistener";
import {HostBinding} from "../decorators/hostbinding";

@Directive({
    selector: "[data-phone-number]",
})
export class PhoneNumberDirective {
    @Input('data-border-color')
    @HostBinding('style.borderColor')
    borderColor = 'red';

    @Input('data-has-spaces')
    hasSpaces = true;

    @HostBinding('placeholder')
    placeholderText:string = "Hello World";

    @Hostlistener('input', ["event.target"])
    formatNumber (element: HTMLInputElement) {
        element.value = this.formatter.formatNumber(element.value, 10, 2, this.hasSpaces);
    }

    constructor(public element: HTMLInputElement, private formatter: Formatter) {}

    init(){}
}
