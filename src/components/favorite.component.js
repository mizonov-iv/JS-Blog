import {Component} from '../core/component';
import { apiService } from '../services/api.service';
import { renderPosts } from './posts.template';



export class FavoriteComponent extends Component {
    constructor(id, options) {
        super(id);

        this.loader = options.loader;
    }

    init() {
        this.$el.addEventListener('click', linkClickHandler.bind(this));
    }

    onShow() {
        const favorites = JSON.parse(localStorage.getItem('favorites'));
        const html = renderList(favorites);
        this.$el.insertAdjacentHTML('afterbegin', html);
    }

    onHide() {
        this.$el.innerHTML = '';
    }
}

async function linkClickHandler(event) {
    event.preventDefault();

    if(event.target.classList.contains('js-link')) {
        const postId = event.target.textContent;
        this.$el.innerHTML = '';
        this.loader.show();
        const post = await apiService.fetchPostById(postId);

        this.loader.hide();
        this.$el.insertAdjacentHTML('afterbegin', renderPosts(post, {withButton: false}));
    }

}

// function renderPosts(post) {
//     const tag = post.type === 'news' 
//         ? '<li class="tag tag-blue tag-rounded">Новость</li>'
//         : '<li class="tag tag-rounded">Заметка</li>';

//     const button = (JSON.parse(localStorage.getItem('favorites')) || []).includes(post.id)
//     ? `<button class="button-round button-small button-danger" data-id="${post.id}">Удалить</button>`
//     : `<button class="button-round button-small button-primary" data-id="${post.id}">Сохранить</button>`;

//     return `
//         <div class="panel">
//         <div class="panel-head">
//             <p class="panel-title">${post.title}</p>
//             <ul class="tags">
//                 ${tag}
//             </ul>
//         </div>
//         <div class="panel-body">
//             <p class="multi-line">${post.fulltext}</p>
//         </div>
//         <div class="panel-footer w-panel-footer">
//             <small>${post.date}</small>
//             ${options.withButton ? button : ''}
//         </div>
//         </div>
//     `;
// }



function renderList(list = []) {
    if (list.length) {
        return `
            <ul>
                ${list.map(i => `<li><a href="#" class="js-link">${i}</a></li>`).join(' ')}
            </ul>
        `

    }
    return `<p class="center">Вы пока ничего не добавили</p>`
}