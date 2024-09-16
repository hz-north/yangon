class App{

  constructor() {
    const { innerheight } = window;
    this.innerHeight = innerheight;
    this._initialize();
    this._render();
  }

  _initialize() {
    this._setInitialStates();
    this._createLenis();
    this._createHeroTextAnimation();
  }

  _setInitialStates() {
    gsap.set('.hero-bg' ,{
      opacity: 0,
      y:-30
   })
  }
  _createHeroTextAnimation() {
    let lastScrollTop = 0;
  
    gsap.timeline({
      scrollTrigger: {
        trigger: ".hero",
        pin: true,
        end: `+=${innerHeight * 0.5}`,
        scrub: true,
        onUpdate: () => {
          const isScrollingDown = scroll > lastScrollTop;
          document.querySelector('.hero-text span').classList.toggle('red', isScrollingDown);
          document.querySelector('.hero-text span').classList.toggle('black', !isScrollingDown);
          lastScrollTop = scroll;
        }
      }
    })
    .from('.hero-text', {
      scale: 4,
      duration: 1.5,
      ease: "power3.in",
      x:-200
    })
    .to('.hero-bg', {
      opacity: 1,
      duration: 1.5,
      y: 0,
      ease: "power3.in",
    }, "1");
  }
  

//  _createHeroTextAnimation() {
//    let lastScrollTop = 0;
//
//    gsap.timeline({
//      scrollTrigger: {
//        trigger: ".hero",
//        pin: true,
//        end: `+=${innerHeight * 0.5}`,
//        scrub: true,
//        onUpdate: ({ scroll }) => {
//          const isScrollingDown = scroll > lastScrollTop;
//          document.querySelector('.hero-text span').classList.toggle('red', isScrollingDown);
//          document.querySelector('.hero-text span').classList.toggle('black', !isScrollingDown);
//          lastScrollTop = scroll;
//        }
//      }
//    })
//    tl.from('.hero-text', {
//      scale: 5,   
//      duration: 2,
//    })
//    .to('.hero-bg', {
//      opacity: 1, 
//      duration: 1.5,
//      x:0
//    },"1"); 
//  }
  
  

  _createLenis() {
    this.lenis = new Lenis({
      lerp: 0,
      easing: function easeOutQuad(x){
        return 1 - (1 - x) * (1 - x);
      },
    })
  }

  _render(time) {
    this.lenis.raf(time);
    requestAnimationFrame(this._render.bind(this));
  }

}


new App();