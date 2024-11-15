import {Formatter} from "../services/formatter";
import {Verifier} from "../services/verifier";
import {Directive} from "../decorators/directive";
import {HostBinding} from "../decorators/hostbinding";
import {Input} from "../decorators/input";
import {Hostlistener} from "../decorators/hostlistener";

@Directive({
    selector: "[data-card-number]",
})
export class CreditCardDirective {
    @Input('data-has-spaces')
    hasSpaces = true;

    @Input('data-border-color')
    @HostBinding('style.borderColor')
    borderColor = "purple";

    @HostBinding('value')
    value = "";

    @Hostlistener("input", ["event.target.value"])
    formatNumber (value: string) {
        this.value = this.formatter.formatNumber(value, 16, 4, this.hasSpaces);
    }

    constructor(
        public element: HTMLInputElement,
        private formatter: Formatter,
        private verifier: Verifier,
    ) {}

    init(){}
}
