import * as React from "react";

export type HeadshotMap = Record<string, string>;

export const normalizeNameSignature = (value: string): string =>
  value
    .replace(/\.[^/.]+$/, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .filter(Boolean)
    .sort()
    .join(" ");

export interface IUseChangeNetworkHeadshotsResult {
  headshotMap: HeadshotMap;
  loading: boolean;
  error: string | undefined;
}

export const useChangeNetworkHeadshots = (
  _spHttpClient?: unknown
): IUseChangeNetworkHeadshotsResult => {
  const [headshotMap] = React.useState<HeadshotMap>({});
  return { headshotMap, loading: false, error: undefined };
};
