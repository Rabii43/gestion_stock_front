<template>
  <header id="page-topbar">
    <div class="navbar-header">
      <div class="d-flex">
        <!-- LOGO -->
        <div class="navbar-brand-box">
          <router-link tag="a" to="/" class="logo logo-dark">
            <span class="logo-sm">
              <img src="@/assets/images/logo-mystock.webp" alt height="30" />
            </span>
            <span class="logo-lg">
              <img src="@/assets/images/logo-mystock.webp" alt  height="40"/>
            </span>
          </router-link>

          <router-link tag="a" to="/" class="logo logo-light">
            <span class="logo-sm">
              <img src="@/assets/images/logo-mystock.webp" alt height="30" />
            </span>
            <span class="logo-lg">
              <img src="@/assets/images/logo-mystock.webp" alt height="40" />
            </span>
          </router-link>
        </div>

        <button
          id="vertical-menu-btn"
          type="button"
          class="btn btn-sm px-3 font-size-16 header-item"
          @click="toggleMenu"
        >
          <i class="fa fa-fw fa-bars"></i>
        </button>
      </div>

      <div class="d-flex">
        <b-dropdown
          class="d-inline-block d-lg-none ms-2"
          variant="black"
          menu-class="dropdown-menu-lg p-0"
          toggle-class="header-item noti-icon"
          right
        >
          <template v-slot:button-content>
            <i class="mdi mdi-magnify"></i>
          </template>

          <form class="p-3">
            <div class="form-group m-0">
              <div class="input-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Search ..."
                  aria-label="Recipient's username"
                />
                <div class="input-group-append">
                  <button class="btn btn-primary" type="submit">
                    <i class="mdi mdi-magnify"></i>
                  </button>
                </div>
              </div>
            </div>
          </form>
        </b-dropdown>

        <b-dropdown
          right
          menu-class="dropdown-menu-lg p-0 dropdown-menu-end"
          toggle-class="header-item noti-icon"
          variant="black"
        >

            <a href="javascript: void(0);" class="text-reset notification-item">
              <div class="media">
                <img
                  src="@/assets/images/users/avatar-3.jpg"
                  class="me-3 rounded-circle avatar-xs"
                  alt="user-pic"
                />
                <div class="media-body">
                  <h6 class="mt-0 mb-1">
                    {{ $t("navbar.dropdown.notification.james.title") }}
                  </h6>
                  <div class="font-size-12 text-muted">
                    <p class="mb-1">
                      {{ $t("navbar.dropdown.notification.james.text") }}
                    </p>
                    <p class="mb-0">
                      <i class="mdi mdi-clock-outline"></i>
                      {{ $t("navbar.dropdown.notification.james.time") }}
                    </p>
                  </div>
                </div>
              </div>
            </a>
            <a href="javascript: void(0);" class="text-reset notification-item">
              <div class="media">
                <div class="avatar-xs me-3">
                  <span
                    class="avatar-title bg-success rounded-circle font-size-16"
                  >
                    <i class="bx bx-badge-check"></i>
                  </span>
                </div>
                <div class="media-body">
                  <h6 class="mt-0 mb-1">
                    {{ $t("navbar.dropdown.notification.item.title") }}
                  </h6>
                  <div class="font-size-12 text-muted">
                    <p class="mb-1">
                      {{ $t("navbar.dropdown.notification.item.text") }}
                    </p>
                    <p class="mb-0">
                      <i class="mdi mdi-clock-outline"></i>
                      {{ $t("navbar.dropdown.notification.item.time") }}
                    </p>
                  </div>
                </div>
              </div>
            </a>
            <a href="javascript: void(0);" class="text-reset notification-item">
              <div class="media">
                <img
                  src="@/assets/images/users/avatar-4.jpg"
                  class="me-3 rounded-circle avatar-xs"
                  alt="user-pic"
                />
                <div class="media-body">
                  <h6 class="mt-0 mb-1">
                    {{ $t("navbar.dropdown.notification.salena.title") }}
                  </h6>
                  <div class="font-size-12 text-muted">
                    <p class="mb-1">
                      {{ $t("navbar.dropdown.notification.salena.text") }}
                    </p>
                    <p class="mb-0">
                      <i class="mdi mdi-clock-outline"></i>
                      {{ $t("navbar.dropdown.notification.salena.time") }}
                    </p>
                  </div>
                </div>
              </div>
            </a>
        </b-dropdown>

        <b-dropdown right variant="black" toggle-class="header-item" menu-class="dropdown-menu-end">
          <template v-slot:button-content>
            <img
              class="rounded-circle header-profile-user"
              src="@/assets/images/users/avatar-1.jpg"
              alt="Header Avatar"
            />
            <span class="d-none d-xl-inline-block ms-1">{{
              $t("navbar.dropdown.henry.text")
            }}</span>
            <i class="mdi mdi-chevron-down d-none d-xl-inline-block"></i>
          </template>
          <!-- item-->
          <b-dropdown-item>
            <router-link tag="span" to="/contacts/profile">
              <i class="bx bx-user font-size-16 align-middle me-1"></i>
              {{ $t("navbar.dropdown.henry.list.profile") }}
            </router-link>
          </b-dropdown-item>
          <b-dropdown-divider></b-dropdown-divider>
          <a
            href="/logout"

            class="dropdown-item text-danger"
          >
            <i
              class="bx bx-power-off font-size-16 align-middle me-1 text-danger"
            ></i>
            {{ $t("navbar.dropdown.henry.list.logout") }}
          </a>
        </b-dropdown>
      </div>
    </div>
  </header>
</template>
<!--<script>-->
<!--import axios from "axios";-->

<!--import i18n from "../i18n";-->


<!--/**-->
<!-- * Nav-bar Component-->
<!-- */-->
<!--export default {-->
<!--  data() {-->
<!--    return {-->
<!--      lan: i18n.locale,-->
<!--      text: null,-->
<!--      flag: null,-->
<!--      value: null,-->
<!--    };-->
<!--  },-->
<!--  methods: {-->
<!--    toggleMenu() {-->
<!--      this.$parent.toggleMenu();-->
<!--    },-->
<!--    toggleRightSidebar() {-->
<!--      this.$parent.toggleRightSidebar();-->
<!--    },-->
<!--    initFullScreen() {-->
<!--      document.body.classList.toggle("fullscreen-enable");-->
<!--      if (-->
<!--          !document.fullscreenElement &&-->
<!--          /* alternative standard method */ !document.mozFullScreenElement &&-->
<!--          !document.webkitFullscreenElement-->
<!--      ) {-->
<!--        // current working methods-->
<!--        if (document.documentElement.requestFullscreen) {-->
<!--          document.documentElement.requestFullscreen();-->
<!--        } else if (document.documentElement.mozRequestFullScreen) {-->
<!--          document.documentElement.mozRequestFullScreen();-->
<!--        } else if (document.documentElement.webkitRequestFullscreen) {-->
<!--          document.documentElement.webkitRequestFullscreen(-->
<!--              Element.ALLOW_KEYBOARD_INPUT-->
<!--          );-->
<!--        }-->
<!--      } else {-->
<!--        if (document.cancelFullScreen) {-->
<!--          document.cancelFullScreen();-->
<!--        } else if (document.mozCancelFullScreen) {-->
<!--          document.mozCancelFullScreen();-->
<!--        } else if (document.webkitCancelFullScreen) {-->
<!--          document.webkitCancelFullScreen();-->
<!--        }-->
<!--      }-->
<!--    },-->
<!--    setLanguage(locale, country, flag) {-->
<!--      this.lan = locale;-->
<!--      this.text = country;-->
<!--      this.flag = flag;-->
<!--      i18n.locale = locale;-->
<!--    },-->
<!--    logoutUser() {-->
<!--      // eslint-disable-next-line no-unused-vars-->
<!--      axios.get("http://127.0.0.1:8000/api/logout").then((res) => {-->
<!--        this.$router.push({-->
<!--          name: "default",-->
<!--        });-->
<!--      });-->
<!--    },-->
<!--  },-->
<!--};-->
<!--</script>-->
<!--<template>-->
<!--  <header id="page-topbar">-->
<!--    <div class="navbar-header">-->
<!--      <div class="d-flex">-->
<!--        &lt;!&ndash; LOGO &ndash;&gt;-->
<!--        <div class="navbar-brand-box">-->
<!--          <router-link tag="a" to="/" class="logo logo-dark">-->
<!--            <span class="logo-sm">-->
<!--              <img src="@/assets/images/oaca.jpg" alt height="30"/>-->
<!--            </span>-->
<!--            <span class="logo-lg">-->
<!--              <img src="@/assets/images/logo.png" alt height="40"/>-->
<!--            </span>-->
<!--          </router-link>-->

<!--          <router-link tag="a" to="/" class="logo logo-light">-->
<!--            <span class="logo-sm">-->
<!--              <img src="@/assets/images/oaca.jpg" alt height="30"/>-->
<!--            </span>-->
<!--            <span class="logo-lg">-->
<!--              <img src="@/assets/images/logo.png" alt height="40"/>-->
<!--            </span>-->
<!--          </router-link>-->
<!--        </div>-->

<!--        <button-->
<!--            id="vertical-menu-btn"-->
<!--            type="button"-->
<!--            class="btn btn-sm px-3 font-size-16 header-item"-->
<!--            @click="toggleMenu"-->
<!--        >-->
<!--          <i class="fa fa-fw fa-bars"></i>-->
<!--        </button>-->
<!--      </div>-->
<!--      <div class="d-flex">-->
<!--        <b-dropdown-->
<!--            class="d-inline-block d-lg-none ms-2"-->
<!--            variant="black"-->
<!--            menu-class="dropdown-menu-lg p-0"-->
<!--            toggle-class="header-item noti-icon"-->
<!--            right-->
<!--        >-->
<!--          <template v-slot:button-content>-->
<!--            <i class="mdi mdi-magnify"></i>-->
<!--          </template>-->
<!--        </b-dropdown>-->
<!--        <b-dropdown right variant="black" toggle-class="header-item" menu-class="dropdown-menu-end">-->
<!--          <template v-slot:button-content v-if="!getIsLoadingNav && usersData">-->
<!--            <span v-if="usersData"-->
<!--                  class="header-profile-user rounded-circle user-img bg-primary">{{ userFirstChar(usersData) }}</span>-->
<!--            <img-->
<!--                :src="pathImage(usersData.image)"-->
<!--                class="rounded-circle header-profile-user"-->
<!--                alt="Header Avatar"-->
<!--                v-if="usersData.image"-->
<!--            />-->
<!--                        <span class="d-none d-xl-inline-block ms-1">{{ usersData['username'] }}</span>-->
<!--            <i class="mdi mdi-chevron-down d-none d-xl-inline-block"></i>-->
<!--          </template>-->
<!--          &lt;!&ndash; item&ndash;&gt;-->
<!--          <a @click.prevent="toProfile">-->
<!--            <b-dropdown-item>-->
<!--              <i class="bx bx-user font-size-16 align-middle me-1"></i>-->
<!--              {{ $t("navbar.dropdown.henry.list.profile") }}-->
<!--            </b-dropdown-item>-->
<!--          </a>-->
<!--          <b-dropdown-divider></b-dropdown-divider>-->
<!--          <a-->
<!--              href="/logout"-->
<!--              class="dropdown-item text-danger">-->
<!--            <i-->
<!--                class="bx bx-power-off font-size-16 align-middle me-1 text-danger"-->
<!--            ></i>-->
<!--            {{ $t("navbar.dropdown.henry.list.logout") }}-->
<!--          </a>-->
<!--        </b-dropdown>-->
<!--      </div>-->
<!--    </div>-->
<!--  </header>-->
<!--</template>-->
<script>
import axios from "axios";

import i18n from "../i18n";
import {IMAGE_URL, logout} from "../../api/entryPoint";


/**
 * Nav-bar Component
 */
export default {
  data() {
    return {
      firstName: "",
      lastName: "",
      userName: ""
    };
  },
  mounted() {
    this.$store.dispatch("users/usersDetailsNav", localStorage.getItem('userId'));
  },
  watch: {
    usersData(data) {
      return data;
    }
  },
  methods: {
    toggleMenu() {
      this.$parent.toggleMenu();
    },
    toggleRightSidebar() {
      this.$parent.toggleRightSidebar();
    },
    initFullScreen() {
      document.body.classList.toggle("fullscreen-enable");
      if (
          !document.fullscreenElement &&
          /* alternative standard method */ !document.mozFullScreenElement &&
          !document.webkitFullscreenElement
      ) {
        // current working methods
        if (document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
          document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
          document.documentElement.webkitRequestFullscreen(
              Element.ALLOW_KEYBOARD_INPUT
          );
        }
      } else {
        if (document.cancelFullScreen) {
          document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        }
      }
    },
    setLanguage(locale, country, flag) {
      this.lan = locale;
      this.text = country;
      this.flag = flag;
      i18n.locale = locale;
    },
    logoutUser() {
      // eslint-disable-next-line no-unused-vars
      axios.get(logout).then((res) => {
        this.$router.push({
          name: "default",
        });
      });
    },
    toProfile() {
      let currentUrl = window.location.pathname;
      if (!currentUrl.includes('/users/' + localStorage.userId) && !localStorage.getItem('roles').includes('ROLE_ADMIN'))
        this.$router.push('/users/' + localStorage.userId);
      else if (localStorage.getItem('roles').includes('ROLE_ADMIN')) {
        this.$router.push('/users/' + localStorage.userId).then()
      }
    },
    // Set an absolute path for image
    pathImage(name) {
      return IMAGE_URL + name;
    },
    // First char from username
    userFirstChar(data) {
      console.log(data, 'data')
      return data.firstname || data.lastname ? data.firstname.charAt(0).toUpperCase() + data.lastname.charAt(0).toUpperCase() : "";
    },
    matchUserData(res) {
      console.log(res)
      this.firstName = res.firstname;
      this.lastName = res.lastname;
      this.userName = res.username;
    },
  },
  computed: {
    // get user data from store
    usersData() {
     return this.$store.getters["users/getUsersDetailsNav"];
    },
    getIsLoadingNav() {
      return this.$store.getters["users/getIsLoadingNav"];
    },
  },
};
</script>
<style>
/*.navbar-brand-box {*/
/*  background: #fff !important;*/
/*}*/

.user-img {
  background-color: #212529;
  color: #FFFFFF;
}
</style>