# Arsitektur Addon Palang Pintu untuk Trainz 2009

Dokumen ini menjelaskan struktur logis yang biasanya dipakai saat membuat addon palang pintu perlintasan untuk Trainz Simulator 2009.

## 1. Tujuan sistem

Sistem palang pintu harus bekerja seperti ini:

- saat kereta mendekati, palang menutup;
- lampu peringatan aktif;
- alarm berbunyi;
- bila kereta sudah yakin aman, palang dibuka kembali;
- proses harus aman dari pengulangan atau hambatan timing.

## 2. Komponen utama

### 2.1 Mesh

Biasanya terdiri dari beberapa bagian:

- `gate_left` — palang kiri
- `gate_right` — palang kanan
- `pole_left` — tiang kiri
- `pole_right` — tiang kanan
- `light_left` — lampu kiri
- `light_right` — lampu kanan
- `base` — fondasi/pondasi

Pastikan mesh utama bergerak dari engsel yang benar, bukan dari titik tengah. Karena error paling umum adalah palang berputar dari titik yang salah.

### 2.2 Animasi

Setiap palang perlu animasi utama:

- `open`
- `close`

Lampu bisa dibuat sebagai:

- mesh sederhana dengan animasi `blink` atau `idle`;
- material yang diubah dari on/off;
- kontrol runtime dari script.

### 2.3 Sensor

Biasanya memakai:

- trigger trackside;
- sensor jarak tertentu pada rel;
- deteksi kereta berdasarkan keberadaan objek di jalur.

Sensor sebaiknya dipecah menjadi:

- sensor pendekatan (approach)
- sensor tengah (center)
- sensor clear / exit (clear)

## 3. State machine dasar

State paling sederhana:

```text
OPEN
CLOSING
CLOSED
OPENING
ERROR
```

Flow umum:

```text
OPEN -> CLOSING -> CLOSED -> OPENING -> OPEN
```

### 3.1 Kondisi transisi

- `OPEN` → `CLOSING` saat sensor pendekatan aktif.
- `CLOSING` → `CLOSED` setelah animasi close selesai.
- `CLOSED` → `OPENING` saat semua sensor clear dan timer aman habis.
- `OPENING` → `OPEN` setelah animasi open selesai.

## 4. Logika kontrol

### 4.1 Event pendekatan

```text
if approach_sensor_active == true and state == OPEN:
    start_alarm()
    start_warning_lights()
    play_animation(close)
    state = CLOSING
```

### 4.2 Event kereta lewat

```text
if center_sensor_active == true:
    train_present = true
```

### 4.3 Event semua sensor clear

```text
if no_sensor_active and state == CLOSED:
    wait(delay_open)
    stop_alarm()
    stop_warning_lights()
    play_animation(open)
    state = OPENING
```

## 5. Waktu yang disarankan

Tergantung ukuran layout dan kekuatan animasi, saran umum:

- `warning_delay`: 2–5 detik
- `close_duration`: 1–3 detik
- `clear_delay`: 4–8 detik
- `open_delay`: 1–3 detik

Semakin pendek waktu peringatan, semakin mudah palang terbuka terlalu cepat. Sebaiknya selalu menunggu beberapa detik setelah sensor clear sebelum membuka.

## 6. Struktur folder asset

```text
addon-palangan/
├── config.txt
├── materials/
│   ├── gate_material.txt
│   ├── light_material.txt
│   └── road_material.txt
├── meshes/
│   ├── gate_left.im
│   ├── gate_right.im
│   ├── base.im
│   └── light.im
├── sounds/
│   └── crossing_alarm.wav
├── scripts/
│   └── crossing_controller.gs
├── textures/
│   ├── gate_diffuse.tga
│   └── light_diffuse.tga
└── readme.txt
```

## 7. Contoh konfigurasi singkat

```text
kuid                    <KUID2:123456:10001:1>
username                "Crossing Gate Example"
kind                    "scenery"
trainz-build            2.9
category-class          "BC"
author                  "Frendy90"

description             "Palang pintu perlintasan otomatis."

mesh-table
{
    default
    {
        mesh "gate_left.im"
    }
}
```

> Catatan: format `config.txt` dapat berbeda sesuai exporter/asset type. Gunakan dokumentasi setempat dan validasi asset.

## 8. Strategi pengujian

Uji secara berjenjang:

1. mesh terlihat;
2. animasi open/close berjalan;
3. trigger deteksi dapat men-trigger state;
4. lampu peringatan bekerja;
5. alarm berbunyi;
6. palang tidak membuka terlalu cepat;
7. tambahkan pengujian pada situasi multi-kereta.

Ada kalanya kereta berhenti tepat di bibir sensor. Karena itu, setidaknya uji kondisi berikut:

- kereta datang dari utara;
- kereta datang dari selatan;
- kereta berhenti di depan sensor;
- kereta lewat cepat;
- kereta melewati sensor tengah kemudian keluar.

## 9. Risiko fungsi umum

Beberapa masalah yang sering muncul:

- state menutup/membuka tidak konsisten;
- lampu berkedip tidak mengikuti state;
- alarm diputar berulang pada state yang sama;
- palang kembali terbuka terlalu cepat karena sensor clear terjadi terlalu dini;
- trigger aktif terus-menerus karena kereta berhenti di lokasi sensor.

Solusinya biasanya:

- gunakan flag `transition_in_progress`;
- gunakan `state_lock` sederhana;
- tambahkan `minimum_closed_time` dan `minimum_open_time`;
- simpan status sensor di variabel boolean.

## 10. Contoh state machine tekstual

```text
if state == OPEN and approach_sensor:
    state = CLOSING

if state == CLOSING and animation_close_done:
    state = CLOSED

if state == CLOSED and all_sensors_clear and timer_ended:
    state = OPENING

if state == OPENING and animation_open_done:
    state = OPEN
```

## 11. Kesimpulan

Arsitektur paling aman untuk addon palang pintu adalah:

- mesh + animasi terpisah;
- sensor pendekatan dan exit jelas;
- state machine yang sederhana;
- timer aman untuk mencegah pembukaan prematur;
- script pengendali yang hanya memodifikasi state dan menggerakkan animasi.

Dengan pola ini, sistem lebih mudah dipelihara, diuji, dan dikembangkan.
