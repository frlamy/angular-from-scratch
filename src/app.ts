import {Angular, Framework} from "./framework/framework";
import {Formatter} from "./services/formatter";
import {Verifier} from "./services/verifier";
import {PhoneNumberDirective} from "./directives/phone-number.directive";
import {CreditCardDirective} from "./directives/card-number.directive";

Angular.bootstrapApplication({
    declarations: [PhoneNumberDirective, CreditCardDirective],
    providers: [
        {
            provide: 'formatter',
            construct: () => new Formatter()
        },
        {
            provide: 'verifier',
            construct: () => new Verifier()
        }
    ]
});

