import { Component } from '@angular/core';
import axios from 'axios';
import { FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {
  isRegister: boolean = false;

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        username: [
          '', [Validators.required]
        ],
        password: [
          '', [Validators.required]
        ]
      }
    );
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    console.log(JSON.stringify(this.form.value, null, 2));
  }

  toggleAuthMode() {
    this.isRegister = !this.isRegister;
    this.form.reset();
  }

}
