<script>
import axios from "axios";

import Layout from "../../layouts/auth";
import {authMethods} from "@/state/helpers";
import appConfig from "@/app.config";

import {required, email} from "vuelidate/lib/validators";
import {resetPassword} from "../../../../api/entryPoint";

/**
 * Forgot Password component
 */
export default {
  page: {
    title: "Reset Password",
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
      email: "",
      resetSuccess: "",
      submitted: false,
      error: null,
      tryingToReset: false,
      isResetError: false,
      isResetSuccess: false,
    };
  },
  validations: {
    email: {
      required,
      email,
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
        axios.post(resetPassword, {
          email: this.email,
        }).then((res) => {
          if (res) {
            if (res.data.code === 200) {
              this.isResetSuccess = true;
              this.isResetError = false;
              this.resetSuccess = "L'e-mail a été envoyé avec succès.";
              return res;
            } else {
              this.isResetError = true;
              this.isResetSuccess = false;
              this.error = "Courriel non valide";
            }
          }
        }).catch((err) => {
          this.isResetError = true;
          this.isResetSuccess = false;
          this.error = "erreur cortage test";
        })
      }
    },
  },
};
</script>

<template>
  <Layout>
    <div class="row justify-content-center">
      <div class="col-md-8 col-lg-6 col-xl-5">
        <div class="card overflow-hidden">
          <div class="bg-card-header">
            <div class="row">
              <div class="col-7">
                <div class="text-primary p-4">
                  <h5 class="text-primary">Réinitialiser le mot de passe</h5>
                  <p>Réinitialiser avec Mystock.</p>
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
              <form @submit.prevent="tryToReset">
                <div class="mb-3">
                  <label for="useremail">Email</label>
                  <input
                      type="email"
                      v-model="email"
                      class="form-control"
                      id="useremail"
                      placeholder="Entrer votre Email"
                      :class="{ 'is-invalid': submitted && $v.email.$error }"
                  />
                  <div
                      v-if="submitted && $v.email.$error"
                      class="invalid-feedback">
                    <span v-if="!$v.email.required">Email est requis.</span>
                    <span v-if="!$v.email.email"
                    >Veuillez entrer une adresse email valide.</span>
                  </div>
                </div>
                <div class="mt-4 mb-4 d-grid">
                  <div class="col-12 text-end">
                    <b-button type="submit" variant="magenta" class="btn-block"
                    >Réinitialiser
                    </b-button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <!-- end card-body -->
        </div>
        <!-- end card -->

        <div class="mt-5 text-center">
          <p>
            Tu te souviens?
            <router-link
                tag="a"
                to="/login"
                class="fw-medium text-primary"
            >Se connecter
            </router-link>
          </p>
        </div>
      </div>
      <!-- end col -->
    </div>
    <!-- end row -->
  </Layout>
</template>

<style lang="scss" module></style>
