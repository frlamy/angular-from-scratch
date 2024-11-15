import {Angular, Framework} from "./framework/framework";
import {Formatter} from "./services/formatter";
import {Verifier} from "./services/verifier";
import {PhoneNumberDirective} from "./directives/phone-number.directive";
import {CreditCardDirective} from "./directives/card-number.directive";
import {ProvidersMetadata} from "./framework/types";
import {NgZone} from "./framework/zone";

const declarations: any[] = [PhoneNumberDirective, CreditCardDirective]

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

NgZone.run(() => {
    Angular.bootstrapApplication({
        declarations: declarations,
        providers: providersMetadata
    });
});

