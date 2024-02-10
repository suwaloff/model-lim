import axios from 'axios';
import { fetchProfileData } from './fetchProfileData';
import { Dispatch } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';

jest.mock('axios');

const mockedAxios = jest.mocked(axios);

const data = {
  form: {
    first: 'Игорь',
    lastname: 'Сувалов',
    username: 'Lima',
    age: '34',
    city: 'Гомель',
  },
};

describe('fetchProfileData.test', () => {
  let dispatch: Dispatch;
  let getState: () => StateSchema;

  beforeEach(() => {
    dispatch = jest.fn();
    getState = jest.fn();
  });

  test('success', async () => {
    mockedAxios.get.mockReturnValue(Promise.resolve({ data: data }));
    const action = fetchProfileData();
    const result = await action(dispatch, getState, { api: mockedAxios });
    expect(mockedAxios.get).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(result.payload).toEqual(data);
  });

  test('error', async () => {
    mockedAxios.get.mockReturnValue(Promise.resolve({ status: 403 }));
    const action = fetchProfileData();
    const result = await action(dispatch, getState, { api: mockedAxios });
    expect(mockedAxios.get).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('rejected');
  });
});
