import axios from 'axios';
import { fetchArticleById } from './fetchArticleById';
import { Dispatch } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';

jest.mock('axios');

const mockedAxios = jest.mocked(axios);

const data = {
  id: '1',
  title: 'Javascript статья 1',
  subtitle: 'Подзаголовок статьи',
  views: 12841,
  createdAt: '14.02.2024',
};

describe('fetchArticleById.test', () => {
  let dispatch: Dispatch;
  let getState: () => StateSchema;

  beforeEach(() => {
    dispatch = jest.fn();
    getState = jest.fn();
  });

  test('success', async () => {
    mockedAxios.get.mockReturnValue(Promise.resolve({ data: data }));
    const action = fetchArticleById('1');
    const result = await action(dispatch, getState, { api: mockedAxios });
    expect(mockedAxios.get).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(result.payload).toEqual(data);
  });

  test('error', async () => {
    mockedAxios.get.mockReturnValue(Promise.resolve({ status: 403 }));
    const action = fetchArticleById('1');
    const result = await action(dispatch, getState, { api: mockedAxios });
    expect(mockedAxios.get).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('rejected');
  });
});
