import { Middleware, isRejectedWithValue } from '@reduxjs/toolkit';
import { isFetchError, isServerError } from '@app/lib//api';

import type { ServerError } from '@app/lib//api';
import { ToastService } from '@app/services/toastService';
import { showErrorToast } from '@app/components/Toast/Toast';

/**
 * Middleware to save 'alert' objects to the Redux store when server errors or custom alerts are received by RTK
 * @param store The Redux store
 */

const notify: Middleware = () => next => action => {
  const toast = ToastService.toast;
  if (!toast) return next(action);

  // Handle server generated errors :: Checks the object schema matches the server error schema
  if (isRejectedWithValue(action) && isServerError(action.payload)) {
    const { payload } = action as { payload: ServerError };
    showErrorToast('Failed', `${payload.data.message}`);
  } else if (isRejectedWithValue(action) && isFetchError(action?.payload)) {
    showErrorToast('CORS', 'Your request was blocked by a CORS policy. Please contact your administrator.');
  }
  return next(action);
};

export default notify;
