import { getLockfile } from "./lib/get_lockfile";
import { getToken } from "./lib/get_token";
import { getCoreGame, getCoreGameStats } from "./lib/val_api";
import { retryDecorator } from "ts-retry-promise";

console.info("Fetching lockfile...");
const env = getLockfile();

console.log("Lockfile found", env.raw);

async function main() {
  const retries = "INFINITELY",
    timeout = "INFINITELY";

  const getTokenFn = retryDecorator(getToken, {
    delay: 3000,
    retries,
    timeout,
    logger() {
      console.log("Looking for valorant...");
    },
  });
  const token = await getTokenFn(env);

  const getCoreGameFn = retryDecorator(getCoreGame, {
    delay: 3000,
    retries,
    timeout,
    logger() {
      console.log("Getting match data...");
    },
  });

  // const coreGamePlayers = await getCoreGameFn(token.subject, token);
  // const getCoreGameStatsFn = retryDecorator(getCoreGameStats, {
  //   delay: 1000,
  //   retries,
  //   timeout,
  //   until() {
  //     return false;
  //   },
  // });
  // const gameStats = await getCoreGameStatsFn(coreGamePlayers.MatchID, token);
}

main();
