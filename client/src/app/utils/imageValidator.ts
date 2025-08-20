import { ValidatorFn } from "@angular/forms";


export function imageValidator(): ValidatorFn {
    const regex = /^https:\/\/[a-zA-Z0-9\-._~:\/?#\[\]@!$&'()*+,;=%]+$/
    

    return (control) => {
        const isInvalid = control.value === '' || regex.test(control.value);
        return isInvalid ? null : { imageValidator: true };
    }
}