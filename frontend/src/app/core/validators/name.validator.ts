import { FormControl, FormGroup } from '@angular/forms';

export class NameValidator {

    static isValid(control: FormControl) {
        const re = /^([A-Z][a-z.]+(\s[A-Z][a-z.]+)*)/.test(control.value);

        if ((re &&!(/\s/.test(control.value))) || control.value == "" ) {
            return null;
        }

        return {
            invalidName: true
        };

    }
}
