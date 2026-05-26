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
  const IMAGE_PROCESS_CONCURRENCY = 3;
  const IMAGE_UPLOAD_CONCURRENCY = 4;
  const I18N = {
    en: {
      appTitle: "Supplier quotes",
      language: "Language",
      localMode: "Local mode",
      guestLocalMode: "Guest mode",
      onlineSaving: "Online saving",
      newQuote: "New quote",
      history: "History",
      save: "Save",
      saving: "Saving...",
      preparingImages: "Preparing images...",
      uploadingPhotos: "Uploading photos",
      guide: "Guide",
      manual: "Manual",
      skip: "Skip",
      back: "Back",
      next: "Next",
      done: "Done",
      importHtml: "Import HTML",
      exportHtml: "Export HTML",
      exportWps: "Export WPS",
      printPdf: "Print / PDF",
      exportBackup: "Export backup",
      quotes: "Quotes",
      products: "Products",
      product: "Product",
      photos: "Photos",
      total: "Total",
      totalPrice: "Total price",
      refresh: "Refresh",
      quoteName: "Quote name",
      quoteDate: "Date",
      quoteNamePlaceholder: "Quote 1",
      quoteFreight: "Quote freight",
      quoteFreightPlaceholder: "Optional total freight",
      status: "Status",
      supplier: "Supplier",
      supplierPlaceholder: "Supplier name",
      addProduct: "Add product",
      emailPlaceholder: "Email",
      passwordPlaceholder: "Password",
      signIn: "Sign in",
      signingIn: "Signing in...",
      createAccount: "Create account",
      creatingAccount: "Creating...",
      logout: "Log out",
      loginSuccess: "Signed in",
      loginError: "Could not sign in",
      authConfigError: "Auth is not configured. Check Netlify Functions and environment variables.",
      accountCreated: "Account created",
      accountCreatedCheckEmail: "Account created, but Supabase still requires email confirmation.",
      signupError: "Could not create account",
      passwordTooShort: "Password must have at least 6 characters",
      signedOut: "Signed out",
      authRequired: "Sign in to save online history",
      guestMode: "Customer quote",
      guestLink: "Customer link",
      guestLinkCopied: "Customer link copied",
      guestLinkPrompt: "Copy this customer link",
      guestLinkError: "Could not create customer link",
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
      productPrice: "Product price",
      unitPrice: "Unit price",
      freight: "Freight",
      shippingCost: "Shipping cost",
      unitTotal: "Unit total",
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
      size: "Size",
      pcs: "PCS",
      number: "No.",
      totalNumber: "Total number",
      actualPayment: "Actual payment",
      productTotal: "Product total",
      noPhoto: "No photo",
      notSelected: "Not selected",
      units: "Units",
      imagePreview: "Image preview",
      importError: "Could not import that file",
      importNotStoredLocal: "Imported, but too large for local browser storage. Sign in and save online before closing.",
      importingLargeOnline: "Large quote imported. Saving online...",
      importedSavedOnline: "Imported and saved online",
      preparingExport: "Preparing export...",
      openError: "Could not open quote",
      savedOnline: "Quote saved online",
      saveOnlineError: "Could not save online. Kept locally.",
      saveOnlineAndLocalError: "Could not save online, and this quote is too large for local browser storage.",
      savedLocal: "Quote saved locally",
      saveLocalError: "Quote is too large for local browser storage. Sign in and save online.",
      photoAddedTo: "Photos added to",
      productCreated: "Product created",
      productWithMultiplePhotos: "Product with multiple photos",
      deleteConfirmPrefix: "Delete",
      deleteConfirmFallback: "this product",
      copySuffix: "copy",
      importedAsQuote: "Imported as quote",
      exportedHtml: "HTML exported",
      exportedWps: "WPS sheet exported",
      printViewOpened: "Print view opened",
      printViewBlocked: "Could not open print view",
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
      guestLocalMode: "访客模式",
      onlineSaving: "在线保存",
      newQuote: "新报价",
      history: "历史记录",
      save: "保存",
      saving: "保存中...",
      preparingImages: "Preparing images...",
      uploadingPhotos: "Uploading photos",
      guide: "指南",
      manual: "手册",
      skip: "跳过",
      back: "上一步",
      next: "下一步",
      done: "完成",
      importHtml: "导入 HTML",
      exportHtml: "Export HTML",
      printPdf: "Print / PDF",
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
      passwordPlaceholder: "Password",
      signIn: "Sign in",
      signingIn: "Signing in...",
      createAccount: "Create account",
      creatingAccount: "Creating...",
      logout: "Log out",
      loginSuccess: "Signed in",
      loginError: "Could not sign in",
      authConfigError: "Auth is not configured. Check Netlify Functions and environment variables.",
      accountCreated: "Account created",
      accountCreatedCheckEmail: "Account created, but Supabase still requires email confirmation.",
      signupError: "Could not create account",
      passwordTooShort: "密码至少需要 6 个字符",
      signedOut: "Signed out",
      authRequired: "Sign in to save online history",
      guestMode: "Customer quote",
      guestLink: "Customer link",
      guestLinkCopied: "Customer link copied",
      guestLinkPrompt: "Copy this customer link",
      guestLinkError: "Could not create customer link",
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
      productPrice: "产品价格",
      freight: "运费",
      unitTotal: "单件总价",
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
      importingLargeOnline: "Large quote imported. Saving online...",
      importedSavedOnline: "Imported and saved online",
      preparingExport: "Preparing export...",
      openError: "无法打开报价",
      savedOnline: "报价已在线保存",
      saveOnlineError: "无法在线保存，已保存在本地。",
      saveOnlineAndLocalError: "Could not save online, and this quote is too large for local browser storage.",
      savedLocal: "报价已保存在本地",
      saveLocalError: "Quote is too large for local browser storage. Sign in and save online.",
      photoAddedTo: "图片已添加到",
      productCreated: "产品已创建",
      productWithMultiplePhotos: "多图产品",
      deleteConfirmPrefix: "删除",
      deleteConfirmFallback: "这个产品",
      copySuffix: "副本",
      importedAsQuote: "已导入为报价",
      exportedHtml: "HTML exported",
      printViewOpened: "Print view opened",
      printViewBlocked: "Could not open print view",
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
      en: ["Sign in", "Use email and password for private online history. Without signing in, you can keep working in guest mode."],
      zh: ["登录", "使用邮箱和密码登录私人线上历史记录。未登录时也可以用访客模式继续工作。"]
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
      en: ["Product lines", "Add products manually, then fill in description, product price, freight, sizes, colors, measurements, and quantities."],
      zh: ["产品行", "手动添加产品后，填写描述、产品价格、运费、尺码、颜色、尺寸信息和数量。"]
    },
    {
      selector: "#addPhotosBtn",
      en: ["More photos", "Select a product first, then use Photos to add images to that product on desktop or mobile."],
      zh: ["更多图片", "先选择一个产品，再用图片按钮在电脑或手机上为该产品添加图片。"]
    },
    {
      selector: "#shareGuestBtn",
      en: ["Customer link", "After signing in and saving online, create a read-only quote sheet for the customer."],
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
          "Use email and password to save quotes in your private online history.",
          "If the chip says Local mode, quotes are stored only in this browser.",
          "If the chip says Guest mode, you can work without an account and save locally in this browser.",
          "If the chip says Online saving, quotes are stored in Supabase under your user.",
          "If the chip says Customer quote, the visitor can open only the shared quote sheet."
        ]
      },
      {
        title: "2. Create and manage quotes",
        items: [
          "Use New quote to start a new budget request.",
          "Use History to reopen saved quotes.",
          "Use the delete button in History to remove quotes created by mistake.",
          "Use Save after important changes, especially before sharing a customer link."
        ]
      },
      {
        title: "3. Products and photos",
        items: [
          "Add product creates an empty product line.",
          "Drop, paste, or tap photos to create a product from images.",
          "Select a product before using Photos to add more images to that product.",
          "Fill product price, freight, available sizes, colors, measurements, and quantity by size."
        ]
      },
      {
        title: "4. Sharing and backups",
        items: [
          "Customer link creates a private, read-only sheet for one quote only.",
          "Customers do not see your full history.",
          "Export backup downloads all quotes currently loaded in the app.",
          "Import HTML/JSON restores a previous backup as a quote."
        ]
      }
    ],
    zh: [
      {
        title: "1. 登录和历史记录",
        items: [
          "使用邮箱和密码登录，即可把报价保存到个人线上历史记录。",
          "如果状态显示 Local mode，报价只保存在当前浏览器。",
          "如果状态显示 Guest mode，可以不登录账号，报价会保存在当前浏览器。",
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
          "填写产品价格、运费、可用尺码、颜色、尺寸信息和每个尺码的数量。"
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
    authPassword: document.getElementById("authPassword"),
    authSubmitBtn: document.getElementById("authSubmitBtn"),
    authSignupBtn: document.getElementById("authSignupBtn"),
    authUser: document.getElementById("authUser"),
    authLogoutBtn: document.getElementById("authLogoutBtn"),
    languageSelect: document.getElementById("languageSelect"),
    newQuoteBtn: document.getElementById("newQuoteBtn"),
    historyBtn: document.getElementById("historyBtn"),
    saveQuoteBtn: document.getElementById("saveQuoteBtn"),
    guideBtn: document.getElementById("guideBtn"),
    manualBtn: document.getElementById("manualBtn"),
    importBtn: document.getElementById("importBtn"),
    exportHtmlBtn: document.getElementById("exportHtmlBtn"),
    exportWpsBtn: document.getElementById("exportWpsBtn"),
    printPdfBtn: document.getElementById("printPdfBtn"),
    exportBtn: document.getElementById("exportBtn"),
    refreshBtn: document.getElementById("refreshBtn"),
    addProductBtn: document.getElementById("addProductBtn"),
    addPhotosBtn: document.getElementById("addPhotosBtn"),
    shareGuestBtn: document.getElementById("shareGuestBtn"),
    quoteList: document.getElementById("quoteList"),
    quoteName: document.getElementById("quoteName"),
    quoteStatus: document.getElementById("quoteStatus"),
    supplierName: document.getElementById("supplierName"),
    quoteFreight: document.getElementById("quoteFreight"),
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
    authConfig: { configured: false, supabaseUrl: "", supabaseAnonKey: "", error: "" },
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
      await signInWithPassword();
    });
    els.authSignupBtn.addEventListener("click", createPasswordAccount);
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
    els.exportHtmlBtn.addEventListener("click", exportCurrentHtml);
    els.exportWpsBtn.addEventListener("click", exportCurrentWpsSheet);
    els.printPdfBtn.addEventListener("click", printCurrentQuote);
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

    els.quoteFreight.addEventListener("input", () => {
      const quote = currentQuote();
      if (!quote) return;
      quote.freight = moneyField(els.quoteFreight.value);
      markDirty();
      renderProducts();
      renderStats();
      renderQuoteList();
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
        supabaseAnonKey: String(payload.supabaseAnonKey || ""),
        error: ""
      };
    } catch (error) {
      state.authConfig = { configured: false, supabaseUrl: "", supabaseAnonKey: "", error: t("authConfigError") };
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

  async function signInWithPassword() {
    const email = els.authEmail.value.trim();
    const password = els.authPassword.value;
    if (!requireAuthFields(email, password)) return;
    if (!state.authConfig.configured) await loadAuthConfig();
    if (!state.authConfig.configured) {
      showToast(state.authConfig.error || t("authConfigError"), 5200);
      return;
    }
    els.authSubmitBtn.textContent = t("signingIn");
    els.authSubmitBtn.disabled = true;
    els.authSignupBtn.disabled = true;
    try {
      const response = await fetch(`${state.authConfig.supabaseUrl}/auth/v1/token?grant_type=password`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({ email, password })
      });
      if (!response.ok) throw new Error(await responseError(response));
      await setSessionFromAuthPayload(await response.json());
      showToast(t("loginSuccess"));
    } catch (error) {
      console.warn(error);
      showToast(error.message ? `${t("loginError")}: ${error.message}` : t("loginError"), 4800);
    } finally {
      els.authSubmitBtn.textContent = t("signIn");
      els.authSubmitBtn.disabled = false;
      els.authSignupBtn.disabled = false;
    }
  }

  async function createPasswordAccount() {
    const email = els.authEmail.value.trim();
    const password = els.authPassword.value;
    if (!requireAuthFields(email, password)) return;
    if (!state.authConfig.configured) await loadAuthConfig();
    if (!state.authConfig.configured) {
      showToast(state.authConfig.error || t("authConfigError"), 5200);
      return;
    }
    els.authSubmitBtn.disabled = true;
    els.authSignupBtn.disabled = true;
    els.authSignupBtn.textContent = t("creatingAccount");
    try {
      const response = await fetch(`${state.authConfig.supabaseUrl}/auth/v1/signup`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({ email, password })
      });
      if (!response.ok) throw new Error(await responseError(response));
      const payload = await response.json();
      if (payload.access_token || payload.session?.access_token) {
        await setSessionFromAuthPayload(payload);
        showToast(t("accountCreated"));
      } else {
        showToast(t("accountCreatedCheckEmail"));
      }
    } catch (error) {
      console.warn(error);
      showToast(error.message ? `${t("signupError")}: ${error.message}` : t("signupError"), 4800);
    } finally {
      els.authSignupBtn.textContent = t("createAccount");
      els.authSubmitBtn.disabled = false;
      els.authSignupBtn.disabled = false;
    }
  }

  function requireAuthFields(email, password) {
    if (!email) {
      els.authEmail.focus();
      return false;
    }
    if (!password) {
      els.authPassword.focus();
      return false;
    }
    if (password.length < 6) {
      showToast(t("passwordTooShort"), 4200);
      els.authPassword.focus();
      return false;
    }
    return true;
  }

  async function setSessionFromAuthPayload(payload) {
    const session = payload.session || payload;
    if (!session?.access_token) throw new Error("No auth session returned");
    state.session = {
      accessToken: session.access_token,
      refreshToken: session.refresh_token || "",
      tokenType: session.token_type || "bearer",
      expiresAt: Math.floor(Date.now() / 1000) + Number(session.expires_in || 3600)
    };
    els.authPassword.value = "";
    saveStoredSession();
    await loadUser();
    updateAuthUI();
    await loadQuotes();
    render();
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
      return payload.message || payload.msg || payload.error_description || payload.error || text || response.statusText;
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
    const ownerOnlyButtons = [
      els.newQuoteBtn,
      els.historyBtn,
      els.saveQuoteBtn,
      els.guideBtn,
      els.manualBtn,
      els.importBtn,
      els.exportBtn,
      els.exportWpsBtn,
      els.addProductBtn,
      els.addPhotosBtn
    ];
    els.authForm.hidden = isGuest;
    els.authEmail.hidden = isGuest || isSignedIn;
    els.authPassword.hidden = isGuest || isSignedIn;
    els.authSubmitBtn.hidden = isGuest || isSignedIn;
    els.authSignupBtn.hidden = isGuest || isSignedIn;
    els.authUser.textContent = isGuest ? t("guestMode") : (isSignedIn ? state.user.email : "");
    els.authLogoutBtn.hidden = !isSignedIn;
    ownerOnlyButtons.forEach((button) => {
      button.hidden = isGuest;
      button.disabled = isGuest;
    });
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
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const mobile = viewportWidth <= 760;

    if (mobile) {
      card.style.left = `${margin}px`;
      card.style.right = `${margin}px`;
      card.style.top = "auto";
      card.style.bottom = `${margin}px`;
      card.style.width = `calc(100vw - ${margin * 2}px)`;
      return;
    }

    card.style.right = "auto";
    card.style.bottom = "auto";
    card.style.width = "";
    const width = card.offsetWidth;
    const height = card.offsetHeight;

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
      localStorage.setItem(localKey(), JSON.stringify(localPayload(false)));
      return true;
    } catch (error) {
      console.warn(error);
      try {
        localStorage.setItem(localKey(), JSON.stringify(localPayload(true)));
      } catch (fallbackError) {
        console.warn(fallbackError);
      }
      return false;
    }
  }

  function localPayload(lightweight) {
    return {
      quotes: state.quotes.map((quote) => lightweight ? quoteSummaryForLocal(quote) : quote),
      currentQuoteId: state.currentQuoteId
    };
  }

  function quoteSummaryForLocal(quote) {
    return normalizeQuote({
      id: quote.id,
      name: quote.name,
      status: quote.status,
      supplierName: quote.supplierName,
      freight: quote.freight,
      guestToken: quote.guestToken,
      products: [],
      createdAt: quote.createdAt,
      updatedAt: quote.updatedAt
    });
  }

  function localKey() {
    return state.user?.id && !state.guestToken ? `${LOCAL_KEY}-${state.user.id}` : LOCAL_KEY;
  }

  function updateModeChip() {
    const isGuest = Boolean(state.guestToken);
    const isLocalGuest = !isGuest && !state.cloud && state.authConfig.configured;
    els.modeChip.textContent = isGuest ? t("guestMode") : (state.cloud ? t("onlineSaving") : (isLocalGuest ? t("guestLocalMode") : t("localMode")));
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
    if (state.guestToken) return null;

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
        const stored = persistLocal();
        showToast(stored ? t("saveOnlineError") : t("saveOnlineAndLocalError"), 5200);
        return null;
      } finally {
        els.saveQuoteBtn.textContent = t("save");
        render();
      }
    }

    state.dirty = false;
    const stored = persistLocal();
    render();
    showToast(stored ? t("savedLocal") : t("saveLocalError"), stored ? 1800 : 5200);
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

  function canSaveOnline() {
    return Boolean(state.cloud && state.user && !state.guestToken);
  }

  async function quoteWithUploadedImages(quote) {
    const copy = normalizeQuote(JSON.parse(JSON.stringify(quote)));
    const pending = [];
    copy.products.forEach((product) => {
      product.images.forEach((image) => {
        if (shouldUploadImage(image)) pending.push(image);
      });
    });
    let completed = 0;
    updateSaveProgress(completed, pending.length);
    await parallelMap(pending, IMAGE_UPLOAD_CONCURRENCY, async (image) => {
      const compressed = await compressDataUrlForUpload(image.src);
      image.name = imageFilename(image.name, compressed);
      const uploaded = await uploadDataUrl(compressed, image.name);
      image.src = uploaded.url;
      image.storagePath = uploaded.path;
      completed += 1;
      updateSaveProgress(completed, pending.length);
    });
    return copy;
  }

  function shouldUploadImage(image) {
    return Boolean(image?.src && image.src.startsWith("data:image/"));
  }

  async function compressQuoteImages(quote, maxSize = IMAGE_IMPORT_MAX_SIZE) {
    const pending = [];
    for (const product of quote.products) {
      for (const image of product.images) {
        if (image.src?.startsWith("data:image/")) pending.push(image);
      }
    }
    await parallelMap(pending, IMAGE_PROCESS_CONCURRENCY, async (image) => {
        try {
          const compressed = await compressImageSource(image.src, maxSize, IMAGE_WEBP_QUALITY);
          if (compressed.length < image.src.length || !image.src.startsWith("data:image/webp")) {
            image.src = compressed;
            image.name = imageFilename(image.name, compressed);
          }
        } catch (error) {
          console.warn(error);
        }
    });
    return quote;
  }

  async function compressDataUrlForUpload(dataUrl) {
    if (!dataUrl.startsWith("data:image/")) return dataUrl;
    if (dataUrl.startsWith("data:image/webp")) return dataUrl;
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

  function updateSaveProgress(done, total) {
    if (!total) {
      els.saveQuoteBtn.textContent = t("saving");
      return;
    }
    els.saveQuoteBtn.textContent = `${t("uploadingPhotos")} ${done}/${total}`;
  }

  async function parallelMap(items, concurrency, worker) {
    const queue = [...items];
    const workers = Array.from({ length: Math.min(concurrency, queue.length) }, async () => {
      while (queue.length) {
        const item = queue.shift();
        await worker(item);
      }
    });
    await Promise.all(workers);
  }

  function replaceQuote(quote) {
    const index = state.quotes.findIndex((item) => item.id === quote.id || item.id === state.currentQuoteId);
    if (index >= 0) state.quotes[index] = quote;
    else state.quotes.unshift(quote);
  }

  function render() {
    const quote = currentQuote();
    applyLanguage();
    if (state.guestToken) {
      renderCustomerQuotePage(quote);
      updateModeChip();
      return;
    }
    renderOwnerWorkspace();
    els.quoteName.value = quote?.name || "";
    renderQuoteStatusSelect(quote?.status || "Draft");
    els.supplierName.value = quote?.supplierName || "";
    els.quoteFreight.value = quote?.freight ?? "";
    renderQuoteList();
    renderProducts();
    renderStats();
    updateModeChip();
  }

  function renderOwnerWorkspace() {
    document.body.classList.remove("customer-mode");
    document.querySelector(".layout")?.removeAttribute("hidden");
    document.getElementById("customerQuotePage")?.remove();
    document.getElementById("quoteSheetStyles")?.remove();
  }

  function renderCustomerQuotePage(quote) {
    document.body.classList.add("customer-mode");
    document.querySelector(".layout")?.setAttribute("hidden", "");
    ensureQuoteSheetStyles();

    let page = document.getElementById("customerQuotePage");
    if (!page) {
      page = document.createElement("main");
      page.id = "customerQuotePage";
      page.className = "customer-quote-page";
      document.querySelector(".topbar")?.insertAdjacentElement("afterend", page);
    }

    page.innerHTML = quote
      ? quoteSheetMarkup(quote)
      : `<section class="quote-sheet empty-sheet"><p>${escapeHtml(t("openError"))}</p></section>`;
  }

  function ensureQuoteSheetStyles() {
    let style = document.getElementById("quoteSheetStyles");
    if (!style) {
      style = document.createElement("style");
      style.id = "quoteSheetStyles";
      document.head.appendChild(style);
    }
    style.textContent = quoteSheetStyles();
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
    const quote = currentQuote();
    const usesGlobalFreight = quoteUsesGlobalFreight(quote);
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
              <label>${escapeHtml(t("productPrice"))}</label>
              <input inputmode="decimal" data-field="productPrice" value="${escapeAttr(product.productPrice)}" placeholder="USD">
            </div>
            <div class="field supplier-field">
              <label>${escapeHtml(t("freight"))}</label>
              <input inputmode="decimal" data-field="freight" value="${escapeAttr(product.freight)}" placeholder="USD" ${usesGlobalFreight ? "disabled" : ""}>
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
            <strong data-total="base">${formatMoney(product.productPrice)}</strong>
            <span>${escapeHtml(t("productPrice"))}</span>
          </div>
          <div class="total-card">
            <strong data-total="freight">${usesGlobalFreight ? "-" : formatMoney(productDisplayFreight(product, quote))}</strong>
            <span>${escapeHtml(t("freight"))}</span>
          </div>
          <div class="total-card">
            <strong data-total="unit">${formatMoney(productDisplayUnitTotal(product, quote))}</strong>
            <span>${escapeHtml(t("unitTotal"))}</span>
          </div>
          <div class="total-card">
            <strong data-total="product">${formatMoney(productDisplayTotal(product, quote))}</strong>
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
    const quote = currentQuote();
    const usesGlobalFreight = quoteUsesGlobalFreight(quote);
    const units = card.querySelector('[data-total="units"]');
    const base = card.querySelector('[data-total="base"]');
    const freight = card.querySelector('[data-total="freight"]');
    const unit = card.querySelector('[data-total="unit"]');
    const total = card.querySelector('[data-total="product"]');
    if (units) units.textContent = productUnits(product);
    if (base) base.textContent = formatMoney(product.productPrice);
    if (freight) freight.textContent = usesGlobalFreight ? "-" : formatMoney(productDisplayFreight(product, quote));
    if (unit) unit.textContent = formatMoney(productDisplayUnitTotal(product, quote));
    if (total) total.textContent = formatMoney(productDisplayTotal(product, quote));
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
    if (state.guestToken) return;

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
    showToast(t("preparingImages"), 4200);
    await appendFiles(product, imageFiles);
    markDirty();
    render();
    showToast(createdProduct ? t("productCreated") : `${t("photoAddedTo")} ${product.code}`);
  }

  async function appendFiles(product, files) {
    const images = await parallelMapResults(files.filter(isImageFile), IMAGE_PROCESS_CONCURRENCY, fileToImage);
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

  async function parallelMapResults(items, concurrency, worker) {
    const results = new Array(items.length);
    let index = 0;
    const workers = Array.from({ length: Math.min(concurrency, items.length) }, async () => {
      while (index < items.length) {
        const current = index;
        index += 1;
        results[current] = await worker(items[current], current);
      }
    });
    await Promise.all(workers);
    return results;
  }

  function createQuote() {
    const now = new Date().toISOString();
    return normalizeQuote({
      id: makeId("local"),
      name: nextQuoteName(),
      status: "Draft",
      supplierName: "",
      freight: "",
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
      productPrice: "",
      freight: "",
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
      freight: row.freight ?? row.shipping ?? row.shippingCost ?? "",
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
      freight: moneyField(input.freight ?? input.shipping ?? input.shippingCost ?? ""),
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
    const hasSplitPrice = product.productPrice !== undefined || product.product_price !== undefined || product.freight !== undefined || product.shipping !== undefined;
    const productPriceSource = hasSplitPrice ? (product.productPrice ?? product.product_price ?? product.price ?? product.priceWithShipping ?? "") : (product.priceWithShipping ?? product.price ?? "");
    const freightSource = product.freight ?? product.shipping ?? product.freightCost ?? product.shippingCost ?? "";
    const productPrice = moneyField(productPriceSource);
    const freight = moneyField(freightSource);
    return {
      id: String(product.id || makeId("prod")),
      code: String(product.code || "A001"),
      name: String(product.name || product.description || ""),
      status: normalizeProductStatus(product.status),
      productPrice,
      freight,
      priceWithShipping: priceFieldsAreEmpty(productPrice, freight) ? "" : toNumber(productPrice) + toNumber(freight),
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
    if (field === "productPrice" || field === "freight" || field === "priceWithShipping") {
      if (field === "priceWithShipping") {
        product.productPrice = moneyField(value);
        product.freight = "";
      } else {
        product[field] = moneyField(value);
      }
      product.priceWithShipping = priceFieldsAreEmpty(product.productPrice, product.freight) ? "" : productUnitTotal(product);
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

  function productUnitTotal(product) {
    return toNumber(product.productPrice ?? product.priceWithShipping) + toNumber(product.freight);
  }

  function productDisplayFreight(product, quote = currentQuote()) {
    return quoteUsesGlobalFreight(quote) ? 0 : productFreightTotal(product);
  }

  function productDisplayUnitTotal(product, quote = currentQuote()) {
    return toNumber(product.productPrice ?? product.priceWithShipping) + (quoteUsesGlobalFreight(quote) ? 0 : toNumber(product.freight));
  }

  function productDisplayTotal(product, quote = currentQuote()) {
    return productUnits(product) * productDisplayUnitTotal(product, quote);
  }

  function productPriceTotal(product) {
    return productUnits(product) * toNumber(product.productPrice);
  }

  function productFreightTotal(product) {
    return productUnits(product) * toNumber(product.freight);
  }

  function productTotal(product) {
    return productUnits(product) * productUnitTotal(product);
  }

  function quoteUsesGlobalFreight(quote) {
    return quote?.freight !== "" && quote?.freight !== undefined && quote?.freight !== null;
  }

  function quoteCalculationTotals(quote) {
    const products = quote?.products || [];
    const productTotal = products.reduce((sum, product) => sum + productPriceTotal(product), 0);
    const productFreight = products.reduce((sum, product) => sum + productFreightTotal(product), 0);
    const freight = quoteUsesGlobalFreight(quote) ? toNumber(quote.freight) : productFreight;
    return {
      units: products.reduce((sum, product) => sum + productUnits(product), 0),
      productTotal,
      freight,
      actualPayment: productTotal + freight,
      usesGlobalFreight: quoteUsesGlobalFreight(quote)
    };
  }

  function quoteMetrics(quote) {
    const totals = quoteCalculationTotals(quote);
    return {
      products: quote.products.length,
      photos: quote.products.reduce((sum, product) => sum + product.images.length, 0),
      units: totals.units,
      total: totals.actualPayment
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
    if (canSaveOnline()) {
      showToast(stored ? t("saving") : t("importingLargeOnline"), 4200);
      const saved = await saveQuote();
      showToast(saved ? t("importedSavedOnline") : (stored ? t("importedAsQuote") : t("importNotStoredLocal")), saved ? 2400 : 5200);
      return;
    }
    showToast(stored ? t("importedAsQuote") : t("importNotStoredLocal"), stored ? 1800 : 5200);
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

  async function exportCurrentHtml() {
    const quote = currentQuote();
    if (!quote) return;
    showToast(t("preparingExport"), 4200);
    const exportQuote = await quoteForHtmlExport(quote);
    const html = quoteHtmlDocument(exportQuote);
    downloadBlob(html, `${safeFileName(quote.name || t("quotePrefix"))}-${dateStamp()}.html`, "text/html");
    showToast(t("exportedHtml"));
  }

  async function exportCurrentWpsSheet() {
    const quote = currentQuote();
    if (!quote) return;
    showToast(t("preparingExport"), 4200);
    const exportQuote = await quoteForHtmlExport(quote);
    const xlsx = await quoteXlsxBlob(exportQuote);
    downloadBlob(xlsx, `${safeFileName(quote.name || t("quotePrefix"))}-${dateStamp()}-wps.xlsx`, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    showToast(t("exportedWps"));
  }

  async function printCurrentQuote() {
    const quote = currentQuote();
    if (!quote) return;
    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      showToast(t("printViewBlocked"), 4200);
      return;
    }
    printWindow.document.open();
    printWindow.document.write(`<!doctype html><html><head><title>${escapeHtml(t("preparingExport"))}</title></head><body style="font-family:Arial,sans-serif;padding:24px;">${escapeHtml(t("preparingExport"))}</body></html>`);
    printWindow.document.close();
    const exportQuote = await quoteForHtmlExport(quote);
    printWindow.document.open();
    printWindow.document.write(quoteHtmlDocument(exportQuote, { autoPrint: true }));
    printWindow.document.close();
    showToast(t("printViewOpened"));
  }

  function exportBackup() {
    const payload = JSON.stringify({ quotes: state.quotes }, null, 2);
    downloadBlob(payload, `supplier-quotes-backup-${dateStamp()}.json`, "application/json");
  }

  function quoteHtmlDocument(quote, options = {}) {
    const bootstrap = JSON.stringify(normalizeQuote(JSON.parse(JSON.stringify(quote)))).replace(/</g, "\\u003c");
    return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(quote.name || t("untitledQuote"))}</title>
  <style>
    ${quoteSheetStyles()}
  </style>
</head>
<body>
  <main class="customer-quote-page">
    ${quoteSheetMarkup(quote)}
  </main>
  <script type="application/json" id="bootstrap-data">${bootstrap}</script>
  ${options.autoPrint ? "<script>window.addEventListener('load',function(){setTimeout(function(){window.print();},350);});</script>" : ""}
</body>
</html>`;
  }

  function quoteSheetStyles() {
    return `
      :root { color-scheme: light; --sheet-ink:#172033; --sheet-muted:#667085; --sheet-line:#d7dee8; --sheet-soft:#f6f8fb; --sheet-accent:#0f766e; --sheet-bg:#eef2f6; }
      * { box-sizing: border-box; }
      body { margin: 0; background: var(--sheet-bg); color: var(--sheet-ink); font: 13px/1.45 Arial, Helvetica, sans-serif; letter-spacing: 0; }
      .customer-quote-page { padding: 18px; }
      .quote-sheet { max-width: 1120px; margin: 0 auto; padding: 22px; background: #fff; border: 1px solid var(--sheet-line); border-radius: 8px; box-shadow: 0 10px 28px rgba(15, 23, 42, .08); }
      .sheet-header { display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: 16px; align-items: start; padding-bottom: 14px; border-bottom: 2px solid var(--sheet-ink); }
      .sheet-title h1 { margin: 0; font-size: 26px; line-height: 1.12; }
      .sheet-title p, .sheet-meta p { margin: 4px 0 0; color: var(--sheet-muted); }
      .sheet-total { min-width: 176px; padding: 11px 12px; border: 1px solid var(--sheet-line); border-radius: 8px; background: var(--sheet-soft); text-align: right; }
      .sheet-label { color: var(--sheet-muted); font-size: 11px; font-weight: 800; text-transform: uppercase; }
      .sheet-total strong { display: block; margin-top: 2px; font-size: 24px; line-height: 1.08; }
      .sheet-table-wrap { margin-top: 16px; overflow-x: auto; }
      .sheet-table { width: 100%; min-width: 820px; border-collapse: collapse; }
      .sheet-table th, .sheet-table td { border: 1px solid var(--sheet-line); padding: 8px; vertical-align: middle; text-align: center; }
      .sheet-table th { background: var(--sheet-soft); color: var(--sheet-muted); font-size: 11px; font-weight: 800; text-transform: uppercase; }
      .sheet-table td.sheet-product-cell { text-align: left; min-width: 180px; }
      .sheet-no { width: 66px; font-weight: 800; }
      .sheet-code { display: inline-block; min-width: 58px; margin-bottom: 4px; padding: 4px 7px; border-radius: 6px; background: #eaf6ef; color: #0f3f38; font-weight: 800; text-align: center; }
      .sheet-name { display: block; color: var(--sheet-muted); font-weight: 700; word-break: break-word; }
      .sheet-money { font-weight: 800; white-space: nowrap; }
      .sheet-size { min-width: 118px; font-weight: 800; word-break: break-word; }
      .sheet-photos { position: relative; display: grid; grid-template-columns: repeat(2, 58px); gap: 5px; justify-content: center; align-items: center; }
      .sheet-photos img { width: 58px; height: 64px; object-fit: cover; border: 1px solid var(--sheet-line); border-radius: 6px; background: #fff; }
      .sheet-more { position: absolute; right: 2px; bottom: 2px; padding: 2px 5px; border-radius: 999px; background: rgba(15, 23, 42, .78); color: #fff; font-size: 11px; font-weight: 800; }
      .sheet-no-photo { width: 86px; min-height: 64px; display: grid; place-items: center; border: 1px dashed var(--sheet-line); border-radius: 6px; color: var(--sheet-muted); font-weight: 800; }
      .sheet-cards { display: none; margin-top: 14px; gap: 10px; }
      .sheet-card { border: 1px solid var(--sheet-line); border-radius: 8px; overflow: hidden; background: #fff; break-inside: avoid; page-break-inside: avoid; }
      .sheet-card .sheet-photos { grid-template-columns: repeat(4, minmax(0, 1fr)); padding: 8px; background: var(--sheet-soft); }
      .sheet-card .sheet-photos img, .sheet-card .sheet-no-photo { width: 100%; height: auto; aspect-ratio: 1 / 1.08; }
      .sheet-card-body { display: grid; gap: 8px; padding: 10px; }
      .sheet-card-head { display: flex; align-items: start; justify-content: space-between; gap: 10px; }
      .sheet-card-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; }
      .sheet-card-field { min-width: 0; padding: 8px; border: 1px solid var(--sheet-line); border-radius: 6px; background: var(--sheet-soft); }
      .sheet-card-field strong { display: block; margin-top: 2px; word-break: break-word; }
      .sheet-summary { width: min(360px, 100%); margin: 14px 0 0 auto; border: 1px solid var(--sheet-line); border-radius: 8px; overflow: hidden; }
      .sheet-summary-row { display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: 12px; align-items: center; padding: 9px 11px; border-bottom: 1px solid var(--sheet-line); background: #fff; }
      .sheet-summary-row:last-child { border-bottom: 0; }
      .sheet-summary-row span { color: var(--sheet-muted); font-size: 12px; font-weight: 800; text-transform: uppercase; }
      .sheet-summary-row strong { font-size: 15px; white-space: nowrap; }
      .sheet-summary-total { background: #fff8d8; }
      .sheet-summary-total strong { font-size: 18px; }
      .sheet-empty { margin-top: 16px; color: var(--sheet-muted); font-weight: 700; }
      .customer-mode .topbar { position: static; }
      @media (max-width: 760px) {
        .customer-quote-page { padding: 10px; }
        .quote-sheet { padding: 12px; border-radius: 8px; box-shadow: none; }
        .sheet-header { grid-template-columns: 1fr; }
        .sheet-total { text-align: left; min-width: 0; }
        .sheet-title h1 { font-size: 21px; }
        .sheet-table-wrap { display: none; }
        .sheet-cards { display: grid; }
      }
      @media print {
        body { background: #fff; }
        .customer-mode .topbar { display: none; }
        .customer-quote-page { padding: 0; }
        .quote-sheet { max-width: none; padding: 0; border: 0; box-shadow: none; }
        .sheet-table-wrap { display: block; overflow: visible; }
        .sheet-cards { display: none; }
        .sheet-table { min-width: 0; }
        .sheet-card, .sheet-table tr { break-inside: avoid; page-break-inside: avoid; }
      }
    `;
  }

  function quoteSheetMarkup(quote) {
    const totals = quoteCalculationTotals(quote);
    const tableRows = quote.products.map((product, index) => quoteSheetTableRow(product, index, totals.usesGlobalFreight)).join("");
    const cards = quote.products.map((product, index) => quoteSheetCard(product, index, totals.usesGlobalFreight)).join("");
    return `<section class="quote-sheet">
      <header class="sheet-header">
        <div class="sheet-title">
          <h1>${escapeHtml(quote.name || t("untitledQuote"))}</h1>
          <p>${escapeHtml(t("supplier"))}: ${escapeHtml(quote.supplierName || "-")}</p>
          <p>${escapeHtml(t("quoteDate"))}: ${escapeHtml(formatDate(quote.updatedAt || quote.createdAt))}</p>
        </div>
        <div class="sheet-total">
          <div class="sheet-label">${escapeHtml(t("actualPayment"))}</div>
          <strong>${formatMoney(totals.actualPayment)}</strong>
        </div>
      </header>
      ${quote.products.length ? `
        <div class="sheet-table-wrap">
          <table class="sheet-table">
            <thead>
              <tr>
                <th>${escapeHtml(t("number"))}</th>
                <th>${escapeHtml(t("photos"))}</th>
                <th>${escapeHtml(t("unitPrice"))}</th>
                <th>${escapeHtml(t("pcs"))}</th>
                <th>${escapeHtml(t("size"))}</th>
                <th>${escapeHtml(t("totalPrice"))}</th>
                <th>${escapeHtml(t("shippingCost"))}</th>
              </tr>
            </thead>
            <tbody>${tableRows}</tbody>
          </table>
        </div>
        <div class="sheet-cards">${cards}</div>
        ${quoteSheetSummary(totals)}
      ` : `<p class="sheet-empty">${escapeHtml(t("emptyState"))}</p>`}
    </section>`;
  }

  function quoteSheetTableRow(product, index, usesGlobalFreight) {
    return `<tr>
      <td class="sheet-no">${index + 1}<br><span class="sheet-code">${escapeHtml(product.code)}</span></td>
      <td>${quoteSheetPhotos(product, index)}</td>
      <td class="sheet-money">${formatMoney(product.productPrice)}</td>
      <td><strong>${productUnits(product)}</strong></td>
      <td class="sheet-size">${escapeHtml(productSizeSummary(product))}</td>
      <td class="sheet-money">${formatMoney(productPriceTotal(product))}</td>
      <td class="sheet-money">${usesGlobalFreight ? "-" : formatMoney(productFreightTotal(product))}</td>
    </tr>`;
  }

  function quoteSheetCard(product, index, usesGlobalFreight) {
    return `<article class="sheet-card">
      ${quoteSheetPhotos(product, index)}
      <div class="sheet-card-body">
        <div class="sheet-card-head">
          <div><span class="sheet-code">${index + 1} / ${escapeHtml(product.code)}</span>${product.name ? `<span class="sheet-name">${escapeHtml(product.name)}</span>` : ""}</div>
          <strong class="sheet-money">${formatMoney(productPriceTotal(product))}</strong>
        </div>
        <div class="sheet-card-grid">
          ${quoteSheetCardField(t("unitPrice"), formatMoney(product.productPrice))}
          ${quoteSheetCardField(t("pcs"), productUnits(product))}
          ${quoteSheetCardField(t("size"), productSizeSummary(product))}
          ${quoteSheetCardField(t("shippingCost"), usesGlobalFreight ? "-" : formatMoney(productFreightTotal(product)))}
        </div>
      </div>
    </article>`;
  }

  function quoteSheetSummary(totals) {
    return `<section class="sheet-summary">
      <div class="sheet-summary-row"><span>${escapeHtml(t("totalNumber"))}</span><strong>${totals.units}</strong></div>
      <div class="sheet-summary-row"><span>${escapeHtml(t("productTotal"))}</span><strong>${formatMoney(totals.productTotal)}</strong></div>
      <div class="sheet-summary-row"><span>${escapeHtml(t("freight"))}</span><strong>${formatMoney(totals.freight)}</strong></div>
      <div class="sheet-summary-row sheet-summary-total"><span>${escapeHtml(t("actualPayment"))}</span><strong>${formatMoney(totals.actualPayment)}</strong></div>
    </section>`;
  }

  function quoteSheetCardField(label, value) {
    return `<div class="sheet-card-field"><div class="sheet-label">${escapeHtml(label)}</div><strong>${escapeHtml(value)}</strong></div>`;
  }

  function quoteSheetProductLabel(product) {
    const name = product.name || t("shortDescription");
    return `<span class="sheet-code">${escapeHtml(product.code)}</span><span class="sheet-name">${escapeHtml(name)}</span>`;
  }

  function quoteSheetPhotos(product, index) {
    const images = product.images.slice(0, 4).map((image, imageIndex) => (
      `<img src="${escapeAttr(image.src)}" alt="${escapeAttr(image.name || `${product.code} ${index + 1}-${imageIndex + 1}`)}">`
    )).join("");
    const extra = product.images.length > 4 ? `<span class="sheet-more">+${product.images.length - 4}</span>` : "";
    return `<div class="sheet-photos">${images || `<div class="sheet-no-photo">${escapeHtml(t("noPhoto"))}</div>`}${extra}</div>`;
  }

  function productSizeSummary(product) {
    const selected = SIZE_KEYS
      .map((size) => ({ size, units: toNumber(product.sizes[size]) }))
      .filter((item) => item.units > 0)
      .map((item) => `${item.size} x ${item.units}`);
    return selected.join(", ") || product.availableSizes || t("notSelected");
  }

  async function quoteXlsxBlob(quote) {
    const startRow = 5;
    const productRows = Math.max(quote.products.length, 1);
    const lastProductRow = startRow + productRows - 1;
    const summaryStart = lastProductRow + 1;
    const images = await quoteXlsxImages(quote, startRow);
    const files = [
      xlsxTextFile("[Content_Types].xml", xlsxContentTypes(images.length > 0)),
      xlsxTextFile("_rels/.rels", xlsxRootRels()),
      xlsxTextFile("xl/workbook.xml", xlsxWorkbookXml()),
      xlsxTextFile("xl/_rels/workbook.xml.rels", xlsxWorkbookRels()),
      xlsxTextFile("xl/styles.xml", xlsxStylesXml()),
      xlsxTextFile("xl/worksheets/sheet1.xml", xlsxSheetXml(quote, startRow, lastProductRow, summaryStart, images.length > 0))
    ];

    if (images.length) {
      files.push(xlsxTextFile("xl/worksheets/_rels/sheet1.xml.rels", xlsxSheetRels()));
      files.push(xlsxTextFile("xl/drawings/drawing1.xml", xlsxDrawingXml(images)));
      files.push(xlsxTextFile("xl/drawings/_rels/drawing1.xml.rels", xlsxDrawingRels(images)));
      images.forEach((image) => files.push({ name: `xl/media/${image.fileName}`, data: image.bytes }));
    }

    return createZip(files);
  }

  async function quoteXlsxImages(quote, startRow) {
    const images = [];
    for (let index = 0; index < quote.products.length; index += 1) {
      const image = quote.products[index].images[0];
      if (!image?.src) continue;
      try {
        const bytes = await imageSourceToPngBytes(image.src);
        if (!bytes.length) continue;
        images.push({
          id: images.length + 1,
          row: startRow + index,
          fileName: `image${images.length + 1}.png`,
          bytes
        });
      } catch (error) {
        console.warn(error);
      }
    }
    return images;
  }

  function xlsxContentTypes(hasImages) {
    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  ${hasImages ? `<Default Extension="png" ContentType="image/png"/>` : ""}
  <Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>
  <Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>
  <Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>
  ${hasImages ? `<Override PartName="/xl/drawings/drawing1.xml" ContentType="application/vnd.openxmlformats-officedocument.drawing+xml"/>` : ""}
</Types>`;
  }

  function xlsxRootRels() {
    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>
</Relationships>`;
  }

  function xlsxWorkbookXml() {
    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <sheets>
    <sheet name="Quote" sheetId="1" r:id="rId1"/>
  </sheets>
  <calcPr calcId="0" fullCalcOnLoad="1" forceFullCalc="1"/>
</workbook>`;
  }

  function xlsxWorkbookRels() {
    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
</Relationships>`;
  }

  function xlsxStylesXml() {
    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
  <fonts count="2">
    <font><sz val="11"/><name val="Arial"/></font>
    <font><b/><sz val="11"/><name val="Arial"/></font>
  </fonts>
  <fills count="5">
    <fill><patternFill patternType="none"/></fill>
    <fill><patternFill patternType="gray125"/></fill>
    <fill><patternFill patternType="solid"><fgColor rgb="FFF6CF20"/><bgColor indexed="64"/></patternFill></fill>
    <fill><patternFill patternType="solid"><fgColor rgb="FFD8F0D2"/><bgColor indexed="64"/></patternFill></fill>
    <fill><patternFill patternType="solid"><fgColor rgb="FFDDEBF7"/><bgColor indexed="64"/></patternFill></fill>
  </fills>
  <borders count="2">
    <border><left/><right/><top/><bottom/><diagonal/></border>
    <border><left style="thin"><color rgb="FF6F806F"/></left><right style="thin"><color rgb="FF6F806F"/></right><top style="thin"><color rgb="FF6F806F"/></top><bottom style="thin"><color rgb="FF6F806F"/></bottom><diagonal/></border>
  </borders>
  <cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>
  <cellXfs count="10">
    <xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/>
    <xf numFmtId="0" fontId="1" fillId="0" borderId="0" xfId="0" applyFont="1" applyAlignment="1"><alignment horizontal="left"/></xf>
    <xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0" applyAlignment="1"><alignment horizontal="left"/></xf>
    <xf numFmtId="0" fontId="1" fillId="2" borderId="1" xfId="0" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment horizontal="center" vertical="center" wrapText="1"/></xf>
    <xf numFmtId="0" fontId="1" fillId="3" borderId="1" xfId="0" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment horizontal="center" vertical="center" wrapText="1"/></xf>
    <xf numFmtId="4" fontId="1" fillId="0" borderId="1" xfId="0" applyFont="1" applyBorder="1" applyNumberFormat="1" applyAlignment="1"><alignment horizontal="center" vertical="center"/></xf>
    <xf numFmtId="1" fontId="1" fillId="0" borderId="1" xfId="0" applyFont="1" applyBorder="1" applyNumberFormat="1" applyAlignment="1"><alignment horizontal="center" vertical="center"/></xf>
    <xf numFmtId="0" fontId="1" fillId="2" borderId="1" xfId="0" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment horizontal="right" vertical="center"/></xf>
    <xf numFmtId="4" fontId="1" fillId="4" borderId="1" xfId="0" applyFont="1" applyFill="1" applyBorder="1" applyNumberFormat="1" applyAlignment="1"><alignment horizontal="center" vertical="center"/></xf>
    <xf numFmtId="4" fontId="1" fillId="2" borderId="1" xfId="0" applyFont="1" applyFill="1" applyBorder="1" applyNumberFormat="1" applyAlignment="1"><alignment horizontal="center" vertical="center"/></xf>
  </cellXfs>
  <cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles>
</styleSheet>`;
  }

  function xlsxSheetXml(quote, startRow, lastProductRow, summaryStart, hasImages) {
    const finalRow = summaryStart + 3;
    const totals = quoteCalculationTotals(quote);
    const productRows = quote.products.length
      ? quote.products.map((product, index) => xlsxProductRow(product, index, startRow + index, totals.usesGlobalFreight)).join("")
      : xlsxRow(startRow, [
        xlsxStringCell(`A${startRow}`, t("emptyState"), 4),
        xlsxBlankCell(`B${startRow}`, 4),
        xlsxBlankCell(`C${startRow}`, 5),
        xlsxBlankCell(`D${startRow}`, 6),
        xlsxBlankCell(`E${startRow}`, 5),
        xlsxBlankCell(`F${startRow}`, 5),
        xlsxBlankCell(`G${startRow}`, 4)
      ], 54);
    const mergeRefs = [
      "A1:G1",
      "A2:G2",
      "A3:G3",
      `A${summaryStart}:C${summaryStart}`,
      `E${summaryStart}:G${summaryStart}`,
      `A${summaryStart + 1}:D${summaryStart + 1}`,
      `F${summaryStart + 1}:G${summaryStart + 1}`,
      `A${summaryStart + 2}:E${summaryStart + 2}`,
      `A${summaryStart + 3}:E${summaryStart + 3}`,
      `F${summaryStart + 3}:G${summaryStart + 3}`
    ];

    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <dimension ref="A1:G${finalRow}"/>
  <sheetViews><sheetView workbookViewId="0"/></sheetViews>
  <sheetFormatPr defaultRowHeight="18"/>
  <cols>
    <col min="1" max="1" width="6" customWidth="1"/>
    <col min="2" max="2" width="14" customWidth="1"/>
    <col min="3" max="3" width="12" customWidth="1"/>
    <col min="4" max="4" width="10" customWidth="1"/>
    <col min="5" max="5" width="13" customWidth="1"/>
    <col min="6" max="6" width="14" customWidth="1"/>
    <col min="7" max="7" width="16" customWidth="1"/>
  </cols>
  <sheetData>
    ${xlsxRow(1, [xlsxStringCell("A1", quote.name || t("untitledQuote"), 1)])}
    ${xlsxRow(2, [xlsxStringCell("A2", `${t("supplier")}: ${quote.supplierName || "-"} / ${t("quoteDate")}: ${formatDate(quote.updatedAt || quote.createdAt)}`, 2)])}
    ${xlsxRow(3, [xlsxStringCell("A3", "USD", 2)])}
    ${xlsxRow(4, [
      xlsxStringCell("A4", t("number"), 3),
      xlsxStringCell("B4", t("photos"), 3),
      xlsxStringCell("C4", t("unitPrice"), 3),
      xlsxStringCell("D4", t("pcs"), 3),
      xlsxStringCell("E4", t("totalPrice"), 3),
      xlsxStringCell("F4", t("shippingCost"), 3),
      xlsxStringCell("G4", t("size"), 3)
    ], 22)}
    ${productRows}
    ${xlsxRow(summaryStart, [
      xlsxStringCell(`A${summaryStart}`, t("totalNumber"), 7),
      xlsxFormulaCell(`D${summaryStart}`, `SUM(D${startRow}:D${lastProductRow})`, 6, totals.units),
      xlsxBlankCell(`E${summaryStart}`, 8)
    ], 22)}
    ${xlsxRow(summaryStart + 1, [
      xlsxStringCell(`A${summaryStart + 1}`, t("productTotal"), 7),
      xlsxFormulaCell(`E${summaryStart + 1}`, `SUM(E${startRow}:E${lastProductRow})`, 8, totals.productTotal),
      xlsxBlankCell(`F${summaryStart + 1}`, 8)
    ], 22)}
    ${xlsxRow(summaryStart + 2, [
      xlsxStringCell(`A${summaryStart + 2}`, t("freight"), 7),
      totals.usesGlobalFreight
        ? xlsxNumberCell(`F${summaryStart + 2}`, totals.freight, 8)
        : xlsxFormulaCell(`F${summaryStart + 2}`, `SUM(F${startRow}:F${lastProductRow})`, 8, totals.freight)
    ], 22)}
    ${xlsxRow(summaryStart + 3, [
      xlsxStringCell(`A${summaryStart + 3}`, t("actualPayment"), 7),
      xlsxFormulaCell(`F${summaryStart + 3}`, `E${summaryStart + 1}+F${summaryStart + 2}`, 9, totals.actualPayment)
    ], 24)}
  </sheetData>
  <mergeCells count="${mergeRefs.length}">
    ${mergeRefs.map((ref) => `<mergeCell ref="${ref}"/>`).join("")}
  </mergeCells>
  ${hasImages ? `<drawing r:id="rId1"/>` : ""}
</worksheet>`;
  }

  function xlsxProductRow(product, index, rowNumber, usesGlobalFreight) {
    return xlsxRow(rowNumber, [
      xlsxNumberCell(`A${rowNumber}`, index + 1, 4),
      product.images[0] ? xlsxBlankCell(`B${rowNumber}`, 4) : xlsxStringCell(`B${rowNumber}`, product.code || t("noPhoto"), 4),
      xlsxNumberCell(`C${rowNumber}`, toNumber(product.productPrice), 5),
      xlsxNumberCell(`D${rowNumber}`, productUnits(product), 6),
      xlsxFormulaCell(`E${rowNumber}`, `C${rowNumber}*D${rowNumber}`, 5, productPriceTotal(product)),
      usesGlobalFreight ? xlsxBlankCell(`F${rowNumber}`, 5) : xlsxFormulaCell(`F${rowNumber}`, `${excelNumber(product.freight)}*D${rowNumber}`, 5, productFreightTotal(product)),
      xlsxStringCell(`G${rowNumber}`, productSizeSummary(product), 4)
    ], 62);
  }

  function xlsxRow(rowNumber, cells, height = 18) {
    return `<row r="${rowNumber}" ht="${height}" customHeight="1">${cells.join("")}</row>`;
  }

  function xlsxStringCell(ref, value, style) {
    return `<c r="${ref}" s="${style}" t="inlineStr"><is><t>${escapeXml(value)}</t></is></c>`;
  }

  function xlsxNumberCell(ref, value, style) {
    return `<c r="${ref}" s="${style}"><v>${excelNumber(value)}</v></c>`;
  }

  function xlsxFormulaCell(ref, formula, style, value = "") {
    const cachedValue = value === "" ? "" : `<v>${excelNumber(value)}</v>`;
    return `<c r="${ref}" s="${style}"><f>${escapeXml(formula)}</f>${cachedValue}</c>`;
  }

  function xlsxBlankCell(ref, style) {
    return `<c r="${ref}" s="${style}"/>`;
  }

  function xlsxSheetRels() {
    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/drawing" Target="../drawings/drawing1.xml"/>
</Relationships>`;
  }

  function xlsxDrawingXml(images) {
    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<xdr:wsDr xmlns:xdr="http://schemas.openxmlformats.org/drawingml/2006/spreadsheetDrawing" xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main">
  ${images.map((image) => xlsxDrawingAnchor(image)).join("")}
</xdr:wsDr>`;
  }

  function xlsxDrawingAnchor(image) {
    const row = image.row - 1;
    return `<xdr:twoCellAnchor editAs="oneCell">
    <xdr:from><xdr:col>1</xdr:col><xdr:colOff>95250</xdr:colOff><xdr:row>${row}</xdr:row><xdr:rowOff>95250</xdr:rowOff></xdr:from>
    <xdr:to><xdr:col>2</xdr:col><xdr:colOff>0</xdr:colOff><xdr:row>${row + 1}</xdr:row><xdr:rowOff>0</xdr:rowOff></xdr:to>
    <xdr:pic>
      <xdr:nvPicPr><xdr:cNvPr id="${image.id}" name="Picture ${image.id}"/><xdr:cNvPicPr/></xdr:nvPicPr>
      <xdr:blipFill><a:blip xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" r:embed="rId${image.id}"/><a:stretch><a:fillRect/></a:stretch></xdr:blipFill>
      <xdr:spPr><a:prstGeom prst="rect"><a:avLst/></a:prstGeom></xdr:spPr>
    </xdr:pic>
    <xdr:clientData/>
  </xdr:twoCellAnchor>`;
  }

  function xlsxDrawingRels(images) {
    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  ${images.map((image) => `<Relationship Id="rId${image.id}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="../media/${image.fileName}"/>`).join("")}
</Relationships>`;
  }

  async function imageSourceToPngBytes(src) {
    const image = await loadImageElement(src);
    const maxSize = 320;
    const scale = Math.min(1, maxSize / Math.max(image.width || maxSize, image.height || maxSize));
    const width = Math.max(1, Math.round((image.width || maxSize) * scale));
    const height = Math.max(1, Math.round((image.height || maxSize) * scale));
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(image, 0, 0, width, height);
    return dataUrlToBytes(canvas.toDataURL("image/png"));
  }

  function loadImageElement(src) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = reject;
      image.src = src;
    });
  }

  function dataUrlToBytes(dataUrl) {
    const match = String(dataUrl || "").match(/^data:([^;,]+)?(;base64)?,(.*)$/);
    if (!match) return new Uint8Array();
    if (match[2]) {
      const binary = atob(match[3]);
      const bytes = new Uint8Array(binary.length);
      for (let index = 0; index < binary.length; index += 1) bytes[index] = binary.charCodeAt(index);
      return bytes;
    }
    return textBytes(decodeURIComponent(match[3]));
  }

  function xlsxTextFile(name, value) {
    return { name, data: textBytes(value) };
  }

  function textBytes(value) {
    return new TextEncoder().encode(String(value));
  }

  function createZip(files) {
    const localParts = [];
    const centralParts = [];
    let offset = 0;

    files.forEach((file) => {
      const nameBytes = textBytes(file.name);
      const data = file.data instanceof Uint8Array ? file.data : textBytes(file.data);
      const crc = crc32(data);
      const localHeader = zipLocalHeader(nameBytes, data, crc);
      const centralHeader = zipCentralHeader(nameBytes, data, crc, offset);
      localParts.push(localHeader, data);
      centralParts.push(centralHeader);
      offset += localHeader.length + data.length;
    });

    const centralStart = offset;
    const centralSize = centralParts.reduce((sum, part) => sum + part.length, 0);
    const end = zipEndRecord(files.length, centralSize, centralStart);
    return concatBytes([...localParts, ...centralParts, end]);
  }

  function zipLocalHeader(nameBytes, data, crc) {
    const header = new Uint8Array(30 + nameBytes.length);
    const view = new DataView(header.buffer);
    view.setUint32(0, 0x04034b50, true);
    view.setUint16(4, 20, true);
    view.setUint16(6, 0, true);
    view.setUint16(8, 0, true);
    view.setUint16(10, 0, true);
    view.setUint16(12, 0, true);
    view.setUint32(14, crc, true);
    view.setUint32(18, data.length, true);
    view.setUint32(22, data.length, true);
    view.setUint16(26, nameBytes.length, true);
    view.setUint16(28, 0, true);
    header.set(nameBytes, 30);
    return header;
  }

  function zipCentralHeader(nameBytes, data, crc, offset) {
    const header = new Uint8Array(46 + nameBytes.length);
    const view = new DataView(header.buffer);
    view.setUint32(0, 0x02014b50, true);
    view.setUint16(4, 20, true);
    view.setUint16(6, 20, true);
    view.setUint16(8, 0, true);
    view.setUint16(10, 0, true);
    view.setUint16(12, 0, true);
    view.setUint16(14, 0, true);
    view.setUint32(16, crc, true);
    view.setUint32(20, data.length, true);
    view.setUint32(24, data.length, true);
    view.setUint16(28, nameBytes.length, true);
    view.setUint16(30, 0, true);
    view.setUint16(32, 0, true);
    view.setUint16(34, 0, true);
    view.setUint16(36, 0, true);
    view.setUint32(38, 0, true);
    view.setUint32(42, offset, true);
    header.set(nameBytes, 46);
    return header;
  }

  function zipEndRecord(fileCount, centralSize, centralStart) {
    const header = new Uint8Array(22);
    const view = new DataView(header.buffer);
    view.setUint32(0, 0x06054b50, true);
    view.setUint16(4, 0, true);
    view.setUint16(6, 0, true);
    view.setUint16(8, fileCount, true);
    view.setUint16(10, fileCount, true);
    view.setUint32(12, centralSize, true);
    view.setUint32(16, centralStart, true);
    view.setUint16(20, 0, true);
    return header;
  }

  function concatBytes(parts) {
    const length = parts.reduce((sum, part) => sum + part.length, 0);
    const output = new Uint8Array(length);
    let offset = 0;
    parts.forEach((part) => {
      output.set(part, offset);
      offset += part.length;
    });
    return output;
  }

  function crc32(bytes) {
    let crc = 0xffffffff;
    const table = crc32Table();
    for (let index = 0; index < bytes.length; index += 1) {
      crc = (crc >>> 8) ^ table[(crc ^ bytes[index]) & 0xff];
    }
    return (crc ^ 0xffffffff) >>> 0;
  }

  let cachedCrc32Table = null;
  function crc32Table() {
    if (cachedCrc32Table) return cachedCrc32Table;
    cachedCrc32Table = new Uint32Array(256);
    for (let index = 0; index < 256; index += 1) {
      let value = index;
      for (let bit = 0; bit < 8; bit += 1) {
        value = value & 1 ? 0xedb88320 ^ (value >>> 1) : value >>> 1;
      }
      cachedCrc32Table[index] = value >>> 0;
    }
    return cachedCrc32Table;
  }

  function excelNumber(value) {
    return toNumber(value).toFixed(2);
  }

  function escapeXml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;");
  }

  function htmlField(label, value) {
    return `<div><div class="label">${escapeHtml(label)}</div><div class="value">${escapeHtml(value)}</div></div>`;
  }

  async function quoteForHtmlExport(quote) {
    const copy = normalizeQuote(JSON.parse(JSON.stringify(quote)));
    for (const product of copy.products) {
      for (const image of product.images) {
        image.src = await imageSourceForHtmlExport(image.src);
      }
    }
    return copy;
  }

  async function imageSourceForHtmlExport(src) {
    if (!src || src.startsWith("data:image/")) return src;
    try {
      const response = await fetch(src, { mode: "cors" });
      if (!response.ok) throw new Error("Image fetch failed");
      const blob = await response.blob();
      if (!blob.type.startsWith("image/")) return src;
      return blobToDataUrl(blob);
    } catch (error) {
      console.warn(error);
      return src;
    }
  }

  function blobToDataUrl(blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result || ""));
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
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

  function moneyField(value) {
    return value === null || value === undefined || value === "" ? "" : toNumber(value);
  }

  function priceFieldsAreEmpty(productPrice, freight) {
    return productPrice === "" && freight === "";
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

  function safeFileName(value) {
    return String(value || "quote")
      .trim()
      .replace(/[\\/:*?"<>|]+/g, "-")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .slice(0, 80) || "quote";
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

  function showToast(message, duration = 1800) {
    clearTimeout(showToast.timer);
    els.toast.textContent = message;
    els.toast.classList.add("show");
    showToast.timer = setTimeout(() => els.toast.classList.remove("show"), duration);
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
