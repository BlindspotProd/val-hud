import axios from "axios";
import os from "node:os";
import { Entitlement } from "../types/entitlement";

const region = "ap";

const getHeaders = (entitlement: Entitlement) => {
  const client = {
    platformType: "PC",
    platformOS: "Windows",
    platformOSVersion: os.release(),
    platformChipset: os.arch(),
  };
  const clientString = JSON.stringify(client);
  const clientBase64 = Buffer.from(clientString).toString("base64");
  return {
    Authorization: `Bearer ${entitlement.accessToken}`,
    "X-Riot-Entitlements-JWT": entitlement.token,
    "X-Riot-Client-Platform": clientBase64,
  };
};

export const getLocalAxios = (port: string, entitlement: Entitlement) => {
  return axios.create({
    baseURL: `http://127.0.0.1:${port}`,
    headers: getHeaders(entitlement),
  });
};

export const getPdAxios = (entitlement: Entitlement) => {
  return axios.create({
    baseURL: `https://pd.${region}-1.a.pvp.net`,
    headers: getHeaders(entitlement),
  });
};

export const getGlzAxios = (token: Entitlement) => {
  return axios.create({
    baseURL: `https://glz-${region}-1.${region}.a.pvp.net`,
    headers: getHeaders(token),
  });
};
