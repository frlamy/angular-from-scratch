import {Formatter} from "../services/formatter";
import {Directive} from "../decorators/directive";
import {Input} from "../decorators/input";
import {Hostlistener} from "../decorators/hostlistener";
import {HostBinding} from "../decorators/hostbinding";

@Directive({
    selector: "[data-phone-number]",
})
export class PhoneNumberDirective {
    @HostBinding('value')
    value = "";

    @HostBinding('placeholder')
    placeholderText:string = "Hello World";

    @Input('data-border-color')
    @HostBinding('style.borderColor')
    borderColor = 'red';

    @Input('data-has-spaces')
    hasSpaces = true;

    @Hostlistener('input', ["event.target.value"])
    formatNumber (value:string) {
        this.value = this.formatter.formatNumber(value, 10, 2, this.hasSpaces);
    }

    @Hostlistener('click')
    onClick() {
        this.placeholderText = 'Ave Ceasar';
        this.placeholderText = 'Ave Selma';
    }

    constructor(public element: HTMLInputElement, private formatter: Formatter) {}

    init(){}
}
