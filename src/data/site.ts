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

/* ---------------------------------------------------------------------------
   Studio basics
--------------------------------------------------------------------------- */
export const site = {
  name: "Plush Cut Audio",
  /** Shown under the logo on the home page. Keep it to a few words. */
  descriptor: "Exquisite Sound for Interactive Media",
  /** Used by search engines and link previews. */
  description:
    "Artful audio for interactive media.",
  url: "https://plushcutaudio.com",
  email: "info@plushcutaudio.com", 
  /** Shown on the contact page. Leave empty ("") to hide it. */
  location: "",
  /** true shows the social links below in the footer and on the contact page. */
  showSocials: false,
  socials: [
    // PLACEHOLDERS. Delete any you don't use; add more in the same shape.
    { label: "LinkedIn", url: "https://www.linkedin.com/" },
    { label: "Instagram", url: "https://www.instagram.com/" },
    { label: "YouTube", url: "https://www.youtube.com/" },
  ],
  /** The studio showreel, opened by "Play showreel" on the home page.
   *  A video file in /public/media or a YouTube/Vimeo link. */
  showreel: { src: REEL },
};

/** The social links to show: none while site.showSocials is false. */
export const socials = site.showSocials ? site.socials : [];

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
  { label: "Projects", href: "/projects/" },
  { label: "Team", href: "/team/" },
  { label: "About", href: "/about/" },
  { label: "Connect", href: "/connect/" },
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
export const servicesIntro = "Plush Cut Audio manages the full audio pipeline from ideation to shipping and beyond.";

export const services = [
  {
    name: "Music",
    includes: ["Composition and MIDI Mockups", "Session Prep and Recording", "Editing and Mixing"],
    image: "/media/services/music.jpg", // TEMP: Pexels stock photo
  },
  {
    name: "Sound Design",
    includes: ["Sound Editing and Synthesis", "Foley and Audio Sourcing", "Spatial Audio Systems"],
    image: "/media/services/sound-design.jpg", // TEMP: Pexels stock photo
  },
  {
    name: "Dialogue",
    includes: ["Casting and Direction", "Recording and Editing", "Processing and Localization"],
    image: "/media/services/dialogue.jpg", // TEMP: Pexels stock photo
  },
  {
    name: "Technical Audio",
    includes: ["Wwise and FMOD", "Unity and Unreal Engine", "Adaptive Audio Systems"],
    image: "/media/services/technical-audio.jpg", // TEMP: Pexels stock photo
  },
];

/* ---------------------------------------------------------------------------
   Projects page
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
  { title: "ALL GOOD THINGS", studio: "Scheherazade Games", year: "2026", image: "/media/projects/all-good-things.jpg", reel: "https://youtu.be/vgXo7YlZy9g" },
  { title: "Coming Soon...", year: "2026", image: IMG},
];

export const teamCredits = [
  { title: "The Unrealtor", studio: "Homestyle Interactive", year: "2026", members: ["Danny Castro", "Ariel Sol"], image: "/media/projects/the-unrealtor.jpg" },
  { title: "Coming Soon...", image: IMG },
  /* 
  { title: "TEMP PROJECT", studio: "TEMP STUDIO", year: "2025", members: ["TEMP NAME", "TEMP NAME"], image: IMG },
  */
];

/* ---------------------------------------------------------------------------
   Team page. Ten members. Order here is the order on the page.
   Clicking a headshot opens that person's profile pop-up.
     reel     optional. A file in /public/media or a YouTube, Vimeo,
              Google Drive or ReelCrafter link plays in the pop-up;
              other links open in a new tab. Leave it out for no reel.
     bio      optional. Leave a blank line ("\n\n") between paragraphs.
     website  optional. The full address, e.g. "https://example.com".
--------------------------------------------------------------------------- */
export const team = [
  {
    name: "Danny Castro",
    disciplines: ["Dialogue", "Music", "Sound Design", "Technical"],
    headshot: "/media/headshots/danny.jpg",
    reel: "https://youtu.be/DMHi6lh6P6s?is=A6NN9wTl_wg4I2E7",
    bio: "Danny Castro is a sound designer and audio programmer based in Boston, Massachusetts. Originally from Heredia, Costa Rica, she is currently completing her senior year at Berklee College of Music, where she is majoring in Electronic Production and Design as well as Game and Interactive Media Scoring. Additionally, she is pursuing a specialisation programme in Sound Design for Video Games and a minor in Creative Coding, where she focuses on audio programming, sound implementation, and spatial audio technologies. Moreover, as the current president of the Berklee Sound Design Network, a lot of her attention has been recently focused on community building and education within the small bubble of the game audio community. \n\nAt the core of her work are narrative and storytelling. She likes to be involved with audio beyond what someone can hear, and instead focuses on the way her sounds can shape reality. Her approach as a sound designer and audio programmer revolves around creating living, breathing worlds that resonate deeply with audiences, seamlessly incorporating technology as a direct complement to the effectiveness of her work. \n\nAs an audio programmer, she is constantly developing tools that facilitate the achievement of complicated sound immersion techniques such as spatial audio automation and procedural audio. Working closely with middleware APIs, Danny creates plugins to be used in parallel with game engines and throughout audio development pipelines. \n\nThrough game jams, educational collaboration projects, internships, and independent contracts, Danny has had the privilege of contributing to over 15 released indie games on various platforms, and is excited for whatever future projects come floating her way. In her free time you will find her bird watching in National Parks or circuit bending children’s toys from the 80s.",
    website: "https://www.dannycastroaudio.com/",
  },
  {
    name: "Malachi Gregory",
    disciplines: ["Music", "Sound Design", "Technical"],
    headshot: "/media/headshots/malachi.jpg",
    reel: "https://play.reelcrafter.com/malachigregory/plushcutaudio",
    bio: "Malachi Gregory is a composer fascinated by the interaction between sound and visual media. His music calls upon bold melodies, dynamic textures, and sincere storytelling through score. \n\nHe began his journey after picking up the viola at eight, then composing his first string orchestra piece at thirteen. Malachi majored in Music at NYU Steinhardt, collaborating with game developers and local filmmakers in compositional and sound design roles, before heading to USC to complete his Master's in Screen Scoring. Along the way, he's been selected as the inaugural 2023 Game Audio Diversity Alliance (G.A.D.A.) GameSoundCon Scholar, a 2025 G.A.D.A. GDC Scholar under the mentorship of Wilbert Roget II (Star Wars Outlaws, Helldivers 2), and a 2026 Game Audio Network Guild (G.A.N.G.) Scholar under Adam Gubman. \n\nMalachi loves the collaborative storytelling of scoring for animation, film, and especially games, where he gets to lean into middleware's potential for dynamic, responsive soundscapes. That passion has carried him through more than 30 productions so far, including lead composer duties on Aftertaste and work on 2023 Rockstar Games Playcrafting sponsorship winner Signal Creek. Classical training and modern creativity come together throughout his work, built to align with and embolden the project it's serving.",
    website: "https://malachigregory.com",
  },
  {
    name: "Jack Gruber",
    disciplines: ["Sound Design", "Technical"],
    headshot: "/media/headshots/jack.jpg",
    reel: "https://vimeo.com/1197006638",
    bio: "Based in Atlanta, Georgia, Jack Gruber specializes in interactive audio design and programming for film, games, and sound art. He has contributed to a wide variety of independent games and films in roles covering dialogue recording/editing, music composition/editing, sound design, audio direction, and audio programming. \n\nCurrently, as part of Georgia Tech's Computational Music for All Lab, he is developing pedagogical tools for new music designers in interactive media through compilable visual programming languages. Outside of his research he is continuing to develop a handful of unannounced projects, and most notably continuing to develop his mixed-media, interactive art installation “One Room: The Architect”, designed to procedurally generate music to user's hand gestures. ",
    website: "https://jgruberdesigns.com/",
  },
  {
    name: "Will Heilbraun",
    disciplines: ["Music", "Sound Design", "Technical"],
    headshot: "/media/headshots/will.jpg",
    reel: "https://youtu.be/LYjAvDZUDyk?si=gJRQVEgApZ8hO7bX",
    bio: "Will Heilbraun is an audio engineer, sound designer, and musician. Will works with a variety of artistic mediums, including classical and modern music, game scoring and development, and film. \n\nWith Will's early interest in all things involving audio, he quickly took on a variety of roles in his local community. He became a trusted figure in the community, bringing his sonic identity and knowledge to support rising artists and fellow audio professionals. \n\nAfter graduating from Indiana University's Jacobs School of Music, Will has a B.S. in Audio Engineering and Sound Production. Soon after graduating, Will moved to Los Angeles and began work as a dialogue recording engineer at One Line Studios as well as a Monitor engineer at Hollywood scoring. In addition, Will freelances and works on multiple game projects and clients. \n\nAudio has been a motivating focal point through all aspects of Will's life. Will strives for excellence on every project, with an experienced background and commitment to deliver professional audio results with great efficiency.",
    website: "https://williamheilbraun.weebly.com/",
  },
  {
    name: "Annika Huprikar",
    disciplines: ["Music"],
    headshot: "/media/headshots/annika.jpg",
    reel: "https://s.disco.ac/ouhawfnrmxcn",
    bio: "Annika describes herself first and foremost as a creative – as a media composer, orchestrator, pianist, and artistic collaborator, she finds imagination, curiosity and problem-solving to be at the heart of her creative endeavors. \n\nA graduate of the distinguished USC Screen Scoring Master's program, Annika has scored several short films and conducted her recording sessions at studios including Warner Brothers, Hollywood Scoring, and Bandrika Studios. She describes her musical identity as a textural composer, where she gets to build unique soundscapes, design harmonic progressions, meld acoustic orchestral instruments with electronics and synths, and immerse the audience with motors and motifs that are the signature of a story’s narrative world. She especially loves scoring for narratives involving thriller, suspense, sci-fi, and drama genres. \n\nAnnika has scored several short films spanning different genres, and will be scoring her first feature film later this year. She has scored projects for World View Productions and The Coca-Cola Company, recorded with Joy Music House, and written for numerous ensembles in artist residencies, including for Grammy-Award-winning groups The Crossing and The Parker Quartet. She is currently assisting a film composer and is also freelance orchestrating for other composers, working on recent projects including two short films, a video game, four orchestral works, a jazz combo, a marching band anthem, and a new-music percussion piece. \n\nAnnika is a graduate of the Harvard/Berklee College of Music dual program, where she received her B.A. in Computer Science from Harvard while pursuing Screen Scoring at Berklee.",
    website: "https://annikahuprikarmusic.com/",
  },
  {
    name: "johh",
    disciplines: ["Music", "Sound Design"],
    headshot: "/media/headshots/johh.jpg",
    reel: "https://www.johhmusic.com/work-1",
    bio: "Starting off as a pianist and orchestral percussionist, johh has immersed herself in a wide range of musical styles and forms from a young age. Her many years in various chamber groups, wind ensembles, and marching bands cultivated her musical instincts and intellect. After her secondary schooling, Joh further developed her musical education and knowledge at the University of Southern California’s Thornton School of Music, studying Music Industry, Music Production, and Music Composition. \n\nShe has composed and created sound design for multiple projects recognized at various international festivals like BAFTA (Free Will), Tokyo Indie Games Summit, Tokyo Game Show (Closure- USC Audience Choice Standout Sound Design), BostonFIG (nudge- USC Powerful Message), and Central Coast Film Festival AU (REPLACED).",
    website: "https://www.johhmusic.com/",
  },
  {
    name: "Kiara Lin",
    disciplines: ["Dialogue"],
    headshot: "/media/headshots/kiara.jpg",
    bio: "Kiara Lin is a Los Angeles casting/performance director, & producer, specializing in Animation. \n\nWith a voracious appetite for knowledge, her goal is to help uplift creatives in telling their stories, and is currently producing Famtheon, the animated adaptation of the hit Webcomic, and a production coordinator on Helluva Boss. \n\nWhen not working in animation, you can find her brewing up magic with The Gilded Teafling.",
    website: "https://www.linkedin.com/in/kiaraquelin/",
  },
  {
    name: "Antonio Medellín Fajardo",
    disciplines: ["Music"],
    headshot: "/media/headshots/antonio.jpg",
    reel: "https://play.reelcrafter.com/qO_ljEU0SGmeNf0wFAOCCQ",
    bio: "Antonio Medellín-Fajardo is a Colombian composer for film, TV, and video games based in Los Angeles. A graduate of USC's Screen Scoring program, currently assisting composer Anze Rozman at Bleeding Fingers on the new Harry Potter series — part of a team led by Hans Zimmer. His credits include arranging for Pablo Alborán's first symphonic concert, orchestrating for the Netflix series Queen of Chess, and contributing to the official FIFA 2026 World Cup song alongside producer Julio Reyes Copello.",
    website: "https://www.antoniomedellin.com",
  },
  {
    name: "Samhi Mitra",
    disciplines: ["Sound Design", "Technical"],
    headshot: "/media/headshots/samhi.jpg",
    reel: "https://youtu.be/rNyjH71jtyI?si=U1h6siZ_mLcZ2GZR",
    bio: "Samhi is an audio programmer with an extensive background working with and without middleware across game engines! He's shipped games across several platforms including mobile with an emphasis on creating procedural systems in collaboration with sound designers and composers. \n\nBut at the end of the day he's just a small town boy living his best life.",
    website: "https://samhimitra.com/sound",
  },
  {
    name: "Ariel Sol",
    disciplines: ["Dialogue", "Music", "Sound Design", "Technical"],
    headshot: "/media/headshots/ari.jpg",
    reel: "https://youtu.be/qpsfnIaE9jM",
    bio: "Ariel Sol pioneers the future of sound as an LA-based composer, harpist, and interactive media designer. Hailing from Chicago, he is passionate about bridging disciplines to foster community. From cinematic pop to virtual reality soundscapes- storytelling, identity, empowerment, and technology form his intersectional approach to the music of today. \n\nAri was the 3rd prize winner of the 2024 World Harp Competition, the 2023 recipient of the Society for Electroacoustic Music in the United States’ Allen Strange Award, and a 2022 Young Artist in Residence of American Public Media. An active source of new harp music, Ari won the 2021 USA International Harp Composition Competition and has been recognized twice as a Featured Young Composer of the American Harp Society. His work has been frequently awarded by music powerhouses including the National Association of Music Merchants, Game Audio Network Guild, and Tribeca New Music.",
    website: "https://www.arielsol.com/",
  },
];

/* ---------------------------------------------------------------------------
   About page
--------------------------------------------------------------------------- */
export const about = {
  /** The fixed start of the vision line. */
  vision: "escape the clutter",
  /** Typed after it one at a time, in this order, then repeating. */
  visionEndings: ["through sound", "with music", "through art", "with code"],
  /** Optional team photo at the top of the "Read more" pop-up, e.g.
   *  "/media/team-photo.jpg". Leave empty ("") for text only. */
  photo: "",
  paragraphs: "Plush Cut Audio represents the next generation of bespoke sound. Founded by Ariel Sol in 2026, the collective formed from a group of Game Audio Network Guild awardees and Game Audio Diversity Alliance scholars on a mission to collaborate. From music to programming, artistry is our center."
};

/* ---------------------------------------------------------------------------
   Connect page
--------------------------------------------------------------------------- */
export const contact = {
  /** The line under the email address. */
  note: "Contact us to collaborate. Plush Cut Audio is a remote team with physical hubs in Los Angeles and New York.",
};
