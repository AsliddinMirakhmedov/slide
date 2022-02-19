class Slider {
    constructor(el) {
        this.slider = document.querySelector(el.slider)
        this.sliderLine = document.querySelector(el.sliderLine)
        this.prev = document.querySelector(el.prev)
        this.next = document.querySelector(el.next)
        this.dir = el.direction === undefined ? "X" : el.direction.toUpperCase() == "Y" ? "Y" : "X"
        this.slides = this.sliderLine.children
        this.width = this.slider.clientWidth
        this.height = this.slider.clientHeight
        this.autoPlay = el.autoPlay
        this.autoPlayInterval = el.autoPlayInterval
        this.sliderLine.style = `position: relative;
                                 overflow: hidden;
                                 height: ${this.height}px;`

        this.moveSize = this.dir === `X` ? this.width : this.height

        this.active = 0
        for (let i = 0; i < this.slides.length; i++) {
            const slide = this.slides[i];
            slide.style = `position: absolute;
                           width: ${this.width}px;
                           height: ${this.height}px;`

            if (this.active != i) {
                slide.style.transform = `translate${this.dir}(${this.moveSize}px)`
            }
            if (i === this.slides.length - 1) {
                slide.style.transform = `translate${this.dir}(${-this.moveSize}px)`
            }
        }
        this.prev.addEventListener('click', () => this.move(this.prev))
        this.next.addEventListener('click', () => this.move(this.next))

        if (this.autoPlay) {
            this.play = setInterval(() => {
                this.move(this.next)
            }, this.autoPlayInterval);
            this.slider.onmouseover = () => clearInterval(this.play)
            this.slider.onmouseout = () =>
                this.play = setInterval(() => {
                    this.move(this.next)
                }, this.autoPlayInterval);
        }
    }
    move(btn) {
        this.prev.disabled = true
        this.next.disabled = true
        setTimeout(() => {
            this.prev.disabled = false
            this.next.disabled = false
        }, 1200);
        let leftOrRight = btn === this.next ? -this.moveSize : this.moveSize
        for (let i = 0; i < this.slides.length; i++) {
            const slide = this.slides[i];
            if (this.active != i) {
                slide.style.transform = `translate${this.dir}(${-leftOrRight}px)`
                slide.style.transition = `0s`
            }
            this.slides[this.active].style.transform = `translate${this.dir}(${leftOrRight}px)`
            this.slides[this.active].style.transition = `1s`
        }
        if (btn == this.next) {
            this.active++
            if (this.active == this.slides.length) {
                this.active = 0
            }
        }
        else if (btn == this.prev) {
            this.active--
            if (this.active < 0) {
                this.active = this.slides.length - 1
            }
        }
        this.slides[this.active].style.transform = `translate${this.dir}(0px)`
        this.slides[this.active].style.transition = `1s`
        // this.slides[this.active].style.opacity = `1`
    }
}

new Slider({
    slider: '.slider',
    sliderLine: '.slider__line',
    prev: '.slider__prev',
    next: '.slider__next',
    direction: 'x',
    autoPlay: true,
    autoPlayInterval: 3000
})