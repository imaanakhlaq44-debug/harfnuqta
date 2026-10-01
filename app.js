/**
 * Harf & Nuqta (harfnuqta.store) - Clean 2-Color Digital PDF Bookstore Logic
 */

// ==========================================
// 1. DIGITAL BOOKS DATA STORE (Easily add more books!)
// ==========================================
const bookstoreCatalog = [
  {
    id: "beyond-power-en",
    titleEn: "Beyond Power: Wisdom, Politics, Resistance",
    titleUr: "اقتدار کے پار (حکمت، سیاست، مزاحمت)",
    category: "politics",
    authorEn: "Rashid Yousafzai & M. Amin Asad",
    authorUr: "رشید یوسفزئی • محمد امین اسد",
    price: 500,
    originalPrice: 2500,
    coverImg: "front_cover_cropped.jpg",
    formatEn: "Complete PDF • 325 Pages",
    formatUr: "مکمل پی ڈی ایف • 325 صفحات",
    tagEn: "Featured",
    tagUr: "خاص اشاعت",
    snippetEn: "An analytical, document-based study of Maulana Fazlur Rehman's 40-year political journey, parliamentary statecraft, and the 26th Amendment.",
    snippetUr: "مولانا فضل الرحمن کے 40 سالہ سیاسی سفر، پارلیمانی فیصلوں اور 26ویں آئینی ترمیم کا غیر جانبدارانہ تحقیقی مطالعہ۔"
  },
  {
    id: "iqtidaar-ke-paar-ur",
    titleEn: "Iqtidaar Ke Paar (Urdu Original Edition)",
    titleUr: "اقتدار کے پار (اصل اردو ایڈیشن)",
    category: "urdu",
    authorEn: "Rashid Yousafzai & M. Amin Asad",
    authorUr: "رشید یوسفزئی • محمد امین اسد",
    price: 500,
    originalPrice: 2500,
    coverImg: "front_cover_cropped.jpg",
    formatEn: "Urdu PDF • 325 Pages",
    formatUr: "اردو پی ڈی ایف • 325 صفحات",
    tagEn: "Bestseller",
    tagUr: "بیسٹ سیلر",
    snippetEn: "The full original volume in classical Nastaliq Urdu typesetting with complete citations and archival documentation.",
    snippetUr: "خوبصورت خطِ نستعلیق میں مکمل 325 صفحات پر مشتمل اصل اردو ایڈیشن مع تمام دستاویزی حوالہ جات۔"
  },
  {
    id: "state-modern-islamic-thought",
    titleEn: "The State & Modern Islamic Jurisprudence",
    titleUr: "ریاست اور جدید اسلامی فکر",
    category: "philosophy",
    authorEn: "Dr. M. Amin Asad",
    authorUr: "ڈاکٹر محمد امین اسد",
    price: 999,
    originalPrice: 1600,
    coverImg: "preview_b5_large_p29.png",
    formatEn: "eBook PDF • 210 Pages",
    formatUr: "پی ڈی ایف • 210 صفحات",
    tagEn: "Philosophy",
    tagUr: "فکری مطالعہ",
    snippetEn: "A critical comparative examination of traditional Shariah discourse, constitutionalism, and contemporary democratic statehood.",
    snippetUr: "معاصر جمہوری ریاستی نظام میں شریعت، اجتہاد اور جدید دستوری تقاضوں کا عمیق فکری و تقابلی جائزہ۔"
  },
  {
    id: "pashtun-tribes-geopolitics",
    titleEn: "Pashtun Tribes & Regional Geopolitics",
    titleUr: "پشتون قبائل اور خطے کی جغرافیائی سیاست",
    category: "politics",
    authorEn: "Rashid Yousafzai",
    authorUr: "رشید یوسفزئی",
    price: 1199,
    originalPrice: 1800,
    coverImg: "preview_a5_p29.png",
    formatEn: "Research PDF • 280 Pages",
    formatUr: "تحقیقی پی ڈی ایف • 280 صفحات",
    tagEn: "History",
    tagUr: "تاریخ و تحقیق",
    snippetEn: "An unvarnished inquiry into tribal social structures, religious mobilization, and cross-border geopolitical tensions.",
    snippetUr: "افغان جنگوں سے لے کر دورِ حاضر تک قبائلی سماجی ساخت اور خطے کے تزویراتی تضادات کا تفصیلی پوسٹ مارٹم۔"
  }
];

// Current checkout state
let currentSelectedBook = {
  title: "Beyond Power: Wisdom, Politics, Resistance",
  price: 500
};

let activeCategory = "all";
let activeSearchQuery = "";
let currentLang = "en"; // Default White Clean English

// ==========================================
// 2. PAYMENT CONFIGURATIONS
// ==========================================
const paymentDetails = {
  easypaisa: {
    nameEn: "Easypaisa Account",
    nameUr: "ایزی پیسہ (Easypaisa)",
    number: "03119201520",
    title: "Dust On Books / Harf Nuqta",
    instructionsEn: "Transfer amount via your Easypaisa app to the number below, then paste the 11-digit TID confirmation number.",
    instructionsUr: "اپنے ایزی پیسہ اکاؤنٹ سے اس نمبر پر رقم ٹرانسفر کریں اور حاصل شدہ 11 ہندسوں کی TID نیچے درج کریں۔"
  },
  jazzcash: {
    nameEn: "JazzCash Account",
    nameUr: "جاز کیش (JazzCash)",
    number: "03119201520",
    title: "Dust On Books / Harf Nuqta",
    instructionsEn: "Send payment via JazzCash mobile account to the number below, then provide your transaction reference.",
    instructionsUr: "جاز کیش اکاؤنٹ سے رقم منتقل کر کے حاصل شدہ ٹرانزیکشن ریفرنس نیچے درج کریں۔"
  },
  bank: {
    nameEn: "Direct Bank Transfer",
    nameUr: "بینک اکاؤنٹ ٹرانسفر",
    number: "0102030405060708 (IBAN: PK12MEZN0001020304050607)",
    title: "Dust On Books Publications",
    bankName: "Meezan Bank Ltd",
    instructionsEn: "Transfer via online banking or any Pakistani bank mobile app (1Link / Raast) and paste the transaction reference.",
    instructionsUr: "کسی بھی آن لائن بینکنگ ایپ یا راست (Raast) سے اس اکاؤنٹ میں رقم بھیج کر ٹرانزیکشن حوالہ درج کریں۔"
  }
};

const OFFICIAL_WHATSAPP = "447521606952";

// ==========================================
// 3. INITIALIZATION
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem("hn_store_lang") || "en";
  setLanguage(savedLang);
  refreshPaymentBox();
});

// ==========================================
// 4. BILINGUAL SWITCHER
// ==========================================
const translations = {
  en: {
    topNotice: "Official Digital PDF Store • Instant WhatsApp & Email Delivery",
    brandSub: "DIGITAL PDF STORE",
    navCatalog: "Browse Store",
    navFeatured: "Featured Release",
    navAbout: "About Us",
    navFaq: "Help & FAQs",
    btnHeaderBuy: "Instant Checkout",
    heroOverline: "PREMIER DIGITAL BOOKSTORE • HARFNUQTA.STORE",
    heroHeadline: "Authentic Digital PDF Books on Politics, History & Thought",
    heroSubtext: "Discover verified, high-resolution unabridged eBooks. Download instantly on your mobile, tablet, or PC with hassle-free local payments.",
    catAll: "All Books",
    catPolitics: "Politics & History",
    catPhilosophy: "Philosophy & Thought",
    catUrdu: "Urdu Editions (اردو)",
    catEnglish: "English Editions",
    perk1Title: "Instant Digital Delivery",
    perk1Desc: "Immediate file access on WhatsApp & Email",
    perk2Title: "Verified Full Editions",
    perk2Desc: "100% unabridged official publisher copies",
    perk3Title: "Easy Local Payments",
    perk3Desc: "Easypaisa, JazzCash & Direct Bank Transfer",
    perk4Title: "Universal Compatibility",
    perk4Desc: "Works on iPhone, Android, iPad & Kindle",
    catalogTitle: "Digital PDF Catalog",
    catalogSubtitle: "Select any book to preview free sample pages or purchase instant PDF access.",
    spotlightBadge: "FEATURED RELEASE OF THE YEAR",
    btnReadSampleEn: "Read English Sample",
    btnReadSampleUr: "اردو نمونہ پڑھیں",
    spotCat: "POLITICAL BIOGRAPHY & CONSTITUTIONAL HISTORY",
    spotTitle: "Beyond Power: Wisdom, Politics, Resistance",
    spotSub: "اقتدار کے پار (حکمت، سیاست، مزاحمت)",
    spotDesc: "The groundbreaking, document-based analytical study of Maulana Fazlur Rehman's 40-year parliamentary journey, religious doctrine, behind-the-scenes statecraft, and crucial role in the 18th and 26th Constitutional Amendments.",
    lblAuthors: "Authors:",
    valAuthors: "Rashid Yousafzai & M. Amin Asad",
    lblLength: "Volume Length:",
    valLength: "325 Pages (Complete & Unabridged)",
    lblPublisher: "Publisher:",
    lblFormats: "Available In:",
    valFormats: "English Edition & Urdu Original Edition (PDF)",
    saveTag: "Save 80%",
    btnBuyEn: "Buy English PDF (PKR 500)",
    btnBuyUr: "اردو ایڈیشن خریدیں (500 روپے)",
    checkoutTag: "SECURE ORDERING",
    checkoutTitle: "Instant PDF Checkout",
    checkoutSubtitle: "Complete your purchase in under 60 seconds with direct local payment.",
    headingSummary: "Selected Publication",
    lblBasePrice: "Book Price:",
    lblPromoDiscount: "Promotional Discount:",
    lblDelivery: "Digital Delivery:",
    lblTotal: "Total to Pay:",
    g1: "Immediate file delivery via WhatsApp and Email",
    g2: "Official digital copyright release by Dust On Books",
    g3: "Lifetime access link provided",
    headingCustomer: "Instant WhatsApp Ordering",
    waOrderHead: "Fast & Direct Delivery on WhatsApp",
    waOrderDesc: "Click below to connect directly with our official ordering desk. Our representative will immediately send you payment details and deliver your high-resolution PDF file.",
    lblFullName: "Your Full Name (Optional)",
    lblNotes: "Special Instructions or Preferred Edition (Optional)",
    btnWhatsAppDirect: "Order via WhatsApp (+44 7521 606952)",
    floatingWaText: "Order on WhatsApp (+44 7521 606952)",
    faqTag: "SUPPORT",
    faqTitle: "Frequently Asked Questions",
    q1: "How will I receive the PDF file after payment?",
    a1: "Once your payment reference is submitted or sent to WhatsApp, your verified PDF eBook and download access link are delivered directly to your WhatsApp within minutes.",
    q2: "Can I read these PDF files on Android, iPhone, and PC?",
    a2: "Yes, our digital editions are compiled to standard Adobe PDF specifications with high readability across mobile devices, tablets, desktop computers, and e-readers.",
    q3: "How do I add other books to my cart or buy multiple titles?",
    a3: "Simply click 'Instant Buy' on any book in the catalog above, and the checkout form will update with the chosen title and amount.",
    footerMission: "A dedicated scholarly digital bookstore publishing authoritative books on contemporary politics, history, and constitutional thought.",
    ftQuick: "Store Navigation",
    ftLegal: "Legal & Copyright",
    modalNote: "To read the full unabridged 325 pages, get the complete PDF below.",
    modalOrderBtn: "Order Complete PDF (PKR 500)",
    succTitle: "Order Submitted Successfully",
    succText: "Thank you! We have logged your order and transaction reference. Your verified PDF will be dispatched to your WhatsApp number shortly.",
    btnConfirmWa: "Confirm Instantly on WhatsApp",
    btnClose: "Close"
  },
  ur: {
    topNotice: "آفیشل ڈیجیٹل پی ڈی ایف کتب خانہ • فوری واٹس ایپ اور ای میل ترسیل",
    brandSub: "ڈیجیٹل کتب خانہ",
    navCatalog: "کتب خانہ",
    navFeatured: "خاص کتاب",
    navAbout: "ہمارے بارے میں",
    navFaq: "عمومی سوالات",
    btnHeaderBuy: "فوری خریداری",
    heroOverline: "حرف و نقطہ ڈیجیٹل کتب خانہ • HARFNUQTA.STORE",
    heroHeadline: "سیاست، تاریخ اور فکری موضوعات پر مستند پی ڈی ایف کتب",
    heroSubtext: "مستند، غیر محذوف اور اعلیٰ ریزولوشن ای بکس باآسانی حاصل کریں۔ اپنے موبائل، ٹیبلٹ اور کمپیوٹر پر فوری ڈاؤنلوڈ کریں۔",
    catAll: "تمام کتب",
    catPolitics: "سیاست و تاریخ",
    catPhilosophy: "فکری و فلسفہ",
    catUrdu: "اردو ایڈیشنز",
    catEnglish: "English Editions",
    perk1Title: "فوری ڈیجیٹل ڈلیوری",
    perk1Desc: "واٹس ایپ اور ای میل پر براہِ راست فائل کی فراہمی",
    perk2Title: "مستند مکمل کتب",
    perk2Desc: "ناشر کے باقاعدہ کاپی رائٹ کے ساتھ غیر محذوف ایڈیشنز",
    perk3Title: "آسان لوکل ادائیگی",
    perk3Desc: "ایزی پیسہ، جاز کیش اور بینک اکاؤنٹ کی سہولت",
    perk4Title: "تمام ڈیوائسز پر سپورٹ",
    perk4Desc: "اینڈرائڈ، آئی فون، لیپ ٹاپ اور کنڈل پر قابلِ مطالعہ",
    catalogTitle: "ڈیجیٹل کتب خانہ",
    catalogSubtitle: "مفت نمونہ پڑھنے یا فوری پی ڈی ایف خریدنے کے لیے کسی بھی کتاب کا انتخاب کریں۔",
    spotlightBadge: "سال کی سب سے نمایاں اشاعت",
    btnReadSampleEn: "Read English Sample",
    btnReadSampleUr: "اردو نمونہ پڑھیں",
    spotCat: "سیاسی سوانح عمری اور دستوری تاریخ",
    spotTitle: "اقتدار کے پار (حکمت، سیاست، مزاحمت)",
    spotSub: "Beyond Power: Wisdom, Politics, Resistance",
    spotDesc: "مولانا فضل الرحمن کے 40 سالہ پارلیمانی سفر، مذہبی فکر، بند کمروں کی سیاست اور 18ویں و 26ویں آئینی ترمیم کے حوالے سے چشم کشا اور دستاویزی مطالعہ۔",
    lblAuthors: "مصنفین:",
    valAuthors: "رشید یوسفزئی • محمد امین اسد",
    lblLength: "کل ضخامت:",
    valLength: "325 صفحات (مکمل کتاب)",
    lblPublisher: "ناشر:",
    lblFormats: "دستیاب فارمیٹس:",
    valFormats: "اردو ایڈیشن اور انگریزی ایڈیشن (PDF)",
    saveTag: "80% بچت",
    btnBuyEn: "انگلش ایڈیشن خریدیں (500 روپے)",
    btnBuyUr: "اردو ایڈیشن خریدیں (500 روپے)",
    checkoutTag: "محفوظ خریداری",
    checkoutTitle: "فوری پی ڈی ایف آرڈر",
    checkoutSubtitle: "صرف 1 منٹ میں ایزی پیسہ، جاز کیش یا بینک کے ذریعے آرڈر مکمل کریں۔",
    headingSummary: "منتخب کتاب کی تفصیل",
    lblBasePrice: "اصل قیمت:",
    lblPromoDiscount: "خصوصی رعایت:",
    lblDelivery: "ڈیجیٹل ترسیل:",
    lblTotal: "کل رقم:",
    g1: "ادائیگی کے فوری بعد واٹس ایپ اور ای میل پر فائل کی ترسیل",
    g2: "ڈسٹ آن بکس پبلشرز کا تصدیق شدہ ایڈیشن",
    g3: "لائف ٹائم ایکسیس لنک",
    headingCustomer: "واٹس ایپ پر فوری آرڈر",
    waOrderHead: "واٹس ایپ پر تیز ترین اور براہِ راست ڈلیوری",
    waOrderDesc: "نیچے بٹن پر کلک کر کے ہمارے آفیشل واٹس ایپ ڈیسک پر رابطہ کریں۔ ہمارے نمائندے آپ کو فوری ادائیگی کی تفصیلات فراہم کر کے پی ڈی ایف فائل سینڈ کر دیں گے۔",
    lblFullName: "آپ کا پورا نام (اختیاری)",
    lblNotes: "کوئی خاص ہدایت یا پسندیدہ ایڈیشن (اختیاری)",
    btnWhatsAppDirect: "واٹس ایپ پر آرڈر کریں (+44 7521 606952)",
    floatingWaText: "واٹس ایپ پر رابطہ اور آرڈر (+44 7521 606952)",
    faqTag: "رہنمائی",
    faqTitle: "اکثر پوچھے گئے سوالات",
    q1: "رقم بھیجنے کے بعد پی ڈی ایف کیسے اور کب ملے گا؟",
    a1: "ادائیگی کے بعد جب آپ فارم سبمٹ کرتے ہیں یا واٹس ایپ پر اطلاع دیتے ہیں تو چند منٹوں کے اندر مکمل فائل آپ کے واٹس ایپ پر بھیج دی جاتی ہے۔",
    q2: "کیا یہ فائل موبائل اور کمپیوٹر دونوں پر کھلے گی؟",
    a2: "جی ہاں، یہ معیاری ایڈوب پی ڈی ایف فائل ہے جو موبائل، آئی فون، ٹیبلٹ اور لیپ ٹاپ پر بغیر کسی مسئلے کے واضح نظر آتی ہے۔",
    q3: "کیا ہم کتب خانے سے دیگر کتب بھی خرید سکتے ہیں؟",
    a3: "جی بالکل، کتب خانے میں موجود کسی بھی کتاب پر 'Instant Buy' دبائیں تو وہ آرڈر فارم میں شامل ہو جائے گی۔",
    footerMission: "سیاست، تاریخ اور عصری فکری موضوعات پر مستند اور باوقار کتب کی اشاعت کا ڈیجیٹل پلیٹ فارم۔",
    ftQuick: "کتب خانہ نیویگیشن",
    ftLegal: "قانونی تحفظات",
    modalNote: "مکمل 325 صفحات کی پی ڈی ایف حاصل کرنے کے لیے نیچے آرڈر کریں۔",
    modalOrderBtn: "مکمل پی ڈی ایف خریدیں (500 روپے)",
    succTitle: "آپ کا آرڈر موصول ہو چکا ہے",
    succText: "شکریہ! ہمیں آپ کا آرڈر موصول ہو گیا ہے۔ تصدیق کے بعد پی ڈی ایف فائل آپ کے واٹس ایپ نمبر پر ارسال کر دی جائے گی۔",
    btnConfirmWa: "واٹس ایپ پر فوری تصدیق حاصل کریں",
    btnClose: "بند کریں"
  }
};

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem("hn_store_lang", lang);

  const isUr = lang === "ur";
  document.documentElement.lang = lang;
  document.documentElement.dir = isUr ? "rtl" : "ltr";
  document.body.classList.toggle("lang-ur", isUr);
  document.body.classList.toggle("lang-en", !isUr);

  const btnEn = document.getElementById("btnEn");
  const btnUr = document.getElementById("btnUr");
  if (btnEn && btnUr) {
    btnEn.classList.toggle("active", !isUr);
    btnUr.classList.toggle("active", isUr);
  }

  // Update text with data-key
  const dict = translations[lang];
  document.querySelectorAll("[data-key]").forEach(el => {
    const k = el.getAttribute("data-key");
    if (dict[k]) el.innerText = dict[k];
  });

  // Re-render grid
  renderStoreGrid();
  refreshPaymentBox();
}

// ==========================================
// 5. RENDER STORE GRID & FILTERING
// ==========================================
function renderStoreGrid() {
  const grid = document.getElementById("storeBooksGrid");
  const countEl = document.getElementById("catalogResultsCount");
  if (!grid) return;

  const isUr = currentLang === "ur";

  // Filter by category and search
  const filtered = bookstoreCatalog.filter(book => {
    const matchesCat = activeCategory === "all" || 
      (activeCategory === "english" && book.category !== "urdu") ||
      (book.category === activeCategory);

    const title = (book.titleEn + " " + book.titleUr + " " + book.authorEn + " " + book.authorUr).toLowerCase();
    const matchesSearch = !activeSearchQuery || title.includes(activeSearchQuery.toLowerCase());

    return matchesCat && matchesSearch;
  });

  if (countEl) {
    countEl.innerText = isUr 
      ? `کل ${filtered.length} کتب دستیاب ہیں`
      : `Showing ${filtered.length} publications`;
  }

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 40px; color: #64748b;">
        <p style="font-size: 1.1rem;">${isUr ? "کوئی کتاب نہیں ملی۔ براہ کرم دوبارہ سرچ کریں۔" : "No books found matching your criteria."}</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(book => {
    const title = isUr ? book.titleUr : book.titleEn;
    const author = isUr ? book.authorUr : book.authorEn;
    const format = isUr ? book.formatUr : book.formatEn;
    const snippet = isUr ? book.snippetUr : book.snippetEn;
    const tag = isUr ? book.tagUr : book.tagEn;
    const buyText = isUr ? "فوری خریدیں" : "Instant Buy";

    return `
      <div class="clean-book-card">
        <div class="card-cover-pane">
          <span class="card-format-tag">${tag}</span>
          <img src="${book.coverImg}" alt="${title}" onerror="this.src='front_cover_cropped.jpg'">
        </div>
        <div class="card-content-pane">
          <div>
            <div class="card-category-text">${format}</div>
            <h3 class="card-book-title">${title}</h3>
            <div class="card-author-name">${author}</div>
            <p class="card-book-snippet">${snippet}</p>
          </div>
          <div class="card-footer-action">
            <div class="card-price-display">
              <span class="price-now">PKR ${book.price.toLocaleString()}</span>
              <span class="price-was">PKR ${book.originalPrice.toLocaleString()}</span>
            </div>
            <button class="btn btn-primary btn-sm" onclick="selectBookForPurchase('${title.replace(/'/g, "\\'")}', ${book.price})">
              ${buyText}
            </button>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

function applyFilter(category, btnElement) {
  activeCategory = category;
  document.querySelectorAll(".cat-pill").forEach(b => b.classList.remove("active"));
  if (btnElement) btnElement.classList.add("active");
  renderStoreGrid();

  const storeSection = document.getElementById("store-section");
  if (storeSection) {
    storeSection.scrollIntoView({ behavior: "smooth" });
  }
}

function handleSearch(query) {
  activeSearchQuery = query.trim();
  renderStoreGrid();
}

// ==========================================
// 6. SELECT BOOK FOR PURCHASE
// ==========================================
function selectBookForPurchase(title, price) {
  currentSelectedBook = { title, price };

  const titleEl = document.getElementById("cartItemTitle");
  const priceEl = document.getElementById("cartItemPrice");
  const totalEl = document.getElementById("cartTotalDisplay");

  if (titleEl) titleEl.innerText = title;
  if (priceEl) priceEl.innerText = `PKR ${price.toLocaleString()}`;
  if (totalEl) totalEl.innerText = `PKR ${price.toLocaleString()}`;

  const checkoutSection = document.getElementById("checkout-section");
  if (checkoutSection) {
    checkoutSection.scrollIntoView({ behavior: "smooth" });
  }
}

// ==========================================
// 7. PAYMENT DETAILS BOX
// ==========================================
function refreshPaymentBox() {
  const method = document.querySelector('input[name="storePaymentMethod"]:checked')?.value || "easypaisa";
  const box = document.getElementById("accountDetailsView");
  if (!box) return;

  const isUr = currentLang === "ur";

  document.querySelectorAll(".pay-option-card").forEach(label => {
    const r = label.querySelector("input");
    if (r && r.value === method) label.classList.add("active");
    else label.classList.remove("active");
  });

  const acc = paymentDetails[method];
  if (!acc) return;

  const title = isUr ? acc.nameUr : acc.nameEn;
  const instr = isUr ? acc.instructionsUr : acc.instructionsEn;
  const numLbl = isUr ? "اکاؤنٹ نمبر:" : "Account Number:";
  const nameLbl = isUr ? "اکاؤنٹ نام:" : "Account Title:";
  const bankLbl = isUr ? "بینک:" : "Bank:";
  const copyLbl = isUr ? "کاپی" : "Copy";

  box.innerHTML = `
    <div style="font-weight: 700; color: #1e3a8a; margin-bottom: 6px;">${title}</div>
    <p style="font-size: 0.85rem; color: #64748b; margin-bottom: 8px;">${instr}</p>
    
    <div class="clean-copy-line">
      <span><strong>${numLbl}</strong> <span dir="ltr">${acc.number}</span></span>
      <button type="button" class="copy-mini-btn" onclick="copyValue('${acc.number}')">${copyLbl}</button>
    </div>

    <div class="clean-copy-line">
      <span><strong>${nameLbl}</strong> ${acc.title}</span>
      <button type="button" class="copy-mini-btn" onclick="copyValue('${acc.title}')">${copyLbl}</button>
    </div>

    ${acc.bankName ? `
    <div class="clean-copy-line">
      <span><strong>${bankLbl}</strong> ${acc.bankName}</span>
    </div>` : ''}
  `;
}

function copyValue(val) {
  navigator.clipboard.writeText(val).then(() => {
    alert(currentLang === 'ur' ? "کاپی ہو گیا: " + val : "Copied: " + val);
  }).catch(() => {
    alert(val);
  });
}

// ==========================================
// 8. CHECKOUT PROCESS
// ==========================================
function processCheckout(e) {
  e.preventDefault();

  const name = document.getElementById("orderName")?.value || "";
  const phone = document.getElementById("orderPhone")?.value || "";
  const tid = document.getElementById("orderTid")?.value || "";
  const method = document.querySelector('input[name="storePaymentMethod"]:checked')?.value || "easypaisa";

  const orderNum = "HN-" + Math.floor(100000 + Math.random() * 900000);
  const isUr = currentLang === "ur";

  const metaBox = document.getElementById("successMetaContent");
  if (metaBox) {
    metaBox.innerHTML = `
      <div><strong>${isUr ? "آرڈر نمبر" : "Order ID"}:</strong> <span dir="ltr">${orderNum}</span></div>
      <div><strong>${isUr ? "کتاب" : "Book"}:</strong> ${currentSelectedBook.title}</div>
      <div><strong>${isUr ? "رقم" : "Amount"}:</strong> PKR ${currentSelectedBook.price.toLocaleString()}</div>
      <div><strong>${isUr ? "نام" : "Name"}:</strong> ${name}</div>
      <div><strong>WhatsApp:</strong> <span dir="ltr">${phone}</span></div>
      <div><strong>TID:</strong> <span dir="ltr">${tid}</span> (${method.toUpperCase()})</div>
    `;
  }

  // Pre-fill WhatsApp URL
  const waMsg = encodeURIComponent(
    `Hello, I have placed an order on Harf & Nuqta Bookstore (harfnuqta.store).\n\n` +
    `📖 Book: ${currentSelectedBook.title}\n` +
    `💰 Price: PKR ${currentSelectedBook.price}\n` +
    `👤 Name: ${name}\n` +
    `📱 WhatsApp: ${phone}\n` +
    `🧾 TID Reference: ${tid}\n` +
    `🆔 Order ID: ${orderNum}\n\n` +
    `Please confirm payment and send my verified PDF file. Thank you!`
  );

  const waBtn = document.getElementById("directWhatsAppLink");
  if (waBtn) waBtn.href = `https://wa.me/${OFFICIAL_WHATSAPP}?text=${waMsg}`;

  // Show Success Modal
  const modal = document.getElementById("successModal");
  if (modal) modal.classList.add("active");
}

function closeSuccessModal() {
  const modal = document.getElementById("successModal");
  if (modal) modal.classList.remove("active");
}

function handleDirectWhatsApp(e) {
  if (e) e.preventDefault();
  const name = document.getElementById("orderName")?.value.trim() || "Reader";
  const notes = document.getElementById("orderNotes")?.value.trim() || "";

  let msg = `Hello! I would like to order the digital PDF edition from Harf & Nuqta Bookstore (harfnuqta.store):\n\n` +
    `📖 Title: ${currentSelectedBook.title}\n` +
    `💰 Price: PKR ${currentSelectedBook.price}\n` +
    `👤 Name: ${name}\n`;
  if (notes) {
    msg += `📝 Instructions: ${notes}\n`;
  }
  msg += `\nPlease share payment details and dispatch my high-resolution PDF file. Thank you!`;

  window.open(`https://wa.me/${OFFICIAL_WHATSAPP}?text=${encodeURIComponent(msg)}`, "_blank");
}

function launchWhatsAppOrder() {
  handleDirectWhatsApp();
}

// ==========================================
// 9. FREE SAMPLE READER MODAL
// ==========================================
function openSampleModal(type) {
  const modal = document.getElementById("sampleModal");
  const title = document.getElementById("sampleModalTitle");
  const body = document.getElementById("sampleModalBody");
  if (!modal || !body) return;

  if (type === "urdu") {
    title.innerText = "اقتدار کے پار — نمونہ و فہرستِ ابواب";
    body.innerHTML = `
      <div dir="rtl" style="font-family: 'Noto Nastaliq Urdu', serif; line-height: 2.2; color: #1e293b;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h2 style="font-size: 2rem; color: #1e3a8a; margin-bottom: 4px;">اقتدار کے پار</h2>
          <h4 style="font-size: 1.15rem; color: #475569; font-weight: normal;">(حکمت، سیاست، مزاحمت)</h4>
          <p style="color: #64748b; font-size: 1rem;">مصنفین: رشید یوسفزئی • محمد امین اسد</p>
        </div>

        <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 16px; border-radius: 8px; margin-bottom: 20px;">
          <h4 style="color: #1e3a8a; margin-bottom: 8px;">منتخب ابواب کی فہرست:</h4>
          <ul style="list-style: square; padding-right: 20px;">
            <li>باب اول: وراثت کا گہوارہ — مفتی محمود سے جمعیت کی قیادت تک</li>
            <li>باب دوم: ضیاء آمریت، قید و بند اور جمہوری تحریک (MRD)</li>
            <li>باب سوم: پارلیمانی شطرنج — بے نظیر اور نواز شریف کے ادوار</li>
            <li>باب چہارم: نائن الیون اور متحدہ مجلس عمل (MMA) کا دور</li>
            <li>باب پنجم: 18ویں ترمیم اور اسلامی نظریاتی شقوں کا تحفظ</li>
            <li>باب ششم: 26ویں آئینی ترمیم — بند کمروں کے تاریخی مذاکرات</li>
          </ul>
        </div>

        <h3 style="color: #0f172a; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px; margin-bottom: 12px;">پیش لفظ سے اقتباس:</h3>
        <p style="margin-bottom: 14px;">
          پاکستانی سیاست میں مولانا فضل الرحمن کی شخصیت ہمیشہ سے تجسس، بحث اور تضادات کا محور رہی ہے۔ مخالفین انہیں مصلحت کی سیاست کا استعارہ قرار دیتے ہیں، جبکہ حامی انہیں ریاست کے آئینی و جمہوری تانے بانے کا سب سے مستحکم ستون سمجھتے ہیں۔
        </p>
        <p>
          زیرِ نظر کتاب کسی شخصیت کی مدح سرائی ہے نہ ہی سیاسی تعصب کی بنیاد پر کردار کشی۔ یہ چار دہائیوں پر محیط پاکستانی سیاست کی تاریخ کا وہ باب ہے جسے دستاویزی شہادتوں، پسِ پردہ مذاکرات کی تفاصیل اور غیر جانبدارانہ تحقیق کی روشنی میں رقم کیا گیا ہے۔
        </p>
      </div>
    `;
  } else {
    title.innerText = "BEYOND POWER — English Edition Sample Preview";
    body.innerHTML = `
      <div dir="ltr" style="font-family: 'Inter', system-ui, sans-serif; line-height: 1.7; color: #1e293b;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h2 style="font-size: 1.8rem; color: #1e3a8a; margin-bottom: 4px;">BEYOND POWER</h2>
          <h4 style="font-size: 1.05rem; color: #475569; font-weight: normal;">The Life, Religious Thought, and Parliamentary Politics of Maulana Fazlur Rehman</h4>
          <p style="color: #64748b; font-size: 0.9rem;">By Rashid Yousafzai & M. Amin Asad</p>
        </div>

        <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 16px; border-radius: 8px; margin-bottom: 20px;">
          <h4 style="color: #1e3a8a; margin-bottom: 8px; font-size: 0.95rem;">TABLE OF CONTENTS (Selected Chapters):</h4>
          <ul style="list-style: square; padding-left: 20px; font-size: 0.9rem; line-height: 1.8;">
            <li>Chapter 1: The Cradle of Inheritance — From Mufti Mahmud to the Student Arena</li>
            <li>Chapter 2: The Dictatorship Years & The Movement for the Restoration of Democracy (MRD)</li>
            <li>Chapter 3: The 1990s Parliamentary Web — Coalitions and Statecraft</li>
            <li>Chapter 4: The Post-9/11 Shockwave and the MMA Epoch</li>
            <li>Chapter 5: The 18th & 26th Constitutional Amendments — The Masterstroke</li>
          </ul>
        </div>

        <h3 style="color: #0f172a; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px; margin-bottom: 12px; font-size: 1.1rem;">From the Preface:</h3>
        <p style="margin-bottom: 14px;">
          In contemporary South Asian politics, few figures evoke as passionate divergence of opinion as Maulana Fazlur Rehman. To his ardent followers, he is the unwavering custodian of religious values in an increasingly cynical constitutional system; to his detractors, the quintessential master of tactical maneuver.
        </p>
        <p>
          This work represents the culmination of extensive documentary research, personal interviews, and political analysis aimed at moving beyond populist caricatures. We examine how a traditional Deobandi scholar navigated the corridors of a nuclear-armed state without abandoning his ideological bedrock...
        </p>
      </div>
    `;
  }

  modal.classList.add("active");
}

function closeSampleModal() {
  const modal = document.getElementById("sampleModal");
  if (modal) modal.classList.remove("active");
}

// ==========================================
// 10. ACCORDION TOGGLE
// ==========================================
function toggleAcc(btn) {
  const card = btn.closest(".accordion-card");
  if (!card) return;
  const isActive = card.classList.contains("active");
  document.querySelectorAll(".accordion-card").forEach(c => c.classList.remove("active"));
  if (!isActive) card.classList.add("active");
}

// Close modals when clicking backdrop
window.addEventListener("click", (e) => {
  const sample = document.getElementById("sampleModal");
  const succ = document.getElementById("successModal");
  if (e.target === sample) closeSampleModal();
  if (e.target === succ) closeSuccessModal();
});
