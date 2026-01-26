import { normalizeAxiosError } from "@/utils/normalize.error";
import { ResponseWrapper } from "@/types/api";

export function safeAction<TArgs extends any[], TData>(
  fn: (...args: TArgs) => Promise<TData>,
  cb?: (res: TData) => Promise<void>,
) {
  return async (...args: TArgs) => {
    const response: ResponseWrapper<TData> = {
      success: false,
      fields: {},
    };

    const parsedData: (typeof args)[0] = args[1] ?? args[0];
    [...parsedData.entries()].forEach(([key, value]) => {
      response.fields[key] = value;
    });

    try {
      response["data"] = (await fn(...args));
      response.success = true;
      if (cb) await cb(response.data);
      return response;
    } catch (err) {
      response.error = normalizeAxiosError(err);
      response.success = false;
      return response;
    }
  };
}
