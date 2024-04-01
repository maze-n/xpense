<script>
import { mapGetters, mapActions } from 'vuex'
import { getFormattedDate } from '../utils/common.js'

export default {
    data: function () {
        return { isDeleting: false }
    },
    methods: {
        ...mapActions(['deleteExpense']),
        async handleDelete(id) {
            this.isDeleting = true;
            await this.deleteExpense({ id });
            this.isDeleting = false;
        },
        getFormattedDate,

    },
    computed: {
        ...mapGetters({ expenses: 'getExpenses' }),
    }
}
</script>

<template>
    <v-responsive class="align-centerfill-height mx-auto" max-width="900">
        <v-card style="margin-top: 10px;" :title="item.title" v-for="item in this.expenses" :text="`${item.amount}$`"
            :key="item.id">
            <v-row style="padding: 10px; align-items: end;">
                <v-card-actions>
                    <!-- <v-btn variant="outlined">
                    Edit </v-btn> -->
                    <EditExpenseModal :expense="item" />
                    <v-btn variant="outlined" @click="() => handleDelete(item.id)" :disabled="this.isDeleting">
                        Delete
                    </v-btn>
                </v-card-actions>
                <label style="
                    margin-left: auto;
                    padding-right: 10px;
                    padding-bottom: 10px;
                    color: grey;
                    font-weight: bold;
                    ">{{ getFormattedDate(item.createdAt) }}</label>
            </v-row>
        </v-card>
    </v-responsive>
</template>