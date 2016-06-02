import Vue from "vue";
import App from "./components/app.vue";
import Home from "./components/home.vue";
import CurrentKeg from "./components/current-keg.vue";
import PastKegs from "./components/past-kegs.vue";
import Stats from "./components/stats.vue";
import VueRouter from "vue-router";
import VueResource from "vue-resource";
Vue.use(VueResource);
Vue.use(VueRouter);

export var router = new VueRouter();

router.map({
  '/home': {
    component: Home
  },
  '/current-keg': {
    component: CurrentKeg
  },
  '/past-kegs': {
    component: PastKegs
  },
  '/stats': {
    component: Stats
  }
});

router.redirect({
  '*': '/home'
});

router.start(App, '#app');

