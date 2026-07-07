/**
 * FIRST 5K CLUB — registration webhook.
 *
 * Setup:
 * 1. Open the EXACT spreadsheet at
 *      https://docs.google.com/spreadsheets/d/1Vlg5stemyrbAlsPT2dQiB1dTNFZusYvJ4Ay4vA1v7cs/edit
 *    then Extensions → Apps Script. (The script must be created from inside
 *    this spreadsheet — "container-bound" — so it always writes here.)
 * 2. Replace the default Code.gs contents with this file, save.
 * 3. SHEET_GID below is already set to 992928911, matching the tab in the
 *    URL you shared (…#gid=992928911). The script finds that tab by its gid,
 *    so you don't need to know/rename its tab name.
 * 4. Deploy → New deployment → type "Web app".
 *      - Execute as: Me
 *      - Who has access: Anyone
 * 5. Copy the deployment URL and set it as GOOGLE_SCRIPT_URL in the
 *    Next.js app's .env.local AND in your hosting provider's env vars
 *    (see src/app/api/first-5k-club/route.ts).
 * 6. Re-run "Deploy → Manage deployments → Edit → New version" any time
 *    this script changes — Apps Script does not hot-reload deployed URLs.
 *
 * Quota: QUOTA_LIMIT below caps registrants at 100. doPost() refuses to
 * append once that many data rows already exist, and doGet() reports the
 * current count so the website can show a "registration closed" screen.
 *
 * Safety: this script only ever calls appendRow() — it never clears,
 * deletes, or overwrites existing rows, so current registrants already in
 * the sheet are never touched. It only writes the HEADERS row if the tab is
 * completely empty (getLastRow() === 0); if the tab already has data (e.g.
 * it's the live Google Form response sheet), new rows are appended below
 * as-is using the column order in HEADERS — double-check that order still
 * matches your existing header row (see chat for details).
 */

var SHEET_GID = 992928911; // tab id from the Sheet URL you shared
var QUOTA_LIMIT = 100; // max registrants — change here if the quota changes

function getTargetSheet_() {
  var sheets = SpreadsheetApp.getActiveSpreadsheet().getSheets();
  for (var i = 0; i < sheets.length; i++) {
    if (sheets[i].getSheetId() === SHEET_GID) return sheets[i];
  }
  throw new Error("No sheet tab found with gid " + SHEET_GID);
}

// Data rows = every row below the header (row 1). If the tab is still
// completely empty, there's no header yet either, so count is 0.
function getRegistrantCount_(sheet) {
  var lastRow = sheet.getLastRow();
  return lastRow === 0 ? 0 : lastRow - 1;
}

function doGet() {
  var sheet = getTargetSheet_();
  var count = getRegistrantCount_(sheet);
  return ContentService.createTextOutput(
    JSON.stringify({
      status: "ok",
      count: count,
      quotaLimit: QUOTA_LIMIT,
      full: count >= QUOTA_LIMIT,
    })
  ).setMimeType(ContentService.MimeType.JSON);
}

// Exact column order of the live "PESERTA FIRST 5K CLUB" sheet — confirmed from
// its real header row. NAMA PANGGILAN and JENIS KELAMIN are collected manually
// by the organizer (not asked in the web form), so they're left blank here.
var HEADERS = [
  "Nomor",
  "Timestamp",
  "Nama",
  "NAMA PANGGILAN",
  "Tanggal Lahir",
  "JENIS KELAMIN",
  "Whatsapp",
  "Email",
  "Domisili",
  "Komunitas",
  "Instagram Username",
  "Seberapa sering kamu berlari?",
  "Apakah kamu pernah menyelesaikan lari sejauh 5K?",
  "Apa alasan utama kamu ingin mengikuti FIRST 5K CLUB?",
  "Apa yang biasanya membuat kamu ragu atau kesulitan untuk mulai berlari?",
  "Apa target kamu dalam mengikuti FIRST 5K CLUB?",
  "Ukuran Jersey",
  "Apakah kamu bersedia mengikuti seluruh rangkaian acara dari awal sampai selesai?",
  "Apakah kamu bersedia mengunggah Instagram Story selama atau setelah kegiatan dan menandai akun yang telah ditentukan?",
  "Nama Kontak Darurat",
  "Nomor Kontak Darurat",
  "Hubungan dengan Kontak Darurat",
  "Apakah terdapat kondisi kesehatan, riwayat cedera, alergi, atau informasi penting yang perlu diketahui oleh penyelenggara?",
  "Pernyataan Peserta",
  "Persetujuan Penggunaan Data",
];

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = getTargetSheet_();

    if (getRegistrantCount_(sheet) >= QUOTA_LIMIT) {
      return ContentService.createTextOutput(
        JSON.stringify({ status: "closed", message: "Kuota pendaftaran sudah penuh." })
      ).setMimeType(ContentService.MimeType.JSON);
    }

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
    }

    // "Nomor" continues the existing sequential count (row 2 = Nomor 1, so
    // Nomor for the next row equals the sheet's current last-row index).
    var nextNomor = sheet.getLastRow();

    var timestamp = Utilities.formatDate(
      new Date(),
      SpreadsheetApp.getActiveSpreadsheet().getSpreadsheetTimeZone(),
      "dd/MM/yyyy HH:mm:ss"
    );

    sheet.appendRow([
      nextNomor,
      timestamp,
      data.nama || "",
      "", // NAMA PANGGILAN — not collected by the web form
      data.tanggalLahir || "",
      "", // JENIS KELAMIN — not collected by the web form
      data.whatsapp || "",
      data.email || "",
      data.domisili || "",
      data.komunitas || "",
      data.instagram || "",
      data.seberapaSeringBerlari || "",
      data.pengalaman5k || "",
      data.alasanUtama || "",
      data.hambatan || "",
      data.target || "",
      data.ukuranJersey || "",
      data.bersediaIkutAcara || "",
      data.bersediaUploadIg || "",
      data.namaKontakDarurat || "",
      data.nomorKontakDarurat || "",
      data.hubunganKontakDarurat || "",
      data.kondisiKesehatan || "",
      data.pernyataanPeserta || "",
      data.persetujuanData || "",
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
