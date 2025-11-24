const { createClient } = require("@supabase/supabase-js");

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const ADMIN_DASHBOARD_PASSWORD = process.env.ADMIN_DASHBOARD_PASSWORD;

const supabase =
  SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY
    ? createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
    : null;

exports.handler = async (event) => {
  if (event.httpMethod !== "GET") {
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

  const password =
    event.headers["x-admin-password"] || event.headers["X-Admin-Password"];

  if (!ADMIN_DASHBOARD_PASSWORD || password !== ADMIN_DASHBOARD_PASSWORD) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: "غير مصرح" }),
    };
  }

  try {
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase select error", error);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "تعذر جلب البيانات." }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ bookings: data || [] }),
    };
  } catch (err) {
    console.error("Unhandled error", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "حدث خطأ غير متوقع." }),
    };
  }
};
