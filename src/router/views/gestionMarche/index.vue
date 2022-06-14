<template>
  <Layout>
    <PageHeader :title="title" :items="items"/>
    <MarcherData :field="fields" :inputs="tableData" ></MarcherData>
  </Layout>
</template>

<script>
import Layout from "../../layouts/main";
import appConfig from "@/app.config";
import PageHeader from "@/components/page-header";
import MarcherData from "@/components/marcher/tabelMarcher/marcherData";

/**
 * Dashboard Component
 */
export default {
  page: {
    title: "Tableaux de bord",
    meta: [
      {
        name: "description",
        content: appConfig.description,
      },
    ],
  },
  components: {
    MarcherData,
    Layout,
    PageHeader,
  },
  data() {
    return {
      tableData: [
        {
          ID: 1,
          N_AO: "position",
          Objet: "255dt",
          DIR: 23,
          Societe: "15/25/1999",
          MT_en_DT: "255dt",
          DT_Acc: "255dt",
          Delai: "255dt",
          Garentie: "255dt",
          Situation: "Marché en cours",
        }, {
          ID: 1,
          N_AO: "position",
          Objet: "255dt",
          DIR: 23,
          Societe: "15/25/1999",
          MT_en_DT: "255dt",
          DT_Acc: "255dt",
          Delai: "255dt",
          Garentie: "255dt",
          Situation: "Marché en cours",
        }, {
          ID: 1,
          N_AO: "position",
          Objet: "255dt",
          DIR: 23,
          Societe: "15/25/1999",
          MT_en_DT: "255dt",
          DT_Acc: "255dt",
          Delai: "255dt",
          Garentie: "255dt",
          Situation: "Marché en cours",
        }, {
          ID: 1,
          N_AO: "position",
          Objet: "255dt",
          DIR: 23,
          Societe: "15/25/1999",
          MT_en_DT: "255dt",
          DT_Acc: "255dt",
          Delai: "255dt",
          Garentie: "255dt",
          Situation: "Marché en cours",
        }, {
          ID: 1,
          N_AO: "position",
          Objet: "255dt",
          DIR: 23,
          Societe: "15/25/1999",
          MT_en_DT: "255dt",
          DT_Acc: "255dt",
          Delai: "255dt",
          Garentie: "255dt",
          Situation: "Marché en cours",
        }, {
          ID: 1,
          N_AO: "position",
          Objet: "255dt",
          DIR: 23,
          Societe: "15/25/1999",
          MT_en_DT: "255dt",
          DT_Acc: "255dt",
          Delai: "255dt",
          Garentie: "255dt",
          Situation: "Marché en cours",
        },
      ],
      fields: [
        {
          key: "ID",
          sortable: true,
          width: "20%",
        },
        {
          key: "N_AO",
          sortable: true,
          width: "20%",
        },
        {
          key: "Objet",
          sortable: true,
          width: "20%",
        },
        {
          key: "DIR",
          sortable: true,
        },
        {
          key: "Societe",
          sortable: true,
        },
        {
          key: "MT_en_DT",
          sortable: true,
        },
        {
          key: "DT_Acc",
          sortable: true,
        },
        {
          key: "Delai",
          sortable: true,
        },
        {
          key: "Garentie",
          sortable: true,
        },
        {
          key: "Situation",
          sortable: true,
        },
        {
          key: "Option",
          sortable: true,
        },
      ],
      title: "Gestion du marché",
      items: [
        {
          text: "Dashboard",
          href: "/",
        },
        {
          text: "Gestion du marché",
          active: true,
        },
      ],
    };
  },
};
</script>