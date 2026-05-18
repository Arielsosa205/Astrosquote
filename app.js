(function () {
  "use strict";

  const LOCAL_KEY = "supplier-quotes-online-v1";
  const LANG_KEY = "supplier-quotes-language-v1";
  const AUTH_KEY = "supplier-quotes-auth-v1";
  const API_QUOTES = "/.netlify/functions/quotes";
  const API_IMAGES = "/.netlify/functions/images";
  const API_AUTH_CONFIG = "/.netlify/functions/auth-config";
  const SIZE_KEYS = ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"];
  const QUOTE_STATUSES = ["Draft", "Sent", "Quoted", "Confirmed", "Archived"];
  const PRODUCT_STATUSES = ["To quote", "Quoted", "Confirmed", "Discarded"];
  const IMAGE_MAX_SIZE = 1400;
  const IMAGE_IMPORT_MAX_SIZE = 1100;
  const IMAGE_WEBP_QUALITY = .78;
  const I18N = {
    en: {
      appTitle: "Supplier quotes",
      language: "Language",
      localMode: "Local mode",
      onlineSaving: "Online saving",
      newQuote: "New quote",
      history: "History",
      save: "Save",
      saving: "Saving...",
      guide: "Guide",
      manual: "Manual",
      skip: "Skip",
      back: "Back",
      next: "Next",
      done: "Done",
      importHtml: "Import HTML",
      exportBackup: "Export backup",
      quotes: "Quotes",
      products: "Products",
      photos: "Photos",
      total: "Total",
      refresh: "Refresh",
      quoteName: "Quote name",
      quoteNamePlaceholder: "Quote 1",
      status: "Status",
      supplier: "Supplier",
      supplierPlaceholder: "Supplier name",
      addProduct: "Add product",
      emailPlaceholder: "Email",
      sendLoginLink: "Sign in",
      sendingLoginLink: "Sending...",
      logout: "Log out",
      loginLinkSent: "Check your email to sign in",
      loginError: "Could not send sign-in link",
      signedOut: "Signed out",
      authRequired: "Sign in to save online history",
      guestMode: "Guest quote",
      guestLink: "Guest link",
      guestLinkCopied: "Guest link copied",
      guestLinkPrompt: "Copy this guest link",
      guestLinkError: "Could not create guest link",
      globalDrop: "Drop, tap, or paste photos here to create a new product. Select a product first to add more photos to it.",
      emptyState: "Create a quote or add product photos to start.",
      noQuotes: "No quotes yet",
      untitledQuote: "Untitled quote",
      productWord: "products",
      shortDescription: "Short description",
      duplicate: "Duplicate",
      delete: "Delete",
      deleteQuote: "Delete quote",
      deleteQuoteConfirm: "Delete this quote",
      quoteDeleted: "Quote deleted",
      deleteQuoteError: "Could not delete quote",
      removePhoto: "Remove photo",
      photoDrop: "Tap, drop, or paste photos here",
      priceInclShipping: "Price incl. shipping",
      availableSizes: "Available sizes",
      availableSizesPlaceholder: "Ex: M-5XL / M up to 5XL",
      availableColors: "Available colors",
      availableColorsPlaceholder: "Ex: red embroidery, blue embroidery",
      sizeChart: "Size chart",
      request: "Request",
      measurements: "Measurements / size chart link",
      measurementsPlaceholder: "Ex: S bust 84, M bust 88...",
      quantityBySize: "Quantity by size",
      units: "Units",
      imagePreview: "Image preview",
      importError: "Could not import that file",
      importNotStoredLocal: "Imported, but too large for local browser storage. Sign in and save online before closing.",
      openError: "Could not open quote",
      savedOnline: "Quote saved online",
      saveOnlineError: "Could not save online. Kept locally.",
      savedLocal: "Quote saved locally",
      photoAddedTo: "Photos added to",
      productCreated: "Product created",
      productWithMultiplePhotos: "Product with multiple photos",
      deleteConfirmPrefix: "Delete",
      deleteConfirmFallback: "this product",
      copySuffix: "copy",
      importedAsQuote: "Imported as quote",
      importedPrefix: "Imported",
      quotePrefix: "Quote",
      statusDraft: "Draft",
      statusSent: "Sent",
      statusQuoted: "Quoted",
      statusConfirmed: "Confirmed",
      statusArchived: "Archived",
      statusToQuote: "To quote",
      statusDiscarded: "Discarded"
    },
    zh: {
      appTitle: "供应商报价",
      language: "语言",
      localMode: "本地模式",
      onlineSaving: "在线保存",
      newQuote: "新报价",
      history: "历史记录",
      save: "保存",
      saving: "保存中...",
      guide: "指南",
      manual: "手册",
      skip: "跳过",
      back: "上一步",
      next: "下一步",
      done: "完成",
      importHtml: "导入 HTML",
      exportBackup: "导出备份",
      quotes: "报价",
      products: "产品",
      photos: "图片",
      total: "总计",
      refresh: "刷新",
      quoteName: "报价名称",
      quoteNamePlaceholder: "报价 1",
      status: "状态",
      supplier: "供应商",
      supplierPlaceholder: "供应商名称",
      addProduct: "添加产品",
      emailPlaceholder: "Email",
      sendLoginLink: "Sign in",
      sendingLoginLink: "Sending...",
      logout: "Log out",
      loginLinkSent: "Check your email to sign in",
      loginError: "Could not send sign-in link",
      signedOut: "Signed out",
      authRequired: "Sign in to save online history",
      guestMode: "Guest quote",
      guestLink: "Guest link",
      guestLinkCopied: "Guest link copied",
      guestLinkPrompt: "Copy this guest link",
      guestLinkError: "Could not create guest link",
      globalDrop: "把图片拖放或粘贴到这里可创建新产品。先点击某个产品，再粘贴图片可添加到该产品。",
      emptyState: "创建报价或添加产品图片开始。",
      noQuotes: "暂无报价",
      untitledQuote: "未命名报价",
      productWord: "个产品",
      shortDescription: "简短描述",
      duplicate: "复制",
      delete: "删除",
      deleteQuote: "Delete quote",
      deleteQuoteConfirm: "Delete this quote",
      quoteDeleted: "Quote deleted",
      deleteQuoteError: "Could not delete quote",
      removePhoto: "删除图片",
      photoDrop: "添加、拖放或粘贴图片到这里",
      priceInclShipping: "含运费价格",
      availableSizes: "可供尺码",
      availableSizesPlaceholder: "例：M-5XL / M 到 5XL",
      availableColors: "可供颜色",
      availableColorsPlaceholder: "例：红色刺绣、蓝色刺绣",
      sizeChart: "尺码表",
      request: "需要",
      measurements: "尺寸 / 尺码表链接",
      measurementsPlaceholder: "例：S 胸围84，M 胸围88...",
      quantityBySize: "按尺码数量",
      units: "件数",
      imagePreview: "图片预览",
      importError: "无法导入该文件",
      importNotStoredLocal: "Imported, but too large for local browser storage. Sign in and save online before closing.",
      openError: "无法打开报价",
      savedOnline: "报价已在线保存",
      saveOnlineError: "无法在线保存，已保存在本地。",
      savedLocal: "报价已保存在本地",
      photoAddedTo: "图片已添加到",
      productCreated: "产品已创建",
      productWithMultiplePhotos: "多图产品",
      deleteConfirmPrefix: "删除",
      deleteConfirmFallback: "这个产品",
      copySuffix: "副本",
      importedAsQuote: "已导入为报价",
      importedPrefix: "已导入",
      quotePrefix: "报价",
      statusDraft: "草稿",
      statusSent: "已发送",
      statusQuoted: "已报价",
      statusConfirmed: "已确认",
      statusArchived: "已归档",
      statusToQuote: "待报价",
      statusDiscarded: "已放弃"
    }
  };
  const STATUS_KEYS = {
    Draft: "statusDraft",
    Sent: "statusSent",
    Quoted: "statusQuoted",
    Confirmed: "statusConfirmed",
    Archived: "statusArchived",
    "To quote": "statusToQuote",
    Discarded: "statusDiscarded"
  };
  const TOUR_STEPS = [
    {
      selector: "#authForm",
      en: ["Sign in", "Enter your email to receive a magic link. Once signed in, your online quote history is private to your user."],
      zh: ["登录", "输入邮箱接收登录链接。登录后，线上报价历史只属于当前用户。"]
    },
    {
      selector: "#languageSelect",
      en: ["Language", "Switch the app between English and Chinese at any time."],
      zh: ["语言", "可以随时在英文和中文之间切换界面。"]
    },
    {
      selector: "#newQuoteBtn",
      en: ["New quote", "Start a fresh supplier quote. Each saved quote appears in your History."],
      zh: ["新报价", "创建新的供应商报价。保存后会出现在你的历史记录中。"]
    },
    {
      selector: ".quote-list-panel",
      en: ["History", "Open previous quotes, refresh online data, or delete quotes you created by mistake."],
      zh: ["历史记录", "打开以前的报价，刷新线上数据，或删除误创建的报价。"]
    },
    {
      selector: ".quote-header",
      en: ["Quote details", "Name the quote, choose its status, and record the supplier name before adding products."],
      zh: ["报价信息", "填写报价名称、状态和供应商名称，然后添加产品。"]
    },
    {
      selector: "#globalDrop",
      en: ["Photo intake", "Drop, paste, or tap here to create a new product directly from photos."],
      zh: ["添加图片", "拖放、粘贴或点击这里，可以直接用图片创建新产品。"]
    },
    {
      selector: "#addProductBtn",
      en: ["Product lines", "Add products manually, then fill in description, supplier price, sizes, colors, measurements, and quantities."],
      zh: ["产品行", "手动添加产品后，填写描述、供应商价格、尺码、颜色、尺寸信息和数量。"]
    },
    {
      selector: "#addPhotosBtn",
      en: ["More photos", "Select a product first, then use Photos to add images to that product on desktop or mobile."],
      zh: ["更多图片", "先选择一个产品，再用图片按钮在电脑或手机上为该产品添加图片。"]
    },
    {
      selector: "#shareGuestBtn",
      en: ["Guest link", "After signing in and saving online, create a link that opens only this quote for a guest."],
      zh: ["访客链接", "登录并线上保存后，可以生成只打开当前报价的访客链接。"]
    },
    {
      selector: "#saveQuoteBtn",
      en: ["Save", "Save keeps your work locally when offline and online in your private history when signed in."],
      zh: ["保存", "离线时保存到本地；登录后保存到你的私人线上历史记录。"]
    },
    {
      selector: "#exportBtn",
      en: ["Backup", "Export a JSON backup whenever you want an extra copy or need to move quotes between users."],
      zh: ["备份", "可随时导出 JSON 备份，也可用于在不同用户之间移动报价。"]
    }
  ];
  const MANUALS = {
    en: [
      {
        title: "1. Sign in and history",
        items: [
          "Enter your email and open the magic link to use private online history.",
          "If the chip says Local mode, quotes are stored only in this browser.",
          "If the chip says Online saving, quotes are stored in Supabase under your user.",
          "If the chip says Guest quote, the visitor can open only the shared quote."
        ]
      },
      {
        title: "2. Create and manage quotes",
        items: [
          "Use New quote to start a new budget request.",
          "Use History to reopen saved quotes.",
          "Use the delete button in History to remove quotes created by mistake.",
          "Use Save after important changes, especially before sharing a guest link."
        ]
      },
      {
        title: "3. Products and photos",
        items: [
          "Add product creates an empty product line.",
          "Drop, paste, or tap photos to create a product from images.",
          "Select a product before using Photos to add more images to that product.",
          "Fill price, available sizes, colors, measurements, and quantity by size."
        ]
      },
      {
        title: "4. Sharing and backups",
        items: [
          "Guest link creates a private link for one quote only.",
          "Guests do not see your full history.",
          "Export backup downloads all quotes currently loaded in the app.",
          "Import HTML/JSON restores a previous backup as a quote."
        ]
      }
    ],
    zh: [
      {
        title: "1. 登录和历史记录",
        items: [
          "输入邮箱并打开登录链接，即可使用个人线上历史记录。",
          "如果状态显示 Local mode，报价只保存在当前浏览器。",
          "如果状态显示 Online saving，报价会保存在 Supabase，并归属于当前用户。",
          "如果状态显示 Guest quote，访客只能打开被分享的单个报价。"
        ]
      },
      {
        title: "2. 创建和管理报价",
        items: [
          "点击 New quote 创建新的报价。",
          "在 History 中打开已保存的报价。",
          "如果误创建报价，可以在 History 中点击删除按钮。",
          "重要修改后请点击 Save，分享访客链接前也需要先保存。"
        ]
      },
      {
        title: "3. 产品和图片",
        items: [
          "Add product 会创建一个空的产品行。",
          "拖放、粘贴或点击图片区域，可以从图片创建产品。",
          "先选择某个产品，再用 Photos 为该产品添加更多图片。",
          "填写价格、可用尺码、颜色、尺寸信息和每个尺码的数量。"
        ]
      },
      {
        title: "4. 分享和备份",
        items: [
          "Guest link 会生成只允许访问当前报价的链接。",
          "访客看不到你的完整历史记录。",
          "Export backup 会下载当前 app 中的全部报价数据。",
          "Import HTML/JSON 可以把旧备份恢复成报价。"
        ]
      }
    ]
  };

  const els = {
    modeChip: document.getElementById("modeChip"),
    authForm: document.getElementById("authForm"),
    authEmail: document.getElementById("authEmail"),
    authSubmitBtn: document.getElementById("authSubmitBtn"),
    authUser: document.getElementById("authUser"),
    authLogoutBtn: document.getElementById("authLogoutBtn"),
    languageSelect: document.getElementById("languageSelect"),
    newQuoteBtn: document.getElementById("newQuoteBtn"),
    historyBtn: document.getElementById("historyBtn"),
    saveQuoteBtn: document.getElementById("saveQuoteBtn"),
    guideBtn: document.getElementById("guideBtn"),
    manualBtn: document.getElementById("manualBtn"),
    importBtn: document.getElementById("importBtn"),
    exportBtn: document.getElementById("exportBtn"),
    refreshBtn: document.getElementById("refreshBtn"),
    addProductBtn: document.getElementById("addProductBtn"),
    addPhotosBtn: document.getElementById("addPhotosBtn"),
    shareGuestBtn: document.getElementById("shareGuestBtn"),
    quoteList: document.getElementById("quoteList"),
    quoteName: document.getElementById("quoteName"),
    quoteStatus: document.getElementById("quoteStatus"),
    supplierName: document.getElementById("supplierName"),
    globalDrop: document.getElementById("globalDrop"),
    productList: document.getElementById("productList"),
    emptyState: document.getElementById("emptyState"),
    imageInput: document.getElementById("imageInput"),
    importInput: document.getElementById("importInput"),
    statQuotes: document.getElementById("statQuotes"),
    statProducts: document.getElementById("statProducts"),
    statPhotos: document.getElementById("statPhotos"),
    statTotal: document.getElementById("statTotal"),
    toast: document.getElementById("toast"),
    lightbox: document.getElementById("lightbox"),
    lightboxStage: document.getElementById("lightboxStage"),
    lightboxTitle: document.getElementById("lightboxTitle"),
    lightboxClose: document.getElementById("lightboxClose"),
    lightboxPrev: document.getElementById("lightboxPrev"),
    lightboxNext: document.getElementById("lightboxNext"),
    lightboxImage: document.getElementById("lightboxImage"),
    lightboxCounter: document.getElementById("lightboxCounter"),
    tourLayer: document.getElementById("tourLayer"),
    tourCard: document.getElementById("tourCard"),
    tourProgress: document.getElementById("tourProgress"),
    tourTitle: document.getElementById("tourTitle"),
    tourBody: document.getElementById("tourBody"),
    tourSkipBtn: document.getElementById("tourSkipBtn"),
    tourPrevBtn: document.getElementById("tourPrevBtn"),
    tourNextBtn: document.getElementById("tourNextBtn"),
    manualModal: document.getElementById("manualModal"),
    manualCloseBtn: document.getElementById("manualCloseBtn"),
    manualEnglishBtn: document.getElementById("manualEnglishBtn"),
    manualChineseBtn: document.getElementById("manualChineseBtn"),
    manualContent: document.getElementById("manualContent")
  };

  let state = {
    cloud: false,
    authConfig: { configured: false, supabaseUrl: "", supabaseAnonKey: "" },
    session: loadStoredSession(),
    user: null,
    guestToken: new URLSearchParams(window.location.search).get("guest") || "",
    language: localStorage.getItem(LANG_KEY) || "en",
    tourIndex: 0,
    manualLanguage: localStorage.getItem(LANG_KEY) || "en",
    quotes: [],
    currentQuoteId: "",
    pasteTargetProductId: "",
    fileTargetProductId: "",
    lightbox: { productId: "", index: 0 },
    dirty: false
  };

  init();

  async function init() {
    wireEvents();
    els.languageSelect.value = state.language;
    applyLanguage();
    await loadAuthConfig();
    await handleAuthRedirect();
    await loadUser();
    updateAuthUI();
    await loadQuotes();
    if (!state.quotes.length && !state.guestToken) {
      const quote = createQuote();
      state.quotes.push(quote);
      state.currentQuoteId = quote.id;
      persistLocal();
    }
    if (!state.currentQuoteId && state.quotes[0]) state.currentQuoteId = state.quotes[0].id;
    render();
  }

  function wireEvents() {
    els.authForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      await sendLoginLink();
    });
    els.authLogoutBtn.addEventListener("click", signOut);

    els.newQuoteBtn.addEventListener("click", async () => {
      if (state.guestToken) return;
      const quote = createQuote();
      state.quotes.unshift(quote);
      state.currentQuoteId = quote.id;
      state.pasteTargetProductId = "";
      state.dirty = true;
      persistLocal();
      render();
      await saveCurrentQuote();
    });

    els.languageSelect.addEventListener("change", () => {
      state.language = els.languageSelect.value;
      localStorage.setItem(LANG_KEY, state.language);
      applyLanguage();
      render();
    });

    els.historyBtn.addEventListener("click", () => {
      document.querySelector(".quote-list-panel")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    els.saveQuoteBtn.addEventListener("click", saveCurrentQuote);
    els.guideBtn.addEventListener("click", startTour);
    els.manualBtn.addEventListener("click", () => openManual(state.language));
    els.tourSkipBtn.addEventListener("click", closeTour);
    els.tourPrevBtn.addEventListener("click", () => stepTour(-1));
    els.tourNextBtn.addEventListener("click", () => stepTour(1));
    els.manualCloseBtn.addEventListener("click", closeManual);
    els.manualEnglishBtn.addEventListener("click", () => setManualLanguage("en"));
    els.manualChineseBtn.addEventListener("click", () => setManualLanguage("zh"));
    els.manualModal.addEventListener("click", (event) => {
      if (event.target === els.manualModal) closeManual();
    });
    els.refreshBtn.addEventListener("click", loadAndRender);
    els.importBtn.addEventListener("click", () => els.importInput.click());
    els.exportBtn.addEventListener("click", exportBackup);
    els.addProductBtn.addEventListener("click", () => {
      const quote = currentQuote();
      if (!quote) return;
      const product = createProduct(quote);
      quote.products.unshift(product);
      state.pasteTargetProductId = product.id;
      markDirty();
      render();
    });
    els.addPhotosBtn.addEventListener("click", () => openImagePicker(state.pasteTargetProductId));
    els.shareGuestBtn.addEventListener("click", createGuestLink);

    els.quoteName.addEventListener("input", () => {
      const quote = currentQuote();
      if (!quote) return;
      quote.name = els.quoteName.value;
      markDirty();
      renderQuoteList();
    });

    els.quoteStatus.addEventListener("change", () => {
      const quote = currentQuote();
      if (!quote) return;
      quote.status = els.quoteStatus.value;
      markDirty();
      renderQuoteList();
    });

    els.supplierName.addEventListener("input", () => {
      const quote = currentQuote();
      if (!quote) return;
      quote.supplierName = els.supplierName.value;
      markDirty();
    });

    els.imageInput.addEventListener("change", async (event) => {
      const files = Array.from(event.target.files || []);
      event.target.value = "";
      const productId = state.fileTargetProductId;
      state.fileTargetProductId = "";
      if (files.length) await addFilesToTarget(files, productId);
    });

    els.importInput.addEventListener("change", async (event) => {
      const file = event.target.files && event.target.files[0];
      event.target.value = "";
      if (!file) return;
      try {
        await importFile(file);
      } catch (error) {
        console.warn(error);
        showToast(t("importError"));
      }
    });

    setupDrop(els.globalDrop, async (files) => {
      state.pasteTargetProductId = "";
      if (files.length) await addFilesToTarget(files, "");
    });
    els.globalDrop.addEventListener("click", () => {
      state.pasteTargetProductId = "";
      renderPasteTarget();
      openImagePicker("");
    });
    els.globalDrop.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      state.pasteTargetProductId = "";
      renderPasteTarget();
      openImagePicker("");
    });

    preventUnhandledImageDrops();

    document.addEventListener("paste", async (event) => {
      const files = Array.from(event.clipboardData?.files || []).filter(isImageFile);
      if (!files.length) return;
      event.preventDefault();
      await addFilesToTarget(files);
    });

    document.addEventListener("click", (event) => {
      if (!event.target.closest(".product")) {
        state.pasteTargetProductId = "";
        renderPasteTarget();
      }
    });

    els.productList.addEventListener("input", (event) => {
      const field = event.target.dataset.field;
      if (!field) return;
      const card = event.target.closest(".product");
      const product = productById(card?.dataset.id);
      if (!product) return;
      const value = event.target.type === "checkbox" ? event.target.checked : event.target.value;
      setProductField(product, field, value);
      markDirty();
      updateProductTotals(card, product);
      renderStats();
      renderQuoteList();
    });

    els.productList.addEventListener("change", (event) => {
      const field = event.target.dataset.field;
      if (!field) return;
      const card = event.target.closest(".product");
      const product = productById(card?.dataset.id);
      if (!product) return;
      const value = event.target.type === "checkbox" ? event.target.checked : event.target.value;
      setProductField(product, field, value);
      markDirty();
      updateProductTotals(card, product);
      renderStats();
      renderQuoteList();
    });

    els.productList.addEventListener("click", (event) => {
      const card = event.target.closest(".product");
      if (!card) return;
      state.pasteTargetProductId = card.dataset.id;
      renderPasteTarget();

      const product = productById(card.dataset.id);
      if (!product) return;
      const action = event.target.closest("[data-action]")?.dataset.action;
      if (action === "add-images") return openImagePicker(product.id);
      if (action === "delete-product") return deleteProduct(product.id);
      if (action === "duplicate-product") return duplicateProduct(product.id);
      if (action === "remove-image") {
        const thumb = event.target.closest(".thumb");
        if (thumb) return removeImage(product.id, thumb.dataset.imageId);
      }

      const thumb = event.target.closest(".thumb");
      if (thumb && event.target.tagName === "IMG") openLightbox(product.id, thumb.dataset.imageId);
    });

    els.lightboxClose.addEventListener("click", closeLightbox);
    els.lightboxPrev.addEventListener("click", () => stepLightbox(-1));
    els.lightboxNext.addEventListener("click", () => stepLightbox(1));
    els.lightbox.addEventListener("click", (event) => {
      if (event.target === els.lightbox || event.target === els.lightboxStage) closeLightbox();
    });
    document.addEventListener("keydown", (event) => {
      if (!els.tourLayer.hidden) {
        if (event.key === "Escape") closeTour();
        if (event.key === "ArrowLeft") stepTour(-1);
        if (event.key === "ArrowRight") stepTour(1);
        return;
      }
      if (!els.manualModal.hidden && event.key === "Escape") {
        closeManual();
        return;
      }
      if (!els.lightbox.classList.contains("is-open")) return;
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowLeft") stepLightbox(-1);
      if (event.key === "ArrowRight") stepLightbox(1);
    });
  }

  async function loadAuthConfig() {
    try {
      const response = await fetch(API_AUTH_CONFIG, { headers: { accept: "application/json" } });
      if (!response.ok) throw new Error("Auth config unavailable");
      const payload = await response.json();
      state.authConfig = {
        configured: Boolean(payload.configured && payload.supabaseUrl && payload.supabaseAnonKey),
        supabaseUrl: String(payload.supabaseUrl || ""),
        supabaseAnonKey: String(payload.supabaseAnonKey || "")
      };
    } catch (error) {
      state.authConfig = { configured: false, supabaseUrl: "", supabaseAnonKey: "" };
    }
  }

  async function handleAuthRedirect() {
    const params = new URLSearchParams(window.location.hash.replace(/^#/, ""));
    if (!params.get("access_token")) return;
    state.session = {
      accessToken: params.get("access_token"),
      refreshToken: params.get("refresh_token") || "",
      tokenType: params.get("token_type") || "bearer",
      expiresAt: Math.floor(Date.now() / 1000) + Number(params.get("expires_in") || 3600)
    };
    saveStoredSession();
    const cleanUrl = `${window.location.origin}${window.location.pathname}${window.location.search}`;
    window.history.replaceState({}, document.title, cleanUrl);
  }

  async function loadUser() {
    if (!state.session?.accessToken || !(await ensureSession())) {
      state.user = null;
      return;
    }
    const payload = parseJwt(state.session.accessToken);
    state.user = payload?.sub ? { id: payload.sub, email: payload.email || "" } : null;
  }

  async function sendLoginLink() {
    const email = els.authEmail.value.trim();
    if (!email) {
      els.authEmail.focus();
      return;
    }
    if (!state.authConfig.configured) await loadAuthConfig();
    if (!state.authConfig.configured) {
      showToast(t("loginError"));
      return;
    }
    els.authSubmitBtn.textContent = t("sendingLoginLink");
    els.authSubmitBtn.disabled = true;
    try {
      const redirectTo = `${window.location.origin}${window.location.pathname}`;
      const response = await fetch(`${state.authConfig.supabaseUrl}/auth/v1/otp`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({
          email,
          create_user: true,
          redirect_to: redirectTo,
          options: { redirectTo }
        })
      });
      if (!response.ok) throw new Error(await responseError(response));
      showToast(t("loginLinkSent"));
    } catch (error) {
      console.warn(error);
      showToast(error.message ? `${t("loginError")}: ${error.message}` : t("loginError"));
    } finally {
      els.authSubmitBtn.textContent = t("sendLoginLink");
      els.authSubmitBtn.disabled = false;
    }
  }

  async function signOut() {
    if (state.authConfig.configured && state.session?.accessToken) {
      fetch(`${state.authConfig.supabaseUrl}/auth/v1/logout`, {
        method: "POST",
        headers: authHeaders(state.session.accessToken)
      }).catch(() => {});
    }
    state.session = null;
    state.user = null;
    clearStoredSession();
    await loadQuotes();
    render();
    showToast(t("signedOut"));
  }

  async function ensureSession() {
    if (!state.session?.accessToken || !state.authConfig.configured) return false;
    const now = Math.floor(Date.now() / 1000);
    if (state.session.expiresAt && state.session.expiresAt > now + 90) return true;
    if (!state.session.refreshToken) return false;
    try {
      const response = await fetch(`${state.authConfig.supabaseUrl}/auth/v1/token?grant_type=refresh_token`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({ refresh_token: state.session.refreshToken })
      });
      if (!response.ok) throw new Error(await response.text());
      const payload = await response.json();
      state.session = {
        accessToken: payload.access_token,
        refreshToken: payload.refresh_token || state.session.refreshToken,
        tokenType: payload.token_type || "bearer",
        expiresAt: Math.floor(Date.now() / 1000) + Number(payload.expires_in || 3600)
      };
      saveStoredSession();
      return true;
    } catch (error) {
      console.warn(error);
      state.session = null;
      state.user = null;
      clearStoredSession();
      return false;
    }
  }

  function authHeaders(accessToken = "") {
    const headers = {
      apikey: state.authConfig.supabaseAnonKey,
      "content-type": "application/json"
    };
    if (accessToken) headers.authorization = `Bearer ${accessToken}`;
    return headers;
  }

  async function apiFetch(url, options = {}) {
    const headers = { ...(options.headers || {}) };
    if (state.guestToken) {
      headers["x-guest-token"] = state.guestToken;
    } else if (await ensureSession()) {
      headers.authorization = `Bearer ${state.session.accessToken}`;
    }
    return fetch(url, { ...options, headers });
  }

  async function responseError(response) {
    const text = await response.text();
    try {
      const payload = JSON.parse(text);
      return payload.msg || payload.error_description || payload.error || text || response.statusText;
    } catch (error) {
      return text || response.statusText;
    }
  }

  function loadStoredSession() {
    try {
      const raw = localStorage.getItem(AUTH_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (error) {
      return null;
    }
  }

  function saveStoredSession() {
    if (state.session) localStorage.setItem(AUTH_KEY, JSON.stringify(state.session));
  }

  function clearStoredSession() {
    localStorage.removeItem(AUTH_KEY);
  }

  function parseJwt(token) {
    try {
      const payload = token.split(".")[1];
      const normalized = payload.replace(/-/g, "+").replace(/_/g, "/");
      const padded = normalized.padEnd(normalized.length + (4 - normalized.length % 4) % 4, "=");
      return JSON.parse(atob(padded));
    } catch (error) {
      return null;
    }
  }

  function updateAuthUI() {
    const isGuest = Boolean(state.guestToken);
    const isSignedIn = Boolean(state.user && !isGuest);
    els.authForm.hidden = isGuest;
    els.authEmail.hidden = isGuest || isSignedIn;
    els.authSubmitBtn.hidden = isGuest || isSignedIn;
    els.authUser.textContent = isGuest ? t("guestMode") : (isSignedIn ? state.user.email : "");
    els.authLogoutBtn.hidden = !isSignedIn;
    els.newQuoteBtn.disabled = isGuest;
    els.historyBtn.disabled = isGuest;
    els.shareGuestBtn.hidden = isGuest;
  }

  function startTour() {
    state.tourIndex = 0;
    els.tourLayer.hidden = false;
    renderTour();
  }

  function stepTour(direction) {
    const nextIndex = state.tourIndex + direction;
    if (nextIndex < 0) return;
    if (nextIndex >= TOUR_STEPS.length) {
      closeTour();
      return;
    }
    state.tourIndex = nextIndex;
    renderTour();
  }

  function renderTour() {
    document.querySelector(".is-tour-target")?.classList.remove("is-tour-target");
    const step = TOUR_STEPS[state.tourIndex];
    const text = step[state.language] || step.en;
    const target = visibleElement(step.selector);

    els.tourProgress.textContent = `${state.tourIndex + 1} / ${TOUR_STEPS.length}`;
    els.tourTitle.textContent = text[0];
    els.tourBody.textContent = text[1];
    els.tourPrevBtn.disabled = state.tourIndex === 0;
    els.tourNextBtn.textContent = state.tourIndex === TOUR_STEPS.length - 1 ? t("done") : t("next");

    if (target) {
      target.classList.add("is-tour-target");
      target.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
    }
    requestAnimationFrame(() => positionTourCard(target));
  }

  function positionTourCard(target) {
    const card = els.tourCard;
    const margin = 14;
    const width = card.offsetWidth;
    const height = card.offsetHeight;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    if (!target) {
      card.style.left = `${Math.max(margin, (viewportWidth - width) / 2)}px`;
      card.style.top = `${Math.max(margin, (viewportHeight - height) / 2)}px`;
      return;
    }

    const rect = target.getBoundingClientRect();
    let left = Math.min(Math.max(margin, rect.left), viewportWidth - width - margin);
    let top = rect.bottom + 12;
    if (top + height > viewportHeight - margin) top = rect.top - height - 12;
    if (top < margin) top = Math.min(viewportHeight - height - margin, rect.bottom + 12);
    if (top < margin) top = margin;

    card.style.left = `${left}px`;
    card.style.top = `${top}px`;
  }

  function closeTour() {
    els.tourLayer.hidden = true;
    document.querySelector(".is-tour-target")?.classList.remove("is-tour-target");
  }

  function visibleElement(selector) {
    const node = document.querySelector(selector);
    if (!node) return null;
    const rect = node.getBoundingClientRect();
    if (!rect.width || !rect.height) return null;
    return node;
  }

  function openManual(language = state.language) {
    setManualLanguage(language === "zh" ? "zh" : "en");
    els.manualModal.hidden = false;
  }

  function closeManual() {
    els.manualModal.hidden = true;
  }

  function setManualLanguage(language) {
    state.manualLanguage = language;
    els.manualEnglishBtn.classList.toggle("active", language === "en");
    els.manualChineseBtn.classList.toggle("active", language === "zh");
    renderManual();
  }

  function renderManual() {
    const sections = MANUALS[state.manualLanguage] || MANUALS.en;
    els.manualContent.innerHTML = sections.map((section) => `
      <section class="manual-section">
        <h3>${escapeHtml(section.title)}</h3>
        <ul>
          ${section.items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
        </ul>
      </section>
    `).join("");
  }

  async function loadAndRender() {
    await loadQuotes();
    render();
  }

  async function loadQuotes() {
    const local = loadLocal();
    state.quotes = state.guestToken ? [] : local.quotes;
    state.currentQuoteId = state.guestToken ? "" : local.currentQuoteId;
    state.cloud = false;

    try {
      const response = await apiFetch(API_QUOTES, { headers: { accept: "application/json" } });
      if (!response.ok) throw new Error("Cloud API not available");
      const payload = await response.json();
      if (!Array.isArray(payload.quotes)) throw new Error("Invalid cloud response");
      state.cloud = true;
      state.quotes = payload.quotes.map(normalizeQuoteSummary);
      state.currentQuoteId = state.quotes[0]?.id || "";
      if (state.currentQuoteId) await openQuote(state.currentQuoteId, { silent: true });
    } catch (error) {
      state.cloud = false;
    }

    updateModeChip();
    updateAuthUI();
  }

  function loadLocal() {
    try {
      const raw = localStorage.getItem(localKey());
      if (!raw) return { quotes: [], currentQuoteId: "" };
      const parsed = JSON.parse(raw);
      return {
        quotes: Array.isArray(parsed.quotes) ? parsed.quotes.map(normalizeQuote) : [],
        currentQuoteId: parsed.currentQuoteId || ""
      };
    } catch (error) {
      console.warn(error);
      return { quotes: [], currentQuoteId: "" };
    }
  }

  function persistLocal() {
    if (state.guestToken) return true;
    try {
      localStorage.setItem(localKey(), JSON.stringify({
        quotes: state.quotes,
        currentQuoteId: state.currentQuoteId
      }));
      return true;
    } catch (error) {
      console.warn(error);
      return false;
    }
  }

  function localKey() {
    return state.user?.id && !state.guestToken ? `${LOCAL_KEY}-${state.user.id}` : LOCAL_KEY;
  }

  function updateModeChip() {
    const isGuest = Boolean(state.guestToken);
    els.modeChip.textContent = isGuest ? t("guestMode") : (state.cloud ? t("onlineSaving") : t("localMode"));
    els.modeChip.style.color = isGuest || state.cloud ? "#0f766e" : "#92400e";
    els.modeChip.style.background = isGuest || state.cloud ? "#e5f4f1" : "#fff7ed";
    els.modeChip.style.borderColor = isGuest || state.cloud ? "#bfe2dc" : "#fed7aa";
  }

  function applyLanguage() {
    document.documentElement.lang = state.language === "zh" ? "zh-CN" : "en";
    document.title = t("appTitle");
    document.querySelectorAll("[data-i18n]").forEach((node) => {
      node.textContent = t(node.dataset.i18n);
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach((node) => {
      node.placeholder = t(node.dataset.i18nPlaceholder);
    });
    document.querySelectorAll("[data-i18n-aria-label]").forEach((node) => {
      node.setAttribute("aria-label", t(node.dataset.i18nAriaLabel));
    });
    updateAuthUI();
    updateModeChip();
    if (!els.tourLayer.hidden) renderTour();
    if (!els.manualModal.hidden) renderManual();
  }

  function t(key) {
    return I18N[state.language]?.[key] || I18N.en[key] || key;
  }

  function statusLabel(status) {
    return t(STATUS_KEYS[status] || status);
  }

  async function openQuote(id, options = {}) {
    if (state.cloud) {
      try {
        const response = await apiFetch(`${API_QUOTES}?id=${encodeURIComponent(id)}`);
        if (!response.ok) throw new Error("Quote not found");
        const payload = await response.json();
        const fullQuote = normalizeQuote(payload.quote);
        const index = state.quotes.findIndex((quote) => quote.id === id);
        if (index >= 0) state.quotes[index] = fullQuote;
        else state.quotes.unshift(fullQuote);
      } catch (error) {
        console.warn(error);
        if (!options.silent) showToast(t("openError"));
      }
    }
    state.currentQuoteId = id;
    state.pasteTargetProductId = "";
    persistLocal();
    if (!options.silent) render();
  }

  async function saveCurrentQuote() {
    return saveQuote({ shareWithGuest: false });
  }

  async function saveQuote(options = {}) {
    const quote = currentQuote();
    if (!quote) return null;

    quote.updatedAt = new Date().toISOString();
    quote.name = quote.name.trim() || nextQuoteName();
    normalizeQuote(quote);

    if (state.cloud) {
      els.saveQuoteBtn.textContent = t("saving");
      try {
        const cloudQuote = await quoteWithUploadedImages(quote);
        const metrics = quoteMetrics(cloudQuote);
        const method = cloudQuote.id && !cloudQuote.id.startsWith("local-") ? "PUT" : "POST";
        const response = await apiFetch(API_QUOTES, {
          method,
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            id: method === "PUT" ? cloudQuote.id : undefined,
            name: cloudQuote.name,
            status: cloudQuote.status,
            supplier_name: cloudQuote.supplierName,
            product_count: metrics.products,
            photo_count: metrics.photos,
            total: metrics.total,
            share_with_guest: Boolean(options.shareWithGuest),
            data: cloudQuote
          })
        });
        if (!response.ok) throw new Error(await response.text());
        const payload = await response.json();
        const saved = normalizeQuote(payload.quote);
        replaceQuote(saved);
        state.currentQuoteId = saved.id;
        state.dirty = false;
        persistLocal();
        showToast(t("savedOnline"));
        return saved;
      } catch (error) {
        console.warn(error);
        showToast(t("saveOnlineError"));
        persistLocal();
        return null;
      } finally {
        els.saveQuoteBtn.textContent = t("save");
        render();
      }
    }

    state.dirty = false;
    persistLocal();
    render();
    showToast(t("savedLocal"));
    return quote;
  }

  async function createGuestLink() {
    if (!state.user || state.guestToken) {
      showToast(t("authRequired"));
      return;
    }
    const saved = await saveQuote({ shareWithGuest: true });
    const quote = saved || currentQuote();
    if (!quote?.guestToken) {
      showToast(t("guestLinkError"));
      return;
    }
    const url = `${window.location.origin}${window.location.pathname}?guest=${encodeURIComponent(quote.guestToken)}`;
    try {
      await navigator.clipboard.writeText(url);
      showToast(t("guestLinkCopied"));
    } catch (error) {
      window.prompt(t("guestLinkPrompt"), url);
    }
  }

  async function quoteWithUploadedImages(quote) {
    const copy = normalizeQuote(JSON.parse(JSON.stringify(quote)));
    for (const product of copy.products) {
      for (const image of product.images) {
        if (image.src && image.src.startsWith("data:")) {
          const compressed = await compressDataUrlForUpload(image.src);
          image.name = imageFilename(image.name, compressed);
          const uploaded = await uploadDataUrl(compressed, image.name);
          image.src = uploaded.url;
          image.storagePath = uploaded.path;
        }
      }
    }
    return copy;
  }

  async function compressQuoteImages(quote, maxSize = IMAGE_IMPORT_MAX_SIZE) {
    for (const product of quote.products) {
      for (const image of product.images) {
        if (!image.src || !image.src.startsWith("data:image/")) continue;
        try {
          const compressed = await compressImageSource(image.src, maxSize, IMAGE_WEBP_QUALITY);
          if (compressed.length < image.src.length || !image.src.startsWith("data:image/webp")) {
            image.src = compressed;
            image.name = imageFilename(image.name, compressed);
          }
        } catch (error) {
          console.warn(error);
        }
      }
    }
    return quote;
  }

  async function compressDataUrlForUpload(dataUrl) {
    if (!dataUrl.startsWith("data:image/")) return dataUrl;
    try {
      const compressed = await compressImageSource(dataUrl, IMAGE_MAX_SIZE, IMAGE_WEBP_QUALITY);
      return compressed.length < dataUrl.length || !dataUrl.startsWith("data:image/webp") ? compressed : dataUrl;
    } catch (error) {
      console.warn(error);
      return dataUrl;
    }
  }

  async function uploadDataUrl(dataUrl, filename) {
    const match = dataUrl.match(/^data:([^;]+);base64,(.*)$/);
    if (!match) return { url: dataUrl, path: "" };
    const response = await apiFetch(API_IMAGES, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        filename: filename || "photo.jpg",
        mimeType: match[1],
        base64: match[2]
      })
    });
    if (!response.ok) throw new Error(await response.text());
    return response.json();
  }

  function replaceQuote(quote) {
    const index = state.quotes.findIndex((item) => item.id === quote.id || item.id === state.currentQuoteId);
    if (index >= 0) state.quotes[index] = quote;
    else state.quotes.unshift(quote);
  }

  function render() {
    const quote = currentQuote();
    applyLanguage();
    els.quoteName.value = quote?.name || "";
    renderQuoteStatusSelect(quote?.status || "Draft");
    els.supplierName.value = quote?.supplierName || "";
    renderQuoteList();
    renderProducts();
    renderStats();
    updateModeChip();
  }

  function renderQuoteStatusSelect(value) {
    els.quoteStatus.innerHTML = QUOTE_STATUSES
      .map((status) => `<option value="${status}">${statusLabel(status)}</option>`)
      .join("");
    els.quoteStatus.value = value;
  }

  function renderQuoteList() {
    els.quoteList.innerHTML = "";
    if (!state.quotes.length) {
      els.quoteList.innerHTML = `<div class="quote-item"><span>${escapeHtml(t("noQuotes"))}</span></div>`;
      return;
    }

    state.quotes.forEach((quote) => {
      const metrics = quoteMetrics(quote);
      const item = document.createElement("article");
      item.className = "quote-item" + (quote.id === state.currentQuoteId ? " active" : "");
      item.innerHTML = `
        <button class="quote-open" type="button">
          <strong>${escapeHtml(quote.name || t("untitledQuote"))}</strong>
          <span>${escapeHtml(statusLabel(quote.status))} / ${metrics.products} ${escapeHtml(t("productWord"))} / ${formatMoney(metrics.total)}</span>
          <span>${formatDate(quote.updatedAt || quote.createdAt)}</span>
        </button>
        ${state.guestToken ? "" : `<button class="quote-delete" type="button" title="${escapeAttr(t("deleteQuote"))}" aria-label="${escapeAttr(t("deleteQuote"))}">×</button>`}
      `;
      item.querySelector(".quote-open").addEventListener("click", () => openQuote(quote.id));
      item.querySelector(".quote-delete")?.addEventListener("click", () => deleteQuote(quote.id));
      els.quoteList.appendChild(item);
    });
  }

  function renderProducts() {
    const quote = currentQuote();
    els.productList.innerHTML = "";
    if (!quote || !quote.products.length) {
      els.emptyState.classList.add("is-visible");
      return;
    }

    els.emptyState.classList.remove("is-visible");
    quote.products.forEach((product) => {
      const card = document.createElement("article");
      card.className = "product";
      if (state.pasteTargetProductId === product.id) card.classList.add("is-paste-target");
      card.dataset.id = product.id;
      card.innerHTML = productTemplate(product);
      setupDrop(card, async (files) => {
        if (!files.length) return;
        await addFilesToTarget(files, product.id);
      }, card.querySelector(".photo-drop"));
      els.productList.appendChild(card);
    });
  }

  function productTemplate(product) {
    const images = product.images.map((image) => `
      <div class="thumb" data-image-id="${image.id}">
        <img src="${image.src}" alt="${escapeAttr(image.name)}">
        <button type="button" data-action="remove-image" title="${escapeAttr(t("removePhoto"))}">x</button>
      </div>
    `).join("");

    const sizeInputs = SIZE_KEYS.map((size) => `
      <div class="field qty-field">
        <label>${size}</label>
        <input inputmode="numeric" pattern="[0-9]*" data-field="sizes.${size}" value="${escapeAttr(product.sizes[size] || 0)}">
      </div>
    `).join("");

    return `
      <div class="product-head">
        <div class="title-row">
          <input class="code-input" data-field="code" value="${escapeAttr(product.code)}" aria-label="Code">
          <input class="name-input" data-field="name" value="${escapeAttr(product.name)}" placeholder="${escapeAttr(t("shortDescription"))}">
          <select data-field="status" aria-label="${escapeAttr(t("status"))}">
            ${PRODUCT_STATUSES.map((status) => `<option value="${status}" ${product.status === status ? "selected" : ""}>${statusLabel(status)}</option>`).join("")}
          </select>
        </div>
        <div class="actions">
          <button class="icon-btn" type="button" data-action="duplicate-product" title="${escapeAttr(t("duplicate"))}">⧉</button>
          <button class="icon-btn danger" type="button" data-action="delete-product" title="${escapeAttr(t("delete"))}">×</button>
        </div>
      </div>
      <div class="product-body">
        <div class="photos">
          <div class="photo-grid">${images}</div>
          <button class="photo-drop" type="button" data-action="add-images">
            ${escapeHtml(t("photoDrop"))}
          </button>
        </div>
        <div class="supplier-block">
          <div class="supplier-row">
            <div class="field supplier-field">
              <label>${escapeHtml(t("priceInclShipping"))}</label>
              <input inputmode="decimal" data-field="priceWithShipping" value="${escapeAttr(product.priceWithShipping)}" placeholder="USD">
            </div>
            <div class="field supplier-field">
              <label>${escapeHtml(t("availableSizes"))}</label>
              <input data-field="availableSizes" value="${escapeAttr(product.availableSizes)}" placeholder="${escapeAttr(t("availableSizesPlaceholder"))}">
            </div>
            <div class="field supplier-field">
              <label>${escapeHtml(t("availableColors"))}</label>
              <input data-field="availableColors" value="${escapeAttr(product.availableColors)}" placeholder="${escapeAttr(t("availableColorsPlaceholder"))}">
            </div>
            <div class="field buyer-field">
              <label>${escapeHtml(t("sizeChart"))}</label>
              <label class="check-field">
                <input type="checkbox" data-field="requestSizeChart" ${product.requestSizeChart ? "checked" : ""}>
                ${escapeHtml(t("request"))}
              </label>
            </div>
          </div>
          <div class="field supplier-field">
            <label>${escapeHtml(t("measurements"))}</label>
            <textarea data-field="sizeChart" placeholder="${escapeAttr(t("measurementsPlaceholder"))}">${escapeHtml(product.sizeChart)}</textarea>
          </div>
          <div class="label">${escapeHtml(t("quantityBySize"))}</div>
          <div class="qty-grid">${sizeInputs}</div>
        </div>
        <div class="total-block">
          <div class="total-card">
            <strong data-total="units">${productUnits(product)}</strong>
            <span>${escapeHtml(t("units"))}</span>
          </div>
          <div class="total-card">
            <strong data-total="price">${formatMoney(product.priceWithShipping)}</strong>
            <span>${escapeHtml(t("priceInclShipping"))}</span>
          </div>
          <div class="total-card">
            <strong data-total="product">${formatMoney(productTotal(product))}</strong>
            <span>${escapeHtml(t("total"))}</span>
          </div>
        </div>
      </div>
    `;
  }

  function renderStats() {
    const quote = currentQuote();
    const metrics = quote ? quoteMetrics(quote) : { products: 0, photos: 0, units: 0, total: 0 };
    els.statQuotes.textContent = state.quotes.length;
    els.statProducts.textContent = metrics.products;
    els.statPhotos.textContent = metrics.photos;
    els.statTotal.textContent = formatMoney(metrics.total);
  }

  function updateProductTotals(card, product) {
    if (!card) return;
    const units = card.querySelector('[data-total="units"]');
    const price = card.querySelector('[data-total="price"]');
    const total = card.querySelector('[data-total="product"]');
    if (units) units.textContent = productUnits(product);
    if (price) price.textContent = formatMoney(product.priceWithShipping);
    if (total) total.textContent = formatMoney(productTotal(product));
  }

  function openImagePicker(productId = "") {
    state.fileTargetProductId = productId || "";
    if (productId) {
      state.pasteTargetProductId = productId;
      renderPasteTarget();
    }
    els.imageInput.click();
  }

  async function addFilesToTarget(files, productId = state.pasteTargetProductId) {
    const quote = currentQuote();
    if (!quote) return;
    const imageFiles = files.filter(isImageFile);
    if (!imageFiles.length) return;
    let product = productId ? productById(productId) : productForPasteTarget();
    const createdProduct = !product;
    if (!product) {
      product = createProduct(quote);
      product.name = imageFiles.length > 1 ? t("productWithMultiplePhotos") : "";
      quote.products.unshift(product);
    }
    state.pasteTargetProductId = product.id;
    await appendFiles(product, imageFiles);
    markDirty();
    render();
    showToast(createdProduct ? t("productCreated") : `${t("photoAddedTo")} ${product.code}`);
  }

  async function appendFiles(product, files) {
    const images = [];
    for (const file of files.filter(isImageFile)) {
      images.push(await fileToImage(file));
    }
    product.images.push(...images);
  }

  async function fileToImage(file) {
    const src = await compressImageSource(file, IMAGE_MAX_SIZE, IMAGE_WEBP_QUALITY);
    return { id: makeId("img"), name: imageFilename(file.name || "photo", src), src };
  }

  function compressImageSource(source, maxSize, quality) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => {
        try {
          const scale = Math.min(1, maxSize / Math.max(image.width, image.height));
          const width = Math.max(1, Math.round(image.width * scale));
          const height = Math.max(1, Math.round(image.height * scale));
          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(image, 0, 0, width, height);
          resolve(canvasToCompressedDataUrl(canvas, quality));
        } catch (error) {
          reject(error);
        } finally {
          if (image.src.startsWith("blob:")) URL.revokeObjectURL(image.src);
        }
      };
      image.onerror = reject;
      image.src = typeof source === "string" ? source : URL.createObjectURL(source);
    });
  }

  function canvasToCompressedDataUrl(canvas, quality) {
    const webp = canvas.toDataURL("image/webp", quality);
    if (webp.startsWith("data:image/webp")) return webp;
    return canvas.toDataURL("image/jpeg", .82);
  }

  function imageFilename(name, dataUrl) {
    const extension = dataUrl.startsWith("data:image/webp") ? "webp" : "jpg";
    const base = String(name || "photo").replace(/\.[a-z0-9]{2,5}$/i, "") || "photo";
    return `${base}.${extension}`;
  }

  function createQuote() {
    const now = new Date().toISOString();
    return normalizeQuote({
      id: makeId("local"),
      name: nextQuoteName(),
      status: "Draft",
      supplierName: "",
      products: [],
      createdAt: now,
      updatedAt: now
    });
  }

  function createProduct(quote) {
    const sizes = {};
    SIZE_KEYS.forEach((size) => sizes[size] = 0);
    return normalizeProduct({
      id: makeId("prod"),
      code: nextProductCode(quote),
      name: "",
      status: "To quote",
      priceWithShipping: "",
      availableSizes: "",
      availableColors: "",
      requestSizeChart: true,
      sizeChart: "",
      sizes,
      images: []
    });
  }

  function normalizeQuoteSummary(row) {
    if (row.data) return normalizeQuote(row.data);
    return normalizeQuote({
      id: row.id,
      name: row.name,
      status: row.status,
      supplierName: row.supplier_name || row.supplierName || "",
      products: [],
      createdAt: row.created_at || row.createdAt,
      updatedAt: row.updated_at || row.updatedAt
    });
  }

  function normalizeQuote(input) {
    const quote = {
      id: String(input.id || makeId("local")),
      name: String(input.name || t("quotePrefix")),
      status: normalizeQuoteStatus(input.status),
      supplierName: String(input.supplierName || input.supplier_name || ""),
      guestToken: String(input.guestToken || input.guest_token || ""),
      products: Array.isArray(input.products) ? input.products.map(normalizeProduct) : [],
      createdAt: input.createdAt || input.created_at || new Date().toISOString(),
      updatedAt: input.updatedAt || input.updated_at || new Date().toISOString()
    };
    return quote;
  }

  function normalizeProduct(product) {
    const sizes = {};
    SIZE_KEYS.forEach((size) => {
      const legacyValue = size === "2XL" ? product.sizes?.XXL : undefined;
      sizes[size] = Math.max(0, Math.floor(toNumber(product.sizes?.[size] ?? legacyValue)));
    });
    return {
      id: String(product.id || makeId("prod")),
      code: String(product.code || "A001"),
      name: String(product.name || product.description || ""),
      status: normalizeProductStatus(product.status),
      priceWithShipping: product.priceWithShipping === "" ? "" : toNumber(product.priceWithShipping ?? product.price),
      availableSizes: String(product.availableSizes || ""),
      availableColors: String(product.availableColors || ""),
      requestSizeChart: product.requestSizeChart !== false,
      sizeChart: String(product.sizeChart || ""),
      sizes,
      images: Array.isArray(product.images) ? product.images.map(normalizeImage).filter(Boolean) : []
    };
  }

  function normalizeImage(image) {
    if (!image || !image.src) return null;
    return {
      id: String(image.id || makeId("img")),
      name: String(image.name || "photo"),
      src: String(image.src),
      storagePath: String(image.storagePath || "")
    };
  }

  function normalizeQuoteStatus(status) {
    const value = String(status || "Draft");
    const normalized = value.toLowerCase().replace(/[_-]+/g, " ");
    return QUOTE_STATUSES.find((item) => item.toLowerCase() === normalized) || value;
  }

  function normalizeProductStatus(status) {
    const value = String(status || "To quote");
    const normalized = value.toLowerCase().replace(/[_-]+/g, " ");
    return PRODUCT_STATUSES.find((item) => item.toLowerCase() === normalized) || value;
  }

  function setProductField(product, field, value) {
    if (field.startsWith("sizes.")) {
      const size = field.split(".")[1];
      product.sizes[size] = Math.max(0, Math.floor(toNumber(value)));
      return;
    }
    if (field === "priceWithShipping") {
      product.priceWithShipping = value === "" ? "" : toNumber(value);
      return;
    }
    if (field === "requestSizeChart") {
      product.requestSizeChart = Boolean(value);
      return;
    }
    product[field] = value;
  }

  function duplicateProduct(productId) {
    const quote = currentQuote();
    const product = productById(productId);
    if (!quote || !product) return;
    const clone = normalizeProduct(JSON.parse(JSON.stringify(product)));
    clone.id = makeId("prod");
    clone.code = nextProductCode(quote);
    clone.name = clone.name ? `${clone.name} ${t("copySuffix")}` : "";
    clone.images = clone.images.map((image) => ({ ...image, id: makeId("img") }));
    quote.products.unshift(clone);
    state.pasteTargetProductId = clone.id;
    markDirty();
    render();
  }

  async function deleteQuote(quoteId) {
    const quote = state.quotes.find((item) => item.id === quoteId);
    if (!quote) return;
    const name = quote.name || t("untitledQuote");
    if (!confirm(`${t("deleteQuoteConfirm")} "${name}"?`)) return;

    if (state.cloud && quoteId && !quoteId.startsWith("local-")) {
      try {
        const response = await apiFetch(`${API_QUOTES}?id=${encodeURIComponent(quoteId)}`, { method: "DELETE" });
        if (!response.ok) throw new Error(await response.text());
      } catch (error) {
        console.warn(error);
        showToast(t("deleteQuoteError"));
        return;
      }
    }

    const deletedIndex = state.quotes.findIndex((item) => item.id === quoteId);
    state.quotes = state.quotes.filter((item) => item.id !== quoteId);
    if (!state.quotes.length) {
      const replacement = createQuote();
      state.quotes.push(replacement);
      state.currentQuoteId = replacement.id;
    } else if (state.currentQuoteId === quoteId) {
      const nextIndex = Math.min(Math.max(deletedIndex, 0), state.quotes.length - 1);
      state.currentQuoteId = state.quotes[nextIndex]?.id || state.quotes[0].id;
      if (state.cloud && !state.currentQuoteId.startsWith("local-")) {
        await openQuote(state.currentQuoteId, { silent: true });
      }
    }
    state.pasteTargetProductId = "";
    state.fileTargetProductId = "";
    state.dirty = false;
    persistLocal();
    render();
    showToast(t("quoteDeleted"));
  }

  function deleteProduct(productId) {
    const quote = currentQuote();
    const product = productById(productId);
    if (!quote || !product) return;
    if (!confirm(`${t("deleteConfirmPrefix")} ${product.code || t("deleteConfirmFallback")}?`)) return;
    quote.products = quote.products.filter((item) => item.id !== productId);
    if (state.pasteTargetProductId === productId) state.pasteTargetProductId = "";
    markDirty();
    render();
  }

  function removeImage(productId, imageId) {
    const product = productById(productId);
    if (!product) return;
    product.images = product.images.filter((image) => image.id !== imageId);
    markDirty();
    render();
  }

  function currentQuote() {
    return state.quotes.find((quote) => quote.id === state.currentQuoteId) || null;
  }

  function productById(id) {
    return currentQuote()?.products.find((product) => product.id === id) || null;
  }

  function productForPasteTarget() {
    const active = document.activeElement?.closest?.(".product");
    if (active) return productById(active.dataset.id);
    return state.pasteTargetProductId ? productById(state.pasteTargetProductId) : null;
  }

  function renderPasteTarget() {
    document.querySelectorAll(".product").forEach((card) => {
      card.classList.toggle("is-paste-target", Boolean(state.pasteTargetProductId) && card.dataset.id === state.pasteTargetProductId);
    });
  }

  function productUnits(product) {
    return SIZE_KEYS.reduce((sum, size) => sum + toNumber(product.sizes[size]), 0);
  }

  function productTotal(product) {
    return productUnits(product) * toNumber(product.priceWithShipping);
  }

  function quoteMetrics(quote) {
    return {
      products: quote.products.length,
      photos: quote.products.reduce((sum, product) => sum + product.images.length, 0),
      units: quote.products.reduce((sum, product) => sum + productUnits(product), 0),
      total: quote.products.reduce((sum, product) => sum + productTotal(product), 0)
    };
  }

  function nextQuoteName() {
    let n = state.quotes.length + 1;
    let name = "";
    const names = new Set(state.quotes.map((quote) => quote.name));
    do {
      name = `${t("quotePrefix")} ${n}`;
      n += 1;
    } while (names.has(name));
    return name;
  }

  function nextProductCode(quote) {
    const used = new Set((quote?.products || []).map((product) => product.code));
    let n = 1;
    let code = "";
    do {
      code = "A" + String(n).padStart(3, "0");
      n += 1;
    } while (used.has(code));
    return code;
  }

  async function importFile(file) {
    const text = await file.text();
    let payload = null;
    if (file.name.toLowerCase().endsWith(".json")) {
      payload = JSON.parse(text);
    } else {
      payload = JSON.parse(extractBootstrapData(text));
    }

    let quote;
    if (Array.isArray(payload.quotes)) {
      const importedQuotes = payload.quotes.map(normalizeQuote);
      for (const importedQuote of importedQuotes) await compressQuoteImages(importedQuote);
      state.quotes.unshift(...importedQuotes);
      quote = importedQuotes[0];
    } else {
      quote = normalizeQuote({
        id: makeId("local"),
        name: payload.name || `${t("importedPrefix")} ${formatDate(new Date().toISOString())}`,
        status: payload.status || "Draft",
        supplierName: payload.supplierName || "",
        products: payload.products || [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      await compressQuoteImages(quote);
      state.quotes.unshift(quote);
    }
    state.currentQuoteId = quote.id;
    const stored = persistLocal();
    markDirty({ persist: false });
    render();
    showToast(stored ? t("importedAsQuote") : t("importNotStoredLocal"));
  }

  function extractBootstrapData(html) {
    const match = html.match(/<script\b[^>]*\bid=["']bootstrap-data["'][^>]*>([\s\S]*?)<\/script>/i);
    if (match) return decodeHtmlEntities(match[1].trim());

    const doc = new DOMParser().parseFromString(html, "text/html");
    const node = doc.getElementById("bootstrap-data");
    if (!node) throw new Error("No bootstrap data found");
    return node.textContent || "null";
  }

  function decodeHtmlEntities(value) {
    if (!/[&<>]/.test(value)) return value;
    const textarea = document.createElement("textarea");
    textarea.innerHTML = value;
    return textarea.value;
  }

  function exportBackup() {
    const payload = JSON.stringify({ quotes: state.quotes }, null, 2);
    downloadBlob(payload, `supplier-quotes-backup-${dateStamp()}.json`, "application/json");
  }

  function setupDrop(target, callback, highlightTarget = target) {
    if (!target) return;
    ["dragenter", "dragover"].forEach((eventName) => {
      target.addEventListener(eventName, (event) => {
        if (!eventHasImageFiles(event)) return;
        event.preventDefault();
        event.stopPropagation();
        if (event.dataTransfer) event.dataTransfer.dropEffect = "copy";
        highlightTarget?.classList.add("dragover");
      });
    });
    target.addEventListener("dragleave", (event) => {
      if (!eventHasImageFiles(event)) return;
      event.preventDefault();
      event.stopPropagation();
      if (isLeavingTarget(event, target)) highlightTarget?.classList.remove("dragover");
    });
    target.addEventListener("drop", (event) => {
      if (!eventHasImageFiles(event)) return;
      event.preventDefault();
      event.stopPropagation();
      highlightTarget?.classList.remove("dragover");
      const files = Array.from(event.dataTransfer?.files || []).filter(isImageFile);
      callback(files);
    });
  }

  function preventUnhandledImageDrops() {
    ["dragover", "drop"].forEach((eventName) => {
      document.addEventListener(eventName, (event) => {
        if (!eventHasImageFiles(event)) return;
        event.preventDefault();
        if (event.dataTransfer) event.dataTransfer.dropEffect = "copy";
      });
    });
  }

  function eventHasImageFiles(event) {
    const dataTransfer = event.dataTransfer;
    if (!dataTransfer) return false;
    const items = Array.from(dataTransfer.items || []);
    if (items.length) {
      return items.some((item) => item.kind === "file" && (!item.type || item.type.startsWith("image/")));
    }
    return Array.from(dataTransfer.types || []).includes("Files");
  }

  function isLeavingTarget(event, target) {
    const rect = target.getBoundingClientRect();
    return event.clientX <= rect.left || event.clientX >= rect.right || event.clientY <= rect.top || event.clientY >= rect.bottom;
  }

  function isImageFile(file) {
    if (!file) return false;
    if (file.type && file.type.startsWith("image/")) return true;
    return /\.(avif|bmp|gif|heic|heif|jpe?g|png|svg|webp)$/i.test(file.name || "");
  }

  function openLightbox(productId, imageId) {
    const product = productById(productId);
    if (!product || !product.images.length) return;
    const index = Math.max(0, product.images.findIndex((image) => image.id === imageId));
    state.lightbox = { productId, index };
    renderLightbox();
    els.lightbox.classList.add("is-open");
  }

  function closeLightbox() {
    els.lightbox.classList.remove("is-open");
    els.lightboxImage.removeAttribute("src");
  }

  function stepLightbox(direction) {
    const product = productById(state.lightbox.productId);
    if (!product || !product.images.length) return;
    state.lightbox.index = (state.lightbox.index + direction + product.images.length) % product.images.length;
    renderLightbox();
  }

  function renderLightbox() {
    const product = productById(state.lightbox.productId);
    if (!product || !product.images.length) return closeLightbox();
    const image = product.images[state.lightbox.index] || product.images[0];
    els.lightboxImage.src = image.src;
    els.lightboxImage.alt = image.name || product.code;
    els.lightboxTitle.textContent = [product.code, product.name].filter(Boolean).join(" - ") || t("imagePreview");
    els.lightboxCounter.textContent = `${state.lightbox.index + 1} / ${product.images.length}`;
    const hasMultiple = product.images.length > 1;
    els.lightboxPrev.hidden = !hasMultiple;
    els.lightboxNext.hidden = !hasMultiple;
  }

  function markDirty(options = {}) {
    const quote = currentQuote();
    if (quote) quote.updatedAt = new Date().toISOString();
    state.dirty = true;
    if (options.persist !== false) persistLocal();
  }

  function makeId(prefix) {
    if (crypto.randomUUID) return `${prefix}-${crypto.randomUUID()}`;
    return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
  }

  function formatMoney(value) {
    return "USD " + toNumber(value).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }

  function toNumber(value) {
    if (value === null || value === undefined || value === "") return 0;
    const number = Number.parseFloat(String(value).replace(",", "."));
    return Number.isFinite(number) ? number : 0;
  }

  function formatDate(value) {
    if (!value) return "";
    try {
      return new Date(value).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });
    } catch {
      return "";
    }
  }

  function dateStamp() {
    const now = new Date();
    return [now.getFullYear(), String(now.getMonth() + 1).padStart(2, "0"), String(now.getDate()).padStart(2, "0")].join("-");
  }

  function downloadBlob(content, filename, type) {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function showToast(message) {
    clearTimeout(showToast.timer);
    els.toast.textContent = message;
    els.toast.classList.add("show");
    showToast.timer = setTimeout(() => els.toast.classList.remove("show"), 1800);
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;");
  }

  function escapeAttr(value) {
    return escapeHtml(value).replaceAll('"', "&quot;").replaceAll("'", "&#39;");
  }
})();
