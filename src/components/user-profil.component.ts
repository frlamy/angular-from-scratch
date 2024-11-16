import {Input} from "../decorators/input";
import {Component} from "../decorators/component";
import {Hostlistener} from "../decorators/hostlistener";

@Component({
    selector : 'user-profil',
    template : `
        <hgroup>
            <h2 (click)="onClickH2">{{ firstName }} {{ lastName }} </h2>
            <p>Job : {{ job }}</p>
        </hgroup>
        <button (click)="onClickButton">Change teacher name</button>
    `
})
export class UserProfilComponent {
    @Input('first-name')
    firstName : string;

    @Input('last-name')
    lastName : string;

    @Input('job')
    job : string;

    onClickButton() {
        this.firstName = "Jack";
    }

    constructor(public element: HTMLElement) {}

    init() {
        console.log('test');
    }
}
