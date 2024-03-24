import { AuthStateInterface } from 'src/app/auth/types/authState.interface';
import { FeedStateInterface } from '../modules/feed/types/feedState.interface';
import { PopularTagsStateInterface } from '../modules/popularTags/store/popularTagsState.interface';

export interface AppStateInterface {
  auth?: AuthStateInterface;
  feed?: FeedStateInterface;
  popularTags?: PopularTagsStateInterface;
}
