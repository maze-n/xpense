<template>
  <v-app>
    <v-main>
      <div>
        <TotalExpense />
        <v-container fill-height fluid>
          <v-row align="center" justify="center">
            <v-col>
              <ExpenseList />
            </v-col>
          </v-row>
        </v-container>
      </div>
    </v-main>
    <AppFooter />
  </v-app>
</template>
