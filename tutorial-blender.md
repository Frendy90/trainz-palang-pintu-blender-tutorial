# Tutorial lengkap: animasi mesh palang pintu Blender untuk Trainz Simulator 2009

## 1. Tujuan dan batasan

Tutorial ini membuat satu palang perlintasan yang berputar pada engsel. Hasil akhirnya adalah asset yang:

- memiliki mesh statis dan mesh palang bergerak;
- mempunyai pose tertutup dan terbuka;
- dapat diekspor menggunakan exporter Trainz yang kompatibel dengan TS2009;
- dapat diuji di Trainz sebelum dikendalikan oleh script.

Trainz Simulator 2009 menggunakan toolchain lama. Nama menu Blender dan format output dapat berbeda antar-exporter. Karena itu, bagian **ekspor** harus mengikuti manual exporter yang Anda instal. Jangan menyalin konfigurasi Trainz-build versi baru tanpa verifikasi.

## 2. Persiapan

Siapkan:

- Blender versi yang didukung oleh exporter Anda (Blender 2.79 sering dipakai untuk toolchain lama, tetapi ikuti versi yang disyaratkan exporter);
- exporter Blender → Trainz untuk TS2009;
- CCP/Content Manager TS2009;
- model atau tekstur palang yang Anda miliki hak untuk gunakan.

Buat folder kerja seperti berikut:

```text
palang-perlintasan/
├── blend/
├── export/
├── asset/
└── backup/
```

Simpan versi `.blend` secara berkala di `blend/`. Jangan mengedit file hasil ekspor secara manual kecuali dokumentasi exporter memintanya.

## 3. Membuat model dasar

### 3.1 Atur unit dan orientasi

1. Buka Blender dan buat file baru.
2. Pada **Scene Properties → Units**, pilih sistem Metric jika Anda ingin bekerja dalam meter.
3. Gunakan satuan dan orientasi yang diwajibkan exporter Trainz. Beberapa exporter lama mempunyai konvensi sumbu sendiri; lakukan percobaan dengan kubus sederhana terlebih dahulu.
4. Hapus kubus default.

### 3.2 Buat komponen

Buat objek terpisah dengan nama tanpa spasi:

```text
Crossing_Base      bagian pondasi, statis
Crossing_Pole      tiang, statis
Gate_Bar           palang yang bergerak
Warning_Light      lampu, opsional
```

Contoh ukuran awal, sesuaikan dengan skala layout:

- `Crossing_Base`: 0,8 m × 0,8 m × 0,3 m;
- `Crossing_Pole`: tinggi sekitar 2,5 m;
- `Gate_Bar`: panjang sekitar 4–6 m, tergantung lebar jalan.

Gunakan **Apply Scale** (`Ctrl+A → Scale`) setelah ukuran final. Normal mesh harus menghadap keluar. Periksa dengan **Face Orientation** dan lakukan `Shift+N` di Edit Mode jika diperlukan.

## 4. Mengatur pivot engsel

Pivot adalah bagian terpenting dari animasi palang.

1. Buat atau pilih `Gate_Bar`.
2. Pastikan ujung pangkal palang berada tepat di pusat engsel.
3. Pilih `Gate_Bar`, masuk Edit Mode, pilih seluruh vertex, lalu pindahkan geometri sehingga titik origin objek berada di pusat engsel; atau gunakan **3D Cursor** di pusat engsel lalu **Object → Set Origin → Origin to 3D Cursor**.
4. Pastikan rotasi uji hanya memutar palang mengelilingi engsel.
5. Jangan apply rotation setelah animasi dibuat karena dapat mengubah transformasi keyframe.

Untuk palang yang turun-naik di bidang vertikal, sumbu rotasi umumnya sumbu lokal yang melalui engsel. Jangan menebak X/Y/Z: putar sedikit dan catat sumbu yang benar berdasarkan orientasi scene/exporter.

## 5. Parent mesh (pilih salah satu metode)

### Metode A — satu objek bergerak

Ini paling sederhana dan biasanya paling mudah diuji:

- jadikan `Gate_Bar` satu objek;
- animasikan rotasi objek tersebut pada origin engsel;
- biarkan pondasi dan tiang sebagai objek statis.

### Metode B — Empty atau armature

Gunakan metode ini bila exporter Anda mensyaratkan armature atau beberapa bagian bergerak bersama:

1. Tambahkan **Empty → Plain Axes** di pusat engsel, beri nama `Gate_Root`.
2. Parent `Gate_Bar` ke `Gate_Root` dengan `Ctrl+P → Object`.
3. Animasi rotasi `Gate_Root`, bukan mesh anak.

Jika memakai armature, buat bone root di engsel dan parent bagian palang ke bone tersebut. Gunakan armature hanya bila exporter yang dipakai memang mendukungnya. Sebelum ekspor, cek panduan exporter untuk aturan bone, nama action, dan jumlah frame.

## 6. Membuat animasi `close` dan `open`

Contoh berikut menggunakan 30 frame per animasi dan 30 FPS. Durasi sebenarnya boleh Anda ubah.

### 6.1 Action `close`

1. Pilih objek pengendali (`Gate_Bar`, `Gate_Root`, atau bone).
2. Buka **Dope Sheet → Action Editor**.
3. Buat action bernama `close`.
4. Pada frame 1, atur posisi palang **terbuka** dan tekan `I → Rotation` (atau `LocRotScale` bila exporter memerlukannya).
5. Pada frame 30, atur posisi palang **tertutup** dan masukkan keyframe rotasi.
6. Set interpolation ke **Linear** untuk gerak mekanis atau **Bezier** dengan handle Auto untuk gerak yang lebih halus.

### 6.2 Action `open`

1. Buat action kedua bernama `open`.
2. Pada frame 1, atur posisi **tertutup** dan masukkan keyframe.
3. Pada frame 30, atur posisi **terbuka** dan masukkan keyframe.
4. Pastikan action tidak kosong dan tidak terhapus oleh **Push Down** sebelum disimpan.

> Nama action harus mengikuti aturan exporter. Ada exporter yang hanya mengekspor action aktif, ada yang mengambil NLA strips, dan ada yang menggunakan nama animasi tertentu. Baca dokumentasi exporter Anda.

### 6.3 Verifikasi di Blender

- Putar timeline dari frame 1 sampai 30.
- Pastikan palang tidak bergeser dari engsel.
- Periksa bahwa pose frame 1 dan 30 tepat.
- Pastikan tidak ada keyframe yang tidak sengaja pada skala atau lokasi.
- Simpan file sebelum ekspor.

## 7. Lampu berkedip dan suara

Sebaiknya buat lampu sebagai komponen terpisah. Animasi lampu dapat berupa:

- action visibilitas/material bila didukung exporter;
- dua mesh/material, yaitu lampu mati dan lampu menyala;
- kontrol runtime melalui script Trainz bila asset type dan API Anda mendukungnya.

Suara alarm umumnya didefinisikan di konfigurasi asset atau dikontrol script, bukan dimasukkan ke dalam animasi mesh. Gunakan format audio dan aturan penamaan yang dinyatakan oleh dokumentasi TS2009 Anda.

## 8. Ekspor dari Blender

1. Pilih hanya objek yang perlu diekspor.
2. Terapkan transformasi yang diwajibkan exporter.
3. Pastikan material dan tekstur memakai nama file sederhana, misalnya `palang_red.tga` atau format yang didukung.
4. Jalankan menu exporter Trainz.
5. Pilih format mesh/animasi sesuai TS2009. Jangan mengganti ekstensi output secara manual.
6. Ekspor mesh statis dan animasi ke folder `export/`.
7. Catat nama file hasil ekspor dan pesan log exporter.

Output animasi dapat berbeda, misalnya berupa file animasi terpisah atau data animasi yang dirujuk dari mesh. Karena itu, jangan mengasumsikan hasilnya selalu `OPEN.anim`/`CLOSE.anim`; gunakan nama dan struktur yang dibuat exporter.

## 9. Menyiapkan asset Trainz

Salin file hasil ekspor ke folder asset dan buat `config.txt`. Gunakan [`examples/config.txt`](examples/config.txt) sebagai template, lalu sesuaikan:

- KUID;
- username;
- `trainz-build` yang sesuai TS2009;
- `mesh-table` dan nama file hasil ekspor;
- entri animasi sesuai format exporter;
- script dan class bila sudah membuat script.

Jangan memakai KUID contoh untuk rilis. Jangan menambahkan tag konfigurasi yang tidak didukung oleh Trainz-build 2.9.

## 10. Memasukkan dan menguji di Content Manager

1. Buka Content Manager/CCP.
2. Impor atau buka folder asset sesuai metode instalasi TS2009.
3. Jalankan **Submit/Edit → Rebuild** atau proses validasi yang tersedia.
4. Periksa **Errors and Warnings**.
5. Perbaiki error satu per satu; warning juga perlu diperiksa bila berkaitan dengan mesh, animasi, atau konfigurasi.
6. Buka Surveyor, tempatkan asset, dan uji pose/animasi.
7. Uji pada layout salinan, bukan layout utama.

## 11. Menambahkan kontrol otomatis

Tambahkan kontrol otomatis hanya setelah animasi manual berhasil. Alur logika yang aman:

```text
sensor pendekatan aktif
→ lampu dan alarm menyala
→ tunggu waktu peringatan
→ mainkan close
→ selama kereta masih terdeteksi, tahan closed
→ semua sensor clear
→ tunggu waktu aman
→ mainkan open
```

Kerangka pada [`examples/palang-controller.gs`](examples/palang-controller.gs) adalah pseudocode. Fungsi aktual untuk trigger, pemutaran animasi, suara, dan pencarian objek harus dicocokkan dengan dokumentasi TrainzScript TS2009 serta jenis asset yang dipakai.

## 12. Checklist sebelum rilis

- [ ] Pivot palang berada di engsel.
- [ ] Skala dan rotasi sudah diterapkan sebelum animasi.
- [ ] `open` dan `close` memiliki keyframe awal dan akhir.
- [ ] Mesh tidak memiliki normal terbalik.
- [ ] Tekstur ditemukan dan memiliki file descriptor yang benar bila diperlukan.
- [ ] Format output benar-benar didukung TS2009.
- [ ] `config.txt` memakai `trainz-build` dan tag yang kompatibel.
- [ ] KUID tidak bentrok.
- [ ] Asset lolos validasi CCP/Content Manager.
- [ ] Asset diuji dalam Surveyor dan Driver.
- [ ] Script tidak membuka palang ketika sensor masih aktif.

## 13. Pemecahan masalah

| Gejala | Pemeriksaan |
|---|---|
| Palang berputar dari tengah | Origin/pivot belum berada di pusat engsel. |
| Palang tidak bergerak | Action tidak diekspor, action tidak aktif, atau entri konfigurasi tidak sesuai exporter. |
| Animasi terbalik | Tukar pose awal/akhir atau arah rotasi. |
| Mesh hilang | Nama file, path, material, atau sumbu exporter salah. |
| Palang melayang/menembus jalan | Skala unit, origin, atau transformasi objek belum benar. |
| Asset gagal validasi | Baca baris error di CCP dan gunakan hanya tag yang didukung trainz-build TS2009. |
| Script gagal dikompilasi | API/class bukan API TS2009 atau tipe asset tidak mendukung fungsi tersebut. |
| Lampu tidak berkedip | Pisahkan animasi lampu dari animasi palang dan verifikasi dukungan runtime. |

## 14. Praktik pengembangan yang disarankan

- Simpan backup setiap kali mengubah exporter atau versi Blender.
- Uji satu perubahan dalam satu waktu.
- Simpan screenshot pengaturan exporter bersama proyek.
- Mulai dari satu palang, lalu duplikasi untuk sisi lainnya.
- Gunakan log validasi sebagai sumber kebenaran, bukan asumsi dari tutorial untuk Trainz versi lain.
