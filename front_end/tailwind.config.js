module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      flex:{
        '2':'2 1 0%',
        '3':'3 1 0%',
        '4':'4 1 0%'
      },
      colors:{
        'side':'#120f13',
        'main':'#252329',
        'search':'#3C393F',
        'sky':'#2F80ED',
        'bt':'#252329',
        'txt':'#c7c7c7',
        'redlog':'#EB5757',
        'blk':'#0B090C',
        'caert':'#828282',
        'sideopacity':'rgba(18, 15, 19, 0.5)',
        'txtOpac':'#E0E0E0',
        'authborder':'#BDBDBD',
        'disable-txt':'#6e6d6d',
        'image':'#F6F8FB',
        'load':'#373738',
        'greentick':'#219653',
        'cement-cat':'#E3E1DC',
        'cat-brown':'#291507',
        'cat-back':"#DEC68B",
        'shop-orange':"#F9A109",
        'shop-tooltip':"#454545",
        'shop-red':"#EB5757",
        'shop-blue':"#56CCF2",
        'shop-back':"#FAFAFE",
        'shop-right-back':"#FFF0DE",
        'shop-icon-bg':"#C1C1C4",
        'shop-bottle-bg':"#80485B",
        'modal-bg':'rgba(0,0,0,0.75)',
        'modal-red-bg':'rgba(235, 87, 87, 1)'
      },
      fontFamily:{
        'san':['Noto Sans'],
        'quick':['Quicksand', 'sans-serif']
      },
      boxShadow: {
        'ol': '0px 4px 4px 0px rgba(0, 0, 0, 0.30)'
      },
      keyframes: {
        popup:{
          'from':{transform:'translateY(20px)',opacity:'0.5'},
          'to':{transform:'translateY(0px)',opacity:'1'}
        },
        topup:{
          'from':{transform:'translateY(-10px)',opacity:'0.5'},
          'to':{transform:'translateY(0px)',opacity:'1'}
        },
        accord:{
          '0%':{
            'max-height':'250px',
            '-webkit-filter': 'blur(10px)'
               },
          '100%':{'max-height':'256px'}
        },
      },
      animation: {
        popup: 'popup 0.6s ease-in-out',
        topup:'topup 0.6s ease-in-out',
        accord:'accord 0.8s linear'
      },
      backgroundImage: {
        'catwikilg':"url('/src/Catwiki/Asset/HeroImagelg.png')",
        'catwikimd':"url('/src/Catwiki/Asset/HeroImagemd.png')",
        'catwikism':"url('/src/Catwiki/Asset/HeroImagesm.png')"
      }
    },
    
  },
  plugins: [],
}
