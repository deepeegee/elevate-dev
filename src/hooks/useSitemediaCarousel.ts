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
    eventName: item.EventName ?? undefined,
    eventDate: item.EventDate ? new Date(item.EventDate) : undefined,
  }));

// ─── Mock data (test env) ─────────────────────────────────────────────────────

const GALLERY_BASE = "https://seplatenergy.sharepoint.com/sites/ExternalSharing/S4-HANA%20project/SiteAssets/SitePages/Project%20Elevate%20Gallery%20Images";
const CN_BASE = "https://seplatenergy.sharepoint.com/sites/SEPNU-ITTeam/ProjectsandUTC/SiteAssets/S4HANA/Change%20Network";

const MOCK_HOMEPAGE: IHeroCarouselItem[] = [
  { id: "slide-1",  image: `${GALLERY_BASE}/Elev8.png`,          alt: "Project Elevate",                        title: "Project Elevate",                        subtitle: "Project Elevate is underway and will transform how we work.",         eventName: "Project Elevate Workshop", eventDate: new Date("2026-01-16") },
  { id: "slide-2",  image: `${GALLERY_BASE}/Image%20(22).jpg`,   alt: "Project Elevate - Project Team Workshop", title: "Project Elevate - Project Team Workshop", subtitle: undefined,                                                             eventName: "Project Elevate Workshop", eventDate: new Date("2026-03-01") },
  { id: "slide-3",  image: `${GALLERY_BASE}/Image%20(18).jpg`,   alt: "Project Elevate - Project Team Workshop", title: "Project Elevate - Project Team Workshop", subtitle: undefined,                                                             eventName: "Project Elevate Workshop", eventDate: new Date("2026-03-01") },
  { id: "slide-4",  image: `${GALLERY_BASE}/Image%20(19).jpg`,   alt: "Design Workshop",                        title: "Design Workshop",                        subtitle: "Finance Design Workshop Session.",                                    eventName: "Project Elevate Workshop", eventDate: new Date("2026-03-01") },
  { id: "slide-5",  image: `${GALLERY_BASE}/Image%20(17).jpg`,   alt: "Design Workshops",                       title: "Design Workshops",                       subtitle: "Plant Maintenance Workshop Session.",                                 eventName: "Project Elevate Workshop", eventDate: new Date("2026-03-01") },
  { id: "slide-6",  image: `${GALLERY_BASE}/Image%20(20).jpg`,   alt: "Project Elevate - Project Team Workshop", title: "Project Elevate - Project Team Workshop", subtitle: undefined,                                                             eventName: "Project Elevate Workshop", eventDate: new Date("2026-03-01") },
  { id: "slide-7",  image: `${GALLERY_BASE}/Image%20(23).jpg`,   alt: "Design Workshop",                        title: "Design Workshop",                        subtitle: "Valentine Agwu, SAP Director, delivering the opening remarks.",      eventName: "Project Elevate Workshop", eventDate: new Date("2026-03-01") },
  { id: "slide-8",  image: `${GALLERY_BASE}/Image%20(25).jpg`,   alt: "Design Workshop",                        title: "Design Workshop",                        subtitle: "The S4H Project Team attending the Workshop kick off.",              eventName: "Project Elevate Workshop", eventDate: new Date("2026-03-01") },
  { id: "slide-9",  image: `${GALLERY_BASE}/Image%20(26).jpg`,   alt: "Design Workshop",                        title: "Design Workshop",                        subtitle: "Valentine Agwu, SAP Director, delivered the opening remarks.",       eventName: "Project Elevate Workshop", eventDate: new Date("2026-03-01") },
  { id: "slide-10", image: `${GALLERY_BASE}/Image%20(28).jpg`,   alt: "Design Workshop",                        title: "Design Workshop",                        subtitle: "Members of the project team asking questions during the kick off.",   eventName: "Project Elevate Workshop", eventDate: new Date("2026-03-01") },
  { id: "slide-11", image: `${GALLERY_BASE}/Image%20(29).jpg`,   alt: "Design Workshop",                        title: "Design Workshop",                        subtitle: "EY Project Lead presenting the S4H Implementation approach.",         eventName: "Project Elevate Workshop", eventDate: new Date("2026-03-01") },
  { id: "slide-12", image: `${GALLERY_BASE}/Image%20(3).jpg`,    alt: "Design Workshop",                        title: "Design Workshop",                        subtitle: "Plant Maintenance Workshop Session.",                                 eventName: "Project Elevate Workshop", eventDate: new Date("2026-03-01") },
  { id: "slide-13", image: `${GALLERY_BASE}/Image%20(30).jpg`,   alt: "Project Elevate - Project Team Workshop", title: "Project Elevate - Project Team Workshop", subtitle: "Breakout session at the Project Team workshop.",                      eventName: "Project Elevate Workshop", eventDate: new Date("2026-03-01") },
  { id: "slide-14", image: `${GALLERY_BASE}/Image%20(34).jpg`,   alt: "Project Elevate - Project Team Workshop", title: "Project Elevate - Project Team Workshop", subtitle: "Project Elevate (EY & Seplat), project team members having a laugh.", eventName: "Project Elevate Workshop", eventDate: new Date("2026-03-01") },
  { id: "slide-15", image: `${GALLERY_BASE}/Image%20(36).jpg`,   alt: "Design Workshop",                        title: "Design Workshop",                        subtitle: "Bunmi, Project Director, giving his remarks during the kick off.",    eventName: "Project Elevate Workshop", eventDate: new Date("2026-03-01") },
  { id: "slide-16", image: `${GALLERY_BASE}/Image%20(4).jpg`,    alt: "Design Workshop",                        title: "Design Workshop",                        subtitle: "Finance Workshop Session.",                                           eventName: "Project Elevate Workshop", eventDate: new Date("2026-03-01") },
  { id: "slide-17", image: `${GALLERY_BASE}/Image%20(5).jpg`,    alt: "Design Workshop",                        title: "Design Workshop",                        subtitle: "SME asking a question during the design workshop kick off session.",  eventName: "Project Elevate Workshop", eventDate: new Date("2026-03-01") },
];

const MOCK_CN: IHeroCarouselItem[] = [
  { id: "cn-1",  image: `${CN_BASE}/IMG_02177.jpg`, alt: "Change Network Inauguration", title: "Change Network Inauguration", subtitle: undefined, eventName: "Change Network Onboarding", eventDate: new Date("2026-03-01") },
  { id: "cn-2",  image: `${CN_BASE}/IMG_02404.jpg`, alt: "Change Network Inauguration", title: "Change Network Inauguration", subtitle: undefined, eventName: "Change Network Onboarding", eventDate: new Date("2026-03-01") },
  { id: "cn-3",  image: `${CN_BASE}/IMG_0295.jpg`,  alt: "Change Network Inauguration", title: "Change Network Inauguration", subtitle: undefined, eventName: "Change Network Onboarding", eventDate: new Date("2026-03-01") },
  { id: "cn-4",  image: `${CN_BASE}/IMG_03931.jpg`, alt: "Change Network Inauguration", title: "Change Network Inauguration", subtitle: undefined, eventName: "Change Network Onboarding", eventDate: new Date("2026-03-01") },
  { id: "cn-5",  image: `${CN_BASE}/IMG_03933.jpg`, alt: "Change Network Inauguration", title: "Change Network Inauguration", subtitle: undefined, eventName: "Change Network Onboarding", eventDate: new Date("2026-03-01") },
  { id: "cn-6",  image: `${CN_BASE}/IMG_03966.jpg`, alt: "Change Network Inauguration", title: "Change Network Inauguration", subtitle: undefined, eventName: "Change Network Onboarding", eventDate: new Date("2026-03-01") },
  { id: "cn-7",  image: `${CN_BASE}/IMG_03988.jpg`, alt: "Change Network Inauguration", title: "Change Network Inauguration", subtitle: undefined, eventName: "Change Network Onboarding", eventDate: new Date("2026-03-01") },
  { id: "cn-8",  image: `${CN_BASE}/IMG_04055.jpg`, alt: "Change Network Inauguration", title: "Change Network Inauguration", subtitle: undefined, eventName: "Change Network Onboarding", eventDate: new Date("2026-03-01") },
  { id: "cn-9",  image: `${CN_BASE}/IMG_0410.jpg`,  alt: "Change Network Inauguration", title: "Change Network Inauguration", subtitle: undefined, eventName: "Change Network Onboarding", eventDate: new Date("2026-03-01") },
  { id: "cn-10", image: `${CN_BASE}/IMG_04111.jpg`, alt: "Change Network Inauguration", title: "Change Network Inauguration", subtitle: undefined, eventName: "Change Network Onboarding", eventDate: new Date("2026-03-01") },
  { id: "cn-11", image: `${CN_BASE}/IMG_0415.jpg`,  alt: "Change Network Inauguration", title: "Change Network Inauguration", subtitle: undefined, eventName: "Change Network Onboarding", eventDate: new Date("2026-03-01") },
  { id: "cn-12", image: `${CN_BASE}/IMG_04188.jpg`, alt: "Change Network Inauguration", title: "Change Network Inauguration", subtitle: undefined, eventName: "Change Network Onboarding", eventDate: new Date("2026-03-01") },
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