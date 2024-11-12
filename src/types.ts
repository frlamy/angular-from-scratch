export type ProviderMetadata = {
    /**
     * Le nom du service que l'on cherche à fournir
     *
     * exemple : "formatter"
     */
    provide: string;
    /**
     * Une fonction qui retourne une instance du service que l'on cherche à fournir
     *
     * exemple : () => new Formatter()
     */
    construct: Function;
};

export type ProvidersMetadata = ProviderMetadata[];

export type ServiceInstance = {
    /**
     * Le nom du service qui contient les directives instanciées
     */
    name: string;
    /**
     * L'instance du service
     */
    instance: any;
}

export type ServicesInstance = ServiceInstance[];

export type Module = {
    /**
     * Le tableau qui contient les classes de mes directives
     */
    declarations: any[];
    /**
     * Un tableau qui contient les définitions de services pour mes directives
     */
    providers?: ProvidersMetadata;
}
