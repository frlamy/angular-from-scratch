import {Formatter} from "../services/formatter";

export class PhoneNumberDirective {
    static selector = "[data-phone-number]";

    hasSpaces = true;

    borderColor = 'red';

    constructor(public element: HTMLInputElement, private formatter: Formatter) {}

    formatNumber (element: HTMLInputElement) {
        element.value = this.formatter.formatNumber(element.value, 10, 2, true);
    }

    init(){
        this.hasSpaces = this.element.getAttribute('data-has-spaces') !== 'false';

        this.element.style.borderColor = this.element.getAttribute('data-border-color') || this.borderColor ;

        this.element.addEventListener('input', (event) => {
            this.formatNumber(event.target as HTMLInputElement)
        })
    }
}
