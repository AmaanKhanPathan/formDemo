import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { customRegex } from './constant/validation';
import { COUNTRIES_META_DATA } from './constant/countriesData';
import { empIdValidator } from './validators/empValidators';
import { NoSpacebarValidator } from './validators/noSpacebar';
import { ForbiddenNameValidator } from './validators/forbiddenName';
import { AsyncEmailValidators } from './validators/asyncEmailValidator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'react_form';
  signUpForm!: FormGroup
  gendersArray: Array<string> = ['Male', 'Female', 'Others'];
  countriesArray = COUNTRIES_META_DATA;


  ngOnInit(): void {
    this.createSignUpForm();
    this.f['password']
        .valueChanges.subscribe((res:any)=>{
            // console.log('password value changes');
            if(this.f['password'].valid){
              this.f['confirmPassword'].enable()
            }else{
              this.f['confirmPassword'].disable()
            }            
        })
  }

  createSignUpForm() {
    this.signUpForm = new FormGroup({
      username: new FormControl(null, [Validators.required, Validators.maxLength(8), Validators.minLength(4), NoSpacebarValidator.noSpace]),
      email : new FormControl(null, [Validators.required, Validators.pattern(customRegex.email)],
      [AsyncEmailValidators.isEmailUsed]),
      
      empId: new FormControl(null, [Validators.required, empIdValidator.isEpmIdValid]),
      skills: new FormArray([new FormControl()]),
      gender: new FormControl(null),
      password: new FormControl(null, [Validators.required, Validators.pattern(customRegex.password)]),
      confirmPassword: new FormControl({value:null, disabled:true}),
      currentAddress: new FormGroup({
        country: new FormControl(null),
        state: new FormControl(null),
        city: new FormControl(null),
        zipCode: new FormControl(null),
      })
    })
  }

  onSignUp() {
    if(this.f['password'].value === this.f['confirmPassword'].value && this.signUpForm.valid){
      console.log(this.signUpForm);
      console.log(this.signUpForm.value);
      this.signUpForm.reset();
      }    
  }

  get getUsernameControl() {
    return this.signUpForm.get('username') as FormControl
  }

  get f() {
    return this.signUpForm.controls
  }

  get skillsFormArray() {
    return this.signUpForm.get('skills') as FormArray
  }

  addMoreSkills() {
    if (this.skillsFormArray.length < 5) {
      let skillControl = new FormControl(null)
      this.skillsFormArray.push(skillControl)
    }
  }
}
