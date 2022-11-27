import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="read-more"
export default class extends Controller {
  connect() {
  }

  static get targets() {
    return ["content", "moreButton", "lessButton"]
  }

  static get classes() {
    return ["truncate", "hide"]
  }

  static get values() {
    return { lines: Number }
  }

  connect() {
    this.render()
  }

  render() {
    this.showAllContent()

    if (this.height() > this.expectedHeight()) {
      this.showLess()
    } else {
      this.showAllConent()
      this.hide(this.moreButtonTarget);
      this.hide(this.lessButtonTarget);
    }
  }

  showMore() {
    this.showAllContent();
    this.hide(this.moreButtonTarget);
    this.show(this.lessButtonTarget);
  }

  showLess() {
    this.truncateContent();
    this.hide(this.lessButtonTarget);
    this.show(this.moreButtonTarget);
  }

  showAllContent() {
    this.contentTarget.classList.remove(this.truncateClass);
  }

  truncateContent() {
    this.contentTarget.style["-webkit-line-clamp"] = this.linesValue;
    this.contentTarget.classList.add(this.truncateClass);
  }

  show(target) {
    target.classList.remove(this.hideClass)
  }

  hide(target) {
    target.classList.add(this.hideClass)
  }

  lineHeight() {
    let style = window.getComputedStyle(this.contentTarget)
    return parseFloat(style.lineHeight, 10);
  }

  height() {
    return this.contentTarget.offsetHeight;
  }

  expectedHeight() {
    return this.linesValue * this.lineHeight();
  }
}
