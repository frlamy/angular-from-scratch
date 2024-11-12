import {PhoneNumberDirective} from "../directives/phone-number.directive";
import {CreditCardDirective} from "../directives/card-number.directive";
import {Formatter} from "../services/formatter";
import {Verifier} from "../services/verifier";
import {Module, ProvidersMetadata, ServicesInstance} from "../types";

export class Framework {
    /**
     * Le tableau qui recense l'ensemble des directives déclarées dans le projet
     */
    directives = [];

    /**
     * Le tableau qui contient les instances de services déjà construites
     */
    services: ServicesInstance = [];


    /**
     * Le tableau qui contient les définitions de mes services
     */
    providers: ProvidersMetadata = []

    constructor() {}

    /**
     * Le traitement qui va instancier les directives
     * et les greffer aux éléments html
     * ciblés par les sélecteurs css
     */
    bootstrapApplication(metadata: Module) {
        this.directives = metadata.declarations;
        this.providers = metadata.providers || [];

        this.directives.forEach(directive => {
            const elements = document.querySelectorAll<HTMLInputElement>(directive.selector);

            elements.forEach(element => {
                if (element) {
                    const params = this.analyseDirectiveConstructor(directive, element);
                    const directiveInstance = Reflect.construct(directive, params);
                    directiveInstance.init();
                }
            })
        })
    }

    /**
     * Permet d'analyser les besoin d'un constructeurs et d'instancier les directives
     * @param directive
     * @param element
     * @private
     */
    private analyseDirectiveConstructor(directive, element: HTMLInputElement){
        const hasConstructor = /constructor\(.*\)/g.test(directive.toString());

        if (!hasConstructor) {
            return;
        }

        const paramNames = this.extractParamNamesFromDirective(directive)

        if (!paramNames) {
            return [];
        }

        return paramNames.map(name => {
            if (name === 'element') {
                return element;
            }

            const directiveProviders = directive.providers || [];

            const directiveProvider = directiveProviders.find((p) => p.provide === name)

            if (directiveProvider) {
                return directiveProvider.construct()
            }

            const service = this.services.find(s => s.name === name);

            if (service) {
                return service.instance;
            }

            const provider = this.providers.find(p => p.provide === name);

            if (!provider) {
                throw new Error('Aucun provider nommé ' + name + ' n\'existe');
            }

            const instance = provider.construct();

            this.services.push({
                name,
                instance
            })

            return instance;
        })
    }

    /**
     * Permet d'extraire les paramètres des constructeurs
     * @param directive
     * @private
     */
    private extractParamNamesFromDirective(directive) {
        const directiveParams = /constructor\((.*)\)/g.exec(directive.toString());

        if (!directiveParams) {
            return [];
        }

        return directiveParams[1].split(', ');
    }
}

export const Angular = new Framework();
