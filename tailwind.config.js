/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Gaya playful flat (mudah diganti warnanya di sini)
        bg: '#6ec6f2', // background biru langit
        'bg-2': '#cdebfb', // shade lebih muda buat teks besar di belakang
        card: '#ffffff',
        ink: '#141414', // teks & outline hitam
        muted: '#6b6b6b',
        accent: '#ff7a59', // koral (aksen pop)
        accent2: '#ffd451', // kuning
        sun: '#ffd451',
      },
      fontFamily: {
        display: ['Fredoka', 'sans-serif'],
        sans: ['Nunito', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        pop: '0 6px 0 #141414',
        card: '0 10px 30px -12px rgba(0,0,0,.35)',
      },
    },
  },
  plugins: [],
}
