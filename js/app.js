/**
 * PhotoRest - Clean & Eye-Friendly Gallery Application
 * Phase 1 Enhanced Edition: Color Badges, Like System, Related Pins & Keyboard Navigation
 */

// --- Full Local Dataset of SMK Images ---
// DEFAULT_PINS moved to data.js

// --- Application State ---
const state = {
  activeCategory: "all",
  searchQuery: "",
  sortBy: "popular",
  density: "comfortable",
  savedPinIds: new Set(JSON.parse(localStorage.getItem("photorest_saved_pins") || "[]")),
  likedPinIds: new Set(JSON.parse(localStorage.getItem("photorest_liked_pins") || "[]")),
  customPins: JSON.parse(localStorage.getItem("photorest_custom_pins") || "[]"),
  currentLightboxPinIndex: -1,
  currentFilteredPins: []
};

// Combine default and user uploaded pins
function getAllPins() {
  return [...state.customPins, ...DEFAULT_PINS];
}

// Category Badge Helper
function getCategoryBadgeClass(category) {
  switch (category) {
    case "food": return "badge-cat-food";
    case "beach": return "badge-cat-beach";
    case "animal": return "badge-cat-animal";
    case "shoes": return "badge-cat-shoes";
    case "car": return "badge-cat-car";
    default: return "badge-cat-explore";
  }
}

function getCategoryIcon(category) {
  switch (category) {
    case "food": return "bx bx-bowl-rice";
    case "beach": return "bx bx-water";
    case "animal": return "bx bx-cat";
    case "shoes": return "bx bx-closet";
    case "car": return "bx bx-car";
    default: return "bx bx-palette";
  }
}

// --- DOM Elements ---
const galleryContainer = document.getElementById("galleryContainer");
const categoryFilterBar = document.getElementById("categoryFilterBar");
const searchInput = document.getElementById("search_bar");
const searchClearBtn = document.getElementById("searchClearBtn");
const feedTitleText = document.getElementById("feedTitleText");
const feedCountText = document.getElementById("feedCountText");
const sortSelect = document.getElementById("sortSelect");
const densityComfortableBtn = document.getElementById("densityComfortableBtn");
const densityCompactBtn = document.getElementById("densityCompactBtn");
const lightboxModal = document.getElementById("lightboxModal");
const shareModal = document.getElementById("shareModal");
const addPinModal = document.getElementById("addPinModal");
const backToTopBtn = document.getElementById("backToTopBtn");

// --- Initialization ---
document.addEventListener("DOMContentLoaded", () => {
  parseUrlParams();
  setupEventListeners();
  renderCategoryPills();
  renderGallery();

  // Handle Deep Linking auto-open on load
  const params = new URLSearchParams(window.location.search);
  const pinId = params.get("pin");
  if (pinId) {
    setTimeout(() => {
      const targetIndex = state.currentFilteredPins.findIndex(p => p.id === pinId);
      if (targetIndex >= 0) {
        openLightboxByIndex(targetIndex);
      } else {
        const targetPin = getAllPins().find(p => p.id === pinId);
        if (targetPin) {
          state.currentFilteredPins.unshift(targetPin);
          openLightboxByIndex(0);
        }
      }
    }, 150);
  }
});

// --- URL Parameter Handling ---
function parseUrlParams() {
  const params = new URLSearchParams(window.location.search);
  const cat = params.get("cat");
  const q = params.get("q");
  if (cat) state.activeCategory = cat.toLowerCase();
  if (q) {
    state.searchQuery = q;
    if (searchInput) searchInput.value = q;
  }
}

// --- Category Bar Rendering ---
function renderCategoryPills() {
  if (!categoryFilterBar) return;

  const categories = [
    { id: "all", label: "All Inspiration", icon: "bx bx-grid-alt" },
    { id: "saved", label: "Saved Collection", icon: "bx bx-bookmark" },
    { id: "food", label: "Food & Culinary", icon: "bx bx-bowl-rice" },
    { id: "beach", label: "Beach & Coasts", icon: "bx bx-water" },
    { id: "animal", label: "Wild & Pets", icon: "bx bx-cat" },
    { id: "shoes", label: "Shoes & Streetwear", icon: "bx bx-closet" },
    { id: "car", label: "Cars & Speed", icon: "bx bx-car" },
    { id: "explore", label: "Art & Concepts", icon: "bx bx-palette" }
  ];

  const allPins = getAllPins();

  categoryFilterBar.innerHTML = categories.map(cat => {
    let count = 0;
    if (cat.id === "all") count = allPins.length;
    else if (cat.id === "saved") count = state.savedPinIds.size;
    else count = allPins.filter(p => p.category === cat.id).length;

    const isActive = state.activeCategory === cat.id;

    return `
      <button class="category-pill ${isActive ? "active" : ""}" data-category="${cat.id}">
        <i class="${cat.icon}"></i>
        <span>${cat.label}</span>
        <span class="count-badge">${count}</span>
      </button>
    `;
  }).join("");

  // Attach click events
  categoryFilterBar.querySelectorAll(".category-pill").forEach(btn => {
    btn.addEventListener("click", () => {
      const catId = btn.dataset.category;
      setCategory(catId);
    });
  });
}

function setCategory(catId) {
  state.activeCategory = catId;
  renderCategoryPills();
  renderGallery();
}

// --- Gallery Rendering ---
function renderGallery() {
  if (!galleryContainer) return;

  const allPins = getAllPins();
  let filtered = allPins;

  // 1. Filter by category
  if (state.activeCategory === "saved") {
    filtered = filtered.filter(pin => state.savedPinIds.has(pin.id));
  } else if (state.activeCategory !== "all") {
    filtered = filtered.filter(pin => pin.category === state.activeCategory);
  }

  // 2. Filter by search query
  if (state.searchQuery.trim()) {
    const q = state.searchQuery.toLowerCase().trim();
    filtered = filtered.filter(pin => 
      pin.title.toLowerCase().includes(q) ||
      pin.category.toLowerCase().includes(q) ||
      (pin.description && pin.description.toLowerCase().includes(q)) ||
      (pin.author && pin.author.toLowerCase().includes(q))
    );

    // Online Search Fallback: If search has 0-1 matches, inject 4 high-quality online inspiration pins
    if (filtered.length < 2 && state.activeCategory === "all") {
      const cleanKeyword = encodeURIComponent(q.replace(/[^a-zA-Z0-9 ]/g, ""));
      const onlinePins = [
        {
          id: `online-1-${cleanKeyword}`,
          title: `${q.charAt(0).toUpperCase() + q.slice(1)} Visual Aesthetic`,
          category: "explore",
          image: `https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=600&auto=format&fit=crop&q=80`,
          author: "Unsplash Live Creator",
          authorAvatar: "images/perfil.png",
          likes: 124,
          description: `Curated live online photo inspiration matching "${q}".`
        },
        {
          id: `online-2-${cleanKeyword}`,
          title: `Modern ${q.charAt(0).toUpperCase() + q.slice(1)} Concept`,
          category: "explore",
          image: `https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80`,
          author: "Global Studio",
          authorAvatar: "images/perfil.png",
          likes: 95,
          description: `Aesthetic composition and contemporary visual design for "${q}".`
        },
        {
          id: `online-3-${cleanKeyword}`,
          title: `Atmospheric ${q.charAt(0).toUpperCase() + q.slice(1)} Mood`,
          category: "explore",
          image: `https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80`,
          author: "Lens & Light",
          authorAvatar: "images/perfil.png",
          likes: 88,
          description: `Atmospheric photography exploring themes of "${q}".`
        }
      ];
      filtered = [...filtered, ...onlinePins];
    }
  }

  // 3. Apply Sorting
  if (state.sortBy === "popular") {
    filtered.sort((a, b) => {
      const likesA = (a.likes || 0) + (state.likedPinIds.has(a.id) ? 1 : 0);
      const likesB = (b.likes || 0) + (state.likedPinIds.has(b.id) ? 1 : 0);
      return likesB - likesA;
    });
  } else if (state.sortBy === "az") {
    filtered.sort((a, b) => a.title.localeCompare(b.title));
  } else if (state.sortBy === "newest") {
    filtered.reverse();
  }

  state.currentFilteredPins = filtered;

  // Update Headers
  updateFeedHeader(filtered.length);

  // Empty State
  if (filtered.length === 0) {
    galleryContainer.innerHTML = `
      <div class="empty-gallery-state" style="grid-column: 1 / -1; margin: 40px auto; text-align: center;">
        <div class="empty-icon"><i class='bx bx-search-alt' style="font-size: 3.5rem; color: var(--text-muted);"></i></div>
        <h3 class="empty-title" style="margin: 12px 0 6px; font-weight: 800; font-size: 1.3rem;">No inspiration found</h3>
        <p class="empty-desc" style="color: var(--text-secondary); max-width: 400px; margin: 0 auto;">
          ${state.activeCategory === "saved" 
            ? "You haven't saved any photos yet. Click 'Save' on any photo card to build your collection!" 
            : `We couldn't find any ideas matching "${state.searchQuery || state.activeCategory}". Try exploring other categories.`}
        </p>
      </div>
    `;
    return;
  }

  // Render cards with color badges and like actions
  galleryContainer.innerHTML = filtered.map((pin, idx) => {
    const isSaved = state.savedPinIds.has(pin.id);
    const isLiked = state.likedPinIds.has(pin.id);
    const totalLikes = (pin.likes || 0) + (isLiked ? 1 : 0);
    const badgeClass = getCategoryBadgeClass(pin.category);
    const catIcon = getCategoryIcon(pin.category);

    return `
      <div class="pin-card" data-id="${pin.id}" data-index="${idx}">
        <div class="pin-card-media skeleton-shimmer">
          <img class="pin-card-img" src="${pin.image}" alt="${escapeHtml(pin.title)}" loading="lazy" onload="this.parentElement.classList.remove('skeleton-shimmer')" onerror="this.parentElement.classList.remove('skeleton-shimmer'); this.src='https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80'">
          <div class="pin-card-overlay">
            <div class="overlay-top">
              <button class="btn-like-overlay ${isLiked ? "is-liked" : ""}" data-like-id="${pin.id}" title="Like">
                <i class='bx ${isLiked ? "bxs-heart" : "bx-heart"}'></i>
              </button>
              <button class="btn-save-pin ${isSaved ? "is-saved" : ""}" data-save-id="${pin.id}">
                ${isSaved ? "<i class='bx bx-check'></i> Saved" : "Save"}
              </button>
            </div>
            <div class="overlay-bottom">
              <span class="badge-category ${badgeClass}">
                <i class='${catIcon}'></i> ${pin.category}
              </span>
              <div class="overlay-actions-group">
                <button class="btn-icon-overlay" title="Download" data-download-img="${pin.image}" data-title="${escapeHtml(pin.title)}">
                  <i class='bx bx-download'></i>
                </button>
                <button class="btn-icon-overlay" title="Share" data-share-id="${pin.id}">
                  <i class='bx bx-share-alt'></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="pin-card-content">
          <div class="pin-card-title">${escapeHtml(pin.title)}</div>
          <div class="pin-card-meta">
            <span>${escapeHtml(pin.author || "PhotoRest")}</span>
            <div class="pin-card-likes">
              <i class='bx ${isLiked ? "bxs-heart" : "bx-heart"}'></i>
              <span>${totalLikes}</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join("");

  // Attach card click handlers
  attachCardEvents();
}

function updateFeedHeader(count) {
  if (feedTitleText) {
    if (state.searchQuery) {
      feedTitleText.textContent = `Search results for "${state.searchQuery}"`;
    } else if (state.activeCategory === "all") {
      feedTitleText.textContent = "Discover Inspiration";
    } else if (state.activeCategory === "saved") {
      feedTitleText.textContent = "Your Saved Collection";
    } else {
      feedTitleText.textContent = `${state.activeCategory.charAt(0).toUpperCase() + state.activeCategory.slice(1)} Gallery`;
    }
  }

  if (feedCountText) {
    feedCountText.textContent = `${count} ${count === 1 ? 'idea' : 'ideas'} available`;
  }
}

// --- Card Interactions ---
function attachCardEvents() {
  // 1. Open Lightbox on card click
  galleryContainer.querySelectorAll(".pin-card").forEach(card => {
    card.addEventListener("click", (e) => {
      if (e.target.closest(".btn-save-pin") || e.target.closest(".btn-icon-overlay") || e.target.closest(".btn-like-overlay")) return;
      const idx = parseInt(card.dataset.index);
      openLightboxByIndex(idx);
    });
  });

  // 2. Like button
  galleryContainer.querySelectorAll("[data-like-id]").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const pinId = btn.dataset.likeId;
      toggleLikePin(pinId);
    });
  });

  // 3. Save button
  galleryContainer.querySelectorAll("[data-save-id]").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const pinId = btn.dataset.saveId;
      toggleSavePin(pinId);
    });
  });

  // 4. Download button
  galleryContainer.querySelectorAll("[data-download-img]").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const imgUrl = btn.dataset.downloadImg;
      const title = btn.dataset.title;
      downloadImage(imgUrl, title);
    });
  });

  // 5. Share button
  galleryContainer.querySelectorAll("[data-share-id]").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const pinId = btn.dataset.shareId;
      const pin = getAllPins().find(p => p.id === pinId);
      if (pin) sharePin(pin);
    });
  });
}

// --- Like System ---
function toggleLikePin(pinId) {
  const isCurrentlyLiked = state.likedPinIds.has(pinId);

  if (isCurrentlyLiked) {
    state.likedPinIds.delete(pinId);
  } else {
    state.likedPinIds.add(pinId);
    showToast("Added to your liked photos! ❤️", "bxs-heart");
  }

  // Persist
  localStorage.setItem("photorest_liked_pins", JSON.stringify([...state.likedPinIds]));

  // Re-render gallery card counts
  renderGallery();

  // If Lightbox is currently open, update its like button too
  if (state.currentLightboxPinIndex >= 0) {
    updateLightboxLikeState();
  }
}

// --- Save & Bookmark System ---
function toggleSavePin(pinId) {
  const isCurrentlySaved = state.savedPinIds.has(pinId);

  if (isCurrentlySaved) {
    state.savedPinIds.delete(pinId);
    showToast("Removed from saved collection", "bx-bookmark");
  } else {
    state.savedPinIds.add(pinId);
    showToast("Saved to your collection! 🎉", "bxs-bookmark");
  }

  // Persist
  localStorage.setItem("photorest_saved_pins", JSON.stringify([...state.savedPinIds]));

  // Re-render
  renderCategoryPills();
  renderGallery();

  // If lightbox is open, update save button
  if (state.currentLightboxPinIndex >= 0) {
    updateLightboxSaveState();
  }
}

// --- Lightbox Modal with Index & Navigation ---
function openLightboxByIndex(index) {
  if (index < 0 || index >= state.currentFilteredPins.length) return;
  
  state.currentLightboxPinIndex = index;
  const pin = state.currentFilteredPins[index];
  if (!pin || !lightboxModal) return;

  const imgEl = lightboxModal.querySelector("#lightboxImage");
  const titleEl = lightboxModal.querySelector("#lightboxTitle");
  const descEl = lightboxModal.querySelector("#lightboxDescription");
  const authorNameEl = lightboxModal.querySelector("#lightboxAuthorName");
  const authorRoleEl = lightboxModal.querySelector("#lightboxAuthorRole");
  const authorAvatarEl = lightboxModal.querySelector("#lightboxAuthorAvatar");
  const tagEl = lightboxModal.querySelector("#lightboxCategoryTag");

  if (imgEl) imgEl.src = pin.image;
  if (titleEl) titleEl.textContent = pin.title;
  if (descEl) descEl.textContent = pin.description || "Discover more inspiring creative assets and curated collections on PhotoRest.";
  if (authorNameEl) authorNameEl.textContent = pin.author || "PhotoRest Creator";
  if (authorRoleEl) authorRoleEl.textContent = `Topic: ${pin.category.toUpperCase()}`;
  if (authorAvatarEl) authorAvatarEl.src = pin.authorAvatar || "images/perfil.png";
  
  if (tagEl) {
    tagEl.className = `badge-category ${getCategoryBadgeClass(pin.category)}`;
    tagEl.innerHTML = `<i class='${getCategoryIcon(pin.category)}'></i> ${pin.category}`;
  }

  updateLightboxSaveState();
  updateLightboxLikeState();
  renderLightboxPalette(pin);
  renderLightboxRelatedPins(pin);

  lightboxModal.classList.add("is-open");
  document.body.style.overflow = "hidden";

  // Deep Linking Update
  const newUrl = window.location.pathname + "?pin=" + pin.id;
  window.history.pushState({ path: newUrl }, '', newUrl);
}

// Color Palette Extraction Helper
function getPinColorPalette(pin) {
  switch (pin.category) {
    case "food":
      return ["#F97316", "#EA580C", "#FBBF24", "#78350F", "#FFFBEB"];
    case "beach":
      return ["#0284C7", "#0EA5E9", "#38BDF8", "#FDE047", "#F0F9FF"];
    case "animal":
      return ["#059669", "#10B981", "#34D399", "#854D0E", "#ECFDF5"];
    case "shoes":
      return ["#7C3AED", "#6366F1", "#A855F7", "#1E293B", "#F5F3FF"];
    case "car":
      return ["#DC2626", "#EF4444", "#1E293B", "#64748B", "#FEF2F2"];
    default:
      return ["#2563EB", "#3B82F6", "#60A5FA", "#0F172A", "#EFF6FF"];
  }
}

function renderLightboxPalette(pin) {
  const paletteRow = document.getElementById("lightboxPaletteRow");
  if (!paletteRow) return;

  const colors = getPinColorPalette(pin);
  paletteRow.innerHTML = colors.map(hex => `
    <div class="palette-swatch-chip" style="background-color: ${hex};" data-hex="${hex}" title="Click to copy ${hex}">
      <span>${hex}</span>
    </div>
  `).join("");

  paletteRow.querySelectorAll(".palette-swatch-chip").forEach(chip => {
    chip.addEventListener("click", () => {
      const hex = chip.dataset.hex;
      navigator.clipboard.writeText(hex);
      showToast(`Copied ${hex} to clipboard! 🎨`, "bx-copy");
    });
  });
}

function closeLightbox() {
  if (!lightboxModal) return;
  lightboxModal.classList.remove("is-open");
  document.body.style.overflow = "";
  state.currentLightboxPinIndex = -1;
  window.history.pushState({ path: window.location.pathname }, '', window.location.pathname);
}

function navigateLightbox(direction) {
  if (state.currentLightboxPinIndex < 0) return;
  let nextIndex = state.currentLightboxPinIndex + direction;
  
  // Wrap around
  if (nextIndex < 0) nextIndex = state.currentFilteredPins.length - 1;
  if (nextIndex >= state.currentFilteredPins.length) nextIndex = 0;

  openLightboxByIndex(nextIndex);
}

function updateLightboxSaveState() {
  if (!lightboxModal || state.currentLightboxPinIndex < 0) return;
  const pin = state.currentFilteredPins[state.currentLightboxPinIndex];
  if (!pin) return;

  const saveBtn = lightboxModal.querySelector("#lightboxSaveBtn");
  if (!saveBtn) return;

  const isSaved = state.savedPinIds.has(pin.id);
  saveBtn.innerHTML = `<i class='bx ${isSaved ? "bxs-bookmark" : "bx-bookmark"}'></i> ${isSaved ? "Saved" : "Save"}`;
  saveBtn.style.background = isSaved ? "var(--accent-emerald)" : "var(--primary)";
}

function updateLightboxLikeState() {
  if (!lightboxModal || state.currentLightboxPinIndex < 0) return;
  const pin = state.currentFilteredPins[state.currentLightboxPinIndex];
  if (!pin) return;

  const likeBtn = lightboxModal.querySelector("#lightboxLikeBtn");
  const likeIcon = lightboxModal.querySelector("#lightboxLikeIcon");
  const likeCount = lightboxModal.querySelector("#lightboxLikeCount");

  const isLiked = state.likedPinIds.has(pin.id);
  const count = (pin.likes || 0) + (isLiked ? 1 : 0);

  if (likeBtn) {
    likeBtn.classList.toggle("is-liked", isLiked);
  }
  if (likeIcon) {
    likeIcon.className = `bx ${isLiked ? "bxs-heart" : "bx-heart"}`;
  }
  if (likeCount) {
    likeCount.textContent = count;
  }
}

// Render "More Like This" (Related Pins in Lightbox)
function renderLightboxRelatedPins(currentPin) {
  const relatedContainer = document.getElementById("lightboxRelatedGrid");
  if (!relatedContainer) return;

  // Find other pins with same category
  const allPins = getAllPins();
  const related = allPins.filter(p => p.category === currentPin.category && p.id !== currentPin.id).slice(0, 3);

  if (related.length === 0) {
    relatedContainer.innerHTML = `<p style="font-size: 0.8rem; color: var(--text-muted); grid-column: 1/-1;">No other related photos found in this topic.</p>`;
    return;
  }

  relatedContainer.innerHTML = related.map(item => `
    <div class="related-pin-thumb" data-related-id="${item.id}" title="${escapeHtml(item.title)}">
      <img class="related-pin-img" src="${item.image}" alt="${escapeHtml(item.title)}" loading="lazy">
    </div>
  `).join("");

  relatedContainer.querySelectorAll("[data-related-id]").forEach(thumb => {
    thumb.addEventListener("click", () => {
      const pinId = thumb.dataset.relatedId;
      const targetIndex = state.currentFilteredPins.findIndex(p => p.id === pinId);
      if (targetIndex >= 0) {
        openLightboxByIndex(targetIndex);
      } else {
        // If not in current filtered list, find in all pins
        const targetPin = allPins.find(p => p.id === pinId);
        if (targetPin) {
          state.currentFilteredPins.push(targetPin);
          openLightboxByIndex(state.currentFilteredPins.length - 1);
        }
      }
    });
  });
}

// --- Download & Share ---
function downloadImage(url, title = "photorest_image") {
  const a = document.createElement("a");
  a.href = url;
  a.download = `${title.toLowerCase().replace(/\s+/g, "_")}.jpg`;
  a.target = "_blank";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  showToast("Downloading image...", "bx-download");
}

function sharePin(pin) {
  if (!shareModal) return;

  const currentUrl = window.location.href;
  const qrImg = document.getElementById("shareQrCodeImg");
  const waBtn = document.getElementById("shareWhatsappBtn");
  const tgBtn = document.getElementById("shareTelegramBtn");
  const twBtn = document.getElementById("shareTwitterBtn");
  const copyBtn = document.getElementById("shareCopyLinkBtn");

  if (qrImg) {
    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(currentUrl)}`;
  }

  const shareText = `Check out "${pin.title}" on PhotoRest inspiration gallery!`;

  if (waBtn) waBtn.href = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + " " + currentUrl)}`;
  if (tgBtn) tgBtn.href = `https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(shareText)}`;
  if (twBtn) twBtn.href = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(currentUrl)}`;

  if (copyBtn) {
    copyBtn.onclick = () => {
      navigator.clipboard.writeText(currentUrl);
      showToast("Link copied to clipboard! 📋", "bx-copy");
    };
  }

  shareModal.classList.add("is-open");
  document.body.style.overflow = "hidden";
}

function closeShareModal() {
  if (!shareModal) return;
  shareModal.classList.remove("is-open");
  document.body.style.overflow = "";
}

// --- Add Custom Pin Modal ---
function openAddPinModal() {
  if (!addPinModal) return;
  addPinModal.classList.add("is-open");
  document.body.style.overflow = "hidden";
}

function closeAddPinModal() {
  if (!addPinModal) return;
  addPinModal.classList.remove("is-open");
  document.body.style.overflow = "";
  const form = document.getElementById("createPinForm");
  if (form) form.reset();
  const preview = document.getElementById("uploadPreviewContainer");
  if (preview) preview.style.display = "none";
}

function setupAddPinForm() {
  const form = document.getElementById("createPinForm");
  const fileInput = document.getElementById("pinFileInput");
  const urlInput = document.getElementById("pinUrlInput");
  const previewContainer = document.getElementById("uploadPreviewContainer");
  const previewImg = document.getElementById("uploadPreviewImg");
  const dropzone = document.getElementById("uploadDropzone");

  if (!form) return;

  if (dropzone && fileInput) {
    dropzone.addEventListener("click", () => fileInput.click());
  }

  if (fileInput) {
    fileInput.addEventListener("change", () => {
      const file = fileInput.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const img = new Image();
          img.onload = () => {
            const canvas = document.createElement("canvas");
            const MAX_WIDTH = 800;
            const MAX_HEIGHT = 800;
            let width = img.width;
            let height = img.height;

            if (width > height) {
              if (width > MAX_WIDTH) {
                height *= MAX_WIDTH / width;
                width = MAX_WIDTH;
              }
            } else {
              if (height > MAX_HEIGHT) {
                width *= MAX_HEIGHT / height;
                height = MAX_HEIGHT;
              }
            }
            
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, width, height);
            
            // Compress to JPEG with 75% quality
            const compressedBase64 = canvas.toDataURL("image/jpeg", 0.75);
            
            if (previewImg && previewContainer) {
              previewImg.src = compressedBase64;
              previewContainer.style.display = "block";
            }
          };
          img.src = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    });
  }

  if (urlInput) {
    urlInput.addEventListener("input", () => {
      const val = urlInput.value.trim();
      if (val.startsWith("http") && previewImg && previewContainer) {
        previewImg.src = val;
        previewContainer.style.display = "block";
      }
    });
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.getElementById("pinTitleInput").value.trim();
    const category = document.getElementById("pinCategorySelect").value;
    const desc = document.getElementById("pinDescInput").value.trim();
    let imageSrc = "";

    if (fileInput && fileInput.files[0] && previewImg) {
      imageSrc = previewImg.src;
    } else if (urlInput && urlInput.value.trim()) {
      imageSrc = urlInput.value.trim();
    } else {
      showToast("Please upload an image or provide a valid URL", "bx-error");
      return;
    }

    const newPin = {
      id: "custom-" + Date.now(),
      title: title || "My Inspiration Pin",
      category: category || "explore",
      image: imageSrc,
      author: "You (Creator)",
      authorAvatar: "images/perfil.png",
      likes: 1,
      description: desc || "Personal upload to PhotoRest gallery."
    };

    state.customPins.unshift(newPin);
    localStorage.setItem("photorest_custom_pins", JSON.stringify(state.customPins));

    closeAddPinModal();
    renderCategoryPills();
    renderGallery();
    showToast("New Pin published successfully! 🚀", "bx-check-circle");
  });
}

// --- Toast Feedback ---
function showToast(message, icon = "bx-info-circle") {
  let container = document.querySelector(".toast-container");
  if (!container) {
    container = document.createElement("div");
    container.className = "toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = "toast-item";
  toast.innerHTML = `<i class='bx ${icon}'></i> <span>${escapeHtml(message)}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("toast-out");
    setTimeout(() => toast.remove(), 300);
  }, 2600);
}

// --- Global Event Listeners ---
function setupEventListeners() {
  // Search input live search
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      state.searchQuery = e.target.value;
      if (searchClearBtn) {
        searchClearBtn.style.display = state.searchQuery ? "block" : "none";
      }
      renderGallery();
    });
  }

  if (searchClearBtn && searchInput) {
    searchClearBtn.addEventListener("click", () => {
      searchInput.value = "";
      state.searchQuery = "";
      searchClearBtn.style.display = "none";
      searchInput.focus();
      renderGallery();
    });
  }

  // Sorting dropdown
  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      state.sortBy = e.target.value;
      renderGallery();
      showToast(`Sorted by ${sortSelect.options[sortSelect.selectedIndex].text}`);
    });
  }

  // Create Pin Button
  const createPinBtn = document.getElementById("createPinBtn");
  if (createPinBtn) {
    createPinBtn.addEventListener("click", openAddPinModal);
  }

  // Back to top
  if (backToTopBtn) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add("visible");
      } else {
        backToTopBtn.classList.remove("visible");
      }
    });

    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Lightbox Modal Controls
  if (lightboxModal) {
    const closeBtn = lightboxModal.querySelector("#lightboxCloseBtn");
    if (closeBtn) closeBtn.addEventListener("click", closeLightbox);

    lightboxModal.addEventListener("click", (e) => {
      if (e.target === lightboxModal) closeLightbox();
    });

    const prevBtn = lightboxModal.querySelector("#lightboxPrevBtn");
    if (prevBtn) prevBtn.addEventListener("click", () => navigateLightbox(-1));

    const nextBtn = lightboxModal.querySelector("#lightboxNextBtn");
    if (nextBtn) nextBtn.addEventListener("click", () => navigateLightbox(1));

    const lbLikeBtn = lightboxModal.querySelector("#lightboxLikeBtn");
    if (lbLikeBtn) {
      lbLikeBtn.addEventListener("click", () => {
        if (state.currentLightboxPinIndex >= 0) {
          const pin = state.currentFilteredPins[state.currentLightboxPinIndex];
          if (pin) toggleLikePin(pin.id);
        }
      });
    }

    const lbSaveBtn = lightboxModal.querySelector("#lightboxSaveBtn");
    if (lbSaveBtn) {
      lbSaveBtn.addEventListener("click", () => {
        if (state.currentLightboxPinIndex >= 0) {
          const pin = state.currentFilteredPins[state.currentLightboxPinIndex];
          if (pin) toggleSavePin(pin.id);
        }
      });
    }

    const lbDownloadBtn = lightboxModal.querySelector("#lightboxDownloadBtn");
    if (lbDownloadBtn) {
      lbDownloadBtn.addEventListener("click", () => {
        if (state.currentLightboxPinIndex >= 0) {
          const pin = state.currentFilteredPins[state.currentLightboxPinIndex];
          if (pin) downloadImage(pin.image, pin.title);
        }
      });
    }

    const lbShareBtn = lightboxModal.querySelector("#lightboxShareBtn");
    if (lbShareBtn) {
      lbShareBtn.addEventListener("click", () => {
        if (state.currentLightboxPinIndex >= 0) {
          const pin = state.currentFilteredPins[state.currentLightboxPinIndex];
          if (pin) sharePin(pin);
        }
      });
    }
  }

  // Share & QR Modal Controls
  if (shareModal) {
    const closeBtn = document.getElementById("closeShareModalBtn");
    if (closeBtn) closeBtn.addEventListener("click", closeShareModal);

    shareModal.addEventListener("click", (e) => {
      if (e.target === shareModal) closeShareModal();
    });
  }

  // Add Pin Modal Controls
  if (addPinModal) {
    const closeBtn = addPinModal.querySelector("#closeAddPinBtn");
    if (closeBtn) closeBtn.addEventListener("click", closeAddPinModal);

    addPinModal.addEventListener("click", (e) => {
      if (e.target === addPinModal) closeAddPinModal();
    });

    setupAddPinForm();
  }

  // Global Keyboard Navigation
  document.addEventListener("keydown", (e) => {
    if (lightboxModal && lightboxModal.classList.contains("is-open")) {
      if (e.key === "ArrowLeft") {
        navigateLightbox(-1);
      } else if (e.key === "ArrowRight") {
        navigateLightbox(1);
      } else if (e.key === "Escape") {
        closeLightbox();
      }
    } else if (shareModal && shareModal.classList.contains("is-open")) {
      if (e.key === "Escape") {
        closeShareModal();
      }
    } else if (e.key === "Escape") {
      closeAddPinModal();
    }
  });
}

// --- Utilities ---
function escapeHtml(str) {
  if (!str) return "";
  return str.replace(/[&<>"']/g, function (m) {
    return {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    }[m];
  });
}


