import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { SettingsService } from 'src/app/core/services/settings.service';
import { MessageService } from 'src/app/core/services/message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form!: FormGroup;
  username!: FormControl;
  password!: FormControl;
  label : boolean = true;
  submitted: boolean = false;
  passwordIcon : boolean =true
 inboxIcon : boolean =true
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private settingsService: SettingsService,
    private message: MessageService
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

    this.username = this.form.controls.username as FormControl;
    this.password = this.form.controls.password as FormControl;
  }

  login() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.authService.login(this.form.value).subscribe(
        res => {
          this.settingsService.setToken(res.accessToken);
          this.settingsService.setRefreshToken(res.refreshToken);
          this.authService.getUserInfo().subscribe(res => {
            if (res.authorities.length == 0) {
              this.message.errorMessage('ليس لديك صلاحيه الدخول');
              this.router.navigate(['login']);
            } else {
              this.router.navigate(['city']);
            }
          });
        },
        error => { },
        () => {
          this.password.reset();
        }
      );
    }
  }

}
