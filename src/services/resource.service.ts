import ResourceApi from '../api/resource.api';
import { isApiError } from '../utils/type-check';

const resourceApi = new ResourceApi();

export const getFile = async (path: string): Promise<void> => {
  const response = await resourceApi.getFile(path);

  if (isApiError(response)) {
    throw new Error(response.reason);
  }

  console.log(response);
};
