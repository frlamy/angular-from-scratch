import {Directive} from "../decorators/directive";
import {HostBinding} from "../decorators/hostbinding";
import {Hostlistener} from "../decorators/hostlistener";

@Directive({
    selector: "[chronometer]",
})
export class ChronometerDirective {
    @HostBinding('textContent')
    count = 0;

    intervalId:number;

    @Hostlistener('click')
    onClick() {
        if (this.intervalId) {
            window.clearInterval(this.intervalId);
            this.intervalId = undefined;
            return;
        }

        this.count = 0;

        this.intervalId = window.setInterval(() => this.count++, 10);
    }

    constructor(public element: HTMLElement) {}

    init() {}
}
