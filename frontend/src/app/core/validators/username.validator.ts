import { FormControl, FormGroup } from '@angular/forms';

export class UsernameValidator {

    static isValid(control: FormControl) {
        const re = /([a-zA-Z0-9._]{3,15})/.test(control.value);

        if ((re &&!(/\s/.test(control.value))) || control.value == "" ) {
            return null;
        }

        return {
            invalidUsername: true
        };

    }
}
