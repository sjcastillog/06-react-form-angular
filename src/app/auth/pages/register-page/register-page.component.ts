import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'app-register-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './register-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterPageComponent {


  private fb = inject(FormBuilder)
  formUtils = FormUtils;

  myForm = this.fb.group({
    name: ['', [Validators.required, Validators.pattern(FormUtils.namePattern)]],
    email: ['', [Validators.required, Validators.pattern(FormUtils.emailPattern)]],
    username: ['', [Validators.required, Validators.minLength(6), Validators.pattern(FormUtils.notOnlySpacesPattern)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', [Validators.required, Validators.minLength(6),]],

  }, {
    validators: [
      FormUtils.isFieldOneEqualFieldTwo('password', 'password2')
    ]
  });



  onSubmit() {
    this.myForm.markAllAsTouched();
    console.log(this.myForm.value)
    // if (this.myForm.invalid) return;
  }

}
