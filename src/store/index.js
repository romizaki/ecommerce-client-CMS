import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    dataProduct: [],
    oneDataProduct: {}
  },
  mutations: {
    getData (state, payload) {
      state.dataProduct = payload
    },
    getOneData (state, payload) {
      state.oneDataProduct = payload
    }
  },
  actions: {
    login (context, payload) {
      return axios({
        method: 'POST',
        url: 'https://server-watches-romi.herokuapp.com/login',
        data: payload
      })
        .then(res => {
          console.log('masuk sini')
          localStorage.setItem('access_token', res.data.access_token)
        })
        .catch(err => {
          console.log(err)
        })
    },
    addProduct (context, payload) {
      return axios({
        method: 'POST',
        url: 'https://server-watches-romi.herokuapp.com/products',
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data: payload
      })
        .then(res => {
          console.log(res.data)
          this.dispatch('fetchData')
        })
        .catch(err => {
          console.log(err)
        })
    },
    editProduct (context, payload) {
      return axios({
        method: 'PUT',
        url: `https://server-watches-romi.herokuapp.com/products/${payload.id}`,
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data: payload.temp
      })
        .then(res => {
          console.log(res.data)
          this.dispatch('fetchData')
        })
        .catch(err => {
          console.log(err)
        })
    },
    fetchData (context) {
      console.log('masuk fetch data')
      return axios({
        method: 'GET',
        url: 'https://server-watches-romi.herokuapp.com/products',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(res => {
          console.log(res.data)
          context.commit('getData', res.data)
        })
        .catch(err => {
          console.log('masuk err')
          console.log(err)
        })
    },
    fetchOneData (context, payload) {
      console.log('masuk fetch data')
      return axios({
        method: 'GET',
        url: `https://server-watches-romi.herokuapp.com/products/${payload}`,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(res => {
          console.log(res.data)
          context.commit('getOneData', res.data)
        })
        .catch(err => {
          console.log('masuk err')
          console.log(err)
        })
    },
    deleteProduct (context, payload) {
      console.log(payload, 'axios delete')
      return axios({
        method: 'DELETE',
        url: 'https://server-watches-romi.herokuapp.com/products/' + payload,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(res => {
          console.log(res.data)
          this.dispatch('fetchData')
        })
        .catch(err => {
          console.log(err)
        })
    },
    patchNew (context, payload) {
      console.log('masu store')
      return axios({
        method: 'PATCH',
        url: 'https://server-watches-romi.herokuapp.com/products/' + payload,
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data: { condition: 'New' }
      })
        .then(res => {
          console.log(res.data)
          this.dispatch('fetchData')
        })
        .catch(err => {
          console.log(err)
        })
    },
    patchSeccond (context, payload) {
      console.log('masu store')
      return axios({
        method: 'PATCH',
        url: 'https://server-watches-romi.herokuapp.com/products/' + payload,
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data: { condition: 'Seccond' }
      })
        .then(res => {
          console.log(res.data)
          this.dispatch('fetchData')
        })
        .catch(err => {
          console.log(err)
        })
    },
    logOut (context) {
      localStorage.clear()
    }
  }
})
