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
    title: "Design Workshops Underway — Co-creating our future with SAP S/4HANA at Temple Towers",
    body: `Our design workshops are now underway, bringing together Subject Matter Experts, Change Agents, and Super Users at Temple Towers to shape the SAP S/4HANA solution. The sessions are focused on understanding how our processes work today, aligning on what good looks like tomorrow, and designing a system that supports efficient, consistent ways of working across the business.

Day one began with a project kick-off session where the wider project team came together to ask questions, clarify expectations, and align on scope, approach, and ways of working. It was an important opportunity to ensure everyone had a shared understanding of what the design phase will deliver, how decisions will be made, and how each team will contribute to the overall outcome.

Workshops started in early April and will continue through to the end of May, covering key functional areas including Plant Maintenance, FICO, Project Systems, GRC, Supply Chain, and Maintenance. As the sessions progress, we will continue to share highlights, key decisions, and what to expect next as we move through design and into the next stages of delivery.`,
    category: "Project Update",
    imageUrl: "https://seplatenergy.sharepoint.com/sites/ExternalSharing/S4-HANA%20project/SiteAssets/SitePages/Project%20Elevate%20Gallery%20Images/Elev8.png",
    publishedDate: "2026-10-03T00:00:00Z",
    authorName: "Oluwatosin Orunesajo",
    isFeatured: true,
  },
  {
    id: 2,
    title: "Change Network is LIVE — Our Change Network is officially inaugurated and ready to lead adoption",
    body: `The Change Network has now been inaugurated, bringing together our SMEs, Super Users, and Data Agents in one room to formally onboard them into their roles as Change Network members. The session, attended by the wider project team, created a shared understanding of why the network matters and how it will support the organisation through the transformation journey.

During the onboarding, we walked through what the Change Network role entails, how members will engage their teams, and the cadence for how the network will meet and stay aligned. A short role play was also conducted to bring the responsibilities to life and demonstrate what "driving change" looks like in practice — from reinforcing key messages to capturing feedback and supporting readiness across teams.

To close, members took the Change Network oath, committing to drive the change with their best efforts and lead by example. The energy in the room was positive, and the collective commitment was clear.

Visit the Change Network page to find your Change Network members and stay connected to updates, reminders, and ways to engage through the Change Network link.`,
    category: "Project Update",
    imageUrl: "https://seplatenergy.sharepoint.com/sites/SEPNU-ITTeam/ProjectsandUTC/SiteAssets/S4HANA/Change%20Network/IMG_0415.jpg",
    publishedDate: "2026-05-03T00:00:00Z",
    authorName: "Oluwatosin Orunesajo",
    isFeatured: false,
  },
  {
    id: 3,
    title: "Project Elevate has taken off — SAP S/4HANA is coming to Seplat, and we are preparing for lift off",
    body: `Project Elevate has officially kicked off, setting Seplat on course to move from multiple legacy systems to one unified SAP S/4HANA Private Cloud Edition platform. Think of this as our aircraft leaving the gate, with the crew aligning on the flight plan, safety checks, and destination. This transformation is designed to address a fragmented technology landscape, inconsistent processes, minimal automation, and duplicated data — so we can operate with a single source of truth across the Group.

What does that mean in practical terms? Elevate will enable a unified system, standardised best-practice processes, more automated workflows, and reduced total cost of ownership. The programme spans key areas including Finance and Controlling (including JVA and planning and budgeting), Governance Risk and Controls, Supply Chain (Materials Management, Lean EWM, Ariba), Projects, and Maintenance — supporting the goal of One Seplat way of working across Seplat entities.

Right now, we are in the design phase and gearing up for build as the next major transition. As part of our pre-take-off checks, SMEs, Super Users, and Data Agents are being selected to help shape the solution, validate how work is done today, and support readiness across their teams.

Watch out for official project communications.`,
    category: "Project Update",
    imageUrl: "https://seplatenergy.sharepoint.com/sites/ExternalSharing/S4-HANA%20project/SiteAssets/SitePages/Project%20Elevate%20Gallery%20Images/Elev8.png",
    publishedDate: "2026-08-03T00:00:00Z",
    authorName: "Oluwatosin Orunesajo",
    isFeatured: false,
  },
];

// No Social items in the current dataset — keeping array for when data is added
const MOCK_SOCIAL: INewsItem[] = [];

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