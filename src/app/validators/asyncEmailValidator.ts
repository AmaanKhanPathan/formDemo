import { AbstractControl, ValidationErrors } from "@angular/forms";
import { resolve } from "mathjs";
import { Observable } from "rxjs";

export class AsyncEmailValidators{
    public static isEmailUsed(controls : AbstractControl):Promise<ValidationErrors | null>|Observable<ValidationErrors|null>{
        let val = controls.value as string;

        const promise = new Promise<ValidationErrors | null>((resolve, reject)=>{
            setTimeout(()=>{
                if(val === 'aman@gmail.com'){
                    resolve({
                        emailExistError : 'This Email is Alreday Exist'
                    })
                }else{
                    resolve (null)
                }
            }, 3000)
        })
        return promise
      
    }
}