class ParallaxService {
  constructor() {
    this.scrollHandlers = []
  }

  init() {
    window.addEventListener('scroll', this.scrollHandler.bind(this), false)
  }

  update() {
    this.updating = false
    this.scrollHandlers.forEach(fn => fn(this.scrollTop))
  }

  requestUpdate() {
    if (!this.updating) {
      requestAnimationFrame(this.update.bind(this))
    }
    this.updating = true
  }

  scrollHandler() {
    this.scrollTop = window.pageYOffset
    this.requestUpdate()
  }

  initParallax(node, transforms) {
    if (!this.scrollHandlers.length) {
      this.init()
    }

    const newParallax = new Parallax(node, transforms)
    this.scrollHandlers.push(newParallax.scrollAction.bind(newParallax))
  }
}

class Parallax {
  static calculateStyle(el, scrollTop) {
    const start = el.start || 0
    const delay = el.delay || 0
    let style = ((scrollTop - delay) / 10) * el.speed + start
    if (delay > scrollTop) {
      style = start
    }
    if (style > el.end) {
      style = el.end
    }
    if (delay) {
      style = Math.max(0, style)
    }
    return el.value.slice(0, el.replaceIndex) + String(style) + el.value.slice(el.replaceIndex)
  }

  constructor(node, transforms) {
    this.transforms = transforms
    this.node = node
    this.transforms.forEach(item => {
      item.replaceIndex = item.value.indexOf('%d')
      item.value = item.value.replace('%d', '')
    })
  }

  scrollAction(scrollTop) {
    if (this.state === scrollTop) {
      return false
    }

    let cssText = ''

    this.transforms.forEach(el => {
      cssText += Parallax.calculateStyle(el, scrollTop)
      if (el.property) {
        this.node.style[el.property] = cssText
      }
    })

    this.node.style.transform = cssText
    this.state = scrollTop
  }
}

const service = new ParallaxService()

export default {
  init: function(transformKeys) {
    return function(ref) {
      if (ref) service.initParallax(ref, transformKeys)
    }
  },
  remove: function() {
    service.scrollHandlers = []
  },
}
