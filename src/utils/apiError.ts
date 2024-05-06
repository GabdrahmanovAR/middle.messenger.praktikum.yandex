import { IAPIError } from '../api/model';

export function isApiError(response: any): response is IAPIError {
  return response?.reason;
}
