import {Component} from "../core/components";
import {apiService} from '../services/api.service';
import {TransformService} from '../services/transform.service';

export class PostComponent extends Component {
    constructor(id, {loader}) {
        super(id);
        this.loader = loader
    }

    init() {
        this.$el.addEventListener('click', buttonHandler.bind(this));
    }

    async onShow() {
        this.loader.show();
        const fbData = await apiService.fetchPosts();
        const posts = TransformService.fbObjectToArray(fbData);
        const html = posts.map(post => renderPosts(post)).join(' ');
        this.loader.hide();
        this.$el.insertAdjacentHTML('afterbegin', html)
    }

    onHide() {
        this.$el.innerHTML = '';
    }

}

function renderPosts(post) {

    const tag = post.type === 'news' ? `<li class="tag tag-blue tag-rounded">Новость</li>`
        : `<li class="tag tag tag-rounded">Заметки</li>`;
    const button = (JSON.parse(localStorage.getItem('favorite')) || []).includes(post.id) ? `<button data-id="${post.id}" class="button-round button-small button-danger">remove</button>`
        : `<button data-id="${post.id}" class="button-round button-small button-primary">save</button>`;

    return `:
   
    <div class="panel">
      <div class="panel-head">
        <p class="panel-title">${post.title}</p>
        <ul class="tags">
         ${tag}
        </ul>
      </div>
      <div class="panel-body">
        <p class="multi-line">${post.fulltext}</p>
      </div>
      <div class="panel-footer w-panel-footer">
        <small>${post.date}</small>
        ${button}
      </div>
    </div>
 
  
  `
}

function buttonHandler() {
    const $el = event.target;
    const id = $el.dataset.id;

    if (id) {
        let favorite = JSON.parse(localStorage.getItem('favorite')) || [];
        if (favorite.includes(id)) {
            $el.textContent = 'save';
            $el.classList.add('button-primary');
            $el.classList.remove('button-danger');

            favorite = favorite.filter(fid => fid !== id)
        } else {
            $el.textContent = 'remove';
            $el.classList.remove('button-primary');
            $el.classList.add('button-danger');
            favorite.push(id);
        }
        localStorage.setItem('favorite', JSON.stringify(favorite))
    }
}
