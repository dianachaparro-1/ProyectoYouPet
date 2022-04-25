import { FormControl, FormGroup } from '@angular/forms';

export class LastNameValidator {

    static isValid(control: FormControl) {
        const re = /([A-Z][a-z]+([A-Z][a-z]+)*)/.test(control.value);

        if ((re &&!(/\s/.test(control.value))) || control.value == "" ) {
            return null;
        }

        return {
            invalidLastName: true
        };

    }
}
