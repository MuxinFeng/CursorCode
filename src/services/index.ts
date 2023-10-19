import { HRest } from "@h/h-rest";
import ravenInterceptor from "@h/h-rest/lib/interceptors/sentry.browser";
import { stringify } from "query-string";

import runtime from "../system/runtime";

import gptApi from "./gpt";

const paramsSerializer = (params) => stringify(params);

const bossRest = new HRest({
  baseURL: runtime.bossUrl,
  legacyHumpsOff: true,
  paramsSerializer,
  cache: "no-cache",
});

const restList = [bossRest];

export const setRestToken = (token: string | null): void => {
  restList.forEach((client) => {
    client.setConfig({
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    client.interceptor.response.use(ravenInterceptor as any);
  });
};

export default {
  gpt: gptApi(bossRest),
};
