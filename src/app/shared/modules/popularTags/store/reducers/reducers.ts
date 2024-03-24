import { Action, createReducer, on } from '@ngrx/store';
import {
  getPopularTagsAction,
  getPopularTagsFailureAction,
  getPopularTagsSuccessAction,
} from '../actions/getPopularTags.actions';
import { PopularTagsStateInterface } from '../popularTagsState.interface';

const initialState: PopularTagsStateInterface = {
  data: null,
  isLoading: false,
  error: null,
};

const popularTagsReducer = createReducer(
  initialState,
  on(
    getPopularTagsAction,
    (state): PopularTagsStateInterface => ({
      ...state,
      isLoading: true,
    }),
  ),
  on(
    getPopularTagsSuccessAction,
    (state, actions): PopularTagsStateInterface => ({
      ...state,
      isLoading: false,
      data: actions.popularTags,
    }),
  ),
  on(
    getPopularTagsFailureAction,
    (state): PopularTagsStateInterface => ({
      ...state,
      isLoading: false,
    }),
  ),
);

export function reducers(state: PopularTagsStateInterface, action: Action) {
  return popularTagsReducer(state, action);
}
