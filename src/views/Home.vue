<template>
  <div>
  <NavBar/>
  <div class="container mt-5">
  <h1> <b class="display-3">List Products</b> </h1>
  <br><br>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">No.</th>
          <th scope="col">Name</th>
          <th scope="col">Image</th>
          <th scope="col">Description</th>
          <th scope="col">Condition</th>
          <th scope="col">Price</th>
          <th scope="col">Stock</th>
          <th scope="col">Action</th>
          <th scope="col">Change Condition</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, index) in dataProduct" :key="index">
          <th class="align-middle">{{ index+1 }}</th>
          <td class="align-middle">{{ product.name }}</td>
          <td class="align-middle"><img height="150px" width="150px" :src="product.image_url" alt="sample-foto"></td>
          <td class="align-middle">{{ product.description }}</td>
          <td class="align-middle">{{ product.condition }}</td>
          <td class="align-middle">{{ product.price }}</td>
          <td class="align-middle">{{ product.stock }}</td>
          <td class="align-middle">
            <button v-on:click="deleteProduct(product.id)" class="btn btn-danger">Delete</button>
            <br><br>
            <button v-on:click="editProduct(product.id)" class="btn btn-primary">Edit</button>
          </td>
          <td class="align-middle">
            <button class="btn btn btn-outline-success btn-sm" v-on:click="patchNew(product.id)" :disabled="product.condition == 'New'">Make It New</button>
            <br><br>
            <button class="btn btn-outline-secondary btn-sm" v-on:click="patchSeccond(product.id)" :disabled="product.condition == 'Seccond'">Make It Seccond</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from 'vuex'
import NavBar from '../components/navbar'
import Swal from 'sweetalert2'

export default {
  components: { NavBar },
  name: 'Home',
  data () {
    return {
      email: '',
      password: '',
      historyDelete: 0,
      historyPatch: 0
    }
  },
  methods: {
    fetchData () {
      this.$store.dispatch('fetchData')
    },
    deleteProduct (id) {
      this.historyDelete = 1
      this.$store.dispatch('deleteProduct', id)
    },
    editProduct (id) {
      this.$router.push(`/product/${id}/edit`)
    },
    patchNew (id) {
      this.historyPatch = 1
      this.$store.dispatch('patchNew', id)
    },
    patchSeccond (id) {
      this.historyPatch = 1
      this.$store.dispatch('patchSeccond', id)
    }
  },
  created () {
    this.fetchData()
  },
  watch: {
    historyDelete (payload) {
      if (this.historyDelete === 1) {
        console.log(payload, 'masuk watcher')
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Your Product has been deleted',
          showConfirmButton: false,
          timer: 1500
        })
        this.historyDelete = 0
      }
    },
    historyPatch (payload) {
      if (this.historyPatch === 1) {
        console.log(payload, 'masuk watcher')
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Your Product condition has been changed',
          showConfirmButton: false,
          timer: 1500
        })
        this.historyPatch = 0
      }
    }
  },
  computed: {
    ...mapState(['dataProduct'])
  }
}
</script>
