# Palang Pintu Perlintasan untuk Trainz Simulator 2009

Repositori ini berisi panduan, template, dan contoh logika untuk membuat addon palang pintu perlintasan di Trainz Simulator 2009, mulai dari pemodelan di Blender, ekspor mesh dan animasi, hingga kontrol otomatis dengan script.

## Tujuan proyek

Tujuan utama repositori ini adalah memberi panduan praktis untuk membangun addon palang pintu perlintasan yang memiliki:

- palang membuka/menutup otomatis;
- sensor deteksi kereta;
- lampu peringatan;
- alarm suara;
- state machine yang aman dan tidak membuka palang terlalu cepat.

## Struktur repositori

- `README.md` — ringkasan project dan panduan cepat.
- `tutorial-blender.md` — tutorial lengkap pemodelan dan animasi Blender.
- `docs/trainz-addon-architecture.md` — arsitektur asset, state machine, dan struktur addon Trainz.
- `examples/config.txt` — template konfigurasi asset Trainz.
- `examples/palang-controller.gs` — contoh logika kontrol dalam bentuk script kerangka.
- `LICENSE` — lisensi MIT.

## Alur pembangunan rekomendasi

1. Buat model palang di Blender.
2. Atur origin/engsel di titik yang benar.
3. Buat animasi `open` dan `close`.
4. Ekspor mesh dan animasi yang kompatibel dengan TS2009.
5. Buat file konfigurasi look-up asset.
6. Uji mesh dan animasi di Trainz.
7. Tambahkan trigger/sensor.
8. Tambahkan lampu dan alarm.
9. Hubungkan semua event ke state machine.
10. Uji pengoperasian nyata di Surveyor.

## File penting

- `tutorial-blender.md` — panduan model + animasi di Blender
- `docs/trainz-addon-architecture.md` — desain sistem palang pintu dan logika kontrol
- `examples/config.txt` — template `config.txt` untuk asset Trainz
- `examples/palang-controller.gs` — kerangka script controller

## Catatan penting

- Dokumentasi ini dibuat dengan pendekatan kerja nyata untuk Trainz Simulator 2009, bukan untuk versi baru yang menggunakan API berbeda.
- API TrainzScript, format animasi, dan struktur exporter dapat berbeda sesuai build, exporter, dan plugin yang Anda gunakan.
- Pastikan KUID, nama file, path, dan tag konfigurasi sesuai dengan setup lokal Anda.
- Uji asset di salinan proyek sebelum dipublikasikan atau dibagikan.

## Next steps

Rekomendasi lanjutan:

- membuat file asset engine lengkap untuk palang kiri dan kanan;
- menambahkan nama mesh, script, dan texture yang konsisten;
- mengimplementasikan sensor jarak/trackside lebih detail;
- menyiapkan template untuk lampu kedip, alarm, dan model truk/kereta.

## Lisensi

Repositori ini dilisensikan di bawah MIT License.
