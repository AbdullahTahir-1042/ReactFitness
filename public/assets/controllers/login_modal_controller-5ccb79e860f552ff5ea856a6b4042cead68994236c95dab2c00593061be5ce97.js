import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["modal", "showButton", "closeButton"]

  connect() {
    this.showButtonTarget.addEventListener("click", this.showModal.bind(this))
    this.closeButtonTarget.addEventListener("click", this.hideModal.bind(this))
    
    // Close modal when clicking outside
    this.modalTarget.addEventListener("click", (e) => {
      if (e.target === this.modalTarget) {
        this.hideModal()
      }
    })
  }

  showModal() {
    this.modalTarget.classList.remove("hidden")
    document.body.style.overflow = "hidden"
  }

  hideModal() {
    this.modalTarget.classList.add("hidden")
    document.body.style.overflow = "auto"
  }
} ;
