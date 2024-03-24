import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, of, switchMap, map } from 'rxjs';
import { PopularTagsService } from '../../services/popularTags.service';
import { getPopularTagsAction, getPopularTagsFailureAction, getPopularTagsSuccessAction } from '../actions/getPopularTags.actions';

@Injectable()
export class GetPopularTagsEffect {
  getPopularTags$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getPopularTagsAction),
      switchMap(() => {
        return this.popularTagsService.getPopularTags().pipe(
          map((popularTags: any) => {
            return getPopularTagsSuccessAction({ popularTags });
          }),
          catchError(() => {
            return of(getPopularTagsFailureAction());
          }),
        );
      }),
    ),
  );

  constructor(
    private actions$: Actions,
    private popularTagsService: PopularTagsService,
  ) {}
}
