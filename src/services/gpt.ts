import { HRest } from "@h/h-rest";

export default (bossRest: HRest) => ({
  fetchCities: () => bossRest.get("/cities/"),
});
