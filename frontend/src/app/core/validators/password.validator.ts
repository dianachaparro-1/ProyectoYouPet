import { FormControl, FormGroup } from '@angular/forms';

export class PasswordValidator {

    static isValid(control: FormControl) {
        const re = /(?=.*[A-Za-z])(?=.*[0-9])[A-Za-z0-9@$!%*#?&]{8,}/.test(control.value);

        if ((re &&!(/\s/.test(control.value))) || control.value == "" ) {
            return null;
        }

        return {
            invalidPassword: true
        };

    }
}
