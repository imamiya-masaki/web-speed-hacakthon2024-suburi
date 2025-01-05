const createAxiosInstance = () => {

  const baseURL =  process.env['API_URL'] || window.location.href;
  const instance = {
    get: async <T>(path: string, params?: {params?: Record<string, string | number | boolean>}) => {
      let data: T = {} as T;
      try {
      const query = params?.params
      const url = new URL(path, baseURL)
      for (const [key,value] of Object.entries(query || {})) {
        url.searchParams.set(key, String(value))
      }
      const fetched = await fetch(url.href, {
        headers: {
          'Content-Type': 'application/json',
        }
      })
      data = fetched.json() as T
    } catch (e) {
      console.error("hogehogeerror", e)
    }
      return {data}
    } 
  }
  return instance
}

export const apiClient = createAxiosInstance();
