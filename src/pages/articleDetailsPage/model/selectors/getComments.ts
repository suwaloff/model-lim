import { StateSchema } from 'app/providers/StoreProvider';

export const getCommentsIsLoading = (state: StateSchema) => state.articleDetailsComment?.isLoading;
export const getCommentsError = (state: StateSchema) => state.articleDetailsComment?.error;
