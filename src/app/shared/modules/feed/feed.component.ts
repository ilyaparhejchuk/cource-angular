import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { getFeedAction } from './store/actions/getFeed.actions';
import { Observable, Subscription } from 'rxjs';
import { GetFeedResponseInterface } from './types/getFeedResponse.interface';
import {
  errorSelector,
  feedSelector,
  isLoadingSelector,
} from './store/selectors';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Params, Router } from '@angular/router';
import queryString from 'query-string';

@Component({
  selector: 'mc-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit, OnDestroy {
  @Input('apiUrl') apiUrlProps!: string;

  public isLoading$!: Observable<boolean>;
  public error$!: Observable<string | null>;
  public feed$!: Observable<GetFeedResponseInterface | null>;
  public limit = environment.limit;
  public baseUrl!: string;
  public queryParamsSubstription!: Subscription;
  public currentPage!: any;

  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  public ngOnInit(): void {
    this.initializeValues();
    this.initializeListeners();
  }

  public ngOnDestroy(): void {
    this.queryParamsSubstription.unsubscribe();
  }

  private initializeValues(): void {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.error$ = this.store.pipe(select(errorSelector));
    this.feed$ = this.store.pipe(select(feedSelector));
    this.baseUrl = this.router.url.split('?')[0];
  }

  private initializeListeners(): void {
    this.queryParamsSubstription = this.route.queryParams.subscribe(
      (params: Params) => {
        this.currentPage = Number(params['page'] || '1');
        this.fetchFeed();
      },
    );
  }

  private fetchFeed(): void {
    const offset = this.currentPage * this.limit - this.limit;
    const parsedUrl = queryString.parseUrl(this.apiUrlProps);
    const stringifiedParams = queryString.stringify({
     limit: this.limit,
     offset,
     ...parsedUrl.query,
    });
    const apiUrlWithParams = `${parsedUrl.url}?${stringifiedParams}`;
    this.store.dispatch(getFeedAction({ url: apiUrlWithParams  }));
  }
}
