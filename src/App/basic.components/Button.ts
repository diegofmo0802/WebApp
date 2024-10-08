import Element from "../../Element.js";
import Component from "../../Component.js";

export class Button extends Component<'button', Element.Events> {
    protected component: Element<"button">;
    public constructor(
        protected value: string,
        options: Button.options = {}
    ) { super();
        const btnClass = 'Button' + (options.class ? ' ' + options.class : '');
        const btnId = options.id ? options.id : '';
        this.component = Element.new('button', value, {
            class: btnClass, id: btnId
        });
    }
    public get text(): string { return this.value }
    public set text(value: string) { this.value = value; this.component.text(value); }
}

export namespace Button {
    export interface options {
        class?: string,
        id?: string
    }
}

export default Button;