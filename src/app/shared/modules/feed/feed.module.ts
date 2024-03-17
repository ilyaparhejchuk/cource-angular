import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FeedComponent } from './feed.component';
import { EffectsModule } from '@ngrx/effects';
import { GetFeedEffect } from './store/effects/getFeed.effect';
import { reducers } from './store/reducers';
import { StoreModule } from '@ngrx/store';
import { FeedService } from './services/feed.servive';


@NgModule({
  imports: [CommonModule, EffectsModule.forFeature([GetFeedEffect]), StoreModule.forFeature('feed', reducers)],
  declarations: [FeedComponent],
  exports: [FeedComponent],
  providers: [FeedService]
})
export class FeedModule {}
