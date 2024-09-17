class App {
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
    gsap.set(".hero-text-p", {
      opacity: 0,
      y: 20,
    });
  }

  _createHeroTextAnimation() {
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".hero",
        pin: true,
        end: `+=${innerHeight * 1.5}`,
        scrub: true,
        markers: true,
      
        
      },
    });
    const spanToBold = document.querySelectorAll(".hero-text-p span");
    tl.fromTo(
      ".hero-text",
      {
        scale: 2,
        x: -400,
        duration: 3,
        ease: "power3.in",
        color: "white",
        "-webkit-text-stroke-width": "1px",
        "-webkit-text-stroke-color": "black",
      },
      {
        color: "black",
        scale: 1,
        x: 0,
      }
    );

    tl.to(
      ".hero-text-p",
      {
        opacity: 1,
        ease: "power1.in",
        y: 0,
        duration : 1.5,
        delay: 0.5,
        scrub : true,
        onComplete: () => {
          spanToBold.forEach(span => {
            span.classList.add("mini-text");
            console.log("Span classes are added")
          })
        },
      },
      "2"
    );
  }

  _createLenis() {
    this.lenis = new Lenis({
      lerp: 0,
      easing: function easeOutQuad(x) {
        return 1 - (1 - x) * (1 - x);
      },
    });
  }

  _render(time) {
    this.lenis.raf(time);
    requestAnimationFrame(this._render.bind(this));
  }
}

new App();
