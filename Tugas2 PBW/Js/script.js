/**
 * Load custom stock dari localStorage
 * @returns {Array} Array of custom stock items
 */
function loadCustomStock() {
  if (
    sessionStorage.getItem("customStock") &&
    !localStorage.getItem("customStock")
  ) {
    localStorage.setItem("customStock", sessionStorage.getItem("customStock"));
    sessionStorage.removeItem("customStock");
  }
  try {
    return JSON.parse(localStorage.getItem("customStock") || "[]");
  } catch (e) {
    console.error("Error loading custom stock:", e);
    return [];
  }
}

/**
 * Save custom stock ke localStorage
 * @param {Array} arr - Array of custom stock items
 */
function saveCustomStock(arr) {
  try {
    localStorage.setItem("customStock", JSON.stringify(arr));
  } catch (e) {
    console.error("Error saving custom stock:", e);
    showToast("Error menyimpan data", { type: "danger" });
  }
}

/**
 * Open modal dengan animasi
 * @param {string} id - ID modal element
 */
function openModal(id) {
  const overlay = document.getElementById("overlay");
  const m = document.getElementById(id);
  if (!overlay || !m) return;
  overlay.style.display = "block";
  m.style.display = "block";
  requestAnimationFrame(() => {
    overlay.classList.add("visible");
    m.classList.add("open");
  });
}

/**
 * Close semua modal dengan animasi
 */
function closeAllModals() {
  const overlay = document.getElementById("overlay");
  if (!overlay) return;
  overlay.classList.remove("visible");
  document
    .querySelectorAll(".modal")
    .forEach((m) => m.classList.remove("open"));
  setTimeout(() => {
    overlay.style.display = "none";
    document
      .querySelectorAll(".modal")
      .forEach((m) => (m.style.display = "none"));
  }, 260);
}

/**
 * Create toast container
 */
function createToastContainer() {
  if (document.getElementById("toastContainer")) return;
  const c = document.createElement("div");
  c.id = "toastContainer";
  document.body.appendChild(c);
}

/**
 * Show toast notification
 * @param {string} message - Message to display
 * @param {Object} opts - Options (duration, type)
 */
function showToast(message, opts = {}) {
  createToastContainer();
  const { duration = 3000, type = "info" } = opts;
  const el = document.createElement("div");
  el.className = "toast toast-" + type;

  // content
  const txt = document.createElement("div");
  txt.textContent = message;
  el.appendChild(txt);

  // styling
  el.style.opacity = "0";
  el.style.transform = "translateY(-8px)";
  el.style.transition = "opacity 220ms ease, transform 220ms ease";
  document.getElementById("toastContainer").appendChild(el);

  requestAnimationFrame(() => {
    el.style.opacity = "1";
    el.style.transform = "none";
  });

  // auto-dismiss
  const hide = () => {
    el.style.opacity = "0";
    el.style.transform = "translateY(-8px)";
    setTimeout(() => {
      try {
        el.remove();
      } catch (e) {}
    }, 260);
  };

  const timer = setTimeout(hide, duration);

  // allow click to dismiss earlier
  el.addEventListener("click", () => {
    clearTimeout(timer);
    hide();
  });
}

/**
 * Get users array dengan backward compatibility
 * @returns {Array} Array of users
 */
function getUsersArray() {
  if (typeof dataPengguna !== "undefined") return dataPengguna;
  if (typeof users !== "undefined") return users;
  return [];
}

/**
 * Get bahan ajar array dengan backward compatibility
 * @returns {Array} Array of bahan ajar
 */
function getDataBahanAjarArray() {
  if (typeof dataBahanAjar !== "undefined") return dataBahanAjar;
  if (typeof bahanAjar !== "undefined") return bahanAjar;
  return [];
}

/**
 * Get tracking object dengan backward compatibility
 * @returns {Object} Object of tracking data
 */
function getDataTrackingObj() {
  if (typeof dataTracking !== "undefined") return dataTracking;
  if (typeof dataDeliveryOrders !== "undefined") {
    const obj = {};
    dataDeliveryOrders.forEach((d) => {
      const key = (d.doNumber || d.nomorDO || "").toString();
      if (key) obj[key] = d;
    });
    return obj;
  }
  return {};
}

/**
 * Verify login credentials dengan validasi lengkap
 */
const passwordIcons = {
  show: `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d="M1.54 12A10.94 10.94 0 0112 4.5c4.74 0 8.64 2.6 10.38 6.5A10.94 10.94 0 0112 19.5 10.94 10.94 0 011.54 12z" fill="none" stroke="currentColor" stroke-width="1.8" />
    <circle cx="12" cy="12" r="3.5" fill="none" stroke="currentColor" stroke-width="1.8" />
  </svg>`,
  hide: `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d="M1.54 12A10.94 10.94 0 0112 4.5c4.74 0 8.64 2.6 10.38 6.5A10.94 10.94 0 0112 19.5 10.94 10.94 0 011.54 12z" fill="none" stroke="currentColor" stroke-width="1.8" />
    <path d="M4 4l16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
  </svg>`,
};

function togglePasswordVisibility(fieldId, btn) {
  const input = document.getElementById(fieldId);
  if (!input) return;

  const isHidden = input.type === "password";
  input.type = isHidden ? "text" : "password";
  btn.innerHTML = isHidden ? passwordIcons.show : passwordIcons.hide;
  btn.setAttribute(
    "aria-label",
    isHidden ? "Sembunyikan password" : "Tampilkan password",
  );
}

function verifyLogin() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  // Validasi 1: Email tidak kosong
  if (!email) {
    showToast("Email harus diisi", { type: "danger" });
    document.getElementById("email").focus();
    return;
  }

  // Validasi 2: Email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showToast("Format email tidak valid (cth: user@ut.ac.id)", {
      type: "danger",
    });
    document.getElementById("email").focus();
    return;
  }

  // Validasi 3: Password tidak kosong
  if (!password) {
    showToast("Password harus diisi", { type: "danger" });
    document.getElementById("password").focus();
    return;
  }

  // Validasi 4: Password minimal 6 karakter
  if (password.length < 6) {
    showToast("Password minimal 6 karakter", { type: "danger" });
    document.getElementById("password").focus();
    return;
  }

  // Check credentials
  const users = getUsersArray();
  const user = users.find(
    (u) =>
      u.email &&
      u.email.toLowerCase() === email.toLowerCase() &&
      u.password === password,
  );

  if (!user) {
    showToast("❌ Email atau password salah", {
      type: "danger",
      duration: 3000,
    });
    document.getElementById("password").value = "";
    document.getElementById("password").focus();
    return;
  }

  // Save user session
  sessionStorage.setItem(
    "loggedInUser",
    JSON.stringify({
      email: user.email,
      name: user.nama || user.name,
      role: user.role || "",
      lokasi: user.lokasi || "",
    }),
  );

  showToast("✓ Login berhasil, mengalihkan ...", {
    type: "success",
    duration: 900,
  });

  setTimeout(() => {
    window.location.href = "dashboard.html";
  }, 900);
}

/**
 * Check authentication atau redirect ke login
 */
function checkAuthOrRedirect() {
  const u = sessionStorage.getItem("loggedInUser");
  if (!u) {
    if (
      !location.pathname.endsWith("index.html") &&
      !location.pathname.endsWith("/") &&
      !location.pathname.includes("index")
    ) {
      window.location.href = "index.html";
    }
  } else {
    const user = JSON.parse(u);
    const el = document.getElementById("userName");
    if (el) el.textContent = user.name;
    const roleEl = document.getElementById("userRole");
    if (roleEl) roleEl.textContent = "Akses: " + (user.role || "-");
    const locEl = document.getElementById("userLocation");
    if (locEl) locEl.textContent = "Lokasi: " + (user.lokasi || "-");
  }
}

/**
 * Logout user
 */
function logout() {
  sessionStorage.removeItem("loggedInUser");
  showToast("✓ Anda telah logout", { type: "info", duration: 1200 });
  setTimeout(() => {
    window.location.href = "index.html";
  }, 600);
}

/**
 * Simulasi lupa password
 */
function simulateForgot() {
  const email = document.getElementById("forgotEmail").value.trim();

  // Validasi
  if (!email) {
    showToast("Email harus diisi", { type: "danger" });
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showToast("Format email tidak valid", { type: "danger" });
    return;
  }

  const users = getUsersArray();
  const user = users.find(
    (u) => u.email && u.email.toLowerCase() === email.toLowerCase(),
  );

  if (!user) {
    showToast("Email tidak terdaftar dalam sistem", { type: "danger" });
    return;
  }

  closeAllModals();
  showToast(`✓ Email reset telah dikirim ke ${email}`, {
    type: "success",
    duration: 2500,
  });
}

/**
 * Simulasi pendaftaran
 */
function simulateRegister() {
  const email = document.getElementById("regEmail").value.trim();
  const password = document.getElementById("regPassword").value;

  // Validasi 1: Email tidak kosong
  if (!email) {
    showToast("Email harus diisi", { type: "danger" });
    return;
  }

  // Validasi 2: Password tidak kosong
  if (!password) {
    showToast("Password harus diisi", { type: "danger" });
    return;
  }

  // Validasi 3: Email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showToast("Format email tidak valid", { type: "danger" });
    return;
  }

  // Validasi 4: Password minimal 6 karakter
  if (password.length < 6) {
    showToast("Password minimal 6 karakter", { type: "danger" });
    return;
  }

  // Validasi 5: Cek email sudah terdaftar
  const users = getUsersArray();
  if (users.some((u) => u.email?.toLowerCase() === email.toLowerCase())) {
    showToast("Email sudah terdaftar", { type: "danger" });
    return;
  }

  closeAllModals();
  document.getElementById("regEmail").value = "";
  document.getElementById("regPassword").value = "";

  showToast("✓ Pendaftaran berhasil. Silahkan login", {
    type: "success",
    duration: 2500,
  });
}

/**
 * Set greeting berdasarkan jam
 */
function setGreeting() {
  const now = new Date();
  const h = now.getHours();
  let g = "Selamat Pagi";
  let emoji = "🌅";

  if (h >= 11 && h < 15) {
    g = "Selamat Siang";
    emoji = "☀️";
  } else if (h >= 15 && h < 18) {
    g = "Selamat Sore";
    emoji = "🌤️";
  } else if (h >= 18 || h < 5) {
    g = "Selamat Malam";
    emoji = "🌙";
  }

  const name = sessionStorage.getItem("loggedInUser")
    ? JSON.parse(sessionStorage.getItem("loggedInUser")).name
    : "";

  const el = document.getElementById("greeting");
  if (el) el.textContent = `${emoji} ${g}${name ? ", " + name : "!"}`;
}

/**
 * Get semua items (base + custom)
 * @returns {Array} All items
 */
function getAllItems() {
  const base = getDataBahanAjarArray().slice();
  const custom = loadCustomStock();
  return base.concat(custom);
}

/**
 * Compute total stock
 */
function computeTotalStock() {
  const all = getAllItems();
  const total = all.reduce((s, it) => s + (Number(it.stok) || 0), 0);
  const el = document.getElementById("totalStock");
  if (el) el.textContent = total.toLocaleString("id-ID");
}

/**
 * Populate stock table
 */
function populateStockTable() {
  const tbody = document.querySelector("#stockTable tbody");
  if (!tbody) return;
  tbody.innerHTML = "";
  const items = getAllItems();

  if (items.length === 0) {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td colspan="7" style="text-align: center; color: var(--muted); padding: 20px;">Tidak ada data stok</td>`;
    tbody.appendChild(tr);
    return;
  }

  items.forEach((it, idx) => {
    const cover = it.cover
      ? `<img src="${it.cover}" alt="cover" style="width:48px;height:64px;object-fit:cover;border-radius:4px;background:#f1f5ff;">`
      : '<div style="width:48px;height:64px;background:#f1f5ff;border-radius:4px;display:flex;align-items:center;justify-content:center;color:#7b8fae;font-size:11px;font-weight:600">No Image</div>';

    const kode = it.kodeBarang || it.kode || it.kodeLokasi || "-";
    const judul = it.namaBarang || it.judul || "-";
    const jenisEdisi =
      (it.jenisBarang ? it.jenisBarang : "") +
      (it.edisi ? " / Edisi " + it.edisi : "");
    const lokasi = it.kodeLokasi || it.lokasi || "-";
    const stok = it.stok || 0;

    // Styling berdasarkan stok
    let stockColor = "#198754"; // green
    if (stok < 50) stockColor = "#ffc107"; // yellow
    if (stok === 0) stockColor = "#dc3545"; // red

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td style="width:60px">${cover}</td>
      <td><strong>${kode}</strong></td>
      <td>${judul}</td>
      <td><small>${jenisEdisi || "-"}</small></td>
      <td><small>${lokasi}</small></td>
      <td><span style="color: ${stockColor}; font-weight: 700;">${stok}</span></td>
      <td style="width:220px;">
        <button class="btn" title="Edit" onclick="openEditStock(${idx})">✏️</button>
        <button class="btn" title="Kurangi" onclick="decreaseStock(${idx})">−</button>
        <button class="btn" title="Tambah" onclick="increaseStock(${idx})">+</button>
        <button class="btn" title="Hapus" onclick="removeStock(${idx})">🗑️</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

/**
 * Increase stock
 * @param {number} index - Item index
 */
function increaseStock(index) {
  const baseLen = getDataBahanAjarArray().length;
  if (index < baseLen) {
    const arr = getDataBahanAjarArray();
    arr[index].stok = Number(arr[index].stok || 0) + 1;
  } else {
    const custom = loadCustomStock();
    const ci = index - baseLen;
    if (custom[ci]) {
      custom[ci].stok = Number(custom[ci].stok || 0) + 1;
      saveCustomStock(custom);
    }
  }
  populateStockTable();
  computeTotalStock();
  showToast("✓ Stok ditambah", { type: "success", duration: 1500 });
}

/**
 * Decrease stock
 * @param {number} index - Item index
 */
function decreaseStock(index) {
  const baseLen = getDataBahanAjarArray().length;
  if (index < baseLen) {
    const arr = getDataBahanAjarArray();
    arr[index].stok = Math.max(0, Number(arr[index].stok || 0) - 1);
  } else {
    const custom = loadCustomStock();
    const ci = index - baseLen;
    if (custom[ci]) {
      custom[ci].stok = Math.max(0, Number(custom[ci].stok || 0) - 1);
      saveCustomStock(custom);
    }
  }
  populateStockTable();
  computeTotalStock();
  showToast("✓ Stok dikurangi", { type: "success", duration: 1500 });
}

/**
 * Remove stock item
 * @param {number} index - Item index
 */
function removeStock(index) {
  const baseLen = getDataBahanAjarArray().length;
  const item = getAllItems()[index];
  const itemName = item.namaBarang || "Item";

  if (index < baseLen) {
    if (
      !confirm(
        `Hapus item "${itemName}" dari daftar?\n\n(Catatan: Hanya simulasi, data asli tetap tersimpan)`,
      )
    )
      return;
    const arr = getDataBahanAjarArray();
    arr[index].stok = 0;
    showToast("✓ Item diset stok = 0", { type: "info", duration: 1800 });
  } else {
    if (!confirm(`Hapus item "${itemName}"?`)) return;
    const custom = loadCustomStock();
    const ci = index - baseLen;
    custom.splice(ci, 1);
    saveCustomStock(custom);
    showToast("✓ Item berhasil dihapus", { type: "success", duration: 1800 });
  }
  populateStockTable();
  computeTotalStock();
}

/**
 * Open add stock form
 */
/**
 * Manage cover file preview
 */
function initCoverFileHandler() {
  const fileInput = document.getElementById("newCoverFile");
  if (!fileInput) return;

  fileInput.addEventListener("change", function (e) {
    const file = e.target.files[0];
    const preview = document.getElementById("coverPreview");
    const previewImg = document.getElementById("coverPreviewImg");

    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = function (event) {
        previewImg.src = event.target.result;
        preview.style.display = "block";
        // Store temporarily for addStockRow
        window.selectedCoverDataUrl = event.target.result;
      };
      reader.readAsDataURL(file);
    } else {
      preview.style.display = "none";
      window.selectedCoverDataUrl = null;
    }
  });
}

// Initialize pada page load
document.addEventListener("DOMContentLoaded", function () {
  initCoverFileHandler();
});

/**
 * Open add stock form
 */
function openAddStock() {
  const form = document.getElementById("addStockForm");
  if (form) form.classList.remove("hidden");
  const el = document.getElementById("newKode");
  if (el) el.focus();
}

/**
 * Close add stock form
 */
function closeAddStock() {
  const form = document.getElementById("addStockForm");
  if (form) form.classList.add("hidden");
  ["newKode", "newJudul", "newAuthor", "newLokasi", "newStock"].forEach(
    (id) => {
      const el = document.getElementById(id);
      if (el) el.value = "";
    },
  );

  // Reset file input dan preview
  const fileInput = document.getElementById("newCoverFile");
  if (fileInput) fileInput.value = "";
  const preview = document.getElementById("coverPreview");
  if (preview) preview.style.display = "none";
  window.selectedCoverDataUrl = null;
}

/**
 * Add stock row dengan validasi lengkap
 */
function addStockRow() {
  const kode = document.getElementById("newKode").value.trim();
  const judul = document.getElementById("newJudul").value.trim();
  const jenis = document.getElementById("newAuthor").value.trim();
  const lokasi = document.getElementById("newLokasi").value.trim();
  const stok = Number(document.getElementById("newStock").value);

  // Validasi 1: Kode tidak kosong
  if (!kode) {
    showToast("❌ Kode barang harus diisi", { type: "danger" });
    document.getElementById("newKode").focus();
    return;
  }

  // Validasi 2: Judul tidak kosong
  if (!judul) {
    showToast("❌ Nama bahan ajar harus diisi", { type: "danger" });
    document.getElementById("newJudul").focus();
    return;
  }

  // Validasi 3: Kode minimal 3 karakter
  if (kode.length < 3) {
    showToast("❌ Kode minimal 3 karakter", { type: "danger" });
    return;
  }

  // Validasi 4: Kode format (alphanumeric)
  if (!/^[A-Z0-9]+$/i.test(kode)) {
    showToast("❌ Kode hanya boleh huruf dan angka", { type: "danger" });
    return;
  }

  // Validasi 5: Cek duplicate
  if (getAllItems().some((it) => it.kodeBarang === kode)) {
    showToast("❌ Kode barang sudah ada dalam sistem", { type: "danger" });
    return;
  }

  // Validasi 6: Stok tidak boleh negatif
  if (stok < 0) {
    showToast("❌ Stok tidak boleh negatif", { type: "danger" });
    return;
  }

  // Validasi 7: Stok harus angka
  if (isNaN(stok)) {
    showToast("❌ Stok harus berupa angka", { type: "danger" });
    return;
  }

  const custom = loadCustomStock();
  const item = {
    kodeBarang: kode,
    namaBarang: judul,
    jenisBarang: jenis || "Umum",
    kodeLokasi: lokasi || "-",
    edisi: "",
    stok: Math.floor(stok),
    cover: window.selectedCoverDataUrl || "", // Gunakan gambar yang dipilih atau kosong
  };

  custom.push(item);
  saveCustomStock(custom);
  closeAddStock();
  populateStockTable();
  computeTotalStock();
  showToast("✓ Baris stok baru ditambahkan", {
    type: "success",
    duration: 2000,
  });
}

/**
 * Open edit stock modal
 * @param {number} index - Item index
 */
function openEditStock(index) {
  const item = getAllItems()[index];
  if (!item) return;

  document.getElementById("editKode").value = item.kodeBarang || "-";
  document.getElementById("editJudul").value = item.namaBarang || "";
  document.getElementById("editLokasi").value = item.kodeLokasi || "";
  document.getElementById("editStok").value = item.stok || 0;
  document.getElementById("editStok").dataset.index = index;

  openModal("editStockModal");
}

/**
 * Save edited stock
 */
function saveEditStock() {
  const index = parseInt(document.getElementById("editStok").dataset.index);
  const judul = document.getElementById("editJudul").value.trim();
  const lokasi = document.getElementById("editLokasi").value.trim();
  const stok = Number(document.getElementById("editStok").value);

  // Validasi
  if (!judul) {
    showToast("❌ Nama bahan ajar harus diisi", { type: "danger" });
    document.getElementById("editJudul").focus();
    return;
  }

  if (stok < 0) {
    showToast("❌ Stok tidak boleh negatif", { type: "danger" });
    return;
  }

  if (isNaN(stok)) {
    showToast("❌ Stok harus berupa angka", { type: "danger" });
    return;
  }

  const baseLen = getDataBahanAjarArray().length;
  if (index < baseLen) {
    const arr = getDataBahanAjarArray();
    arr[index].namaBarang = judul;
    arr[index].kodeLokasi = lokasi;
    arr[index].stok = Math.floor(stok);
  } else {
    const custom = loadCustomStock();
    const ci = index - baseLen;
    if (custom[ci]) {
      custom[ci].namaBarang = judul;
      custom[ci].kodeLokasi = lokasi;
      custom[ci].stok = Math.floor(stok);
      saveCustomStock(custom);
    }
  }

  populateStockTable();
  computeTotalStock();
  closeAllModals();
  showToast("✓ Stok berhasil diperbarui", { type: "success", duration: 1800 });
}

/* ============================================
   FILTER STOCK
   ============================================ */

/**
 * Filter stock table berdasarkan input
 */
function filterStockTable() {
  const q = document.getElementById("filterInput").value.trim().toLowerCase();
  const rows = document.querySelectorAll("#stockTable tbody tr");

  if (rows.length === 0) return;

  rows.forEach((r) => {
    const text = r.textContent.toLowerCase();
    r.style.display = text.includes(q) ? "" : "none";
  });
}

/* ============================================
   TRACKING & DELIVERY
   ============================================ */

/**
 * Search delivery order
 */
function searchDO() {
  const q = document.getElementById("doInput").value.trim();
  const wrap = document.getElementById("trackingResult");

  if (!wrap) return;

  if (!q) {
    wrap.innerHTML = '<p class="muted">Masukkan nomor DO terlebih dahulu.</p>';
    return;
  }

  const tracking = getDataTrackingObj();
  const found = tracking[q] || null;

  if (!found) {
    wrap.innerHTML = `
      <div class="card">
        <h3>❌ Nomor DO ${q} Tidak Ditemukan</h3>
        <p class="muted">Periksa kembali nomor DO atau hubungi admin.</p>
        <div class="example-numbers" style="margin-top: 16px;">
          <p class="small-text">Contoh nomor DO yang tersedia:</p>
          <small>2023001234 • 2023005678</small>
        </div>
      </div>
    `;
    return;
  }

  // Build timeline
  let timelineHtml = '<div class="timeline">';
  if (Array.isArray(found.perjalanan) && found.perjalanan.length) {
    found.perjalanan.forEach((p, idx) => {
      const isCompleted =
        idx < found.perjalanan.length - 1 || found.status === "Dikirim";
      const isInProgress = idx === found.perjalanan.length - 1;

      const timelineClass = isCompleted
        ? "completed"
        : isInProgress
          ? "in-progress"
          : "";

      timelineHtml += `
        <div class="timeline-item ${timelineClass}">
          <div class="timeline-time">${p.waktu}</div>
          <div class="timeline-description">${p.keterangan}</div>
        </div>
      `;
    });
  }
  timelineHtml += "</div>";

  // Status badge
  let statusBadge = "badge-info";
  if (found.status === "Dikirim") statusBadge = "badge-success";
  if (found.status === "Dalam Perjalanan") statusBadge = "badge-warning";

  const detail = `
    <div class="card">
      <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 20px; gap: 16px;">
        <div>
          <h3 style="margin-bottom: 12px; font-size: 20px;">📦 Nomor DO</h3>
          <p style="margin: 0; font-size: 18px; font-weight: 700; color: var(--accent);">${found.nomorDO || q}</p>
          <span class="badge ${statusBadge}" style="margin-top: 8px; display: inline-block;">${found.status || "-"}</span>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-bottom: 24px; padding: 16px; background: var(--surface); border-radius: 8px;">
        <div>
          <p class="muted" style="font-size: 11px; margin: 0 0 6px 0; text-transform: uppercase; letter-spacing: 0.5px;">👤 Penerima</p>
          <p style="font-weight: 600; margin: 0; font-size: 15px;">${
            found.nama || found.mahasiswa || "-"
          }</p>
        </div>
        <div>
          <p class="muted" style="font-size: 11px; margin: 0 0 6px 0; text-transform: uppercase; letter-spacing: 0.5px;">🚚 Ekspedisi</p>
          <p style="font-weight: 600; margin: 0; font-size: 15px;">${found.ekspedisi || "-"}</p>
        </div>
        <div>
          <p class="muted" style="font-size: 11px; margin: 0 0 6px 0; text-transform: uppercase; letter-spacing: 0.5px;">📅 Tanggal Kirim</p>
          <p style="font-weight: 600; margin: 0; font-size: 15px;">${
            found.tanggalKirim || found.tanggal_kirim || "-"
          }</p>
        </div>
        <div>
          <p class="muted" style="font-size: 11px; margin: 0 0 6px 0; text-transform: uppercase; letter-spacing: 0.5px;">💰 Total</p>
          <p style="font-weight: 600; margin: 0; font-size: 15px;">${found.total || "-"}</p>
        </div>
      </div>

      <div style="margin-top: 24px; padding-top: 20px; border-top: 2px solid var(--surface);">
        <h4 style="margin: 0 0 16px 0; font-size: 16px; color: #0b2b4a;">📍 Riwayat Perjalanan</h4>
        ${timelineHtml}
      </div>
    </div>
  `;

  wrap.innerHTML = detail;

  const card = wrap.querySelector(".card");
  if (card) {
    card.style.opacity = 0;
    card.style.transform = "translateY(8px)";
    setTimeout(() => {
      card.style.transition = "opacity 360ms ease, transform 360ms ease";
      card.style.opacity = 1;
      card.style.transform = "none";
    }, 20);
  }
}

/* ============================================
   DASHBOARD NOTIFICATIONS
   ============================================ */

/**
 * Generate dashboard notifications
 * @returns {Array} Array of notifications
 */
function generateNotifications() {
  const notifications = [];
  const allItems = getAllItems();

  // Cek stock habis
  const outOfStock = allItems.filter((it) => it.stok === 0);
  if (outOfStock.length > 0) {
    notifications.push({
      text: `⚠️ ${outOfStock.length} item stok habis`,
      type: "danger",
    });
  }

  // Cek stock rendah
  const lowStock = allItems.filter((it) => it.stok > 0 && it.stok < 50);
  if (lowStock.length > 0) {
    notifications.push({
      text: `📦 ${lowStock.length} item stok rendah (< 50)`,
      type: "warning",
    });
  }

  // Cek tracking in progress
  const tracking = getDataTrackingObj();
  let inProgressCount = Object.values(tracking).filter(
    (t) => t.status === "Dalam Perjalanan",
  ).length;
  if (inProgressCount > 0) {
    notifications.push({
      text: `🚚 ${inProgressCount} pengiriman sedang dalam proses`,
      type: "info",
    });
  }

  // Cek tracking selesai
  let completedCount = Object.values(tracking).filter(
    (t) => t.status === "Dikirim",
  ).length;
  if (completedCount > 0) {
    notifications.push({
      text: `✓ ${completedCount} pengiriman sudah selesai`,
      type: "success",
    });
  }

  return notifications.slice(0, 5);
}

/**
 * Update dashboard notifications
 */
function updateDashboardNotifications() {
  const notifSection = document.getElementById("notificationsContainer");
  if (!notifSection) return;

  const notifs = generateNotifications();

  if (notifs.length === 0) {
    notifSection.innerHTML =
      '<p class="muted">✓ Tidak ada notifikasi baru.</p>';
    return;
  }

  notifSection.innerHTML =
    '<ul style="list-style: none; padding: 0; margin: 0;">' +
    notifs
      .map(
        (n) =>
          `<li style="padding: 8px 0; border-bottom: 1px solid #eef3fb;">
        <span class="badge badge-${n.type}">${n.text}</span>
      </li>`,
      )
      .join("") +
    "</ul>";
}

/**
 * Update dashboard statistics
 */
function updateDashboardStats() {
  // Total DO
  const tracking = getDataTrackingObj();
  const totalDO = Object.keys(tracking).length;
  const totalDOEl = document.getElementById("totalDO");
  if (totalDOEl) totalDOEl.textContent = totalDO;

  // Delayed shipment
  const delayedCount = Object.values(tracking).filter(
    (t) => t.status === "Dalam Perjalanan",
  ).length;
  const delayedEl = document.getElementById("delayedShipment");
  if (delayedEl) delayedEl.textContent = delayedCount;

  // Low stock count
  const allItems = getAllItems();
  const lowStockCount = allItems.filter(
    (it) => it.stok > 0 && it.stok < 50,
  ).length;
  const lowStockEl = document.getElementById("lowStockCount");
  if (lowStockEl) lowStockEl.textContent = lowStockCount;
}

/* ============================================
   UTILITY FUNCTIONS
   ============================================ */

/**
 * Toggle collapse element
 * @param {string} id - Element ID
 */
function toggleCollapse(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.style.display = el.style.display === "block" ? "none" : "block";
}

/**
 * Show not available feature message
 * @param {string} feature - Feature name
 */
function showNotAvailable(feature) {
  showToast(`🔒 "${feature}" belum tersedia`, {
    type: "info",
    duration: 2500,
  });
}

/* ============================================
   INITIALIZATION (DOMContentLoaded)
   ============================================ */

document.addEventListener("DOMContentLoaded", () => {
  // Check authentication
  checkAuthOrRedirect();

  // Animated init
  document.body.classList.add("animated-init");
  const animItems = Array.from(
    document.querySelectorAll(
      ".card, .stat, .topbar, .main-header, .nav-link, .user-card",
    ),
  );
  animItems.forEach((el, i) =>
    setTimeout(() => el.classList.add("enter"), i * 80),
  );
  setTimeout(
    () => {
      document.body.classList.remove("animated-init");
      animItems.forEach((el) => el.classList.remove("enter"));
    },
    Math.max(600, animItems.length * 80) + 200,
  );

  // Dashboard initialization
  if (document.body.classList.contains("dashboard-page")) {
    setGreeting();
    computeTotalStock();
    updateDashboardStats();
    updateDashboardNotifications();
  }

  // Stock table initialization
  if (document.querySelector("#stockTable")) {
    populateStockTable();
    computeTotalStock();
  }

  // Tracking input enter key
  const doInput = document.getElementById("doInput");
  if (doInput) {
    doInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") searchDO();
    });
  }

  // Overlay click to close modals
  const overlay = document.getElementById("overlay");
  if (overlay) overlay.addEventListener("click", closeAllModals);

  // Login form enter key
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("keydown", (e) => {
      if (e.key === "Enter") verifyLogin();
    });
  }
});
