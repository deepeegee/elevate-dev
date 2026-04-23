import * as React from "react";
// SPFX: import { SPHttpClient } from "@microsoft/sp-http";
import { type IHeroCarouselItem } from "../components/HeroCarousel/HeroCarousel";

// ─── Types ────────────────────────────────────────────────────────────────────

export type CarouselType = "Homepage" | "ChangeNetwork";

export interface IUseSiteMediaCarouselResult {
  slides: IHeroCarouselItem[];
  loading: boolean;
  error: string | undefined;
}

// ─── Constants ────────────────────────────────────────────────────────────────

// SPFX: replace with your actual site URL
const SITE_URL = "https://seplatenergy.sharepoint.com/sites/ExternalSharing";
const LIST_NAME = "SiteMediaCarousel";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const buildEndpoint = (carouselType: CarouselType): string =>
  `${SITE_URL}/_api/web/Lists/GetByTitle('${LIST_NAME}')/items` +
  `?$select=Id,Title,Description,EventName,EventDate,ImageUrl,SortOrder,CarouselType,WorkstreamTag` +
  `&$filter=CarouselType eq '${carouselType}'` +
  `&$orderby=SortOrder asc` +
  `&$top=50`;

const parseSlides = (raw: any[]): IHeroCarouselItem[] =>
  raw.map((item) => ({
    id: `slide-${item.Id}`,
    image: item.ImageUrl ?? "",
    alt: item.Title ?? "",
    title: item.Title ?? undefined,
    subtitle: item.Description ?? undefined,
  }));

// ─── Mock data (test env) ─────────────────────────────────────────────────────

const GALLERY_BASE = "https://seplatenergy.sharepoint.com/sites/ExternalSharing/S4-HANA%20project/SiteAssets/SitePages/Project%20Elevate%20Gallery%20Images";
const CN_BASE = "https://seplatenergy.sharepoint.com/sites/SEPNU-ITTeam/ProjectsandUTC/SiteAssets/S4HANA/Change%20Network";

const MOCK_HOMEPAGE: IHeroCarouselItem[] = [
  { id: "slide-1", image: `${GALLERY_BASE}/Elev8.png`, alt: "Project Elevate Workshop Kickoff", title: "Project Elevate Workshop Kickoff", subtitle: "Opening session of the Project Elevate design workshop." },
  { id: "slide-2", image: `${GALLERY_BASE}/Image%20(3).jpg`, alt: "Workshop in Progress", title: "Workshop in Progress", subtitle: "Cross-functional teams working through design sessions across SAP modules." },
  { id: "slide-3", image: `${GALLERY_BASE}/Image%20(4).jpg`, alt: "Team Collaboration Session", title: "Team Collaboration Session", subtitle: "Finance and SCM workstream teams aligning on process design." },
  { id: "slide-4", image: `${GALLERY_BASE}/Image%20(5).jpg`, alt: "Programme Overview Presentation", title: "Programme Overview Presentation", subtitle: "PMO presenting the programme roadmap and key milestones." },
  { id: "slide-5", image: `${GALLERY_BASE}/Image%20(17).jpg`, alt: "Workshop Group Photo", title: "Workshop Group Photo", subtitle: "Full project team at the conclusion of the design workshop." },
  { id: "slide-6", image: `${GALLERY_BASE}/Image%20(18).jpg`, alt: "Team Collaboration", title: "Team Collaboration", subtitle: "Members collaborating across Finance and SCM workstreams." },
  { id: "slide-7", image: `${GALLERY_BASE}/Image%20(19).jpg`, alt: "BPO Review Session", title: "BPO Review Session", subtitle: "Business process owners in a sign-off review session." },
  { id: "slide-8", image: `${GALLERY_BASE}/Image%20(20).jpg`, alt: "Training Walkthrough", title: "Training Walkthrough", subtitle: "Early training materials walkthrough with super users." },
  { id: "slide-9", image: `${GALLERY_BASE}/Image%20(22).jpg`, alt: "Stakeholder Briefing", title: "Stakeholder Briefing", subtitle: "Leadership briefing on programme status." },
  { id: "slide-10", image: `${GALLERY_BASE}/Image%20(23).jpg`, alt: "Design Workshop Discussion", title: "Design Workshop Discussion", subtitle: "Workstream teams in open discussion." },
];

const MOCK_CN: IHeroCarouselItem[] = [
  { id: "cn-1", image: `${CN_BASE}/IMG_02177.jpg`, alt: "Change Network — Group Activity", title: "Change Network — Group Activity", subtitle: "Change network members during a collaborative group activity." },
  { id: "cn-2", image: `${CN_BASE}/IMG_02404.jpg`, alt: "Change Network — Team Session", title: "Change Network — Team Session", subtitle: "Change network team session bringing members together." },
  { id: "cn-3", image: `${CN_BASE}/IMG_0295.jpg`, alt: "Change Network — Collaboration", title: "Change Network — Collaboration", subtitle: "Members collaborating across Finance and SCM workstreams." },
  { id: "cn-4", image: `${CN_BASE}/IMG_03931.jpg`, alt: "Change Network — Workshop", title: "Change Network — Workshop", subtitle: "Change network workshop session with super users and SMEs." },
  { id: "cn-5", image: `${CN_BASE}/IMG_03933.jpg`, alt: "Change Network — Team Building", title: "Change Network — Team Building", subtitle: "Team building event for change network members." },
  { id: "cn-6", image: `${CN_BASE}/IMG_03966.jpg`, alt: "Change Network — Working Group", title: "Change Network — Working Group", subtitle: "Cross-functional working group bringing change agents together." },
  { id: "cn-7", image: `${CN_BASE}/IMG_03988.jpg`, alt: "Change Network — Presentation", title: "Change Network — Presentation", subtitle: "Presentation covering change network roles and responsibilities." },
  { id: "cn-8", image: `${CN_BASE}/IMG_04055.jpg`, alt: "Change Network — Discussion", title: "Change Network — Discussion", subtitle: "Open discussion among change network members." },
  { id: "cn-9", image: `${CN_BASE}/IMG_0410.jpg`, alt: "Change Network — Breakout Session", title: "Change Network — Breakout Session", subtitle: "Workstream breakout session during change network onboarding." },
  { id: "cn-10", image: `${CN_BASE}/IMG_04111.jpg`, alt: "Change Network — Leadership Briefing", title: "Change Network — Leadership Briefing", subtitle: "Programme leadership briefing the change network." },
  { id: "cn-11", image: `${CN_BASE}/IMG_0415.jpg`, alt: "Change Network — Networking", title: "Change Network — Networking", subtitle: "Informal networking moment among change agents." },
  { id: "cn-12", image: `${CN_BASE}/IMG_04188.jpg`, alt: "Change Network — Closing Session", title: "Change Network — Closing Session", subtitle: "Closing session of the change network onboarding programme." },
];

// ─── Hook ─────────────────────────────────────────────────────────────────────

export const useSiteMediaCarousel = (
  carouselType: CarouselType,
  _spHttpClient?: unknown
): IUseSiteMediaCarouselResult => {
  const [slides, setSlides] = React.useState<IHeroCarouselItem[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | undefined>(undefined);

  React.useEffect(() => {
    let isMounted = true;

    // TEST: return mock data — remove this block in SPFx
    const mockData = carouselType === "Homepage" ? MOCK_HOMEPAGE : MOCK_CN;
    if (isMounted) {
      setSlides(mockData);
      setLoading(false);
    }
    return () => { isMounted = false; };

    /* SPFX: restore from here — remove mock block above and uncomment below
    const fetchSlides = async (): Promise<void> => {
      try {
        setLoading(true);
        setError(undefined);

        const response = await (_spHttpClient as any).get(
          buildEndpoint(carouselType),
          (window as any).SPHttpClient.configurations.v1,
          {
            headers: {
              accept: "application/json;odata=nometadata",
              "odata-version": "",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Carousel fetch failed: ${response.status}`);
        }

        const data = await response.json();

        if (isMounted) {
          setSlides(parseSlides(data.value ?? []));
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Could not load carousel.");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    void fetchSlides();
    return () => { isMounted = false; };
    SPFX end restore */
  }, [carouselType]); // SPFX: add _spHttpClient to deps

  return { slides, loading, error };
};