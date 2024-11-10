export class CreditCardDirective {
    static selector = "[data-card-number]";

    hasSpaces = true;

    constructor(public element: HTMLInputElement) {}

    formatNumber (element: HTMLInputElement, interval: number, start: number, end: number) {
        const value = element.value.replace(/\D/g, '').substring(start, end);

        const groups = [];
        for (let i = 0; i < value.length; i+=interval) {
            groups.push(value.substring(i, i+interval));
        }

        element.value = groups.join(this.hasSpaces ? ' ' : '');
    }

    init(){
        this.element.style.borderColor = 'green';

        this.hasSpaces = this.element.getAttribute('data-has-spaces') !== 'false';

        this.element.addEventListener('input', (event) => {
            this.formatNumber(event.target as HTMLInputElement, 4,0, 16)
        })
    }
}