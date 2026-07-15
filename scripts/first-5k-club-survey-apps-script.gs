/**
 * FIRST 5K CLUB — Post Event Survey webhook.
 *
 * Setup:
 * 1. Buat / buka spreadsheet Google Sheet TERPISAH khusus survey (jangan pakai
 *    sheet registrasi). Lalu Extensions → Apps Script. Script harus dibuat dari
 *    dalam spreadsheet ini (container-bound) supaya selalu menulis ke sini.
 * 2. Ganti isi Code.gs dengan file ini, lalu Save.
 * 3. (Opsional) set SHEET_GID di bawah ke gid tab tujuan (lihat URL sheet:
 *    …#gid=XXXX). Kalau dibiarkan 0, script memakai tab aktif pertama.
 * 4. Deploy → New deployment → type "Web app".
 *      - Execute as: Me
 *      - Who has access: Anyone
 * 5. Copy URL deployment, set sebagai GOOGLE_SURVEY_SCRIPT_URL di .env.local
 *    Next.js DAN di env hosting (lihat src/app/api/first-5k-club-survey/route.ts).
 * 6. Setiap script ini diubah, jalankan Deploy → Manage deployments → Edit →
 *    New version (Apps Script tidak hot-reload URL yang sudah dideploy).
 *
 * Safety: script hanya memanggil appendRow() — tidak pernah menghapus/menimpa
 * baris yang sudah ada. Baris HEADERS hanya ditulis kalau tab masih kosong.
 */

var SHEET_GID = 0; // 0 = pakai tab pertama; atau isi gid tab tujuan dari URL sheet

function getTargetSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  if (SHEET_GID) {
    var sheets = ss.getSheets();
    for (var i = 0; i < sheets.length; i++) {
      if (sheets[i].getSheetId() === SHEET_GID) return sheets[i];
    }
    throw new Error("No sheet tab found with gid " + SHEET_GID);
  }
  return ss.getSheets()[0];
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
      SpreadsheetApp.getActiveSpreadsheet().getSpreadsheetTimeZone(),
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
