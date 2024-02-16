import { StateSchema } from 'app/providers/StoreProvider';
import {
  getArticleDetailsData,
  getArticleDetailsError,
  getArticleDetailsIsLoading,
} from './getArticleDetails';

describe('getArticleDetailsData.test', () => {
  test('should return ArticleDetailsData', () => {
    const data = {
      id: '1',
      title: 'title',
      subtitle: 'subtitle',
    };
    const state: DeepPartial<StateSchema> = {
      articleDetails: { data: data },
    };
    expect(getArticleDetailsData(state as StateSchema)).toEqual(data);
  });
  test('should return undefined when state is empty', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getArticleDetailsData(state as StateSchema)).toEqual(undefined);
  });
  test('should return error', () => {
    const state: DeepPartial<StateSchema> = {
      articleDetails: { error: 'err' },
    };
    expect(getArticleDetailsError(state as StateSchema)).toEqual('err');
  });
  test('should return undefined when state is empty', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getArticleDetailsError(state as StateSchema)).toEqual(undefined);
  });
  test('should return IsLoading', () => {
    const state: DeepPartial<StateSchema> = {
      articleDetails: { isLoading: true },
    };
    expect(getArticleDetailsIsLoading(state as StateSchema)).toEqual(true);
  });
  test('should return undefined when state is empty', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getArticleDetailsIsLoading(state as StateSchema)).toEqual(undefined);
  });
});
