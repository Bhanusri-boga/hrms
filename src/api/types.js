/**
 * @typedef {Object} ApiResponse
 * @property {boolean} success - Whether the API call was successful
 * @property {*} data - The response data
 * @property {string} [message] - Optional message from the server
 * @property {string} [error] - Optional error message
 */

/**
 * @typedef {Object} PaginatedResponse
 * @property {Array<*>} items - Array of items for the current page
 * @property {number} total - Total number of items
 * @property {number} page - Current page number
 * @property {number} pageSize - Number of items per page
 * @property {number} totalPages - Total number of pages
 */

/**
 * @typedef {Object} ApiError
 * @property {string} message - Error message
 * @property {number} [status] - HTTP status code
 * @property {string} [code] - Error code
 */

/**
 * @typedef {Object} QueryParams
 * @property {number} [page] - Page number for pagination
 * @property {number} [pageSize] - Items per page
 * @property {string} [sortBy] - Field to sort by
 * @property {string} [sortOrder] - Sort order ('asc' or 'desc')
 * @property {string} [search] - Search query
 * @property {Object} [filters] - Additional filters
 */

export const ApiResponseTypes = {
  SUCCESS: 'success',
  ERROR: 'error',
  AUTH_ERROR: 'auth_error',
  VALIDATION_ERROR: 'validation_error',
  NOT_FOUND: 'not_found',
  SERVER_ERROR: 'server_error',
};

export const HttpMethods = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  DELETE: 'delete',
  PATCH: 'patch',
};
