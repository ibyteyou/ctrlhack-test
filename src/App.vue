<template>
  <div id="app">
    <div class="form">
      <div>
        <input v-model="form.price" placeholder="Цена">
        <br>
        <label>{{ form.price }}</label>
      </div>
      <div>
        <input v-model="form.qty" placeholder="Кол-во">
        <br>
        <label>{{ form.qty }}</label>
      </div>
      <div>
        <input v-model="form.amount" placeholder="Сумма">
        <br>
        <label>{{ form.amount }}</label>
      </div>
      <div>
        <button @click="submit">submit</button>
        <br>
        <label>{{ JSON.stringify(localStorage) }}</label>
      </div>
    </div>
    <div class="logs">
      <p v-for="(e, k) in eventLogs" :key="k">{{ JSON.stringify(e) }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    localStorage: localStorage,
    eventLogs: [],
    form: {
      nonce: 0,
      price: null,
      qty: null,
      amount: null
    }
  }),
  methods: {
    submit () {

    }
  }
}
</script>

<style lang="sass">
  #app
    font-family: Avenir, Helvetica, Arial, sans-serif
    -webkit-font-smoothing: antialiased
    -moz-osx-font-smoothing: grayscale
    text-align: center
    color: #2c3e50
    margin-top: 60px
    .form
      display: flex
      justify-content: space-around
    .logs
      height: 80vh
      width: 100%
      background-color: #eee
</style>
