import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PopularTagsService } from './services/popularTags.service';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { GetPopularTagsEffect } from './store/effects/getPopularTags.effect';
import { PopularTagsComponent } from './components/popularTags/popularTags.component';
import { RouterModule } from '@angular/router';
import { reducers } from './store/reducers/reducers';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    StoreModule.forFeature('popularTags', reducers),
    EffectsModule.forFeature([GetPopularTagsEffect]),
  ],
  declarations: [PopularTagsComponent],
  exports: [PopularTagsComponent],
  providers: [PopularTagsService],
})
export class PopularTagsModule {}
