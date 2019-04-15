import fetchFromAPI from './helpers';

describe('API helpers', () => {
  let validResponse;

  beforeEach(() => {
    jest.resetAllMocks();
    validResponse = new Response('{"foo":"bar"}');
  });

  it('makes a request to the API', async () => {
    window.fetch = jest.fn().mockResolvedValueOnce(validResponse);

    await fetchFromAPI('/bla');

    expect(window.fetch).toHaveBeenCalledTimes(1);
    expect(window.fetch).toHaveBeenCalledWith('/api/bla', expect.anything());
  });

  it('returns the parsed JSON response', async () => {
    window.fetch = jest.fn().mockResolvedValueOnce(validResponse);

    const response = await fetchFromAPI('/bla');

    expect(response).toEqual({ foo: 'bar' });
  });

  it('fails with an error when the request fails', async () => {
    const mockResponse = Response.error();
    window.fetch = jest.fn().mockRejectedValueOnce(mockResponse);

    return expect(fetchFromAPI('/bla')).rejects.toBeInstanceOf(Error);
  });

  it('fails with an error when the request returns a status that is not ok', async () => {
    const mockResponse = new Response('{"error":"bla"}', { status: 404, statusText: 'Not Found' });
    window.fetch = jest.fn().mockResolvedValueOnce(mockResponse);

    return expect(fetchFromAPI('/bla')).rejects.toBeInstanceOf(Error);
  });
});
