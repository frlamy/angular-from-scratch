import {Formatter} from "../services/formatter";
import {Verifier} from "../services/verifier";

export class CreditCardDirective {
    static selector = "[data-card-number]";

    hasSpaces = true;

    constructor(
        public element: HTMLInputElement,
        private formatter: Formatter,
        private verifier: Verifier,
    ) {}

    formatNumber (element: HTMLInputElement) {
        element.value = this.formatter.formatNumber(element.value, 16, 4, this.hasSpaces);
    }

    init(){
        this.element.style.borderColor = 'green';

        this.hasSpaces = this.element.getAttribute('data-has-spaces') !== 'false';

        this.element.addEventListener('input', (event) => {
            this.formatNumber(event.target as HTMLInputElement)
        })
    }
}
