// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails"
import "controllers"

// Dropdown functions
window.toggleDropdown = function(dropdownId) {
  const dropdown = document.getElementById(dropdownId);
  if (dropdown) {
    dropdown.classList.toggle('is-open');
  }
}

window.closeDropdown = function(dropdownId) {
  const dropdown = document.getElementById(dropdownId);
  if (dropdown) {
    dropdown.classList.remove('is-open');
  }
}

// Close dropdown on outside click
document.addEventListener('click', function(e) {
  if (!e.target.closest('.dropdown')) {
    const openDropdowns = document.querySelectorAll('.dropdown__menu.is-open');
    openDropdowns.forEach(dropdown => {
      dropdown.classList.remove('is-open');
    });
  }
});

// Close dropdown on Escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    const openDropdowns = document.querySelectorAll('.dropdown__menu.is-open');
    openDropdowns.forEach(dropdown => {
      dropdown.classList.remove('is-open');
    });
  }
});

// Modal functions (keeping for other modals)
window.openModal = function(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }
}

window.closeModal = function(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
  }
}
