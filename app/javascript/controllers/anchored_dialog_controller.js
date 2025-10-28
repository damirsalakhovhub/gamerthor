// app/javascript/controllers/anchored_dialog_controller.js
// Контроллер позиционирует панель относительно кнопки (правый край к правому краю),
// открывает/закрывает диалог, управляет фокусом, закрывает по Esc/клику-вне,
// и пересчитывает позицию при scroll/resize.

import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static values = {
    panelId: String,     // id панели <div role="dialog" ... id="...">
    offset: { type: Number, default: 8 },  // отступ в px между кнопкой и панелью
    align: { type: String, default: "end" } // "end" (правый край) или "start"
  }

  connect() {
    // Находим панель по id и переносим её в <body> (если не там), подготавливаем ARIA.
    this.panel = document.getElementById(this.panelIdValue);
    if (!this.panel) return;
    if (this.panel.parentElement !== document.body) {
      document.body.appendChild(this.panel);
    }
    this.panel.setAttribute("hidden", "");
    this.element.setAttribute("aria-expanded", "false");
    this._boundOnDocClick = this._onDocClick.bind(this);
    this._boundOnKeydown = this._onKeydown.bind(this);
    this._boundOnReposition = this._rafThrottle(this._reposition.bind(this));
  }

  // Открывает/закрывает диалог по клику на кнопку.
  toggle(event) {
    event.preventDefault();
    this.isOpen() ? this.close() : this.open();
  }

  // Открывает панель: измеряет, позиционирует, ставит фокус.
  open() {
    if (!this.panel || this.isOpen()) return;
    this.lastActive = document.activeElement;
    this.element.setAttribute("aria-expanded", "true");

    // Показ без мигания: делаем видимой, но невидимой, меряем, позиционируем, потом показываем.
    const prevVisibility = this.panel.style.visibility;
    this.panel.style.visibility = "hidden";
    this.panel.removeAttribute("hidden");
    this.panel.style.position = "fixed";
    this.panel.style.zIndex = this.panel.style.zIndex || "1000";
    this._reposition();

    // Подписки на события среды.
    document.addEventListener("click", this._boundOnDocClick, true);
    document.addEventListener("keydown", this._boundOnKeydown, true);
    window.addEventListener("scroll", this._boundOnReposition, true);
    window.addEventListener("resize", this._boundOnReposition, true);

    // Финальный показ и фокус внутрь.
    this.panel.style.visibility = prevVisibility || "";
    const focusable = this._firstFocusable(this.panel);
    focusable ? focusable.focus({ preventScroll: true }) : this.panel.focus({ preventScroll: true });
  }

  // Закрывает панель и возвращает фокус на кнопку.
  close() {
    if (!this.panel || !this.isOpen()) return;
    this.panel.setAttribute("hidden", "");
    this.element.setAttribute("aria-expanded", "false");

    document.removeEventListener("click", this._boundOnDocClick, true);
    document.removeEventListener("keydown", this._boundOnKeydown, true);
    window.removeEventListener("scroll", this._boundOnReposition, true);
    window.removeEventListener("resize", this._boundOnReposition, true);

    if (this.lastActive && document.contains(this.lastActive)) {
      this.lastActive.focus({ preventScroll: true });
    } else {
      this.element.focus({ preventScroll: true });
    }
  }

  // Возвращает true, если панель открыта.
  isOpen() {
    return this.panel && !this.panel.hasAttribute("hidden");
  }

  // Пересчитывает позицию панели относительно кнопки с выравниванием по правому краю,
  // клампом по вьюпорту и flip вверх при нехватке места снизу.
  _reposition() {
    if (!this.panel) return;
    const rect = this.element.getBoundingClientRect();

    // Временное измерение размеров панели.
    const w = this.panel.offsetWidth;
    const h = this.panel.offsetHeight;

    const margin = this.offsetValue; // px
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // Горизонталь: start = левый край к левому, end = правый к правому.
    let left = this.alignValue === "start" ? rect.left : (rect.right - w);
    // Кламп по краям вьюпорта с минимальным отступом 8px.
    const pad = 8;
    left = Math.max(pad, Math.min(left, vw - w - pad));

    // Вертикаль: по умолчанию снизу; если не влезает — сверху.
    let top = rect.bottom + margin;
    if (top + h > vh - pad && rect.top - margin - h >= pad) {
      top = rect.top - margin - h;
    }
    // Доп.кламп по вертикали.
    top = Math.max(pad, Math.min(top, vh - h - pad));

    this.panel.style.left = `${Math.round(left)}px`;
    this.panel.style.top = `${Math.round(top)}px`;
  }

  // Закрытие по клику вне кнопки и панели.
  _onDocClick(e) {
    if (e.target === this.element || this.element.contains(e.target)) return;
    if (this.panel.contains(e.target)) return;
    this.close();
  }

  // Закрытие по Esc.
  _onKeydown(e) {
    if (e.key === "Escape") this.close();
  }

  // Возвращает первый фокусируемый элемент внутри узла.
  _firstFocusable(root) {
    const SEL = [
      "button:not([disabled])",
      "[href]",
      "input:not([disabled]):not([type='hidden'])",
      "select:not([disabled])",
      "textarea:not([disabled])",
      "[tabindex]:not([tabindex='-1'])"
    ].join(",");
    return root.querySelector(SEL);
  }

  // Троттлинг через requestAnimationFrame для scroll/resize.
  _rafThrottle(fn) {
    let scheduled = false;
    return (...args) => {
      if (!scheduled) {
        scheduled = true;
        requestAnimationFrame(() => {
          scheduled = false;
          fn(...args);
        });
      }
    };
  }
}

