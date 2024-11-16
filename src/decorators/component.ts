import {ComponentMetadata} from "../framework/types";

export function Component(metadata: ComponentMetadata) {
    return function(decoratedClass) {
        decoratedClass["selector"] = metadata.selector;
        decoratedClass["providers"] = metadata.providers || [];

        decoratedClass.prototype.render = function () {
            let renderedTemplate = metadata.template;

            metadata.template.match(/{{.*?}}/g).forEach(interpolation => {
                const propName : string = interpolation.replace(/[{}]/g, '').trim()
                renderedTemplate = renderedTemplate.replace(interpolation, this[propName]);

            });

            const eventsToBind: {
                elementId: string,
                eventName: string,
                methodName: string
            }[] = [];

            metadata.template
                .match(/<.*?\(.*?\)=".*?".*?>/g)
                .forEach((tag:string) => {
                    const randomId: string = "event-listener-"+Math.ceil(Math.random()*1000);

                    tag.match(/\(.*?\)=".*?"/g)
                        .forEach((event:string) => {
                            const eventName = event.match(/\((.*)?\)/)[1];
                            const methodName = event.match(/"(.*)"/)[1];
                            eventsToBind.push({
                                elementId : randomId,
                                eventName,
                                methodName
                            });
                        });

                    const renderedTag:string = tag.replace(/\(.*?\)=".*?"/g, `id=${randomId}`);

                    renderedTemplate = renderedTemplate.replace(tag, renderedTag);
                });

            this.element.innerHTML = renderedTemplate;
            eventsToBind.forEach(eventsToBind => {
                this.element.querySelector("#" + eventsToBind.elementId)
                    .addEventListener(eventsToBind.eventName, () => {
                        this[eventsToBind.methodName]();
                        this.render();
                    });
            });
        }

        const originalFunctionInit: Function = decoratedClass.prototype.init || function () {};

        decoratedClass.prototype.init = function () {
            originalFunctionInit.call(this);
            this.render();
        }
    }
}
