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
  showError: boolean = false;
  showAuthErr: boolean = false;
  showRegErr: boolean = false;

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

  async onSubmit(): Promise<void> {
    if(this.form.invalid) {
      this.showError = true;
      return;
    }
    const { username, password } = this.form.value;
    if(this.isRegister) { // Register
      try {
        await axios.post('http://localhost:5001/user/register', 
        { username, password });
        this.toggleAuthMode();
      } catch (error) {
        this.showRegErr = true;
      }
    } else { // Login
      try {
        const req = await axios.post('http://localhost:5001/user/login',
        { username, password});
        const token = req.data.token;
        localStorage.setItem('token', token);
        // After successful login redirect to dashboard
      } catch (error) {
        this.showAuthErr = true;
      }
    }
  }

  toggleAuthMode() {
    this.isRegister = !this.isRegister;
    this.form.reset();
    this.showError = false;
    this.showAuthErr = false;
    this.showRegErr = false;
  }

}
