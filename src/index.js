
import {HeaderComponent} from './components/header.component';
import {NavigationComponent} from './components/navigation.component';
import {FavoriteComponent} from './components/favorite.component';
import {PostComponent} from './components/posts.component';
import {CreateComponent} from './components/create.component';
import {LoaderComponent} from "./components/loader.component";

new HeaderComponent('header');
const navigation = new NavigationComponent('navigation');
const loader = new LoaderComponent('loader');

const posts = new PostComponent('posts' , {loader});
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
]);
