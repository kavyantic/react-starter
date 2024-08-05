import { StorageService } from "app/lib/utils/storageService";
import { Query, QueryInitOptions } from "./query";
import {
 ApiResponse
} from "./api";
class Api extends Query {
  constructor(options: QueryInitOptions) {
    super(options);
  }

 
  signin = async (payload: {
    username: string;
    password: string;
  }): Promise<ApiResponse> => {
    console.log(payload);
    const data = await this.fetchData(`med365/authapi/v3`, {
      query: {
        method: "fetchaccount",
        authName: payload.username,
        authString: payload.password,
      },
    });
    return data;
  };
}

export default new Api({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  getBearerToken: StorageService.getTokenSafe,
});
// test
// DefaultApi.prototype.getStudents({})
