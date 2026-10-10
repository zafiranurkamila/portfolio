# Zafira Nur Kamila — Portfolio

Portfolio interaktif berbentuk desa voxel. Jalan-jalan bareng karakter Zafira, masuk ke tiap bangunan untuk membaca isinya, ngobrol dengan warga, selesaikan quest, dan main 3 mini game di pojok dunia.

**Stack:** Vite + React + Three.js (React Three Fiber + drei) + Tailwind CSS. Semua tekstur, karakter, dan suara dibuat lewat kode.

## Cara jalanin

```bash
npm install      # sekali di awal
npm run dev      # http://localhost:5173
npm run build    # hasil produksi di folder dist/
```

## Struktur

```
src/
  data.js                 # SEMUA konten (profil, proyek, perjalanan, teks UI 2 bahasa, dialog warga, quest)
  sound.js                # musik latar & efek suara (Web Audio, tanpa file)
  minecraft/
    MinecraftWorld.jsx    # halaman utama: alur layar awal, HUD, quest, dialog
    Scene.jsx             # dunia 3D: kamera, langit pagi/sore/malam, panggung, meja, awan
    world.js              # generator dunia, bangunan, jalan, pathfinding (A*)
    Blocks.jsx            # mesh blok (hanya sisi yang terlihat) & tanaman
    People.jsx, Person.jsx# karakter Zafira (dikendalikan) & warga
    Panel.jsx             # isi kertas tiap bangunan
    Games.jsx             # mini game: Tambang, Memori Blok, Pukul Slime
    Quests.jsx            # daftar quest
    Intro.jsx             # perkenalan di awal
    github.js             # ambil repo terbaru dari GitHub untuk panggung "Sedang Dikerjakan"
    textures.js           # tekstur pixel 16×16 yang digambar lewat kode
```

## Edit konten

- **Teks, proyek, perjalanan, sertifikat** → `src/data.js`.
- **Panggung "Sedang Dikerjakan"** otomatis menampilkan repo GitHub yang terakhir di-push.
  Untuk memberi judul/deskripsi khusus pada repo tertentu, tambahkan entri di `repoNotes` (`src/data.js`).
- **Gambar proyek** → taruh di `public/images/` lalu sebut path-nya di `projects`.
