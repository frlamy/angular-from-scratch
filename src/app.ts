import {Angular} from "./framework/framework";
import {Formatter} from "./services/formatter";
import {Verifier} from "./services/verifier";
import {PhoneNumberDirective} from "./directives/phone-number.directive";
import {CreditCardDirective} from "./directives/card-number.directive";
import {ProvidersMetadata} from "./framework/types";
import {ChronometerDirective} from "./directives/chronometer.directive";
import {UserProfilComponent} from "./components/user-profil.component";
import {CounterComponent} from "./components/counter.component";

const declarations: any[] = [PhoneNumberDirective, CreditCardDirective, ChronometerDirective, UserProfilComponent, CounterComponent]

const providersMetadata: ProvidersMetadata = [
    {
        provide: 'formatter',
        construct: () => new Formatter()
    },
    {
        provide: 'verifier',
        construct: () => new Verifier()
    }
];

Angular.bootstrapApplication({
    declarations: declarations,
    providers: providersMetadata
});
