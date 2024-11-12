export class Formatter {
    constructor() {
        console.log('Formateur');
    }

    formatNumber (initialValue: string, length: number, groupLength: number, hasSpaces: boolean = true) {
        const value = initialValue.replace(/\D/g, '').substring(0, length);

        const groups = [];
        for (let i = 0; i < value.length; i+=groupLength) {
            groups.push(value.substring(i, i+groupLength));
        }

        return groups.join(hasSpaces ? ' ' : '');
    }
}
