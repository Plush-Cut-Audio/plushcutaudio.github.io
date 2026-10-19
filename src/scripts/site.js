/**
 * Plush Cut Audio · site behavior
 * Small, dependency-free. Each block below handles one feature.
 */

/* ---------------------------------------------------------------------------
   Header: gains a background once you scroll, tucks away while scrolling
   down, comes back when scrolling up.
--------------------------------------------------------------------------- */
const header = document.querySelector("[data-header]");
if (header) {
  let lastY = window.scrollY;
  const onScroll = () => {
    const y = window.scrollY;
    header.classList.toggle("is-scrolled", y > 40);
    const menuOpen = document.querySelector("[data-menu].is-open");
    header.classList.toggle("is-hidden", !menuOpen && y > 400 && y > lastY);
    lastY = y;
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

/* ---------------------------------------------------------------------------
   Phone menu
--------------------------------------------------------------------------- */
const menuToggle = document.querySelector("[data-menu-toggle]");
const menu = document.querySelector("[data-menu]");
if (menuToggle && menu) {
  const setMenu = (open) => {
    menu.classList.toggle("is-open", open);
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.textContent = open ? "Close" : "Menu";
    document.body.style.overflow = open ? "hidden" : "";
  };
  menuToggle.addEventListener("click", () => setMenu(!menu.classList.contains("is-open")));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menu.classList.contains("is-open")) setMenu(false);
  });
}

/* ---------------------------------------------------------------------------
   Theme preview picker (see theme.css for how themes work)
--------------------------------------------------------------------------- */
const themeButtons = document.querySelectorAll("[data-theme-choice]");
const currentTheme = () => document.documentElement.dataset.theme || themeButtons[0]?.dataset.themeChoice;
const markTheme = () =>
  themeButtons.forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.themeChoice === currentTheme())));
themeButtons.forEach((button, i) => {
  button.addEventListener("click", () => {
    const id = button.dataset.themeChoice;
    if (i === 0) delete document.documentElement.dataset.theme;
    else document.documentElement.dataset.theme = id;
    try {
      if (i === 0) localStorage.removeItem("pca-theme");
      else localStorage.setItem("pca-theme", id);
    } catch (e) {}
    markTheme();
  });
});
markTheme();

/* ---------------------------------------------------------------------------
   Reels. Any link with data-reel-src plays that video when clicked:
   - data-reel-inline  plays in place (the home page showreel)
   - otherwise         plays in the pop-up player
   If <body data-reel-mode="new-tab"> (set in site.ts), reels open in a
   new browser tab instead. Plays video files, YouTube, Vimeo, Google Drive
   and ReelCrafter on the page; any other link opens in a new tab.
--------------------------------------------------------------------------- */

/** The embeddable player URL for a hosted reel, or null if it isn't one. */
function embedUrl(src) {
  const yt = src.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{6,})/);
  if (yt) return `https://www.youtube-nocookie.com/embed/${yt[1]}?autoplay=1&rel=0`;
  // Unlisted Vimeo links carry a privacy hash after the id: vimeo.com/123/abc
  const vimeo = src.match(/vimeo\.com\/(?:video\/)?(\d+)(?:\/([\da-f]+))?/);
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}?autoplay=1${vimeo[2] ? `&h=${vimeo[2]}` : ""}`;
  // Drive files must be shared as "Anyone with the link"
  const drive = src.match(/drive\.google\.com\/file\/d\/([\w-]+)/);
  if (drive) return `https://drive.google.com/file/d/${drive[1]}/preview`;
  if (/^https:\/\/play\.reelcrafter\.com\//.test(src)) return src;
  return null;
}

const isVideoFile = (src) => src.startsWith("/") || /\.(mp4|webm|mov|m4v)(\?|#|$)/i.test(src);

/** True if the reel can play on the page rather than in a new tab. */
const playsHere = (src) => Boolean(embedUrl(src)) || isVideoFile(src);

function playerFor(src, title) {
  const embed = embedUrl(src);
  if (embed) {
    const iframe = document.createElement("iframe");
    iframe.src = embed;
    iframe.allow = "autoplay; fullscreen; picture-in-picture";
    iframe.allowFullscreen = true;
    iframe.title = title || "Reel";
    return iframe;
  }
  const video = document.createElement("video");
  video.src = src;
  video.controls = true;
  video.autoplay = true;
  video.playsInline = true;
  video.setAttribute("aria-label", title || "Reel");
  return video;
}

const dialog = document.querySelector("[data-reel-dialog]");
const stage = document.querySelector("[data-reel-stage]");

function openReel(src, title) {
  if (!dialog || !stage) return window.open(src, "_blank", "noopener");
  stage.replaceChildren(playerFor(src, title));
  dialog.setAttribute("aria-label", title || "Reel");
  dialog.showModal();
}

if (dialog) {
  // Closing removes the player so the sound stops
  dialog.addEventListener("close", () => stage.replaceChildren());
  dialog.querySelector("[data-reel-close]")?.addEventListener("click", () => dialog.close());
  // Click outside the video closes it
  dialog.addEventListener("click", (e) => {
    if (e.target === dialog) dialog.close();
  });
}

document.addEventListener("click", (e) => {
  const link = e.target.closest("[data-reel-src]");
  if (!link) return;
  const src = link.dataset.reelSrc;
  if (!src) return;
  e.preventDefault();
  const title = link.dataset.reelTitle;
  if (document.body.dataset.reelMode === "new-tab" || !playsHere(src)) {
    window.open(src, "_blank", "noopener");
  } else if (link.hasAttribute("data-reel-inline")) {
    const frame = link.querySelector(".frame") || link;
    const player = playerFor(src, title);
    player.classList.add("showreel__player");
    frame.replaceChildren(player);
    link.replaceWith(frame);
    if (player.focus) player.focus();
  } else {
    openReel(src, title);
  }
});

/* ---------------------------------------------------------------------------
   Pop-ups (team profiles). A button with data-dialog-open="id" opens the
   <dialog id="id">; data-dialog-close or a click outside the panel closes
   it. A reel opened from inside plays on top, and closing it returns here.
--------------------------------------------------------------------------- */
document.addEventListener("click", (e) => {
  const opener = e.target.closest("[data-dialog-open]");
  if (opener) {
    document.getElementById(opener.dataset.dialogOpen)?.showModal();
    return;
  }
  if (e.target.closest("[data-dialog-close]")) {
    e.target.closest("dialog")?.close();
    return;
  }
  // Clicks on the backdrop land on the dialog itself, outside its box
  const d = e.target;
  if (d.matches?.("dialog[data-dialog][open]")) {
    const r = d.getBoundingClientRect();
    const inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
    if (!inside) d.close();
  }
});

/* ---------------------------------------------------------------------------
   Team filter
--------------------------------------------------------------------------- */
const filterButtons = document.querySelectorAll("[data-filter]");
const teamGrid = document.querySelector("[data-team-grid]");
if (filterButtons.length && teamGrid) {
  const members = teamGrid.querySelectorAll("[data-disciplines]");
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const choice = button.dataset.filter;
      filterButtons.forEach((b) => b.setAttribute("aria-pressed", String(b === button)));
      members.forEach((m) => {
        const list = m.dataset.disciplines.split("|");
        m.hidden = choice !== "all" && !list.includes(choice);
      });
    });
  });
}
