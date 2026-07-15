/**
 * FIRST 5K CLUB — Post Event Survey webhook.
 *
 * Model: STANDALONE script (bukan container-bound). Data ditulis ke tab
 * terpisah di spreadsheet yang sama dengan form registrasi, via openById.
 *
 * Setup:
 * 1. Buka https://script.google.com → New project (JANGAN dari Extensions →
 *    Apps Script di dalam sheet, karena spreadsheet registrasi sudah punya
 *    script bound sendiri).
 * 2. Ganti isi Code.gs dengan file ini, lalu Save.
 * 3. Pastikan SPREADSHEET_ID di bawah = ID spreadsheet tujuan (default: sheet
 *    registrasi). SHEET_NAME = nama tab survey; tab & header dibuat OTOMATIS.
 * 4. Deploy → New deployment → type "Web app".
 *      - Execute as: Me   (akun yang punya akses edit ke spreadsheet itu)
 *      - Who has access: Anyone
 *    Saat pertama deploy, Google minta authorize akses ke Spreadsheets — terima.
 * 5. Copy URL deployment, set sebagai GOOGLE_SURVEY_SCRIPT_URL di .env.local
 *    Next.js DAN di env hosting (lihat src/app/api/first-5k-club-survey/route.ts).
 * 6. Setiap script ini diubah, jalankan Deploy → Manage deployments → Edit →
 *    New version (Apps Script tidak hot-reload URL yang sudah dideploy).
 *
 * Safety: script hanya insertSheet (kalau tab belum ada) + appendRow — tidak
 * pernah menghapus/menimpa baris yang sudah ada. Tab registrasi tidak disentuh
 * karena kita menulis ke tab bernama SHEET_NAME. Header hanya ditulis kalau tab
 * survey masih kosong.
 */

// ID spreadsheet tujuan — ambil dari URL: docs.google.com/spreadsheets/d/<ID>/edit
// Default: spreadsheet yang sama dengan form registrasi. GANTI kalau survey mau
// ditaruh di spreadsheet lain.
var SPREADSHEET_ID = "1Vlg5stemyrbAlsPT2dQiB1dTNFZusYvJ4Ay4vA1v7cs";
// Nama tab tujuan untuk data survey. Dibuat OTOMATIS kalau belum ada, dan header
// ditulis otomatis saat baris pertama masuk — jadi tidak perlu bikin manual.
var SHEET_NAME = "Post Event Survey";

function getTargetSheet_() {
  var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);
  return sheet;
}

function getResponseCount_(sheet) {
  var lastRow = sheet.getLastRow();
  return lastRow === 0 ? 0 : lastRow - 1;
}

function doGet() {
  var sheet = getTargetSheet_();
  return ContentService.createTextOutput(
    JSON.stringify({ status: "ok", count: getResponseCount_(sheet) })
  ).setMimeType(ContentService.MimeType.JSON);
}

// Urutan kolom = urutan objek "row" di src/app/api/first-5k-club-survey/route.ts.
var HEADERS = [
  "Nomor",
  "Timestamp",
  "Nama lengkap",
  "Instagram username",
  "Nomor WhatsApp aktif",
  "Pace group saat event",
  "Apakah ini pengalaman pertama kamu mengikuti 5K run event?",
  "Overall, bagaimana pengalaman kamu mengikuti First 5K Club? (1-5)",
  "Apa bagian yang paling kamu suka dari First 5K Club?",
  "Bagaimana pengalaman kamu dengan pacer dari USS Running? (1-5)",
  "Apakah pacer cukup membantu selama lari?",
  "Menurut kamu, apakah rute 5K-nya nyaman dan aman?",
  "Apa yang menurut kamu perlu diperbaiki dari First 5K Club?",
  "Bagaimana pendapat kamu tentang post-run games?",
  "Apakah durasi acara menurut kamu sudah pas?",
  "Apakah benefit event ini cukup menarik?",
  "Benefit apa yang paling kamu suka?",
  "Dari semua benefit yang ada, apa yang paling memorable?",
  "Apakah kamu tertarik ikut kegiatan lari berikutnya dari Thunder Sports?",
  "Kalau Thunder Sports membuat running community, kamu tertarik join?",
  "Aktivitas seperti apa yang kamu pengen ada berikutnya?",
  "Hari apa yang paling cocok buat kamu ikut aktivitas lari?",
  "Area mana yang paling nyaman buat kamu?",
  "Format event berikutnya yang kamu minati?",
  "Dalam satu kalimat, ceritakan pengalaman kamu ikut First 5K Club.",
  "Boleh dijadikan testimonial konten Thunder Sports?",
  "Bersedia dihubungi untuk event/community activity berikutnya?",
  "Pesan tambahan",
];

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = getTargetSheet_();

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
    }

    var nextNomor = sheet.getLastRow();

    var timestamp = Utilities.formatDate(
      new Date(),
      Session.getScriptTimeZone(),
      "dd/MM/yyyy HH:mm:ss"
    );

    sheet.appendRow([
      nextNomor,
      timestamp,
      data.namaLengkap || "",
      data.instagram || "",
      data.whatsapp || "",
      data.paceGroup || "",
      data.firstExperience || "",
      data.overallExperience || "",
      data.likedParts || "",
      data.pacerExperience || "",
      data.pacerHelpful || "",
      data.routeComfort || "",
      data.improvement || "",
      data.postRunGames || "",
      data.duration || "",
      data.benefitInterest || "",
      data.favoriteBenefit || "",
      data.memorableBenefit || "",
      data.nextActivityInterest || "",
      data.communityInterest || "",
      data.desiredActivities || "",
      data.preferredDays || "",
      data.preferredAreas || "",
      data.nextFormat || "",
      data.testimonialOneLine || "",
      data.testimonialPermission || "",
      data.contactPermission || "",
      data.additionalMessage || "",
    ]);

    return ContentService.createTextOutput(JSON.stringify({ status: "ok" })).setMimeType(
      ContentService.MimeType.JSON
    );
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ status: "error", message: err.message })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
