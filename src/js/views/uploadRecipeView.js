import View from './View.js';

class UpLoadRecipeView extends View {
    _parentEl = document.querySelector('.upload');
    _errorMessage = 'Wrong ingredient format! Please use the correct format :)';
    _message = 'Recipe was successfully uploaded :)';

    _window = document.querySelector('.add-recipe-window');
    _overlay = document.querySelector('.overlay');
    _btnOpen = document.querySelector('.nav__btn--add-recipe');
    _btnClose = document.querySelector('.btn--close-modal');

    constructor() {
        super();
        this._addHandlerToggleForm();
    }

    toggleWindow() {
        this._window.classList.toggle('hidden');
        this._overlay.classList.toggle('hidden');
    }

    _addHandlerToggleForm() {
        [this._btnOpen, this._btnClose, this._overlay].forEach(e =>
            e.addEventListener('click', this.toggleWindow.bind(this))
        );
    }

    addHandlerUpload(handler) {
        this._parentEl.addEventListener('submit', function (e) {
            e.preventDefault();
            const dataArray = [...new FormData(this)];
            const data = Object.fromEntries(dataArray);
            handler(data);
        });
    }
}

export default new UpLoadRecipeView();
