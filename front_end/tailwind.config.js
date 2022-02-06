module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'side':'#120f13',
        'main':'#252329',
        'search':'#3C393F',
        'sky':'#2F80ED',
        'bt':'#252329',
        'txt':'#E0E0E0',
        'redlog':'#EB5757',
        'blk':'#0B090C',
        'caert':'#828282'
      },
      fontFamily:{
        'san':['Noto Sans']
      },
      boxShadow: {
        'ol': '0px 4px 4px 0px rgba(0, 0, 0, 0.30)'
      },
      keyframes: {
        popup:{
          'from':{transform:'translateY(20px)',opacity:'0.5'},
          'to':{transform:'translateY(0px)',opacity:'1'}
        }
      },
      animation: {
        popup: 'popup 0.6s ease-in-out',
      }
    },
    
  },
  plugins: [],
}
