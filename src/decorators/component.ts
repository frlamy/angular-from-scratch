import {ComponentMetadata} from "../framework/types";

export function Component(metadata: ComponentMetadata) {
    return function(decoratedClass) {
        decoratedClass["selector"] = metadata.selector;
        decoratedClass["providers"] = metadata.providers || [];
        decoratedClass.prototype.template = metadata.template;

        const originalFunctionInit: Function = decoratedClass.prototype.init || function () {};

        decoratedClass.prototype.init = function () {
            originalFunctionInit.call(this);
            this.render();
        }

        decoratedClass.prototype.render = function () {
            let renderedTemplate = this.updateInterpolations(this.template);

            const [eventsToBind, templateWithEvents] = this.updateEventBindings(renderedTemplate);

            this.element.innerHTML = templateWithEvents;

            this.bindEventsToDOMElements(eventsToBind);
        }

        decoratedClass.prototype.bindEventsToDOMElements = function (eventsToBind:{
            elementId: string,
            eventName: string,
            methodName: string
        }[]) {
            eventsToBind.forEach(eventsToBind => {
                this.element.querySelector("#" + eventsToBind.elementId)
                    .addEventListener(eventsToBind.eventName, () => {
                        this[eventsToBind.methodName]();
                        this.render();
                    });
            });
        }

        decoratedClass.prototype.updateEventBindings = function(template: string) {
            const openingTags: RegExpMatchArray = template.match(/<.*? \(.*?\)=".*?".*?>/gm);

            let templateWithEvents: string = template;

            const eventsToBind: any[] = [];

            openingTags.forEach((openingTag :string) => {
                const randomId: string = "event-listener-"+Math.ceil(Math.random()*1000);
                const events = openingTag.match(/\((.*?)\)="(.*?)"/gm);

                events.forEach((event:string) => {
                    const [str, eventName, methodName] = /\((.*?)\)="(.*?)"/gm.exec(
                        event
                    );
                    eventsToBind.push({
                        eventName,
                        methodName,
                        elementId: randomId,
                    });
                });

                const finalOpeningTag = openingTag.replace(/\(.*?\)=".*?"/g, `id=${randomId}`);

                templateWithEvents = templateWithEvents.replace(
                    openingTag,
                    finalOpeningTag
                );
            });

            return [eventsToBind, templateWithEvents];
        }

        decoratedClass.prototype.updateInterpolations = function (template: string) {
            return template.replace(/{{.*?}}/gm, (str) => this[str.replace(/{{|}}|\s/g, "")]
            );
        }
    }
}
