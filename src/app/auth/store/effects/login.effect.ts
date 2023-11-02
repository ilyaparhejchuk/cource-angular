import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import {
  registerAction,
  registerFailAction,
  registerSuccessAction,
} from '../actions/register.actions';
import { catchError, of, switchMap, map, tap } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { PersistenceService } from 'src/app/shared/services/persistence.service';
import { Route, Router } from '@angular/router';
import {
  loginAction,
  loginFailAction,
  loginSuccessAction,
} from '../actions/login.actions';

@Injectable()
export class LoginEffect {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginAction),
      switchMap(({ request }) => {
        return this.authService.login(request).pipe(
          map((currentUser: CurrentUserInterface) => {
            this.persistenceService.set('accessToken', currentUser.token);
            return loginSuccessAction({ currentUser });
          }),
          catchError((errorRespons: HttpErrorResponse) => {
            return of(loginFailAction({ errors: errorRespons.error }));
          }),
        );
      }),
    ),
  );

  redirectAfterSubmit$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginSuccessAction),
        tap(() => {
          console.log('success');
          this.router.navigateByUrl('/');
        }),
      ),
    { dispatch: false },
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private persistenceService: PersistenceService,
    private router: Router,
  ) {}
}
