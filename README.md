# Website PT. Multi Karya Persada

Website company profile kontraktor MEP, dengan pilihan bahasa Indonesia dan Inggris, galeri proyek, logo mitra, serta kontak melalui email.

**Website publik:** https://hafizh2001.github.io/Company-Profile_MKP/

**Mulai dari [Panduan Maintenance](docs/PANDUAN-MAINTENANCE.md).** Panduan tersebut menjelaskan cara mengedit melalui GitHub, mencoba perubahan di komputer, memperbarui konten, memeriksa publikasi, dan mengembalikan versi sebelumnya.

## Teknologi dan publikasi

Website memakai HTML, CSS, dan JavaScript biasa. Tidak diperlukan instalasi npm, proses build aplikasi, atau database. GitHub Pages menerbitkan isi branch **`main`**, folder **`/ (root)`**. Perubahan yang masuk ke `main` akan diproses untuk publikasi otomatis.

Folder `docs` berisi dokumentasi maintenance; folder tersebut **bukan sumber publikasi Pages**. Pertahankan `index.html` dan `.nojekyll` di root repository.

## File yang perlu diedit

| Kebutuhan | File |
| --- | --- |
| Struktur halaman, tagline, sambutan direksi, alamat dan kontak | [index.html](index.html) |
| Teks Indonesia/Inggris, layanan, fungsi filter dan galeri, tujuan tombol email | [app.js](app.js) |
| Nama, kategori, deskripsi dan foto proyek | [projects.js](projects.js) |
| Daftar logo dan nama mitra | [partners-data.js](partners-data.js) |
| Perilaku carousel dan teks kontrol mitra dalam dua bahasa | [partners.js](partners.js) |
| Tampilan utama dan responsif | [style.css](style.css) |
| Tampilan bagian mitra / direksi | [partners.css](partners.css), [directors.css](directors.css) |
| Foto proyek / logo mitra | [assets/gallery](assets/gallery), [assets/partners](assets/partners) |

Teks dengan atribut `data-t` di HTML mengambil isi dari `app.js`; mengubah HTML saja belum tentu mengubah teks yang terlihat. Alamat email utama juga digunakan di beberapa tempat. Ikuti rincian dalam panduan sebelum mengubahnya.

## Ketentuan konten

- Sambutan direksi menggunakan **kalimat asli berbahasa Inggris**, tetap sama pada pilihan ID dan EN. Jangan mengoreksi, menerjemahkan, atau menulis ulang tanpa persetujuan pemilik konten.
- Umara dan Bakmi GM berada dalam kategori **Resto/F&B** (`fnb`).
- Kontak utama melalui email; website tidak menggunakan WhatsApp.
- Periksa tampilan ID dan EN, foto, serta fungsi terkait sebelum memasukkan perubahan ke `main`.

Untuk perubahan beberapa file, disarankan memakai branch dan pull request agar dapat diperiksa bersama tim. Langkah lengkap: [Panduan Maintenance](docs/PANDUAN-MAINTENANCE.md).

## SEO dan pencarian Google

Website memiliki canonical, metadata perusahaan, data terstruktur Organization dan [sitemap.xml](sitemap.xml). Langkah pengiriman sitemap melalui Search Console serta cara memperbarui metadata ada pada bagian **SEO dan Google Search Console** dalam [Panduan Maintenance](docs/PANDUAN-MAINTENANCE.md).
