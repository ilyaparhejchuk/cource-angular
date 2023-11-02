import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import {
  isSubmittingSelector,
  validationErrorsSelector,
} from '../../store/selectors';
import { AuthService } from '../../services/auth.service';
import { BackendErrorsInterface } from 'src/app/shared/types/backendErrors.interface';
import { LoginRequestInterface } from '../../types/loginRequest.interface';
import { loginAction } from '../../store/actions/login.actions';

@Component({
  selector: 'mc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public form: FormGroup = new FormGroup({});
  public isSubmitting$!: Observable<boolean>;
  public backendErrors$!: Observable<BackendErrorsInterface | null>;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.initializeValues();
  }

  public initializeValues(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector));
  }

  public initializeForm(): void {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  public onSubmit(): void {
    const request: LoginRequestInterface = {
      user: this.form.value,
    };
    this.store.dispatch(loginAction({ request }));
  }
}
