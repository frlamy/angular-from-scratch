import {Component} from "../decorators/component";
import {Input} from "../decorators/input";

@Component({
    selector: 'counter',
    template: `
        <strong>Compteur :  {{ count }}</strong>
        <button (click)="increment">+</button>
        <button (click)="decrement">-</button>
    `
})
export class CounterComponent{
    @Input('initial-value')
    count :number = 0;

    @Input('step')
    step :number = 1;

    increment() {
        this.count = Number(this.step) + Number(this.count);
    }

    decrement() {
        this.count = Number(this.step) - Number(this.count);
    }

    constructor(public element: HTMLElement) {}
}
