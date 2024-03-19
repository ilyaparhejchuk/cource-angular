import { Component, Input, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { getFeedAction } from './store/actions/getFeed.actions';
import { Observable } from 'rxjs';
import { GetFeedResponseInterface } from './types/getFeedResponse.interface';
import { errorSelector, feedSelector, isLoadingSelector } from './store/selectors';

@Component({
  selector: 'mc-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit {
  @Input('apiUrl') apiUrlProps!: string;

  public isLoading$!: Observable<boolean>;
  public error$!: Observable<string | null>;
  public feed$!: Observable<GetFeedResponseInterface | null>

  constructor(private store: Store) {}

  public ngOnInit(): void {
    this.initializeValues();
    this.fetchData();
    this.store.dispatch(getFeedAction({ url: this.apiUrlProps }));
  }

  private initializeValues(): void {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.error$ = this.store.pipe(select(errorSelector));
    this.feed$ = this.store.pipe(select(feedSelector));
  }

  private fetchData(): void {
    this.store.dispatch(getFeedAction({ url: this.apiUrlProps }));
  }

}
