import { Entitlement } from "../types/entitlement";
import { CoreGamePlayers } from "../types/match";
import { getGlzAxios, getLocalAxios } from "./axios_instance";

export const getCoreGame = async (puuid: string, token: Entitlement) => {
  const axios = getGlzAxios(token);
  const path = `/core-game/v1/players/${puuid}`;
  const { data } = await axios.get<CoreGamePlayers>(path);
  return data;
};

export const getCoreGameStats = async (matchId: string, token: Entitlement) => {
  const axios = getGlzAxios(token);
  const path = `/core-game/v1/matches/${matchId}`;
  const { data } = await axios.get(path);
  console.log(data);
  return data;
};
