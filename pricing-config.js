// إعدادات الأسعار والضرائب
const pricingConfig = {
  // أسعار الخدمات الأساسية
  services: {
    consultation: {
      name: "استشارة نفسية فردية",
      price: 299,
      duration: "60 دقيقة",
    },
    followup: {
      name: "جلسة متابعة",
      price: 199,
      duration: "45 دقيقة",
    },
    family: {
      name: "استشارة أسرية/زوجية",
      price: 399,
      duration: "90 دقيقة",
    },
    group: {
      name: "جلسة جماعية / توعوية",
      price: 149,
      duration: "120 دقيقة",
    },
  },

  // أسعار الأخصائيين (إضافة على سعر الخدمة)
  specialistFees: {
    amna: 0, // أ. د. آمنة الراجحي - بدون إضافة
    samer: 50, // أ. سامر الحربي - إضافة 50 ريال
    lama: 0, // أ. لمى السبيعي - بدون إضافة
  },

  // الضرائب والرسوم
  taxRate: 0.15, // 15% ضريبة القيمة المضافة

  // خصومات
  discounts: {
    firstSession: 0.1, // 10% خصم على أول جلسة
    package3: 0.15, // 15% خصم على باقة 3 جلسات
    package5: 0.25, // 25% خصم على باقة 5 جلسات
  },

  // عملة الدفع
  currency: "SAR",
  currencySymbol: "ريال",
};

// دالة حساب السعر الإجمالي
function calculateTotalPrice(
  serviceType,
  specialistId,
  discountCode = null,
  packageSize = 1
) {
  const service = pricingConfig.services[serviceType];
  if (!service) return { subtotal: 0, tax: 0, total: 0 };

  // سعر الخدمة الأساسي
  let subtotal = service.price * packageSize;

  // إضافة رسوم الأخصائي
  const specialistFee = pricingConfig.specialistFees[specialistId] || 0;
  subtotal += specialistFee * packageSize;

  // تطبيق الخصم
  let discount = 0;
  if (discountCode) {
    discount = subtotal * pricingConfig.discounts[discountCode] || 0;
  }

  const afterDiscount = subtotal - discount;

  // حساب الضريبة
  const tax = afterDiscount * pricingConfig.taxRate;

  // الإجمالي
  const total = afterDiscount + tax;

  return {
    subtotal: subtotal,
    discount: discount,
    tax: tax,
    total: total,
    currency: pricingConfig.currency,
    currencySymbol: pricingConfig.currencySymbol,
    breakdown: {
      servicePrice: service.price * packageSize,
      specialistFee: specialistFee * packageSize,
      packageDiscount: discount,
      taxAmount: tax,
    },
  };
}

// دالة تحديث الأسعار في الصفحة
function updatePricingDisplay(
  serviceType,
  specialistId,
  discountCode = null,
  packageSize = 1
) {
  const pricing = calculateTotalPrice(
    serviceType,
    specialistId,
    discountCode,
    packageSize
  );

  // تحديث ملخص الطلب
  const serviceName =
    pricingConfig.services[serviceType]?.name || "خدمة غير محددة";
  const specialistName = getSpecialistName(specialistId);

  // تحديث الصفحة
  document.querySelector(".item-info h3").textContent = serviceName;
  document.querySelector(
    ".item-info p:nth-child(2)"
  ).textContent = `مع ${specialistName}`;
  document.querySelector(
    ".item-price"
  ).textContent = `${pricing.subtotal} ${pricing.currencySymbol}`;

  // تحديث الإجمالي
  document.querySelector(
    ".total-row:nth-child(1) span:last-child"
  ).textContent = `${pricing.subtotal} ${pricing.currencySymbol}`;

  if (pricing.discount > 0) {
    // إضافة صف الخصم إذا وجد
    let discountRow = document.querySelector(".discount-row");
    if (!discountRow) {
      const totalDiv = document.querySelector(".order-total");
      const grandTotal = document.querySelector(".grand-total");
      const newRow = document.createElement("div");
      newRow.className = "total-row discount-row";
      newRow.innerHTML = `<span>الخصم:</span><span style="color: #16a34a;">-${pricing.discount} ${pricing.currencySymbol}</span>`;
      totalDiv.insertBefore(newRow, grandTotal);
    } else {
      discountRow.querySelector(
        "span:last-child"
      ).textContent = `-${pricing.discount} ${pricing.currencySymbol}`;
    }
  }

  document.querySelector(
    ".total-row:nth-child(2) span:last-child"
  ).textContent = `${pricing.tax} ${pricing.currencySymbol}`;
  document.querySelector(
    ".grand-total span:last-child"
  ).textContent = `${pricing.total} ${pricing.currencySymbol}`;

  // تحديث أزرار الدفع
  updatePaymentButtons(pricing.total);

  return pricing;
}

// دالة تحديث أزرار الدفع
function updatePaymentButtons(totalAmount) {
  // PayPal
  if (window.paypal && window.paypal.Buttons) {
    // إعادة تعريف زر PayPal بالمبلغ الجديد
    document.getElementById("paypal-button-container").innerHTML = "";
    paypal
      .Buttons({
        createOrder: function (data, actions) {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: totalAmount.toString(),
                  currency: pricingConfig.currency,
                },
              },
            ],
          });
        },
        onApprove: function (data, actions) {
          return actions.order.capture().then(function (details) {
            showPaymentSuccess("PayPal", details.payer.name.given_name);
          });
        },
      })
      .render("#paypal-button-container");
  }

  // تحديث زر البطاقة
  const cardButton = document.querySelector(
    '#payment-form button[type="submit"]'
  );
  if (cardButton) {
    cardButton.textContent = `دفع ${totalAmount} ${pricingConfig.currencySymbol}`;
  }
}

// دالة الحصول على اسم الأخصائي
function getSpecialistName(specialistId) {
  const specialists = {
    amna: "أ. د. آمنة الراجحي",
    samer: "أ. سامر الحربي",
    lama: "أ. لمى السبيعي",
  };
  return specialists[specialistId] || "أخصائي غير محدد";
}

// دالة استخراج البيانات من الرابط
function getBookingDataFromURL() {
  const params = new URLSearchParams(window.location.search);
  return {
    service: params.get("service") || "consultation",
    specialist: params.get("specialist") || "",
    discount: params.get("discount") || null,
    package: parseInt(params.get("package")) || 1,
  };
}

// دالة حفظ بيانات الحجز
function saveBookingData(pricingData) {
  const bookingData = {
    ...getBookingDataFromURL(),
    pricing: pricingData,
    timestamp: new Date().toISOString(),
    trackingId: generateTrackingId(),
  };

  // حفظ في localStorage للاستخدام لاحقًا
  localStorage.setItem("currentBooking", JSON.stringify(bookingData));

  return bookingData;
}

// دالة إنشاء رقم متابعة
function generateTrackingId() {
  return (
    "BK-" +
    Date.now().toString(36).toUpperCase() +
    "-" +
    Math.random().toString(36).substring(2, 6).toUpperCase()
  );
}

// تصدير الدوال للاستخدام الخارجي
window.pricingConfig = pricingConfig;
window.calculateTotalPrice = calculateTotalPrice;
window.updatePricingDisplay = updatePricingDisplay;
window.getBookingDataFromURL = getBookingDataFromURL;
window.saveBookingData = saveBookingData;
