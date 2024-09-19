class App {

  constructor() {
    const { innerHeight } = window;
    this.texts = [...document.querySelectorAll(".sec-one-text-effect p")];
    this.innerHeight = innerHeight;
    this._initialize();
    this._render();
  }

  _initialize() {
    this._setInitialStates();
    this._createLenis();
    this._createHeroTextAnimation();
    this._splitText();
  }

  _setInitialStates() {
    gsap.set(".hero-text-p ",
      {
        opacity: 0,
        y: 40,
      });
  }
  
  _splitText() {
    const split = new SplitType(".mini-text", { types: "words , chars" });
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".sec-one-text-effect",
        start: "top 50",
        end: "+=500",
        scrub: true,
        markers: true,
        pin : true
      }
    });
    tl.fromTo(".sec-one-text-effect h2",
      {
        opacity: 0,
        y: 10,
      }, {
      opacity: 1,
      y: 0,
      ease: "power2.out",
      duration: 3,
    }
      , "0");
    
      this.texts.forEach(text => {
        tl.fromTo(text, {
          y: 10,
          duration: 2,
          stagger : 3
        }, {
          y: 0,
          opacity : 1
        }
        )
      },)
    tl.to(split.chars,
      {
        y: -1,
        duration: 1.5,
        color: "red",
        stagger: 3,
        fontWeight: "600",
        delay: 4
      },
      "1"
    );
   
  }
    //texts.forEach(text => {
    //  tl.
    //})
   
    /*.fromTo(".section-one .two", {
      
      opacity: 0,
        y: 20,
      
    }, {
      opacity: 1,
      y: 0,
    },"1")*/

//    
  

  _createHeroTextAnimation() {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".hero",
        pin: true, 
        end: `+=${this.innerHeight * 1.5}`, 
        scrub: true, 
        markers: true,
      },
    });

    tl.fromTo(
      ".hero-text", 
      {
        scale: 2,
        x: -400,
        color: "white",
        "-webkit-text-stroke-width": "1px",
        "-webkit-text-stroke-color": "black",
      },
      {
        scale: 1,
        x: 0,
        color: "black",
      }
    );
 
    tl.to(
      ".hero-text-p",
      {
        opacity: 1,
        ease: "power1.in",
        y: 0,
        duration: 1.5,
        delay: 0.5,
      },
      "2" 
    );
  }

  _createLenis() {
    this.lenis = new Lenis({
      lerp: 0.1, 
      easing: function easeOutQuad(x) {
        return 1 - (1 - x) * (1 - x);
      },
    });

    gsap.ticker.lagSmoothing(0);
  }

  _render(time)
  {
    this.lenis.raf(time); 
    requestAnimationFrame(this._render.bind(this)); 
  }
};

  document.addEventListener("DOMContentLoaded", () => { new App() });
