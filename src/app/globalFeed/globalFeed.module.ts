import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { GlobalFeedComponent } from "./componnents/globalFeed/globalFeed.component";
import { RouterModule } from '@angular/router';
import { FeedModule } from "../shared/modules/feed/feed.module";
import { PopularTagsModule } from "../shared/modules/popularTags/popularTags.module";

const routes = [
    {
        path: '',
        component: GlobalFeedComponent,
    }
]

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes), FeedModule, PopularTagsModule],
    declarations: [GlobalFeedComponent],
})
export class GlobalFeedModule {}