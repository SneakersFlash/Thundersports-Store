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
 * Safety: this script only ever calls appendRow() — it never clears,
 * deletes, or overwrites existing rows, so current registrants already in
 * the sheet are never touched. It only writes the HEADERS row if the tab is
 * completely empty (getLastRow() === 0); if the tab already has data (e.g.
 * it's the live Google Form response sheet), new rows are appended below
 * as-is using the column order in HEADERS — double-check that order still
 * matches your existing header row (see chat for details).
 */

var SHEET_GID = 992928911; // tab id from the Sheet URL you shared

function getTargetSheet_() {
  var sheets = SpreadsheetApp.getActiveSpreadsheet().getSheets();
  for (var i = 0; i < sheets.length; i++) {
    if (sheets[i].getSheetId() === SHEET_GID) return sheets[i];
  }
  throw new Error("No sheet tab found with gid " + SHEET_GID);
}

var HEADERS = [
  "Timestamp",
  "Nama",
  "Tanggal Lahir",
  "WhatsApp",
  "Email",
  "Domisili",
  "Komunitas",
  "Instagram Username",
  "Seberapa Sering Berlari",
  "Pernah Selesaikan 5K",
  "Alasan Utama Ikut",
  "Hambatan Memulai Lari",
  "Target",
  "Ukuran Jersey",
  "Bersedia Ikut Acara Penuh",
  "Bersedia Upload IG Story",
  "Nama Kontak Darurat",
  "Nomor Kontak Darurat",
  "Hubungan Kontak Darurat",
  "Kondisi Kesehatan",
  "Pernyataan Peserta",
  "Persetujuan Data",
];

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = getTargetSheet_();

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
    }

    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.nama || "",
      data.tanggalLahir || "",
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
