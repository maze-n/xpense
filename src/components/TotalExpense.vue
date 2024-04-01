<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters({ total: "getTotal" })
  },
  methods: {
    ...mapActions(['getExpenses'])
  },
  mounted() {
    this.getExpenses();
  }
}
</script>

<template>
  <v-container>
    <v-responsive class="align-centerfill-height mx-auto" max-width="900" style="margin-top: 100px;">
      <div class="text-center">
        <div class="text-body-2 font-weight-light mb-n1">Your Total Expense</div>

        <h1 class="text-h2 font-weight-bold">{{ total }}$</h1>

        <CreateExpenseModal />
      </div>
    </v-responsive>
  </v-container>
</template>
