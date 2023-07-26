import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { registerAction } from '../../store/actions/register.actions';
import { Observable, of } from 'rxjs';
import { isSubmittingSelector } from '../../store/selectors';
import { AuthService } from '../../services/auth.service';
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface';

@Component({
  selector: 'mc-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public form: FormGroup = new FormGroup({});
  public isSubmitting$!: Observable<boolean>;

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
  }

  public initializeForm(): void {
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  public onSubmit(): void {
    console.log(this.form.value);
    this.store.dispatch(registerAction(this.form.value));
    this.authService.register(this.form.value).subscribe((currentUser: CurrentUserInterface) => console.log(currentUser))
  }
}
