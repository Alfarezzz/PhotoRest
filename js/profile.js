/**
 * PhotoRest - Profile & Boards Management (Phase 2)
 */

// Initial Default Boards
const DEFAULT_BOARDS = [
  {
    id: "board-all",
    title: "All Saved Pins",
    description: "Every inspiration pin you have bookmarked",
    pinIds: []
  },
  {
    id: "board-food",
    title: "Culinary & Treats",
    description: "Delicious culinary ideas and aesthetic food photography",
    pinIds: ["food-1", "food-3", "food-16", "food-18"]
  },
  {
    id: "board-nature",
    title: "Coasts & Wild Life",
    description: "Serene beaches, sunsets, and animal portraits",
    pinIds: ["beach-1", "beach-2", "animal-1", "animal-2"]
  },
  {
    id: "board-style",
    title: "Streetwear & Cars",
    description: "Sneakers, lifestyle apparel, and performance cars",
    pinIds: ["shoes-1", "shoes-2", "car-1", "car-2"]
  }
];

// Profile State
const profileState = {
  currentTab: "boards",
  profile: JSON.parse(localStorage.getItem("photorest_user_profile") || JSON.stringify({
    name: "Kelan",
    handle: "@kelan_visuals",
    bio: "Multimedia Creator & Visual Enthusiast. Collecting aesthetics and inspirational photography on PhotoRest.",
    avatar: "images/perfil.png"
  })),
  savedPinIds: new Set(JSON.parse(localStorage.getItem("photorest_saved_pins") || "[]")),
  likedPinIds: new Set(JSON.parse(localStorage.getItem("photorest_liked_pins") || "[]")),
  customPins: JSON.parse(localStorage.getItem("photorest_custom_pins") || "[]"),
  boards: JSON.parse(localStorage.getItem("photorest_custom_boards") || JSON.stringify(DEFAULT_BOARDS))
};

// --- DOM Elements ---
const profileTabContent = document.getElementById("profileTabContent");
const profileTabs = document.querySelectorAll(".profile-tab-btn");
const editProfileModal = document.getElementById("editProfileModal");
const createBoardModal = document.getElementById("createBoardModal");
const lightboxModal = document.getElementById("lightboxModal");

document.addEventListener("DOMContentLoaded", () => {
  renderProfileInfo();
  updateProfileStats();
  setupProfileEventListeners();
  renderActiveTab();
});

// Render Profile Header Info
function renderProfileInfo() {
  document.getElementById("profileNameText").textContent = profileState.profile.name;
  document.getElementById("profileHandleText").textContent = profileState.profile.handle;
  document.getElementById("profileBioText").textContent = profileState.profile.bio;
  document.getElementById("profileAvatarImg").src = profileState.profile.avatar;
  const navAvatar = document.getElementById("navAvatarImg");
  if (navAvatar) navAvatar.src = profileState.profile.avatar;
}

// Update Profile Counters
function updateProfileStats() {
  document.getElementById("statCreatedCount").textContent = profileState.customPins.length;
  document.getElementById("statSavedCount").textContent = profileState.savedPinIds.size;
  document.getElementById("statLikedCount").textContent = profileState.likedPinIds.size;
}

// Tab Switching
function renderActiveTab() {
  if (!profileTabContent) return;

  if (profileState.currentTab === "boards") {
    renderBoardsTab();
  } else if (profileState.currentTab === "created") {
    renderCreatedTab();
  } else if (profileState.currentTab === "liked") {
    renderLikedTab();
  }
}

// 1. Render Boards Tab
function renderBoardsTab() {
  // Update "All Saved" board with actual saved count
  const allSavedBoard = profileState.boards.find(b => b.id === "board-all");
  if (allSavedBoard) {
    allSavedBoard.pinIds = [...profileState.savedPinIds];
  }

  let html = `
    <div class="boards-grid">
      <!-- Create New Board Card -->
      <div class="create-board-card" id="openCreateBoardBtn">
        <i class='bx bx-plus-circle create-board-icon'></i>
        <span style="font-weight: 700; font-size: 1rem;">Create New Board</span>
        <span style="font-size: 0.8rem; color: var(--text-muted); margin-top: 4px;">Organize your saved pins</span>
      </div>
  `;

  html += profileState.boards.map(board => {
    const count = board.pinIds.length;
    // Get cover thumbnails
    const covers = getBoardCoverThumbnails(board);

    return `
      <div class="board-card" data-board-id="${board.id}">
        <div class="board-cover-collage">
          <img class="board-cover-img main-img" src="${covers[0]}" alt="Cover">
          <img class="board-cover-img" src="${covers[1]}" alt="Thumb 1">
          <img class="board-cover-img" src="${covers[2]}" alt="Thumb 2">
        </div>
        <div class="board-info-block">
          <div class="board-title">${escapeHtml(board.title)}</div>
          <div class="board-count-meta">${count} ${count === 1 ? 'Pin' : 'Pins'}</div>
        </div>
      </div>
    `;
  }).join("");

  html += `</div>`;
  profileTabContent.innerHTML = html;

  // Event listener for create board card
  const createBtn = document.getElementById("openCreateBoardBtn");
  if (createBtn) {
    createBtn.addEventListener("click", openCreateBoardModal);
  }

  // Click board -> navigate to explore.html filtered
  profileTabContent.querySelectorAll(".board-card").forEach(card => {
    card.addEventListener("click", () => {
      const boardId = card.dataset.boardId;
      window.location.href = `explore.html?cat=saved`;
    });
  });
}

function getBoardCoverThumbnails(board) {
  const fallback = "images/food/cake.jpg";
  const fallback2 = "images/beach/beach.jpg";
  const fallback3 = "images/animal/fox.jpg";

  if (board.id === "board-food") return ["images/food/burger.jpg", "images/food/ayam.jpg", "images/food/pizza.jpg"];
  if (board.id === "board-nature") return ["images/beach/beach.jpg", "images/animal/fox.jpg", "images/beach/beach1.jpg"];
  if (board.id === "board-style") return ["images/shoes/shoes.jpg", "images/car/car1.jpg", "images/shoes/shoes1.jpg"];

  return [fallback, fallback2, fallback3];
}

// 2. Render Created Pins Tab
function renderCreatedTab() {
  if (profileState.customPins.length === 0) {
    profileTabContent.innerHTML = `
      <div class="empty-gallery-state" style="text-align: center; padding: 40px 20px;">
        <i class='bx bx-cloud-upload' style="font-size: 3.5rem; color: var(--text-muted);"></i>
        <h3 style="font-size: 1.3rem; font-weight: 800; margin: 12px 0 6px;">No uploaded pins yet</h3>
        <p style="color: var(--text-secondary); max-width: 420px; margin: 0 auto 20px;">
          Share your own creative photography or designs with the community!
        </p>
        <a href="explore.html" class="action-btn-primary" style="display: inline-flex;">
          <i class='bx bx-plus'></i> Create Your First Pin
        </a>
      </div>
    `;
    return;
  }

  profileTabContent.innerHTML = `
    <div class="gallery-container" style="padding: 0;">
      ${profileState.customPins.map(pin => `
        <div class="pin-card" data-id="${pin.id}">
          <div class="pin-card-media">
            <img class="pin-card-img" src="${pin.image}" alt="${escapeHtml(pin.title)}">
          </div>
          <div class="pin-card-content">
            <div class="pin-card-title">${escapeHtml(pin.title)}</div>
            <div class="pin-card-meta">
              <span>Uploaded by You</span>
              <span class="badge-category badge-cat-explore">${pin.category}</span>
            </div>
          </div>
        </div>
      `).join("")}
    </div>
  `;
}

// 3. Render Liked Pins Tab
function renderLikedTab() {
  if (profileState.likedPinIds.size === 0) {
    profileTabContent.innerHTML = `
      <div class="empty-gallery-state" style="text-align: center; padding: 40px 20px;">
        <i class='bx bx-heart' style="font-size: 3.5rem; color: var(--text-muted);"></i>
        <h3 style="font-size: 1.3rem; font-weight: 800; margin: 12px 0 6px;">No liked photos yet</h3>
        <p style="color: var(--text-secondary); max-width: 420px; margin: 0 auto 20px;">
          Give hearts to the photos and inspirations that ignite your creativity!
        </p>
        <a href="explore.html" class="action-btn-primary" style="display: inline-flex;">
          <i class='bx bx-compass'></i> Explore Feed
        </a>
      </div>
    `;
    return;
  }

  profileTabContent.innerHTML = `
    <div class="gallery-container" style="padding: 0;">
      <p style="grid-column: 1/-1; color: var(--text-muted); font-size: 0.9rem;">
        Showing ${profileState.likedPinIds.size} liked photos in your collection.
      </p>
    </div>
  `;
}

// Edit Profile Handlers
function openEditProfileModal() {
  document.getElementById("editNameInput").value = profileState.profile.name;
  document.getElementById("editHandleInput").value = profileState.profile.handle;
  document.getElementById("editBioInput").value = profileState.profile.bio;
  editProfileModal.classList.add("is-open");
  document.body.style.overflow = "hidden";
}

function closeEditProfileModal() {
  editProfileModal.classList.remove("is-open");
  document.body.style.overflow = "";
}

function openCreateBoardModal() {
  createBoardModal.classList.add("is-open");
  document.body.style.overflow = "hidden";
}

function closeCreateBoardModal() {
  createBoardModal.classList.remove("is-open");
  document.body.style.overflow = "";
  document.getElementById("createBoardForm").reset();
}

function setupProfileEventListeners() {
  // Tabs
  profileTabs.forEach(btn => {
    btn.addEventListener("click", () => {
      profileTabs.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      profileState.currentTab = btn.dataset.tab;
      renderActiveTab();
    });
  });

  // Edit Profile Button
  document.getElementById("editProfileBtn").addEventListener("click", openEditProfileModal);
  document.getElementById("closeEditProfileBtn").addEventListener("click", closeEditProfileModal);

  // Edit Profile Form Submit
  document.getElementById("editProfileForm").addEventListener("submit", (e) => {
    e.preventDefault();
    profileState.profile.name = document.getElementById("editNameInput").value.trim();
    profileState.profile.handle = document.getElementById("editHandleInput").value.trim();
    profileState.profile.bio = document.getElementById("editBioInput").value.trim();

    localStorage.setItem("photorest_user_profile", JSON.stringify(profileState.profile));
    renderProfileInfo();
    closeEditProfileModal();
    showToast("Profile updated successfully! ✨");
  });

  // Share Profile
  document.getElementById("shareProfileBtn").addEventListener("click", () => {
    navigator.clipboard.writeText(window.location.href);
    showToast("Profile link copied to clipboard! 📋");
  });

  // Create Board Form Submit
  document.getElementById("closeCreateBoardBtn").addEventListener("click", closeCreateBoardModal);
  document.getElementById("createBoardForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.getElementById("boardTitleInput").value.trim();
    const desc = document.getElementById("boardDescInput").value.trim();

    const newBoard = {
      id: "board-" + Date.now(),
      title: title || "New Collection",
      description: desc || "",
      pinIds: []
    };

    profileState.boards.push(newBoard);
    localStorage.setItem("photorest_custom_boards", JSON.stringify(profileState.boards));
    closeCreateBoardModal();
    renderBoardsTab();
    showToast(`Board "${title}" created! 📁`);
  });

  // Search redirection
  const searchInput = document.getElementById("search_bar");
  if (searchInput) {
    searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter" && searchInput.value.trim()) {
        window.location.href = `explore.html?q=${encodeURIComponent(searchInput.value.trim())}`;
      }
    });
  }
}

// Toast Notification Helper
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
