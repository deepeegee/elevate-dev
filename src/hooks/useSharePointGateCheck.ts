import * as React from "react";

export type SharePointAccessStatus =
  | "SUCCESS"
  | "ACCESS_DENIED"
  | "NETWORK_ERROR";

export type SharePointAccessResult = {
  status: SharePointAccessStatus;
  isDenied: boolean;
  title?: string;
  header?: string;
  message?: string;
};

const extractAccessMessage = (
  html: string
): {
  title?: string;
  header?: string;
  isDenied: boolean;
} => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  const title = (
    doc.querySelector("title") as HTMLElement | null
  )?.innerText?.trim();

  const header = (
    doc.querySelector(".ms-core-pageTitle") as HTMLElement | null
  )?.innerText?.trim();

  const normalizedTitle = title?.toLowerCase() ?? "";
  const normalizedHeader = header?.toLowerCase() ?? "";

  const isDenied =
    normalizedTitle.includes("access required") ||
    normalizedHeader.includes("don't have access") ||
    normalizedHeader.includes("sorry");

  return { title, header, isDenied };
};

export const useSharePointAccessCheck = () => {
  const checkAccess = React.useCallback(
    async (url: string): Promise<SharePointAccessResult> => {
      try {
        const response = await fetch(url, {
          method: "GET",
          credentials: "include",
        });

        const html = await response.text();
        const result = extractAccessMessage(html);

        console.log("RESULT:", result);

        if (result.isDenied) {
          return {
            status: "ACCESS_DENIED",
            isDenied: true,
            title: result.title,
            header: result.header,
            message:
              result.header ||
              result.title ||
              "You do not have access to this page.",
          };
        }

        return {
          status: "SUCCESS",
          isDenied: false,
          title: result.title,
          header: result.header,
        };
      } catch (error) {
        console.log("error", error);

        return {
          status: "NETWORK_ERROR",
          isDenied: false,
          message: "Could not reach SharePoint.",
        };
      }
    },
    []
  );

  return { checkAccess };
};