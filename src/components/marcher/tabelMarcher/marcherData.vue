<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="card-body">
          <div class="row mt-4">
            <div class="col-sm-12 col-md-6">
              <div id="tickets-table_length" class="dataTables_length">
                <label class="d-inline-flex align-items-center">
                  Show&nbsp;
                  <b-form-select
                      class="form-select form-select-sm"
                      v-model="perPage"
                      size="sm"
                      :options="pageOptions"
                  ></b-form-select
                  >&nbsp;entries
                </label>
              </div>
            </div>
            <!-- Search -->
            <div class="col-sm-12 col-md-6">
              <div
                  id="tickets-table_filter"
                  class="dataTables_filter text-md-end"
              >
                <label class="d-inline-flex align-items-center">
                  Search:
                  <b-form-input
                      v-model="filter"
                      type="search"
                      placeholder="Search..."
                      class="form-control form-control-sm ms-2"
                  ></b-form-input>
                </label>
              </div>
            </div>
            <!-- End search -->
          </div>
          <!-- Table -->
          <div class="table-responsive mb-0">
            <b-table
                class="datatables"
                :items="tableData"
                :fields="fields"
                responsive="sm"
                :per-page="perPage"
                :current-page="currentPage"
                :sort-by.sync="sortBy"
                :sort-desc.sync="sortDesc"
                :filter="filter"
                :filter-included-fields="filterOn"
                @filtered="onFiltered"
            ></b-table>
          </div>
          <div class="row">
            <div class="col">
              <div
                  class="dataTables_paginate paging_simple_numbers float-end"
              >
                <ul class="pagination pagination-rounded mb-0">
                  <!-- pagination -->
                  <b-pagination
                      v-model="currentPage"
                      :total-rows="rows"
                      :per-page="perPage"
                  ></b-pagination>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

/**
 * Advanced table component
 */
export default {
  props: {
    field: {type: Array},
    inputs: {type: Array},
  },
  name: "marcherData",
  data() {
    return {
      totalRows: 1,
      todoTotalRows: 1,
      currentPage: 1,
      todocurrentPage: 1,
      perPage: 10,
      todoperPage: 10,
      pageOptions: [5, 10, 25, 50, 100],
      todoOptions: [5, 10, 50, 100, 150, 200],
      filter: null,
      todoFilter: null,
      filterOn: [],
      todofilterOn: [],
      sortBy: "ID",
      sortDesc: false,
    };
  },
  computed: {
    rows() {
      return this.tableData.length;
    },
    tableData() {
      return this.inputs;
    },
    fields() {
      return this.field;
    }
  },
  methods: {
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    todoFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.todoTotalRows = filteredItems.length;
      this.todocurrentPage = 1;
    },
  },
};
</script>