/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Moodboard "Premium Mint Green" palette
        mist: '#FAFBF8', // Mist White
        softmint: '#E8EFEA', // Soft Mint
        sagemist: '#CFE1D6', // Sage Mist
        eucalyptus: '#AFC4B5', // Eucalyptus (decorative only — fails AA on light bg)
        deepsage: '#627F6E', // Deep Sage
        charcoal: '#2F3531', // Charcoal
        surface: '#F6F8F6',
        surface2: '#EDF2EF',
        sagedeep: '#7D9D8A' // gradient end
      },
      fontFamily: {
        heading: ['Fraunces', 'Georgia', 'serif'],
        body: ['Satoshi', 'Inter', 'system-ui', '-apple-system', 'sans-serif']
      },
      boxShadow: {
        card: '0 14px 34px -16px rgba(47, 53, 49, 0.16)',
        soft: '0 8px 22px -12px rgba(47, 53, 49, 0.12)',
        pill: '0 10px 24px -10px rgba(98, 127, 110, 0.45)'
      },
      backgroundImage: {
        'sage-gradient': 'linear-gradient(135deg, #AFC4B5 0%, #7D9D8A 100%)'
      }
    }
  },
  plugins: []
};
