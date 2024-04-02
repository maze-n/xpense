<script>
import { ref } from 'vue';
import { mapActions } from 'vuex';

export default {
    props: {
        expense: { type: Object }
    },
    setup(props) {
        return {
            title: ref(props.expense.title),
            amount: ref(props.expense.amount),
        };
    },
    data: () => ({
        showDialog: false,
        title: '',
        amount: 0,
        titleRules: [
            value => {
                if (value) return true

                return 'Title is required.'
            },
        ],
        amountRules: [
            value => {
                if (value && value > 0) return true

                return 'Amount should be positive.'
            },
        ],
        snackbar: {
            show: false,
            text: "",
            color: 'green'
        },
        isLoading: false
    }),
    computed: {
    },
    methods: {
        ...mapActions(['updateExpense']),
        async handleUpdateExpense() {
            const { title, amount } = this;
            if (!title || !amount || amount <= 0) {
                this.showError("Please enter all fields!");
                return;
            }

            this.isLoading = true
            try {
                await this.updateExpense({ id: this.expense.id, title, amount });

                this.showDialog = false;
                this.title = '';
                this.amount = 0;
            } catch (e) {
                console.error(e)
                this.showError("Something went wrong! Please try again..")
            } finally {
                this.isLoading = false
            }
        },
        showError(text) {
            this.snackbar.text = text;
            this.snackbar.color = 'red';
            this.snackbar.show = true;
        },
    }
}
</script>

<template>
    <v-btn @click="() => showDialog = true" text="Edit Expense" variant="outlined"></v-btn>
    <v-dialog max-width="500" v-model="showDialog">
        <v-card title="Edit Expense">
            <v-form :disabled="isLoading">
                <v-container>
                    <v-row>
                        <v-col cols="12" md="12">
                            <v-text-field v-model="title" :counter="10" :rules="titleRules" label="Title" hide-details
                                required></v-text-field>
                        </v-col>

                        <v-col cols="12" md="12">
                            <v-text-field type="number" v-model="amount" :counter="10" :rules="amountRules"
                                label="Amount" hide-details required></v-text-field>
                        </v-col>
                    </v-row>
                </v-container>
            </v-form>

            <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn text="Cancel" @click="showDialog = false" />
                <v-btn text="Update" @click="handleUpdateExpense" />
            </v-card-actions>
        </v-card>
    </v-dialog>

    <v-snackbar v-model="snackbar.show">
        {{ snackbar.text }}

        <template v-slot:actions>
            <v-btn :color="snackbar.color" variant="text" @click="snackbar.show = false">
                Close
            </v-btn>
        </template>
    </v-snackbar>
</template>
