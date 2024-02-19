import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { getUserAuthData } from 'entities/User';
import { getCommentFormText } from '../../selectors/addCommentFormSelectors';
import { getArticleDetailsData } from './../../../../../entities/Article/model/selectors/getArticleDetails';
import { addCommentFormActions } from '../../slice/addCommentFormSlice';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';

export const sendComment = createAsyncThunk<Comment, void, ThunkConfig<string>>(
  'profile/updateProfileData',
  async (authData, thunkApi) => {
    const { extra, rejectWithValue, getState } = thunkApi;
    const userData = getUserAuthData(getState());
    const text = getCommentFormText(getState());
    const article = getArticleDetailsData(getState());
    const dispatch = useAppDispatch();

    if (!userData || !text || !article) {
      return rejectWithValue('no data');
    }

    try {
      const response = await extra.api.post<Comment>('/comments', {
        articleId: article.id,
        userId: userData.id,
        text,
      });

      if (!response.data) {
        throw new Error();
      }

      dispatch(addCommentFormActions.setText(''));

      return response.data;
    } catch (error) {
      return rejectWithValue('error');
    }
  }
);
