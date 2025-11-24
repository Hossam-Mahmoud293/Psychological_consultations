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

    // تأكد من وجود اسم النموذج ليتعرف Netlify على الإرسال
    if (!formData.get("form-name")) {
      formData.append("form-name", form.getAttribute("name") || "booking");
    }

    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    const submitButton = form.querySelector("button[type='submit']");
    const originalButtonText = submitButton ? submitButton.textContent : "";
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "جاري إرسال الطلب...";
    }

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Netlify form submission failed");
        }

        const select = document.getElementById("specialistSelect");
        form.reset();

        if (select && urlSpecialist) {
          for (const option of select.options) {
            if (option.value === urlSpecialist) {
              option.selected = true;
              break;
            }
          }
        }

        successMessage.textContent =
          "تم استلام طلب الحجز بنجاح، سيتم التواصل معك خلال 24–48 ساعة عمل لتأكيد الموعد.";

        if (!existingSuccess) {
          form.appendChild(successMessage);
        }
      })
      .catch((error) => {
        console.error(error);
        errorMessage.textContent =
          "حدث خطأ أثناء إرسال الطلب، يرجى المحاولة مرة أخرى أو التواصل معنا مباشرة.";

        if (!existingError) {
          form.appendChild(errorMessage);
        }
      })
      .finally(() => {
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = originalButtonText;
        }
      });
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
  handleBookingFormSubmit();
  setupMobileNav();
});
