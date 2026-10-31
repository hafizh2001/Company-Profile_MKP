# Panduan Maintenance Website PT. Multi Karya Persada

Panduan ini ditujukan untuk tim yang memperbarui konten maupun tampilan website. Struktur dijelaskan berdasarkan versi website pada commit `547e9a3e5c2cc398f4774a6953b74048624dd0ef`. Jika struktur kode berubah, perbarui panduan ini bersamaan dengan perubahan tersebut.

- Website publik: https://hafizh2001.github.io/Company-Profile_MKP/
- Repository: https://github.com/hafizh2001/Company-Profile_MKP
- Publikasi: GitHub Pages, branch `main`, folder `/ (root)`.
- Teknologi: HTML, CSS, JavaScript biasa; tanpa framework, database, dan proses build aplikasi.

## 1. Memahami struktur website

Semua file website berada di root repository. Gambar berada di `assets/`. Browser membaca `index.html`, memuat CSS, lalu menjalankan JavaScript untuk menampilkan terjemahan, proyek dan mitra.

| File / folder | Fungsi dan perhatian saat mengedit |
| --- | --- |
| `index.html` | Struktur bagian halaman, tagline, sambutan direksi, angka ringkasan, kontak, tautan CSS dan script. |
| `style.css` | Warna, tipografi, tata letak utama, gambar latar dan aturan ukuran layar. Beberapa penyesuaian merah berada di bagian akhir file dan dapat menimpa aturan sebelumnya. |
| `app.js` | `translations.id` / `translations.en`, daftar `services`, pergantian bahasa, filter kategori, galeri, tombol email dan salin email. Ada tambahan terjemahan melalui `Object.assign`; cari nama kunci di seluruh file. |
| `projects.js` | Array `projects`: data setiap proyek, deskripsi dua bahasa, kategori, daftar foto dan sampul. |
| `partners-data.js` | Array `partnerLogos`: alamat gambar dan nama mitra. |
| `partners.js` | Pergeseran otomatis, jeda/putar, panah, interaksi geser dan teks ID/EN bagian mitra. |
| `partners.css` | Tampilan logo dan kontrol carousel. |
| `directors.css` | Tampilan sambutan dan nama direksi. |
| `assets/` | Aset utama, antara lain `logo.webp`, `honda.webp` dan `team.webp`. |
| `assets/gallery/` | Foto proyek dan thumbnail, yaitu gambar kecil untuk mempercepat pemuatan. |
| `assets/partners/` | Logo mitra. |
| `.nojekyll` | Penanda untuk menerbitkan berkas statis tanpa pemrosesan Jekyll. Pertahankan file ini. |
| `docs/` | Dokumentasi tim; jangan mengubah sumber Pages menjadi folder ini. |

Urutan script di `index.html` penting: `projects.js` sebelum `app.js`, serta `partners-data.js` sebelum `partners.js`. Pertahankan atribut `defer`. Pergantian bahasa mengirim event `mkp-languagechange` yang dipakai bagian mitra untuk memperbarui labelnya.

## 2. Mengedit langsung melalui GitHub

Untuk koreksi kecil pada satu file:

1. Masuk ke GitHub memakai akun yang memiliki izin menulis repository.
2. Buka repository, pilih branch yang akan diedit, lalu buka file yang sesuai.
3. Klik ikon pensil / **Edit this file**.
4. Lakukan perubahan, lalu periksa tab pratinjau perubahan / diff.
5. Klik **Commit changes**, tulis pesan yang menjelaskan perubahan, misalnya `docs: perbarui panduan kontak` atau `content: tambah dokumentasi proyek`.
6. Pilih commit ke branch yang sesuai. Commit ke `main` akan memicu publikasi. Untuk pemeriksaan bersama, pilih membuat branch baru lalu buat pull request.

Untuk perubahan beberapa file, disarankan membuat branch seperti `maintenance/update-proyek`, mengunggah semua aset dan mengubah data di branch tersebut, lalu meminta rekan memeriksa pull request sebelum merge ke `main`. Ini rekomendasi alur kerja tim, bukan aturan proteksi branch yang telah diaktifkan.

Editor beberapa file tersedia melalui tombol titik (`.`) saat membuka repository di GitHub, atau melalui `github.dev`. Simpan perubahan sebagai commit di panel Source Control. Editor tersebut tidak menyediakan server untuk menjalankan pratinjau website; gunakan cara lokal pada bagian berikut untuk mencoba interaksi.

Referensi: [mengedit file](https://docs.github.com/en/repositories/working-with-files/managing-files/editing-files), [mengunggah file](https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository), dan [editor github.dev](https://docs.github.com/en/codespaces/the-githubdev-web-based-editor).

## 3. Mencoba website di komputer

Pilihan sederhana: unduh **Code → Download ZIP**, ekstrak, lalu buka foldernya melalui editor seperti Visual Studio Code. Untuk bekerja bersama tim secara rutin, gunakan clone Git:

```sh
git clone https://github.com/hafizh2001/Company-Profile_MKP.git
cd Company-Profile_MKP
```

Jika Python sudah terpasang, jalankan perintah berikut dari folder yang berisi `index.html`:

```sh
python -m http.server 8000 --bind 127.0.0.1
```

Buka `http://127.0.0.1:8000/` di browser. Pada Windows, `py` dapat menggantikan `python` jika launcher tersebut yang tersedia. Tekan `Ctrl+C` di terminal untuk menghentikan server. Tidak ada langkah `npm install` atau `npm run build` untuk versi website ini.

Perubahan lokal belum mengubah website publik. Setelah selesai diperiksa, commit dan push ke branch tim, kemudian merge ke `main`. Jika bekerja dari ZIP, unggah file yang berubah melalui GitHub. Jangan mengunggah seluruh ZIP sebagai pengganti file website.

## 4. Memperbarui teks dan dua bahasa

Cari teks yang ingin diubah. Jika elemennya memiliki `data-t="heroDesc"`, isi yang tampil berasal dari kunci `heroDesc` pada `translations.id` dan `translations.en` di `app.js`. Perbarui kedua bahasa. Sesuaikan juga teks awal di HTML bila diperlukan agar tetap konsisten sebelum script berjalan.

Contoh potongan nilai dalam masing-masing objek terjemahan:

```js
// Di translations.id:
heroDesc: 'Deskripsi perusahaan dalam bahasa Indonesia.',
// Di translations.en:
heroDesc: 'Company description in English.',
```

Ini potongan contoh, bukan pengganti seluruh `app.js`. Pertahankan nama kunci, koma, dan tanda kutip. Jika teks berisi apostrof dalam string berkutip tunggal, gunakan escape seperti `\'` atau pilih kutip ganda yang sesuai. Jangan memasukkan HTML dari sumber yang tidak dipercaya: beberapa terjemahan ditampilkan melalui `innerHTML`.

Daftar layanan berada pada array `services` di `app.js`; setiap layanan memiliki teks `id` dan `en`. Teks bagian mitra berada pada objek `copy` dalam `partners.js`, terpisah dari terjemahan utama. Judul halaman dan tagline statis berada di `index.html`; deskripsi metadata juga diperbarui oleh kunci `meta` di `app.js`.

**Sambutan direksi:** teks berada pada `#director-message` di `index.html`, memakai bahasa Inggris asli pada kedua pilihan bahasa. Sesuai arahan pemilik konten, jangan menerjemahkan, menyunting kalimat, atau mengoreksi ejaan asli, termasuk bentuk `service s`, tanpa persetujuan baru. Nama dan jabatan direksi juga berada di bagian yang sama.

Tagline yang disetujui adalah **PRECISION IN EVERY SYSTEM.** Kategori Umara dan Bakmi GM tetap **Resto/F&B**.

## 5. Mengganti email, telepon dan alamat

Email utama saat panduan dibuat: `multikaryapersada_mkp@yahoo.com`. Email alternatif: `mkp_bdn@yahoo.com`.

Jika mengganti email utama, cari alamat lama di seluruh file kode dan perbarui:

1. Teks email yang terlihat dan semua `href="mailto:..."` terkait di `index.html`.
2. Tujuan email dalam fungsi `setLanguage` di `app.js`. Fungsi ini menimpa tautan elemen `[data-email]` saat halaman dimuat atau bahasa diganti.
3. Alamat yang disalin oleh event handler tombol `#copy-email` di `app.js`.
4. Kunci `subject` pada kedua bahasa jika subjek email perlu disesuaikan.

Email alternatif, alamat kantor dan nomor telepon berada di `index.html`. Untuk telepon, ubah teks yang terlihat sekaligus nilai `tel:`; nilai tautan menggunakan format internasional, misalnya awalan `+62`.

Tombol email membuka aplikasi email pengguna melalui `mailto:`. Website tidak mengirim email secara otomatis dan tidak memiliki formulir/backend pengiriman. Tidak ada integrasi WhatsApp pada versi ini.

## 6. Mengelola proyek dan foto

### Menambah foto ke proyek yang sudah ada

1. Siapkan foto yang sudah dipilih dan diizinkan untuk dipublikasikan. Gunakan nama jelas, huruf kecil, dan tanda hubung, misalnya `proyek-baru-panel-01.webp`.
2. Siapkan gambar penuh dan thumbnail. WebP disarankan agar ukuran unduhan lebih ringan. Sebagai acuan, sisi terpanjang gambar penuh sekitar 2200 px dan thumbnail sekitar 560 px; ini saran optimasi, bukan batas yang diwajibkan kode. Pertahankan rasio gambar asli.
3. Unggah keduanya ke `assets/gallery/` pada branch kerja.
4. Temukan proyek pada `projects.js`, lalu tambahkan objek foto ke array `images`. Isi `width` dan `height` sesuai dimensi gambar penuh.
5. Jika mengganti sampul kartu, ubah juga objek `cover`. Sampul tidak otomatis mengikuti foto pertama pada `images`; kartu menggunakan `cover.thumb`.
6. Periksa kartu, seluruh thumbnail, panah foto dan tautan foto ukuran penuh.

### Menambah proyek baru

Tambahkan satu objek pada array `projects`. Berikut **template fiktif**; ganti seluruh contoh dengan data proyek nyata dan file yang sudah diunggah:

```js
{
  slug: 'contoh-proyek-baru',
  name: 'Nama Proyek Baru',
  nameId: 'Nama Proyek Baru',
  nameEn: 'New Project Name',
  category: 'fnb',
  location: 'Kota proyek',
  slides: [],
  id: 'Deskripsi pekerjaan yang telah dikonfirmasi.',
  en: 'A confirmed description of the work.',
  images: [
    {
      src: 'assets/gallery/proyek-baru-panel-01.webp',
      thumb: 'assets/gallery/proyek-baru-panel-01-thumb.webp',
      width: 1600,
      height: 1000
    }
  ],
  cover: {
    src: 'assets/gallery/proyek-baru-panel-01.webp',
    thumb: 'assets/gallery/proyek-baru-panel-01-thumb.webp',
    width: 1600,
    height: 1000
  }
}
```

Gunakan `slug` unik dan sekurangnya satu foto yang valid. Pisahkan objek proyek dengan koma. `slides` merupakan catatan halaman sumber presentasi, bukan penentu tampilan; isi jika sumbernya diketahui atau biarkan array kosong untuk dokumentasi baru.

Kategori yang tersedia:

| Nilai `category` | Label ID | Label EN |
| --- | --- | --- |
| `fnb` | Resto/F&B | Restaurants/F&B |
| `industry` | Industri | Industrial |
| `logistics` | Logistik | Logistics |
| `laboratory` | Laboratorium | Laboratories |
| `commercial` | Komersial | Commercial |
| `agriculture` | Agrikultur | Agriculture |
| `hospitality` | Hotel | Hotels |
| `residential` | Hunian & Villa | Residential & Villas |
| `education` | Pendidikan | Education |

Jika menambah kategori, tambahkan juga terjemahan ID/EN dan masukkan kuncinya ke daftar dalam `renderFilters()` pada `app.js`. Menulis kategori baru hanya di `projects.js` belum menambahkan tombol filternya.

Saat panduan dibuat terdapat **19 galeri proyek dan 124 foto unik**. Jumlah galeri dan foto pada ringkasan galeri dihitung dari data proyek; satu foto yang digunakan beberapa proyek tetap dihitung satu kali sebagai foto unik. Angka **456** merujuk daftar proyek pada company profile, bukan jumlah galeri. Angka tersebut terdapat pada HTML ringkasan dan teks `portfolioNote` di kedua bahasa; ubah hanya bila ada data perusahaan yang mendukung.

### Aturan alamat gambar

- Gunakan path relatif, misalnya `assets/gallery/nama-foto.webp`. Hindari awalan `/assets/` karena website berada di subpath `/Company-Profile_MKP/`.
- Nama file dan path harus sama persis, termasuk huruf besar/kecil dan ekstensi. GitHub Pages membedakannya.
- Unggah aset sebelum atau bersama perubahan referensinya. Saat menghapus foto, hapus seluruh referensinya dahulu, termasuk `cover` dan kemungkinan penggunaan pada proyek lain.
- Untuk foto pengganti, nama baru seperti `panel-01-v2.webp` membantu menghindari gambar lama dari cache. Perbarui semua path terkait.

## 7. Memperbarui logo mitra

Unggah logo ke `assets/partners/`, lalu tambahkan objek pada array `partnerLogos` di `partners-data.js`:

```js
{ src: 'assets/partners/nama-mitra.webp', name: 'Nama Mitra' }
```

Pisahkan setiap objek dengan koma. `name` dipakai sebagai teks alternatif gambar; gunakan nama perusahaan yang sudah diverifikasi. Jangan menambahkan salinan seluruh daftar untuk membuat efek berulang: `partners.js` sudah membuat salinan visual untuk pergeseran yang berkesinambungan.

Saat panduan dibuat terdapat 35 logo. Periksa logo dalam satu baris, proporsi gambar, tombol Jeda/Putar, panah, drag mouse dan geser sentuh. Carousel juga berhenti saat hover/fokus, serta menghormati preferensi pengurangan animasi pengguna. Jika otomatis tidak bergerak, periksa status jeda dan preferensi tersebut sebelum menganggapnya rusak.

Atur tampilan melalui `partners.css`. Teks bagian dan kontrol ID/EN berada di `partners.js`. Ubah kecepatan hanya bila diperlukan dan periksa kembali interaksinya.

## 8. Mengubah tampilan dan gambar latar

Gunakan `style.css` untuk warna, ruang, ukuran dan aturan responsif. Variabel seperti `--red` mengatur warna utama, tetapi beberapa aksen memiliki nilai warna langsung; cari aturan terkait sebelum mengganti tema secara menyeluruh. Aturan yang ditulis lebih akhir dapat menimpa aturan sebelumnya.

Bagian direksi memiliki `directors.css`; bagian mitra memiliki `partners.css`. Untuk foto latar bagian cara bekerja, periksa elemen yang memakai `assets/team.webp` dan aturan ukuran/posisinya. Sesuaikan pemotongan gambar, ukuran wadah dan posisi fokus setelah melihat hasil pada desktop maupun ponsel. Jangan meregangkan gambar sampai rasio objek berubah.

## 9. Memeriksa dan menerbitkan perubahan

Sebelum merge ke `main`, lakukan pemeriksaan yang relevan:

- Buka desktop dan layar ponsel: navigasi, teks, gambar dan tombol tidak terpotong atau melebar keluar layar.
- Ganti ID dan EN; pastikan konten baru ada di keduanya dan sambutan direksi tetap asli.
- Coba filter, buka proyek, pindah foto, pilih thumbnail dan buka foto penuh.
- Periksa logo mitra dan kontrol pergeserannya.
- Coba tombol email serta Salin Email; pastikan alamat dan subjek benar.
- Buka Developer Tools → Console dan Network untuk mencari kesalahan JavaScript atau gambar yang gagal dimuat.

Jika Node.js tersedia, pemeriksaan sintaks tambahan dapat dijalankan dari root repository:

```sh
node --check app.js
node --check projects.js
node --check partners-data.js
node --check partners.js
```

Pemeriksaan ini hanya memeriksa sintaks, bukan kebenaran konten atau perilaku halaman.

Setelah perubahan masuk `main`:

1. Buka tab **Actions**, cari proses **pages build and deployment** untuk commit tersebut.
2. Tunggu sampai selesai sukses. Jika gagal, buka langkah yang merah dan baca pesan kesalahannya.
3. Buka website publik dan ulangi pemeriksaan fungsi yang berubah. Status deployment sukses tidak menjamin seluruh interaksi JavaScript benar.
4. Jika masih terlihat versi lama, tunggu publikasi selesai lalu gunakan `Ctrl+Shift+R` untuk memuat ulang.

GitHub menyebut publikasi perubahan dapat memerlukan hingga 10 menit. Pengaturan **Settings → Pages → Build and deployment** tetap memakai **Deploy from a branch → main → / (root)**; tidak perlu mengubahnya untuk setiap pembaruan. Lihat [sumber publikasi Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site) dan [waktu publikasi](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site).

## 10. Menangani masalah umum

| Gejala | Pemeriksaan dan tindakan |
| --- | --- |
| Foto tidak muncul | Periksa koneksi internet, tunggu pemuatan gambar, lalu periksa Network untuk status 404. Cocokkan path, huruf besar/kecil, ekstensi dan keberadaan file. |
| Hanya foto sampul yang salah | Periksa `cover.thumb`; mengganti `images` tidak otomatis mengganti `cover`. |
| Teks tetap lama | Pastikan mengubah sumber `data-t` di `app.js`, kedua bahasa, dan branch yang benar. Pilihan bahasa disimpan di `localStorage`; coba tombol ID/EN. Periksa deployment dan cache. |
| Galeri atau filter kosong | Lihat Console untuk kesalahan sintaks, koma yang hilang, variabel yang tidak tersedia, atau kategori yang belum didaftarkan. |
| Tombol mitra tidak bekerja | Periksa pemuatan `partners-data.js` dan `partners.js`, urutan script, serta kesalahan di Console. |
| Salin Email menghasilkan alamat lama | Perbarui string pada handler `#copy-email` di `app.js`, bukan hanya teks HTML. |
| Tombol email tidak membuka aplikasi | Periksa `mailto:` dan pengaturan aplikasi email di perangkat pengguna. Website tidak mengirim email sendiri. |
| Perubahan belum tampil di publik | Pastikan sudah masuk `main`, Actions sukses untuk commit terbaru, lalu muat ulang tanpa cache. |

## 11. Mengembalikan perubahan yang bermasalah

Untuk satu file melalui GitHub: buka file → **History**, cari versi yang masih benar, lihat isi file pada versi itu, lalu salin bagian yang diperlukan ke editor file pada branch saat ini. Periksa diff dan commit pemulihan sebagai perubahan baru. Jangan menyalin file dari versi lama tanpa memeriksa perubahan lain yang masih diperlukan.

Untuk perubahan dari pull request yang sudah di-merge, GitHub dapat menyediakan tindakan **Revert** pada pull request tersebut. Ikuti hasil pull request pemulihan dan lakukan pemeriksaan sebelum merge.

Untuk commit biasa yang mengubah beberapa file, GitHub Desktop menyediakan **History → klik kanan commit → Revert Changes in Commit**, kemudian push hasilnya. Jika memakai Git CLI dan memahami perubahan yang dibatalkan:

```sh
git pull --ff-only
git revert SHA_COMMIT_YANG_DIBATALKAN
git push
```

Ganti placeholder dengan SHA yang benar; gunakan branch kerja tim bila diperlukan. Jika muncul konflik, selesaikan dan periksa hasilnya sebelum push. Merge commit memerlukan penanganan khusus; gunakan alur revert pull request atau minta bantuan penanggung jawab Git. Jangan memakai force push atau reset riwayat sebagai langkah pemulihan rutin. Setelah pemulihan masuk `main`, tunggu deployment dan periksa website kembali.

Referensi: [membatalkan commit di GitHub Desktop](https://docs.github.com/en/desktop/managing-commits/reverting-a-commit-in-github-desktop) dan [membatalkan pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/incorporating-changes-from-a-pull-request/reverting-a-pull-request).

## 12. Catatan untuk penerus maintenance

Gunakan pesan commit yang menyebut perubahan nyata, simpan sumber foto dan konfirmasi data proyek di tempat kerja tim, serta perbarui panduan bila struktur berubah. Repository dan aset website bersifat publik; jangan memasukkan password, token, atau dokumen internal yang belum dipilih untuk publikasi.

Saat menyerahkan pekerjaan, catat commit terakhir, file yang diubah, pemeriksaan yang dilakukan, serta masalah yang masih ada. Dengan begitu tim berikutnya dapat melanjutkan tanpa menebak sumber konten atau pengaturan hosting.

## 13. SEO dan Google Search Console

Perbaikan SEO mencakup judul deskriptif, deskripsi ID/EN, canonical, Open Graph, data terstruktur Organization dan sitemap. Semua alamat utama menggunakan:

```text
https://hafizh2001.github.io/Company-Profile_MKP/
```

| Pengaturan | Lokasi edit |
| --- | --- |
| Judul hasil pencarian yang disarankan | Elemen `<title>` pada `index.html` |
| Deskripsi awal halaman | `meta[name="description"]` pada `index.html` |
| Deskripsi sesuai bahasa setelah JavaScript berjalan | Kunci `meta` pada kedua bahasa di `app.js` |
| Pengantar identitas perusahaan | `introLead` ID/EN di `app.js` dan teks awal terkait di HTML |
| Canonical dan pratinjau tautan | `link[rel="canonical"]` dan meta `og:*` di `index.html` |
| Identitas untuk mesin pencari | JSON-LD `Organization` di `index.html` |
| Daftar halaman untuk Google | `sitemap.xml` di root repository |
| Verifikasi kepemilikan Google | Meta `google-site-verification` di `index.html`; pertahankan tag ini |

Ketika mengubah nama, alamat, logo atau kontak, sesuaikan juga JSON-LD dan metadata terkait. Isi data terstruktur harus sesuai informasi perusahaan yang terlihat di halaman. Jangan menghubungkan profil atau domain perusahaan lain melalui `sameAs`. Nama alternatif bukan perubahan nama resmi.

Sitemap saat ini berisi satu URL, karena website merupakan satu halaman. Tautan `#about`, `#projects`, `#contact`, galeri dialog dan tombol bahasa bukan halaman terpisah. Jangan membuat URL bahasa atau proyek dalam sitemap bila halaman tersebut belum benar-benar tersedia. `lastmod` tidak ditambahkan agar tidak mengirim tanggal perubahan yang dibuat-buat.

**Mengirim sitemap:** masuk ke properti URL-prefix website di Google Search Console → **Peta Situs / Sitemaps** → masukkan `sitemap.xml` bila awalan website sudah ditampilkan, atau alamat lengkap berikut bila kolom meminta URL lengkap → **Kirim**:

```text
https://hafizh2001.github.io/Company-Profile_MKP/sitemap.xml
```

Setelah perubahan konten penting dipublikasikan, gunakan **Inspeksi URL** pada alamat halaman utama dan minta pengindeksan jika diperlukan. Tidak perlu mengirim permintaan berulang untuk halaman yang sama. Pantau status indeks serta laporan Performa untuk melihat tayangan, klik dan kueri pencarian nama perusahaan.

`robots.txt` berlaku dari root hostname, yaitu `https://hafizh2001.github.io/robots.txt`. Menaruhnya di subfolder `/Company-Profile_MKP/` tidak membuat aturan yang berlaku untuk crawler. Karena repository ini mengelola subfolder tersebut, sitemap dikirim langsung melalui Search Console.

Jika kelak menggunakan domain sendiri, perbarui canonical, URL Open Graph, URL dan ID Organization, alamat logo/gambar absolut, sitemap, serta properti Search Console untuk domain baru. Koordinasikan perubahan domain dengan penanggung jawab hosting.

SEO membantu Google memahami website; tidak menjamin peringkat atau tanggal kemunculan. Hasil pencarian `site:` juga tidak selalu menampilkan seluruh URL yang diindeks. Gunakan Inspeksi URL sebagai pemeriksaan status halaman.

Referensi resmi: [judul halaman](https://developers.google.com/search/docs/appearance/title-link), [Organization](https://developers.google.com/search/docs/appearance/structured-data/organization), [sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap), [canonical](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls), dan [batas pencarian site:](https://developers.google.com/search/docs/monitor-debug/search-operators/all-search-site).
