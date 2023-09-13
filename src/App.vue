<template>
  <div id="app">
    <div class="form">
      <div>
        <input type="number" :value="form.price" placeholder="Цена" @input="changeHandler($event, 'price')">
        <br>
        <label>{{ form.price }}</label>
      </div>
      <div>
        <input type="number" :value="form.qty" placeholder="Кол-во" @input="changeHandler($event, 'qty')">
        <br>
        <label>{{ form.qty }}</label>
      </div>
      <div>
        <input type="number" :value="form.amount" placeholder="Сумма" @input="changeHandler($event, 'amount')">
        <br>
        <label>{{ form.amount }}</label>
      </div>
      <div>
        <button :disabled="loading" @click="submit">submit</button>
        <br>
        <label>{{ JSON.stringify(localStorage) }}</label>
      </div>
    </div>
    <div class="logs">
      <p v-for="(e, k) in eventLogs" :key="k">{{ e }}</p>
    </div>
  </div>
</template>

<script>
import Big from 'big.js' // using true math
import { debounce } from 'throttle-debounce'

const lsForm = 'form'
function getLSform () {
  return JSON.parse(localStorage.getItem(lsForm) || '{}')
}

window.Big = Big

export default {
  name: 'App',
  data: () => ({
    loading: false,
    localStorage: getLSform(),
    eventLogs: [],
    form: {
      nonce: 0,
      price: null,
      qty: null,
      amount: null
    },
    result: null
  }),
  methods: {
    calculate(priorityField, fieldValue) {
      if (!Number(this.form.qty)) {
        this.form.qty = 1
      }
      switch (priorityField) {
        case 'price':
          this.form.amount = Big(fieldValue).times(this.form.qty).toNumber()
          break
        case 'qty':
          this.form.amount = Big(fieldValue).times(this.form.price).toNumber()
          break
        case 'amount':
          this.form.price = Big(fieldValue).div(this.form.qty).toNumber()
          break
        default:
          console.warn('calculate(): unexpected field')
      }
    },
    changeHandler: debounce(300, function (e, key) {
      this.calculate(key, e.target.value)
      this.form[key] = e.target.value
      this.eventLog({ type: '@input', input: key, value: e.target.value })
      this.updateLS()
    }),
    eventLog (e) {
      this.eventLogs.push({ ...e, datetime: (new Date()).toLocaleString() })
    },
    submit () {
      this.loading = true
      this.form.nonce = this.form.nonce + 1
      this.updateLS()
      this.eventLog({ type: '@request', ...this.form })
      setTimeout(() => {
        let result
        let validatedValue = this.form.amount || 0
        const validatedValueAfterDot = validatedValue.toString().match(/\.(\d+)/)?.[1].length
        if (validatedValueAfterDot) {
          // check decimal values
          validatedValue = validatedValue * Number('1'.padEnd(validatedValueAfterDot + 1, '0'))
        }
        if (validatedValue % 2 === 1) {
          result = { success: false }
        } else {
          result = { success: true }
        }
        this.result = result
        this.eventLog({ type: '@response', ...result })
        this.loading = false
      }, 1000)
    },
    updateLS () {
      localStorage.setItem(lsForm, JSON.stringify(this.form))
      this.localStorage = getLSform()
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
      padding: 1em
      height: 80vh
      width: 100%
      background-color: #eee
      text-align: left
      box-sizing: border-box
      p
        border-bottom: 1px solid #000
</style>
