
import {HeaderComponent} from './components/header.component';
import {NavigationComponent} from './components/navigation.component';
import {FavoriteComponent} from './components/favorite.component';
import {PostComponent} from './components/posts.component';
import {CreateComponent} from './components/create.component';

new HeaderComponent('header');
const navigation = new NavigationComponent('navigation');
const posts = new PostComponent('posts');
const favorite = new FavoriteComponent('favorite');
const create = new CreateComponent('create');

navigation.registerTabs([
  {
    name: 'posts',
    component: posts,
  },
  {
    name: 'create',
    component: create,
  },
  {
    name: 'favorite',
    component: favorite,
  }
])
