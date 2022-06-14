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
                  <p>Changer votre mot de passe.</p>
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

            <div class="p-2">
              <b-alert
                  v-model="isResetSuccess"
                  class="mt-3"
                  variant="success"
                  dismissible
              >{{ resetSuccess }}.
              </b-alert>
              <b-alert
                  v-model="isResetError"
                  class="mb-4"
                  variant="danger"
                  dismissible
              >{{ error }}
              </b-alert>
              <b-form class="p-2" @submit.prevent="tryToReset">
                <b-form-group
                    class="mb-3"
                    id="input-group-2"
                    label="Nouveau mot de passe *"
                    label-for="input-2"
                >
                  <b-form-input
                      id="input-2"
                      v-model="password"
                      type="password"
                      placeholder="Entrez votre mot de passe"
                      :class="{ 'is-invalid': submitted && $v.password.$error }"
                  ></b-form-input>
                  <div
                      v-if="submitted && !$v.password.required"
                      class="invalid-feedback"
                  >
                    Mot de passe est obligatoire.
                  </div>
                </b-form-group>
                <b-form-group
                    class="mb-3"
                    id="password-group"
                    label="Confirmez votre mot de passe *"
                    label-for="password"
                >
                  <b-form-input
                      id="password"
                      v-model="confirmPassword"
                      type="password"
                      placeholder="Confirmez votre mot de passe"
                      :class="{
                    'is-invalid': submitted && $v.confirmPassword.$error,
                  }"
                  ></b-form-input>
                  <div
                      v-if="submitted && !$v.confirmPassword.required"
                      class="invalid-feedback"
                  >
                    Mot de passe est obligatoire.
                  </div>
                  <div
                      v-if="submitted && !$v.confirmPassword.sameAsPassword"
                      class="invalid-feedback"
                  >
                    mot de passe non valide
                  </div>
                  <div
                      v-if="submitted && !$v.confirmPassword.minLength"
                      class="invalid-feedback"
                  >
                    La longueur du mot de passe doit être supérieure à 5
                  </div>
                </b-form-group>
                <div class="mt-4 d-grid">
                  <b-button type="submit" variant="magenta" class="btn-block">Valider
                  </b-button>
                </div>
              </b-form>
            </div>
          </div>
          <!-- end card-body -->
        </div>
        <!-- end card -->
      </div>
      <!-- end col -->
    </div>
    <!-- end row -->
  </Layout>
</template>

<script>
import axios from "axios";

import Layout from "../../layouts/auth";
import {authMethods} from "@/state/helpers";
import appConfig from "@/app.config";

import {minLength, required, sameAs} from "vuelidate/lib/validators";
import {resetPassword} from "../../../../api/entryPoint";

/**
 * Forgot Password component
 */
export default {
  page: {
    title: "New Password",
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
      password: "",
      confirmPassword: "",
      resetSuccess: "",
      submitted: false,
      error: null,
      tryingToReset: false,
      isResetError: false,
      isResetSuccess: false,
    };
  },
  validations: {
    password: {
      required,
    },
    confirmPassword: {
      required,
      minLength: minLength(6),
      sameAsPassword: sameAs('password'),
    },
  },
  methods: {
    ...authMethods,
    // Try to register the user in with the email, fullname
    // and password they provided.
    tryToReset() {
      this.submitted = true;
      // stop here if form is invalid
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      } else {
        axios.post(resetPassword + '/' + this.$route.params.token, {
          password: this.password,
        }).then((res) => {
          if (res) {
            if (res.data.code === 200) {
              this.isResetSuccess = true;
              this.isResetError = false;
              this.resetSuccess = "Votre mot de passe a été modifié avec succès.";
              // Redirect
              setTimeout(() => this.$router.push({path: '/login'}), 2000);
            } else {
              this.isResetError = true;
              this.isResetSuccess = false;
              this.error = "Votre mot de passe non modifier.";
            }
          }
        }).catch((err) => {
              this.isResetError = true;
              this.isResetSuccess = false;
              this.error = "Erreur de la modification";
            }
        )
      }
    },
  },
};
</script>
