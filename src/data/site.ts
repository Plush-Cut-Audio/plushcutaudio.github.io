/**
 * ===========================================================================
 * PLUSH CUT AUDIO · SITE CONTENT
 * ---------------------------------------------------------------------------
 * Every word, name, image and video on the site comes from this file.
 * Edit here; you should never need to touch the page files for content.
 *
 * Media paths
 * - Put images and videos in /public/media/ and refer to them as
 *   "/media/your-file.jpg". (The word "public" is left out of the path.)
 * - Reels can also be a YouTube or Vimeo link, e.g.
 *   "https://www.youtube.com/watch?v=XXXXXXXX" or "https://vimeo.com/123456".
 *
 * Disciplines must be spelled exactly as in the DISCIPLINES list below,
 * because the team filter matches on them.
 * ===========================================================================
 */

const IMG = "/media/placeholder.svg"; // placeholder image used everywhere for now
const REEL = "/media/placeholder-reel.mp4"; // placeholder video used everywhere for now
const LOREM_SHORT =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.";
const LOREM =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.";

/* ---------------------------------------------------------------------------
   Studio basics
--------------------------------------------------------------------------- */
export const site = {
  name: "Plush Cut Audio",
  /** Shown under the logo on the home page. Keep it to a few words. */
  descriptor: "Bespoke audio for games",
  /** Used by search engines and link previews. */
  description:
    "Plush Cut Audio is a game audio studio. Music, sound design, dialogue and technical audio, made by hand.",
  url: "https://plushcutaudio.com",
  email: "hello@plushcutaudio.com", // PLACEHOLDER
  location: "Los Angeles, California", // PLACEHOLDER
  socials: [
    // PLACEHOLDERS. Delete any you don't use; add more in the same shape.
    { label: "LinkedIn", url: "https://www.linkedin.com/" },
    { label: "Instagram", url: "https://www.instagram.com/" },
    { label: "YouTube", url: "https://www.youtube.com/" },
  ],
  /** The studio showreel on the home page. Set poster to the still shown before play. */
  showreel: { src: REEL, poster: IMG },
};

/**
 * How team and project reels open when clicked:
 *   "modal"    plays in a pop-up player on top of the page
 *   "new-tab"  opens the video (or YouTube/Vimeo page) in a new browser tab
 */
export const reelMode = "modal";

/* ---------------------------------------------------------------------------
   Navigation. Order here is the order in the menu.
--------------------------------------------------------------------------- */
export const nav = [
  { label: "Services", href: "/services/" },
  { label: "Portfolio", href: "/portfolio/" },
  { label: "Team", href: "/team/" },
  { label: "About", href: "/about/" },
  { label: "Contact", href: "/contact/" },
];

/* ---------------------------------------------------------------------------
   Themes listed in the preview picker (see src/styles/theme.css).
   The first one is the default.
--------------------------------------------------------------------------- */
export const themes = [
  { id: "ink", label: "Ink" },
  { id: "gallery", label: "Gallery" },
  { id: "tide", label: "Tide" },
  { id: "brass", label: "Brass" },
];

/* ---------------------------------------------------------------------------
   Disciplines (used for team tags and the team filter)
--------------------------------------------------------------------------- */
export const DISCIPLINES = ["Music", "Sound Design", "Dialogue", "Technical"];

/* ---------------------------------------------------------------------------
   Services page
--------------------------------------------------------------------------- */
export const servicesIntro = LOREM_SHORT;

export const services = [
  {
    name: "Music",
    text: LOREM,
    includes: ["Original score", "Adaptive and interactive music", "Themes and sonic identity"],
    image: IMG,
  },
  {
    name: "Sound Design",
    text: LOREM,
    includes: ["Gameplay and UI sound", "Ambience and worlds", "Creatures, foley and cinematics"],
    image: IMG,
  },
  {
    name: "Dialogue",
    text: LOREM,
    includes: ["Casting and direction", "Recording and editing", "Processing and localization"],
    image: IMG,
  },
  {
    name: "Technical Audio",
    text: LOREM,
    includes: ["Wwise and FMOD", "Unity and Unreal Engine", "Systems, tools and mixing"],
    image: IMG,
  },
];

/* ---------------------------------------------------------------------------
   Portfolio page
   - studioWork:   projects Plush Cut Audio delivered as a studio.
   - teamCredits:  projects individual members worked on elsewhere.
   Fields:
     title, studio, year  shown on the card
     disciplines          what we did on it (any text)
     members              (team credits only) who on the team worked on it
     image                cover image
     reel                 optional. If set, clicking the card plays it.
     url                  optional. If set (and no reel), the card links out.
--------------------------------------------------------------------------- */
export const studioWork = [
  { title: "TEMP PROJECT", studio: "TEMP STUDIO", year: "2026", disciplines: ["Music", "Sound Design"], image: IMG, reel: REEL },
  { title: "TEMP PROJECT", studio: "TEMP STUDIO", year: "2026", disciplines: ["Sound Design", "Technical"], image: IMG, reel: REEL },
  { title: "TEMP PROJECT", studio: "TEMP STUDIO", year: "2025", disciplines: ["Music"], image: IMG, reel: REEL },
];

export const teamCredits = [
  { title: "TEMP PROJECT", studio: "TEMP STUDIO", year: "2025", disciplines: ["Music"], members: ["TEMP NAME"], image: IMG },
  { title: "TEMP PROJECT", studio: "TEMP STUDIO", year: "2025", disciplines: ["Sound Design"], members: ["TEMP NAME", "TEMP NAME"], image: IMG },
  { title: "TEMP PROJECT", studio: "TEMP STUDIO", year: "2024", disciplines: ["Dialogue"], members: ["TEMP NAME"], image: IMG },
  { title: "TEMP PROJECT", studio: "TEMP STUDIO", year: "2024", disciplines: ["Technical"], members: ["TEMP NAME"], image: IMG },
  { title: "TEMP PROJECT", studio: "TEMP STUDIO", year: "2023", disciplines: ["Music", "Sound Design"], members: ["TEMP NAME"], image: IMG },
  { title: "TEMP PROJECT", studio: "TEMP STUDIO", year: "2023", disciplines: ["Sound Design"], members: ["TEMP NAME"], image: IMG },
];

/* ---------------------------------------------------------------------------
   Team page. Ten members. Order here is the order on the page.
   reel can be a file in /public/media or a YouTube/Vimeo link.
--------------------------------------------------------------------------- */
export const team = [
  { name: "TEMP NAME", disciplines: ["Music"], headshot: IMG, reel: REEL },
  { name: "TEMP NAME", disciplines: ["Sound Design", "Technical"], headshot: IMG, reel: REEL },
  { name: "TEMP NAME", disciplines: ["Music", "Sound Design"], headshot: IMG, reel: REEL },
  { name: "TEMP NAME", disciplines: ["Dialogue"], headshot: IMG, reel: REEL },
  { name: "TEMP NAME", disciplines: ["Technical"], headshot: IMG, reel: REEL },
  { name: "TEMP NAME", disciplines: ["Sound Design"], headshot: IMG, reel: REEL },
  { name: "TEMP NAME", disciplines: ["Music"], headshot: IMG, reel: REEL },
  { name: "TEMP NAME", disciplines: ["Dialogue", "Sound Design"], headshot: IMG, reel: REEL },
  { name: "TEMP NAME", disciplines: ["Sound Design"], headshot: IMG, reel: REEL },
  { name: "TEMP NAME", disciplines: ["Technical", "Music"], headshot: IMG, reel: REEL },
];

/* ---------------------------------------------------------------------------
   About page
--------------------------------------------------------------------------- */
export const about = {
  vision: "To escape the clutter of the world through sound.",
  paragraphs: [LOREM, LOREM],
};

/* ---------------------------------------------------------------------------
   Contact page
--------------------------------------------------------------------------- */
export const contact = {
  heading: "Tell us about your game.",
  note: LOREM_SHORT,
};
