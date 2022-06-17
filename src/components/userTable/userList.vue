<template>
  <div>
    <PageHeader :title="title" :items="items"/>
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body">
            <div class="table-responsive">
              <table class="table align-middle table-nowrap table-hover">
                <thead class="table-light">
                <tr>
                  <th scope="col" style="width: 70px">#</th>
                  <th scope="col">Nom</th>
                  <th scope="col">Email</th>
                  <th scope="col">Roles</th>
                  <th scope="col">Status</th>
                  <th scope="col">Action</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="list in usersData" :key="list.id">
                  <td>
                    <div v-if="!list.image" class="avatar-xs">
                      <span class="avatar-title rounded-circle">{{ list.username.charAt(0) }}</span>
                    </div>
                    <div v-if="list.image">
                      <img
                          class="rounded-circle avatar-xs"
                          :src="baseURL+list.image"
                          alt
                      />
                    </div>
                  </td>
                  <td>
                    <h5 class="font-size-14 mb-1">
                      <a :href="'/users/' + list.id" class="text-dark"
                      > {{ list.username }}</a>
                    </h5>
                  </td>
                  <td>{{ list.email }}</td>
                  <td>
                    <div>
                      <a
                          class="badge badge-soft-primary font-size-11 m-1"
                          v-for="(role, index) in list.roles"
                          :key="index"
                      >{{ role }}</a>
                    </div>
                  </td>
                  <td>
                    <span v-html="(list.active) ?'Active':'Non Active'"
                          :class="(list.active) ?'badge bg-success':'badge bg-danger'"
                    ></span>
                  </td>
                  <td>
                    <ul class="list-inline font-size-20 contact-links mb-0">
                      <li class="list-inline-item px-2">
                        <i
                            v-b-tooltip.hover
                            title="Activer"
                            :class="(list.active) ?'bx bx-user-x text-danger pointer':'bx bx-user-plus text-success pointer'"
                            @click="confirmActivateUser(list)">
                        </i>
                      </li>
                      <li class="list-inline-item px-2">
                        <a :href="'/users/' + list.id">
                          <i
                              v-b-tooltip.hover
                              title="Modifier"
                              class="bx bx-edit-alt pointer mr-2 color-edit"
                          >
                          </i>
                        </a>
                      </li>
                      <li class="list-inline-item px-2">
                        <i
                            v-b-tooltip.hover
                            title="Supprimer"
                            @click="confirmDeleteUser(list)"
                            class="bx bx-trash-alt pointer color-delete my-3"
                        >
                        </i>
                      </li>
                    </ul>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import PageHeader from "@/components/page-header";
import appConfig from "@/app.config";
import Swal from "sweetalert2";
import {IMAGE_URL} from "../../../api/entryPoint";

/**
 * Users component
 */
export default {
  page: {
    title: "liste des utilisateurs",
    meta: [{name: "listuser", content: appConfig.description}],
  },
  components: {PageHeader},
  data() {
    return {
      title: "Liste des utilisateurs",
      items: [],
      currentPage: 1,
      totalPages: 0,
      baseURL: IMAGE_URL,
    };
  },
  created() {
    this.getListUsers();
  },
  methods: {
    getListUsers() {
      this.$store.dispatch("users/listUsers");
    },
    confirmDeleteUser(element) {
      this.showAlert({
        title: "Vous êtes sûr ?",
        text: "Vous ne pourrez pas revenir en arrière !",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#b1215c",
        confirmButtonText: "Oui, supprimez-le !",
        cancelButtonText: "Annuler",
        confirmType: {
          type: "deleteUser",
          id: element.id,
        },
      });
    },
    /* delete user  */
    deleteUser(id) {
      this.$store.dispatch("users/deleteUser", id).then(
          (res) => {
            if (res)
              this.showAlert({
                icon: "success",
                title: "Supprimé!",
                text: "L'utilisateur a été supprimé avec succès",
                confirmType: {
                  type: "refreshUsers",
                },
              });
          },
          (err) => {
            if (err)
              this.showAlert({
                icon: "error",
                title: "Non supprimé!",
                text: "Echec de suppression d'utilisateur",
              });
          }
      );
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
          if (data.confirmType.type === "deleteUser") {
            if (res.isConfirmed) this.deleteUser(data.confirmType.id);
          }
          if (data.confirmType.type === "activateUser") {
            if (res.isConfirmed) this.activateUser(data.confirmType.id);
          }
          if (data.confirmType.type === "refreshUsers") {
            this.getListUsers();
          }
        }
      });
    },
    confirmActivateUser(element) {
      if (!element.active) {
        this.showAlert({
          title: "Activer l'utilisateur",
          text: "êtes-vous sûr d'activer cet utilisateur ?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#b1215c",
          confirmButtonText: "Oui, Activer",
          cancelButtonText: "Annuler",
          confirmType: {
            type: "activateUser",
            id: element.id,
          },
        });
      } else if (element.active) {
        this.showAlert({
          title: "Désactiver l'utilisateur",
          text: "êtes-vous sûr de désactiver cet utilisateur ?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#b1215c",
          confirmButtonText: "Oui, Désactiver",
          cancelButtonText: "Annuler",
          confirmType: {
            type: "activateUser",
            id: element.id,
          },
        });
      } else {
        return;
      }
    },
    /* delete user  */
    activateUser(id) {
      this.$store.dispatch("users/activateUser", id).then(
          (res) => {
            if (res.data.active) {
              this.showAlert({
                icon: "success",
                title: "Activation!",
                text: "L'utilisateur a été activé avec succès",
                confirmType: {
                  type: "refreshUsers",
                },
              });
            } else if (!res.data.active) {
              this.showAlert({
                icon: "warning",
                title: "Désactivation!",
                text: "L'utilisateur a été désactivé avec succès",
                confirmType: {
                  type: "refreshUsers",
                },
              });
            } else {
              this.showAlert({
                icon: "error",
                title: "Echec",
              });
            }
          },
          (err) => {
            if (err)
              this.showAlert({
                icon: "error",
                title: "Activation!",
                text: "Echec d'activation de l'utilisateur",
              });
          }
      );
    },
  },
  computed: {
    usersData() {
      return this.$store.getters["users/getUsers"];
    },
  },
};
</script>

<style scoped>
h5 a {
  color: #495057 !important;
}
</style>
