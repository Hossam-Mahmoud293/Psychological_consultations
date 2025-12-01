// بيانات الأخصائيين المشتركة بين الصفحات
const specialistsData = [
  {
    id: "amna",
    name: "أ. د. آمنة الراجحي",
    value: "آمنة الراجحي",
    initial: "أ",
    title: "استشارية طب نفسي | خبرة +12 سنة",
    bio: "متخصصة في علاج اضطرابات القلق والاكتئاب واضطرابات المزاج، مع خبرة واسعة في مساعدة البالغين على تجاوز ضغوط العمل والحياة اليومية وبناء توازن صحي ومستدام.",
    tags: ["اضطرابات القلق", "الاكتئاب", "الضغوط المزمنة"],
    noteTitle: "ملاحظات من الأخصائية",
    note: "أؤمن أن لكل شخص القدرة على التعافي عند وجود مساحة آمنة ودعم مهني مناسب. في جلساتنا سنعمل معًا على فهم مشاعرك وبناء أدوات عملية للتعامل معها.",
  },
  {
    id: "samer",
    name: "أ. سامر الحربي",
    value: "سامر الحربي",
    initial: "س",
    title: "أخصائي نفسي إكلينيكي | خبرة +8 سنوات",
    bio: "يعمل مع الشباب والبالغين في مجالات إدارة الغضب، التعرّض للضغوط، وصعوبات التكيّف مع التغيّرات الحياتية. يستخدم أساليب علاجية حديثة تركّز على الحلول.",
    tags: ["إدارة الغضب", "ضغوط العمل", "صعوبات التكيّف"],
    noteTitle: "رسالة الأخصائي",
    note: "هدفي أن تشعر بأنك لست وحدك في مواجهة تحدياتك، وأن تمتلك أدوات واضحة تساعدك على اتخاذ قرارات أكثر توازنًا وهدوءًا.",
  },
  {
    id: "lama",
    name: "أ. لمى السبيعي",
    value: "لمى السبيعي",
    initial: "ل",
    title: "أخصائية إرشاد أسري وزواجي | خبرة +10 سنوات",
    bio: "متخصصة في دعم الأزواج والأسر في تحسين جودة التواصل، تجاوز الخلافات المتكررة، وبناء بيئة آمنة لأفراد الأسرة مع التركيز على مصلحة الأطفال واستقرار الأسرة.",
    tags: ["استشارات أسرية", "استشارات زوجية", "تربية الأبناء"],
    noteTitle: "نبذة إضافية",
    note: "أساعد الأزواج والأسر على تحويل الصراعات اليومية إلى فرص لفهم أعمق وبناء علاقة أكثر استقرارًا ودفئًا.",
  },
];

const countries = [
  "السعودية",
  "مصر",
  "الإمارات",
  "الكويت",
  "قطر",
  "البحرين",
  "عُمان",
  "اليمن",
  "الأردن",
  "فلسطين",
  "لبنان",
  "سوريا",
  "العراق",
  "ليبيا",
  "تونس",
  "الجزائر",
  "المغرب",
  "موريتانيا",
  "السودان",
  "تركيا",
  "الولايات المتحدة",
  "كندا",
  "المملكة المتحدة",
  "ألمانيا",
  "فرنسا",
  "إيطاليا",
  "إسبانيا",
  "هولندا",
  "بلجيكا",
  "السويد",
  "النرويج",
  "سويسرا",
  "النمسا",
  "اليونان",
  "قبرص",
  "الهند",
  "باكستان",
  "إندونيسيا",
  "ماليزيا",
  "سنغافورة",
  "الصين",
  "اليابان",
  "كوريا الجنوبية",
  "الفلبين",
  "أستراليا",
  "نيوزيلندا",
  "البرازيل",
  "الأرجنتين",
  "المكسيك",
  "جنوب أفريقيا",
  "نيجيريا",
  "إثيوبيا",
  "روسيا",
  "أوكرانيا",
  "بولندا",
  "رومانيا",
  "بلغاريا",
  "التشيك",
  "المجر",
  "فنلندا",
  "الدانمارك",
  "أيرلندا",
  "البرتغال",
  "كازاخستان",
  "أفغانستان",
  "بنغلاديش",
  "سريلانكا",
  "نيبال",
  "تايلاند",
  "فيتنام",
  "لاوس",
  "كمبوديا",
  "ميانمار",
  "السلفادور",
  "بنما",
  "كولومبيا",
  "تشيلي",
  "بيرو",
  "فنزويلا",
  "الإكوادور",
  "السعودية",
];

const locationData = {
  السعودية: [
    "الرياض",
    "جدة",
    "الدمام",
    "الخبر",
    "مكة المكرمة",
    "المدينة المنورة",
    "الطائف",
  ],
  مصر: [
    "القاهرة",
    "الجيزة",
    "الإسكندرية",
    "طنطا",
    "المنصورة",
    "أسيوط",
    "سوهاج",
  ],
  الإمارات: ["دبي", "أبوظبي", "الشارقة", "العين", "رأس الخيمة"],
  الكويت: ["مدينة الكويت", "حولي", "الفروانية", "الأحمدي"],
  قطر: ["الدوحة", "الريان", "الوكرة"],
  البحرين: ["المنامة", "المحرق"],
  عُمان: ["مسقط", "صلالة"],
  الأردن: ["عمّان", "إربد", "الزرقاء"],
  المغرب: ["الرباط", "الدار البيضاء", "مراكش", "فاس"],
  الجزائر: ["الجزائر", "وهران", "قسنطينة"],
  تونس: ["تونس", "صفاقس", "سوسة"],
};

function renderSpecialistsCards() {
  const container = document.querySelector(".specialists-grid");
  if (!container) return;

  container.innerHTML = "";

  specialistsData.forEach((spec) => {
    const article = document.createElement("article");
    article.className = "specialist-card";
    const specialistParam = encodeURIComponent(spec.value);

    article.innerHTML = `
      <header class="specialist-header">
        <div class="avatar">${spec.initial}</div>
        <div>
          <h2>${spec.name}</h2>
          <p class="specialist-meta">${spec.title}</p>
        </div>
      </header>
      <p class="specialist-bio">
        ${spec.bio}
      </p>
      <div class="specialist-tags">
        ${spec.tags.map((tag) => `<span>${tag}</span>`).join("")}
      </div>
      <a
        class="btn btn-primary btn-full"
        href="booking.html?specialist=${specialistParam}"
      >
        حجز موعد مع ${spec.name.includes("ة") ? "الأخصائية" : "الأخصائي"}
      </a>
      <div class="note-area">
        <h3>${spec.noteTitle}</h3>
        <p>${spec.note}</p>
      </div>
    `;

    container.appendChild(article);
  });
}

function populateSpecialistSelect() {
  const select = document.getElementById("specialistSelect");
  if (!select) return;

  select.innerHTML = "";

  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = "لا يوجد تفضيل محدد";
  select.appendChild(defaultOption);

  specialistsData.forEach((spec) => {
    const opt = document.createElement("option");
    opt.value = spec.value;
    opt.textContent = spec.name;
    select.appendChild(opt);
  });

  const params = new URLSearchParams(window.location.search);
  const specialist = params.get("specialist");
  if (specialist) {
    for (const option of select.options) {
      if (option.value === specialist) {
        option.selected = true;
        break;
      }
    }
  }
}

function updateYearInFooter() {
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
}

function setupLocationSelects() {
  const countrySelect = document.getElementById("countrySelect");
  const cityInput = document.querySelector('input[name="city"]');
  const cityDatalist = document.getElementById("citySuggestions");
  if (!countrySelect || !cityInput || !cityDatalist) return;

  countrySelect.innerHTML = "";
  const defaultCountry = document.createElement("option");
  defaultCountry.value = "";
  defaultCountry.textContent = "اختر الدولة";
  countrySelect.appendChild(defaultCountry);

  countries.forEach((country) => {
    const opt = document.createElement("option");
    opt.value = country;
    opt.textContent = country;
    countrySelect.appendChild(opt);
  });

  let currentCities = [];

  function renderCitySuggestions(query) {
    cityDatalist.innerHTML = "";
    if (!currentCities.length || !query) return;

    const normalizedQuery = query.toLowerCase();
    currentCities
      .filter((city) => city.toLowerCase().includes(normalizedQuery))
      .slice(0, 15)
      .forEach((city) => {
        const opt = document.createElement("option");
        opt.value = city;
        cityDatalist.appendChild(opt);
      });
  }

  countrySelect.addEventListener("change", () => {
    const selectedCountry = countrySelect.value;
    currentCities = locationData[selectedCountry] || [];
    renderCitySuggestions(cityInput.value.trim());
  });

  cityInput.addEventListener("input", () => {
    renderCitySuggestions(cityInput.value.trim());
  });
}

function handleBookingFormSubmit() {
  const form = document.querySelector(".booking-form");
  if (!form) return;

  const existingSuccess = form.querySelector(".form-success");
  const existingError = form.querySelector(".form-error");

  const successMessage = existingSuccess || document.createElement("p");
  successMessage.className = "form-success";

  const errorMessage = existingError || document.createElement("p");
  errorMessage.className = "form-error";

  const params = new URLSearchParams(window.location.search);
  const urlSpecialist = params.get("specialist");

  const preferredDateInput = form.querySelector('input[name="preferredDate"]');

  function encode(data) {
    return Object.keys(data)
      .map(
        (key) =>
          encodeURIComponent(key) + "=" + encodeURIComponent(data[key] ?? "")
      )
      .join("&");
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    successMessage.textContent = "";
    errorMessage.textContent = "";

    const formData = new FormData(form);

    if (preferredDateInput) {
      const value = preferredDateInput.value;
      if (!value) {
        errorMessage.textContent = "يرجى اختيار تاريخ للجلسة.";
        if (!existingError) {
          form.appendChild(errorMessage);
        }
        return;
      }

      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const selectedDate = new Date(value);
      if (selectedDate < today) {
        errorMessage.textContent =
          "لا يمكن اختيار تاريخ في الماضي، يرجى اختيار تاريخ مستقبلي.";
        if (!existingError) {
          form.appendChild(errorMessage);
        }
        return;
      }
    }

    // تأكد من وجود اسم النموذج ليتعرف Netlify على الإرسال
    if (!formData.get("form-name")) {
      formData.append("form-name", form.getAttribute("name") || "booking");
    }

    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    const trackingId =
      "WT-" +
      Date.now().toString(36).toUpperCase() +
      "-" +
      Math.random().toString(36).substring(2, 6).toUpperCase();
    data.trackingId = trackingId;

    const submitButton = form.querySelector("button[type='submit']");
    const originalButtonText = submitButton ? submitButton.textContent : "";
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "جاري إرسال الطلب...";
    }

    // تعطيل Netlify مؤقتاً للتطوير المحلي
    console.log("📝 بيانات النموذج:", data);
    console.log("🎯 بيانات الحجز:", data);

    // حفظ بيانات الحجز في localStorage
    localStorage.setItem("bookingData", JSON.stringify(data));

    // محاكاة نجاح الإرسال للتطوير
    setTimeout(() => {
      // إخفاء رسائل الخطأ السابقة
      errorMessage.style.display = "none";

      // تعيين رسالة النجاح
      const successMessageText =
        "✅ تم استلام طلب الحجز بنجاح! " +
        "رقم المتابعة الخاص بطلبك هو: " +
        trackingId +
        "، " +
        "سيتم توجيهك لصفحة تأكيد الحجز خلال 3 ثواني...";

      successMessage.textContent = successMessageText;

      if (!existingSuccess) {
        form.appendChild(successMessage);
      }

      // إعادة تعيين الزر
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
      }

      // التوجيه لصفحة تأكيد الحجز
      setTimeout(() => {
        window.location.href = `booking-confirmation.html?trackingId=${trackingId}`;
      }, 3000);
    }, 1000); // تأخير ثانية واحدة لمحاكاة الإرسال
  });
}

function setupMobileNav() {
  const header = document.querySelector(".site-header");
  if (!header) return;

  const toggle = header.querySelector(".nav-toggle");
  const nav = header.querySelector(".main-nav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.contains("open");
    if (isOpen) {
      nav.classList.remove("open");
      toggle.classList.remove("nav-open");
    } else {
      nav.classList.add("open");
      toggle.classList.add("nav-open");
    }
  });

  nav.addEventListener("click", (event) => {
    const target = event.target;
    if (
      target instanceof HTMLElement &&
      target.classList.contains("nav-link")
    ) {
      nav.classList.remove("open");
      toggle.classList.remove("nav-open");
    }
  });
}

window.addEventListener("DOMContentLoaded", () => {
  renderSpecialistsCards();
  populateSpecialistSelect();
  updateYearInFooter();
  setupLocationSelects();
  handleBookingFormSubmit();
  setupMobileNav();
});
