import { AbstractControl, ValidationErrors } from "@angular/forms";

export class empIdValidator {
    public static isEpmIdValid(control: AbstractControl): ValidationErrors | null {
        let val = control.value as string;
        if (val) {
        

        let regExp = /^[a-z]\d{3}$/i
        let isValid = regExp.test(val);
       
        return isValid ? null : {invalidEmpId : 'EmpId should start with 1 alphabate and ends with 3 numbers'}
        }else{
            return null
        }

    }
}