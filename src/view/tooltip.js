import AbstractView from './../framework/view/abstract-view.js';
import {TooltipText} from './../const.js';

const createTooltip = (textContent) => `<span class="tooltip">${TooltipText[textContent]}</span>`;

export default class Tooltip extends AbstractView {
  #textContent = null;

  constructor({textContent}) {
    super();
    this.#textContent = textContent;
  }

  get template() {
    return createTooltip(this.#textContent);
  }
}
