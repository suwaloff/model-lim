import { StoryFn } from '@storybook/react';
import { StateSchema, StoreProvider } from 'app/providers/StoreProvider';
import { loginReducer } from 'features/AuthByUsername/model/slice/loginSlice';
import { profileReducer } from 'entities/Profile';
import { StateSchemaKey } from 'app/providers/StoreProvider/config/StateSchema';
import { Reducer } from '@reduxjs/toolkit';
import { articleReducer } from 'entities/Article/model/slice/ArticleDetailsSlice';
import { addCommentFormReducer } from 'features/addCommentForm/model/slice/addCommentFormSlice';
import { articleDetailsCommentsReducer } from 'pages/articleDetailsPage/model/slice/articleDetailsCommentsSlice';
import { articlesPageReducer } from 'pages/articlesPage';

type ReducersList = {
  [name in StateSchemaKey]?: Reducer;
};

const defaultAsyncReducers: ReducersList = {
  login: loginReducer,
  profile: profileReducer,
  articleDetails: articleReducer,
  addCommentForm: addCommentFormReducer,
  articleDetailsComment: articleDetailsCommentsReducer,
  articlesPage: articlesPageReducer,
};

export const StoreDecorator =
  (state: DeepPartial<StateSchema>, asyncReducers?: ReducersList) => (StoryComponent: StoryFn) =>
    (
      <StoreProvider
        initialState={state}
        asyncReducers={{ ...defaultAsyncReducers, ...asyncReducers }}
      >
        <StoryComponent />
      </StoreProvider>
    );
