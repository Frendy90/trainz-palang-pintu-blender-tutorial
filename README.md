# Palang Pintu Perlintasan Trainz Simulator 2009

Dokumentasi dan contoh alur kerja untuk membuat addon palang pintu perlintasan yang dapat dianimasikan di Blender dan digunakan di Trainz Simulator 2009.

> **Status:** dokumentasi dan template awal. File Blender, mesh hasil ekspor, KUID, serta API script harus disesuaikan dengan toolchain Trainz yang Anda gunakan.

## Isi repositori

- [`tutorial-blender.md`](tutorial-blender.md) — tutorial dari pemodelan hingga pengujian.
- [`examples/palang-controller.gs`](examples/palang-controller.gs) — pseudocode/kerangka logika kontrol; bukan jaminan API final untuk semua build TS2009.
- [`examples/config.txt`](examples/config.txt) — contoh konfigurasi asset yang harus disesuaikan.
- [`LICENSE`](LICENSE) — lisensi dokumentasi dan contoh.

## Yang diperlukan

1. Blender versi yang kompatibel dengan exporter Trainz yang dipilih.
2. Exporter Trainz untuk menghasilkan format yang diterima TS2009, biasanya `.im` untuk mesh dan format animasi yang ditentukan exporter.
3. Content Creator Plus (CCP) atau Content Manager versi yang sesuai dengan TS2009.
4. Trainz Simulator 2009 untuk pengujian di Surveyor/Driver.
5. Editor teks yang tidak mengubah tab atau encoding secara tidak sengaja.

**Penting:** Jangan menganggap exporter Blender modern, format animasi, atau fungsi TrainzScript dari Trainz versi baru kompatibel dengan TS2009. Selalu gunakan versi exporter yang memang mendukung Trainz-build 2.9 dan ikuti dokumentasinya.

## Alur singkat

```text
Model → atur pivot engsel → animasikan → ekspor dengan exporter Trainz
      → buat config.txt → impor/rebuild di Content Manager
      → uji di Surveyor → baru tambahkan kontrol sensor/script
```

## Prinsip desain

- Pisahkan mesh statis dan bagian bergerak bila exporter atau asset type memerlukannya.
- Letakkan origin/pivot palang tepat di engsel; jangan mengandalkan titik tengah objek.
- Buat animasi `open` dan `close` sesuai metode yang didukung exporter, bukan berdasarkan nama file semata.
- Gunakan nama file dan nama objek tanpa spasi untuk mengurangi masalah saat ekspor.
- Uji animasi sebagai asset sederhana terlebih dahulu sebelum menambahkan sensor kereta, lampu, dan suara.
- Ganti semua KUID contoh dengan KUID milik Anda sendiri.

## Urutan implementasi yang disarankan

1. Buat palang statis dan pastikan mesh tampil di Trainz.
2. Tambahkan animasi dan pastikan palang dapat dibuka/ditutup tanpa script.
3. Tambahkan lampu dan suara.
4. Tambahkan trigger/sensor.
5. Tambahkan script kontrol setelah semua komponen individual berhasil.

## Lisensi

Dokumentasi dan contoh dalam repositori ini dirilis di bawah MIT License. Asset pihak ketiga, exporter, dan material harus mengikuti lisensinya masing-masing.
