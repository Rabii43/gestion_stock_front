<template>
  <layout>
    <UserList></UserList>
  </layout>
</template>

<script>
import UserList from "@/components/userTable/userList";
import Layout from "../../layouts/main";

export default {
  components: {
    UserList, Layout
  },
  name: "users",
}
</script>

<style scoped>

</style>