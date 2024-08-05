export class ResponseError implements Partial<Omit<Response, "body">> {
    public body: { status: number; message: string };
    headers: Headers;
    status: number;
    statusText: string;
    type: ResponseType;
    url: string;
    knownError: boolean = false;
  
    constructor(response: Response, body: any) {
      if (body?.message) {
        this.knownError = true;
      }
      this.body = body;
      this.headers = response.headers;
      this.status = response.status;
      this.statusText = response.statusText;
      this.url = response.url;
      this.type = response.type;
    }
  }
  
  class ExtendedHeaders extends Headers {
    constructor(init?: HeadersInit | undefined) {
      super(init);
    }
    setIfEmpty(name: string, value: string): void {
      if (!this.get(name)) {
        this.set(name, value);
      }
    }
  }
  export type Method = "POST" | "GET" | "PUT" | "PATCH" | "DELETE";
  export interface QueryInitOptions {
    baseUrl: string;
    getBearerToken: () => string;
  }
  export class Query {
    public baseUrl: string;
    public getBearerToken = () => "";
  
    constructor(options: QueryInitOptions) {
      this.getBearerToken = options.getBearerToken;
      if (options.baseUrl.endsWith("/")) {
        options.baseUrl = options.baseUrl.slice(0, -1);
      }
      this.baseUrl = options.baseUrl;
      this.fetchData = this.fetchData.bind(this);
    }
  
    async fetchData(
      url: string,
      options: Omit<RequestInit, "body"> & {
        auth?: boolean;
        query?: Record<string, string>;
        method?: Method;
        body?: any;
      } = {}
    ) {
      options = { auth: true, method: "GET", ...options };
      var headers = new ExtendedHeaders(options.headers);
  
      
      headers.setIfEmpty("Content-Type", "application/json");
      // headers.setIfEmpty("Origin", "*");
  
      if (options.body) {
        options.body = JSON.stringify(options.body);
      }
      if (options.auth) {
        delete options.auth;
        headers.setIfEmpty("Authorization", `${this.getBearerToken()}`);
      }
  
      if (url.endsWith("/")) {
        url = url.slice(0, -1);
      }
      if (options.query) {
        url = url + "?" + new URLSearchParams(options.query).toString();
      }
      try {
        const response = await fetch(`${this.baseUrl}/${url}`, {
          ...options,
          headers,
        });
        if (!response.ok) {
          const err = new ResponseError(response, await response.json());
          throw err;
        }
        return response.json();
      } catch (err) {
        if (err instanceof ResponseError) {
          throw err;
        }
        throw new ResponseError(
          new Response(null, { statusText: "FETCH_ERROR", status: 500 }),
          { error: err }
        );
      }
    }
  }
  