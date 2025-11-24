const { createClient } = require("@supabase/supabase-js");
const sgMail = require("@sendgrid/mail");

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const BOOKING_NOTIFICATION_EMAIL = process.env.BOOKING_NOTIFICATION_EMAIL;

if (SENDGRID_API_KEY) {
  sgMail.setApiKey(SENDGRID_API_KEY);
}

const supabase =
  SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY
    ? createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
    : null;

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  if (!supabase) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Supabase is not configured" }),
    };
  }

  try {
    const data = JSON.parse(event.body || "{}");

    const {
      fullName,
      email,
      phone,
      location,
      specialist,
      service,
      mode,
      preferredDate,
      preferredTime,
      notes,
    } = data;

    if (!fullName || !email || !phone) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "الاسم، البريد، ورقم الجوال مطلوبة." }),
      };
    }

    const { error: insertError } = await supabase.from("bookings").insert({
      full_name: fullName,
      email,
      phone,
      location,
      specialist,
      service,
      mode,
      preferred_date: preferredDate || null,
      preferred_time: preferredTime || null,
      notes,
    });

    if (insertError) {
      console.error("Supabase insert error", insertError);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "تعذر حفظ بيانات الحجز، حاول لاحقًا." }),
      };
    }

    if (SENDGRID_API_KEY && BOOKING_NOTIFICATION_EMAIL) {
      const msg = {
        to: BOOKING_NOTIFICATION_EMAIL,
        from: BOOKING_NOTIFICATION_EMAIL,
        subject: `حجز جديد من ${fullName}`,
        text:
          `اسم العميل: ${fullName}\n` +
          `البريد: ${email}\n` +
          `الجوال: ${phone}\n` +
          `الموقع: ${location || "-"}\n` +
          `الأخصائي: ${specialist || "بدون تفضيل"}\n` +
          `نوع الخدمة: ${service || "-"}\n` +
          `نوع الجلسة: ${mode || "-"}\n` +
          `اليوم المفضل: ${preferredDate || "-"}\n` +
          `الفترة المفضلة: ${preferredTime || "-"}\n` +
          `ملاحظات: ${notes || "-"}\n`,
      };

      try {
        await sgMail.send(msg);
      } catch (mailError) {
        console.error("SendGrid error", mailError);
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (err) {
    console.error("Unhandled error", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "حدث خطأ غير متوقع، حاول لاحقًا." }),
    };
  }
};
