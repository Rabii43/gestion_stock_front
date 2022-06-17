<template>
  <Layout>
    <div class="row justify-content-center">
      <div class="col-md-8 col-lg-6 col-xl-5">
        <div class="card overflow-hidden">
          <div class="bg-card-header">
            <div class="row">
              <div class="col-7">
                <div class="text-primary p-4">
                  <h5 class="text-primary">Bienvenue !</h5>
                  <p>Connectez-vous à Géstion de stock</p>
                </div>
              </div>
              <div class="col-5 align-self-end">
                <img
                    src="@/assets/images/profile-img.png"
                    alt
                    class="img-fluid"
                />
              </div>
            </div>
          </div>
          <div class="card-body pt-0">
            <div>
              <router-link tag="a" to="/">
                <div class="avatar-md profile-user-wid mb-4">
                  <span class="avatar-title rounded-circle bg-white-circle">
                    <img src="@/assets/images/logo.svg" alt height="50"/>
                  </span>
                </div>
              </router-link>
            </div>
            <b-alert
                v-model="isAuthError"
                variant="danger"
                class="mt-3"
                dismissible
            >{{ authError }}
            </b-alert>
            <div
                v-if="notification.message"
                :class="'alert ' + notification.type"
            >
              {{ notification.message }}
            </div>
            <b-form class="p-2" @submit.prevent="tryToLogIn">
              <b-form-group
                  class="mb-3"
                  id="input-group-1"
                  label="Email"
                  label-for="input-1"
              >
                <b-form-input
                    id="input-1"
                    v-model="email"
                    type="text"
                    placeholder="Entrer votre email"
                    :class="{ 'is-invalid': submitted && $v.email.$error }"
                ></b-form-input>
                <div
                    v-if="submitted && $v.email.$error"
                    class="invalid-feedback"
                >
                  <span v-if="!$v.email.required">Email est requis.</span>
                  <span v-if="!$v.email.email"
                  >Veuillez entrer une adresse email valide.</span>
                </div>
              </b-form-group>
              <b-form-group
                  class="mb-3"
                  id="input-group-2"
                  label="Mot de passe"
                  label-for="input-2"
              >
                <b-form-input
                    id="input-2"
                    v-model="password"
                    type="password"
                    placeholder="Entrer votre mot de passe"
                    :class="{ 'is-invalid': submitted && $v.password.$error }"
                ></b-form-input>
                <div
                    v-if="submitted && !$v.password.required"
                    class="invalid-feedback"
                >
                  Mot de passe est requis.
                </div>
              </b-form-group>
              <b-form-checkbox
                  class="form-check"
                  id="customControlInline"
                  name="checkbox-1"
                  v-model="rememberMe"
              >
                Se souvenir de moi
              </b-form-checkbox>
              <div class="mt-3 d-grid">
                <b-button type="submit" variant="magenta" class="btn-block"
                >Connexion
                </b-button>
              </div>
              <div class="mt-4 text-center">
                <router-link tag="a" to="/reset/password" class="text-muted">
                  <i class="mdi mdi-lock me-1"></i> Mot de passe oublié?
                </router-link>
              </div>
            </b-form>
          </div>
          <!-- end card-body -->
        </div>
        <!-- end card -->
        <div class="mt-5 px-4 text-center">
          <p>
            Cette platforme est privé. Veuillez renseigner votre login et votre
            mot de passe.
          </p>
          <p>
            Pour demander la création d'un compte, veuillez
            <router-link tag="a" to="/register" class="fw-medium text-primary"
            ><u>cliquez ici</u></router-link>
          </p>
        </div>
      </div>
      <!-- end col -->
    </div>
    <!-- end row -->
  </Layout>
</template>

<script>
import jwt_decode from "jwt-decode";
import Layout from "../../layouts/auth";
import {authMethods, notificationMethods} from "@/state/helpers";
import appConfig from "@/app.config";
import {required, email} from "vuelidate/lib/validators";
import axios from "axios";
import {login} from "../../../../api/entryPoint";
import Drawer from "vue-simple-drawer";
import VueRouter from 'vue-router'


const {isNavigationFailure, NavigationFailureType} = VueRouter


/**
 * Login component
 */
export default {
  page: {
    title: "Login",
    name: "login",
    meta: [
      {
        name: "description",
        content: appConfig.description,
      },
    ],
  },
  components: {
    Layout,
    Drawer,
  },
  data() {
    return {
      email: "",
      password: "",
      rememberMe: false,
      submitted: false,
      authError: null,
      mask: {
        position: 'fixed;',
        background: '#ffffff !important;',
        opacity: '0 !important;',
        width: '100%;',
        height: 'unset !important;'
      },
      tryingToLogIn: false,
      isAuthError: false,
      isDownDrawer: true,
      closeP: false,
    };
  },
  validations: {
    email: {
      required,
      email,
    },
    password: {
      required,
    },
  },
  computed: {
    notification() {
      return this.$store ? this.$store.state.notification : null;
    },
  },
  methods: {
    ...authMethods,
    ...notificationMethods,
    // Try to log the user in with the email
    // and password they provided.
    async tryToLogIn() {
      this.submitted = true;
      // stop here if form is invalid
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      } else {
        // Simple Login
        axios.post(login,
            {
              email: this.email,
              password: this.password,
            },
            {
              headers: {
                "Accept": 'application/json',
                "Content-type": "application/json",
              },
            }
        ).then((res) => {
          let token = res.data.token;
          let refresh = res.data.refresh_token;
          var decoded = jwt_decode(token);
          localStorage.setItem("roles", JSON.stringify(decoded.roles));
          this.$store.commit("auth/SET_TOKEN", token);
          this.$store.commit("auth/SET_TOKEN_REFRESH", refresh);
          this.$store.commit("auth/SET_USER_ID", decoded.id);
          // If user enabled
          if (decoded.isActive === true) {
            this.$store.state.auth.isAuth = true;
            this.$router.push('/')
                .catch((e) => {
                  if (!isNavigationFailure(e, NavigationFailureType.redirected)) {
                    Promise.reject(e)
                  }
                })
          } else {
            this.isAuthError = true;
            this.authError = "Votre compte n'est pas encore activé!";
          }
        }).catch((error) => {
          this.isAuthError = true;
          this.authError = "Échec de la connexion";
        });
      }
    },
  },
};
</script>


<style lang="scss" scoped>
a-text {
  margin-left: 36% !important;
  font-family: 'Poppins';
  font-style: normal !important;
  font-weight: 500 !important;
  font-size: 13px !important;
  line-height: 20px !important;
  display: flex !important;
  align-content: center;
  text-transform: capitalize !important;
  color: #495057 !important;
}

a-text:hover {
  color: #5C92C2;
}

::v-deep .vue-simple-drawer.closeable.down {
  padding: 40px 10% !important;
  color: #000000 !important;
  background: #FFFFFF !important;
  box-shadow: 0 10px 20px rgba(18, 38, 63, 0.031) !important;
  height: 20%;
}

::v-deep .vue-simple-drawer .close-btn {
  margin: 20px 30px !important;
}

.color-title {
  color: #036183 !important;
}

.sub-title {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  color: #495057;
}

.color {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;
  color: #5C92C2;
}

.btn-style {
  border-radius: 3px;
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 20px;
  color: #FFFFFF;
}
</style>
