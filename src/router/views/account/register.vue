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
                  <p>Créez votre compte Gestion de stock maintenant.</p>
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
                v-model="registerSuccess"
                class="mt-3"
                variant="success"
            >Votre inscription a bien été enregistrée
            </b-alert>
            <b-alert
                v-model="isRegisterError"
                class="mt-3"
                variant="danger"
            >{{ regError }}
            </b-alert>
            <div
                v-if="notification.message"
                :class="'alert ' + notification.type"
            >
              {{ notification.message }}
            </div>
            <b-form class="p-2" @submit.prevent="tryToRegisterIn">
              <b-form-group
                  class="mb-3"
                  id="firstname"
                  label="Nom *"
                  label-for="nom"
              >
                <b-form-input
                    id="firstname"
                    v-model="user.firstname"
                    type="text"
                    placeholder="Entrer votre nom"
                    :class="{
                    'is-invalid': submitted && $v.user.firstname.$error}"
                ></b-form-input>
                <div
                    v-if="submitted && !$v.user.firstname.required"
                    class="invalid-feedback"
                >
                  Nom est requis.
                </div>
              </b-form-group>
              <b-form-group
                  class="mb-3"
                  id="email-group"
                  label="Prénom *"
                  label-for="prenom"
              >
                <b-form-input
                    id="lastname"
                    v-model="user.lastname"
                    type="text"
                    placeholder="Entrer votre prénom"
                    :class="{
                    'is-invalid': submitted && $v.user.lastname.$error}"
                ></b-form-input>
                <div
                    v-if="submitted && !$v.user.lastname.required"
                    class="invalid-feedback"
                >
                  Prénom est requis.
                </div>
              </b-form-group>
              <b-form-group
                  class="mb-3"
                  id="fullname-group"
                  label="Email *"
                  label-for="email"
              >
                <b-form-input
                    id="email"
                    v-model="user.email"
                    type="email"
                    placeholder="Entrer votre email"
                    :class="{ 'is-invalid': submitted && $v.user.email.$error }"
                ></b-form-input>
                <div
                    v-if="submitted && $v.user.email.$error"
                    class="invalid-feedback"
                >
                  <span v-if="!$v.user.email.required">Email est requis.</span>
                  <span v-if="!$v.user.email.email"
                  >Veuillez saisir une adresse email valide.</span>
                </div>
              </b-form-group>
              <b-form-group
                  class="mb-3"
                  id="password-group"
                  label="Password *"
                  label-for="password"
              >
                <b-form-input
                    id="password"
                    v-model="user.password"
                    type="password"
                    placeholder="Enter votre password"
                    :class="{
                    'is-invalid': submitted && $v.user.password.$error,
                  }"
                ></b-form-input>
                <div
                    v-if="submitted && !$v.user.password.required"
                    class="invalid-feedback"
                >
                  Password is required.
                </div>
                <div
                    v-if="submitted && !$v.user.password.minLength"
                    class="invalid-feedback"
                >
                  La longueur du mot de passe doit être supérieure à 5
                </div>
              </b-form-group>
              <b-form-group
                  class="mb-3"
                  id="password-group"
                  label="Confirmer mot de passe *"
                  label-for="password"
              >
                <b-form-input
                    id="password"
                    v-model="user.confirmPassword"
                    type="password"
                    placeholder="Entrez votre mot de passe"
                    :class="{
                    'is-invalid': submitted && $v.user.confirmPassword.$error,
                  }"
                ></b-form-input>
                <div
                    v-if="submitted && !$v.user.confirmPassword.required"
                    class="invalid-feedback"
                >
                  Mot de passe est obligatoire.
                </div>
                <div
                    v-if="submitted && !$v.user.confirmPassword.sameAsPassword"
                    class="invalid-feedback"
                >
                  Confirmer le mot de passe
                </div>
                <div
                    v-if="submitted && !$v.user.confirmPassword.minLength"
                    class="invalid-feedback"
                >
                  La longueur du mot de passe doit être supérieure à 5
                </div>
              </b-form-group>
              <div class="mt-4 mb-4 d-grid">
                <b-button type="submit" variant="magenta" class="btn-block"
                >S'inscrire
                </b-button>
              </div>
            </b-form>
          </div>
          <!-- end card-body -->
        </div>
        <!-- end card -->
        <div class="mt-2 text-center">
          <p>
            Vous avez déjà un compte ?
            <router-link tag="a" to="/login" class="fw-medium text-primary">Se connecter</router-link>
          </p>
        </div>
      </div>
      <!-- end col -->
    </div>
    <!-- end row -->
  </Layout>
</template>
<script>

import {authMethods, notificationMethods} from "@/state/helpers";
import Layout from "../../layouts/auth";
import appConfig from "@/app.config";
import {mapState} from "vuex";

import {required, email, minLength, sameAs} from "vuelidate/lib/validators";
import Swal from "sweetalert2";
import axios from "axios";
import {registerUrl} from "../../../../api/entryPoint";

/**
 * Register component
 */
export default {
  page: {
    title: "Register",
    meta: [
      {
        name: "description",
        content: appConfig.description,
      },
    ],
  },
  components: {
    Layout,
  },
  data() {
    return {
      user: {
        email: "",
        password: "",
        confirmPassword: "",
        firstname: "",
        lastname: "",
      },
      submitted: false,
      regError: null,
      tryingToRegister: false,
      isRegisterError: false,
      registerSuccess: false,
    };
  },
  validations: {
    user: {
      email: {
        required,
        email,
      },
      password: {
        required,
        minLength: minLength(6),
      },
      confirmPassword: {
        required,
        minLength: minLength(6),
        sameAsPassword: sameAs('password'),
      },
      firstname: {
        required,
      },
      lastname: {
        required,
      },
    },
  },
  computed: {
    ...mapState("authfack", ["status"]),
    notification() {
      return this.$store ? this.$store.state.notification : null;
    },
  },
  methods: {
    ...authMethods,
    ...notificationMethods,
    // Try to register the user in with the email, username
    // and password they provided.
    tryToRegisterIn() {
      this.submitted = true;
      // stop here if form is invalid
      this.$v.$touch();
      if (!this.$v.$invalid) {
          axios.post(registerUrl,
              {
                username: this.user.firstname + "_" + this.user.lastname,
                email: this.user.email,
                password: this.user.password,
                firstName: this.user.firstname,
                lastName: this.user.lastname,
                Active: "false",
                roles: "ROLE_USER",
                createdAt: '',
                updatedAt: '',
              },
              {
                headers: {
                  "Content-type": "application/json",
                },
              }
          ).then((res) => {
            if (res.data.code === 200) {
              this.$router.push("/login");
              this.registerSuccess = true;
              this.showAlert({
                icon: "success",
                title: "Succès de demande d’inscription",
                text: "Succès! votre demande inscription a été envoyer",
                confirmType: {
                  type: "Ajouter",
                },
              });
            } else if (res.data.code !== 200) {
              this.isRegisterError = true;
              this.regError = "L'e-mail existe déjà !";
              this.showAlert({
                icon: "error",
                title: "L'e-mail existe déjà !",
                text: "Échec de l'ajout",
              });
            }
          }).catch((error) => {
            this.isRegisterError = true;
            this.regError = "Erreur de connexion";
            this.showAlert({
              icon: "error",
              title: "Non Ajouter!",
              text: "Échec de l'ajout",
            });
          });
      }
      else {
        return;
      }
    },
    /* Alerts */
    showAlert(data) {
      Swal.fire({
        icon: data.icon,
        title: data.title,
        text: data.text,
        confirmButtonColor: "#b1215c",
        showCancelButton: data.showCancelButton,
        confirmButtonText: data.confirmButtonText
            ? data.confirmButtonText
            : "OK",
        cancelButtonText: data.cancelButtonText,
      }).then((res) => {
        if (data.confirmType) {
          if (data.confirmType.type === "Ajouter") {
            if (res.isConfirmed) {
              this.$router.push("/login");
            }
          }
        }
      });
    },
  },
};
</script>

