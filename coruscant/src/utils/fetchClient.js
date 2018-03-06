class FetchResponse {
  constructor(result, error, res) {
    this.result = result || null
    this.error = error || null
    this.res = res
  }
}

class FetchClient {
  constructor(baseURL) {
    this.baseURL = baseURL || 'http://localhost:3000/api/v1'
  }

  setAuthToken(authToken) {
    this.authToken = authToken
  }

  get(opts) {
    return this.send('GET', opts)
  }

  post(opts) {
    return this.send('POST', opts)
  }

  put(opts) {
    return this.send('PUT', opts)
  }

  patch(opts) {
    return this.send('PATCH', opts)
  }

  delete(opts) {
    return this.send('DELETE', opts)
  }

  static isErrorCode(statusCode) {
    return statusCode >= 400
  }

  async send(method, opts) {
    if (!opts.url) {
      return
    }

    const url = this.baseURL + opts.url
    const o = {
      method,
      body: JSON.stringify(opts.body),
      headers: {
        ...opts.headers,
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${this.authToken}`
      }
    }

    try {
      const res = await fetch(url, o)

      if (FetchClient.isErrorCode(res.status)) {
        const err = await res.json()
        return new FetchResponse(null, err, res)
      }
      let data = null
      if (res.status !== 204) {
        data = await res.json()
      }
      return new FetchResponse(data, null, res)
    } catch (e) {
      return new FetchResponse(null, e, null)
    }
  }
}

export default FetchClient
