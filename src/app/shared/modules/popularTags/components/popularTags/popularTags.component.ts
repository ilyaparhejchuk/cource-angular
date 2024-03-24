import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { getPopularTagsAction } from '../../store/actions/getPopularTags.actions';
import { Observable } from 'rxjs';
import { errorSelector, isLoadingSelector, popularTagsSelector } from '../../store/selectors';

@Component({
  selector: 'mc-popular-tags',
  templateUrl: './popularTags.component.html',
})
export class PopularTagsComponent implements OnInit {
  public popularTags$!: Observable<any | null>;
  public isLoading$!: Observable<boolean>;
  public error$!: Observable<any>;

  constructor(private store: Store) {}

  public ngOnInit(): void {
    this.initializeValues();
    this.fetchData();
  }

  private initializeValues(): void {
    this.popularTags$ = this.store.pipe(select(popularTagsSelector));
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.error$ = this.store.pipe(select(errorSelector));
  }

  private fetchData(): void {
    this.store.dispatch(getPopularTagsAction());
  }
}
