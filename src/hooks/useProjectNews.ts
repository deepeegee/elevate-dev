import * as React from "react";
//import { SPHttpClient } from "@microsoft/sp-http";

// ─── Types ────────────────────────────────────────────────────────────────────

export type NewsCategory = "Project Update" | "Social";

export interface INewsItem {
  id: number;
  title: string;
  body: string;
  category: NewsCategory;
  imageUrl?: string;
  linkUrl?: string;
  publishedDate: string; // ISO string
  authorName: string;
  isFeatured: boolean;
}

export interface IUseProjectNewsResult {
  items: INewsItem[];
  loading: boolean;
  error: string | undefined;
}

const SITE_URL = "https://seplatenergy.sharepoint.com/sites/ExternalSharing/S4-HANA%20project";
const LIST_NAME = "ProjectNews";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const buildEndpoint = (category: NewsCategory): string =>
  `${SITE_URL}/_api/web/Lists/GetByTitle('${LIST_NAME}')/items` +
  `?$select=Id,Title,Body,Category,ImageUrl,LinkUrl,PublishedDate,IsFeatured,Author/Title` +
  `&$expand=Author` +
  `&$filter=Category eq '${category}'` +
  `&$orderby=IsFeatured desc,PublishedDate desc` +
  `&$top=20`;

const parseItems = (raw: any[]): INewsItem[] =>
  raw.map((item) => ({
    id: item.Id,
    title: item.Title ?? "",
    body: item.Body ?? "",
    category: item.Category as NewsCategory,
    imageUrl: item.ImageUrl ?? undefined,
    linkUrl: item.LinkUrl ?? undefined,
    publishedDate: item.PublishedDate ?? item.Created,
    authorName: item.Author?.Title ?? "Project Team",
    isFeatured: item.IsFeatured ?? false,
  }));

// ─── Mock data (test env) ─────────────────────────────────────────────────────

const MOCK_UPDATES: INewsItem[] = [
  {
    id: 1,
    title: "Design Phase Now Underway",
    body: "The programme has officially entered the Design phase. Workshops are scheduled across Finance, SCM, and Maintenance workstreams throughout March and April. BPOs and SMEs should expect calendar invites from the PMO this week.",
    category: "Project Update",
    imageUrl: "https://seplatenergy.sharepoint.com/sites/ExternalSharing/S4-HANA%20project/SiteAssets/SitePages/Project%20Elevate%20Gallery%20Images/Elev8.png",
    publishedDate: "2026-03-10T09:00:00Z",
    authorName: "Project PMO",
    isFeatured: true,
  },
  {
    id: 2,
    title: "Change Network Onboarding Complete",
    body: "All Super Users, SMEs, and Data Agents have completed onboarding into the Change Network. The first formal cadence meeting is scheduled for mid-April. Materials will be shared via the Change Network hub.",
    category: "Project Update",
    imageUrl: "https://seplatenergy.sharepoint.com/sites/ExternalSharing/S4-HANA%20project/SiteAssets/SitePages/Project%20Elevate%20Gallery%20Images/Image%20(3).jpg",
    publishedDate: "2026-03-05T10:30:00Z",
    authorName: "OCM Team",
    isFeatured: false,
  },
  {
    id: 3,
    title: "Project Elevate SharePoint Portal Live",
    body: "The Project Elevate SharePoint portal is now live and accessible to all project stakeholders. Use it to find programme updates, the change network directory, FAQs, and key documents.",
    category: "Project Update",
    imageUrl: "https://seplatenergy.sharepoint.com/sites/ExternalSharing/S4-HANA%20project/SiteAssets/SitePages/Project%20Elevate%20Gallery%20Images/Image%20(4).jpg",
    publishedDate: "2026-02-20T08:00:00Z",
    authorName: "Project PMO",
    isFeatured: false,
  },
];

const MOCK_SOCIAL: INewsItem[] = [
  {
    id: 4,
    title: "Team Building Day — Lagos Office",
    body: "The project team came together for a full-day team building session at the Lagos office. Highlights included collaborative workshops, a project quiz, and a team lunch. Great energy going into the Design phase.",
    category: "Social",
    imageUrl: "https://seplatenergy.sharepoint.com/sites/ExternalSharing/S4-HANA%20project/SiteAssets/SitePages/Project%20Elevate%20Gallery%20Images/Image%20(17).jpg",
    publishedDate: "2026-03-08T14:00:00Z",
    authorName: "OCM Team",
    isFeatured: true,
  },
  {
    id: 5,
    title: "Welcome to the Newest Change Network Members",
    body: "We are delighted to welcome the latest cohort of Change Network members across Finance, PM, and SCM. Their energy and commitment to the programme is already showing — welcome aboard.",
    category: "Social",
    imageUrl: "https://seplatenergy.sharepoint.com/sites/ExternalSharing/S4-HANA%20project/SiteAssets/SitePages/Project%20Elevate%20Gallery%20Images/Image%20(18).jpg",
    publishedDate: "2026-02-28T11:00:00Z",
    authorName: "OCM Team",
    isFeatured: false,
  },
];

// ─── Hook ──────────────────────────SPHttpClient | undefined───────────────────────────────────────────

export const useProjectNews = (
  category: NewsCategory,
  spHttpClient: unknown
): IUseProjectNewsResult => {
  const [items, setItems] = React.useState<INewsItem[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | undefined>(undefined);

  React.useEffect(() => {
    let isMounted = true;

    const mockData = category === 'Project Update' ? MOCK_UPDATES : MOCK_SOCIAL;
    if (isMounted) {
      setItems(mockData);
      setLoading(false);
    }
    return () => { isMounted = false; };


  }, [category, spHttpClient]);

  return { items, loading, error };
};