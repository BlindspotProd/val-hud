import { getPdAxios } from "./lib/axios_instance";
import { getLockfile } from "./lib/get_lockfile";
import { getToken } from "./lib/get_Token";
import { getCoreGame, getCoreGameStats } from "./lib/match_utils";
import { CoreGamePlayers } from "./types/match";
import promiseRetry from "promise-retry";
import { retryDecorator } from "ts-retry-promise";

console.info("Fetching lockfile...");
const env = getLockfile();

console.log("Lockfile found", env.raw);

async function main() {
  const token = await getToken(env);
  const retryFn = retryDecorator(getCoreGame, {
    delay: 5000,
    retries: "INFINITELY",
    timeout: "INFINITELY",
    logger() {
      console.log("Getting match data...");
    },
  });

  const coreGamePlayers = await retryFn(token.subject, token);
  const retryFn2 = retryDecorator(getCoreGameStats, {
    delay: 1000,
    retries: "INFINITELY",
    timeout: "INFINITELY",
    until() {
      return false;
    },
  });
  retryFn2(coreGamePlayers.MatchID, token);
}

main();
