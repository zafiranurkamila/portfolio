# Zafira — Developer Portfolio

Portfolio developer beranimasi. **Stack:** Vite + React + Tailwind CSS + Framer Motion.

## Cara jalanin

```bash
npm install      # sekali di awal (install dependency)
npm run dev      # jalanin di http://localhost:5173
```

Buat versi produksi:

```bash
npm run build    # hasil di folder dist/
npm run preview  # cek hasil build
```

## Struktur

```
src/
  App.jsx              # susunan halaman
  index.css            # Tailwind + style global
  components/
    Cursor.jsx         # custom cursor (membesar saat hover)
    Nav.jsx            # navbar
    Hero.jsx           # judul + reveal per-huruf
    Marquee.jsx        # teks berjalan
    About.jsx          # profil + angka menghitung naik
    Work.jsx           # daftar proyek
    Skills.jsx         # daftar skill
    Contact.jsx        # CTA + tombol magnetic
```

## Cara pakai komponen dari 21st.dev

1. Buka https://21st.dev, cari komponen yang kamu suka.
2. Copy kodenya, buat file baru di `src/components/`.
3. Pastikan class Tailwind & warnanya cocok (`gold`, `bg`, `ink` sudah didefinisikan di `tailwind.config.js`).
4. Import & pakai di `App.jsx`.

## Kredit aset

- Model 3D **Fox** (`public/models/Fox.glb`) — dari [Khronos glTF Sample Assets](https://github.com/KhronosGroup/glTF-Sample-Assets/tree/main/Models/Fox).
  Model oleh **PixelMannen** (CC0), rigging & animasi oleh **tomkranis** (CC-BY 4.0),
  konversi oleh AsoboStudio & Microsoft. Jika dipublikasikan, cantumkan atribusi ini.

## Edit konten

- **Nama & teks** → langsung di tiap file komponen.
- **Warna tema** → `tailwind.config.js` bagian `colors`.
- **Proyek** → array `projects` di `src/components/Work.jsx`.
- **Skill** → array `skills` di `src/components/Skills.jsx`.
- **Email / sosmed** → `Contact.jsx` & `App.jsx` (footer).
