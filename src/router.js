import Vue from "vue";
import Router from "vue-router";
import AppHeader from "./layout/AppHeader";
import AppFooter from "./layout/AppFooter";
import Landing from "./views/Landing.vue";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";
import Profile from "./views/Profile.vue";
import FAQIndex from "./views/FAQIndex";

Vue.use(Router);

export default new Router({
  mode: "history",
  linkExactActiveClass: "active",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      components: {
        header: AppHeader,
        default: Landing,
        footer: AppFooter
      }
    },
    {
      path: "/login",
      name: "login",
      components: {
        header: AppHeader,
        default: Login,
        footer: AppFooter
      }
    },
    {
      path: "/register",
      name: "register",
      components: {
        header: AppHeader,
        default: Register,
        footer: AppFooter
      }
    },
    {
      path: "/profile/:id",
      name: "profile",
      components: {
        header: AppHeader,
        default: Profile,
        footer: AppFooter
      },
    },
    {
      path: "/faq",
      name: "faq_index",
      components: {
        header: AppHeader,
        default: FAQIndex,
        footer: AppFooter
      },
    },
    {
      path: "/faq/:id",
      name: "faq_detail",
      components: {
        header: AppHeader,
        default: FAQIndex,
        footer: AppFooter
      },
    }
  ],
  scrollBehavior: to => {
    if (to.hash) {
      return { selector: to.hash };
    } else {
      return { x: 0, y: 0 };
    }
  }
});
