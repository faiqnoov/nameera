<template>
  <div class="card">
    <div class="card-header d-flex justify-content-between align-items-center">
      <h5 class="mb-0">Data Customer</h5>
      <router-link :to="{ name: 'AddCust' }">
        <button type="button" class="btn btn-primary btn-sm d-flex align-items-center">
          <span class="material-icons-outlined">add</span>
        </button>
      </router-link>
    </div>
    <div class="card-body">
      <div class="table-responsive">
        <table class="table table-bordered table-striped table-hover table-sm">
          <thead class="table-light">
            <tr>
              <th>Nama</th>
              <th>Nama Ortu</th>
              <th>Alamat</th>
              <th>Medsos</th>
              <th>Tgl. Lahir</th>
              <th>No. Telp.</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="cust in customers" :key="cust.id">
              <td>
                <router-link :to="{ name: 'CustDetails', params: { id: cust.id }}">
                  {{ cust.nama }} <span class="material-icons-outlined md-14">open_in_new</span>
                </router-link>
              </td>
              <td>{{ cust.namaOrtu }}</td>
              <td>{{ cust.alamat }}</td>
              <td>{{ cust.medsos }}</td>
              <td>{{ cust.tglLahir }}</td>
              <td>{{ cust.noTelp }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>  
</template>

<script>
import getCollection from '@/composables/getCollection'

export default {
  setup() {
    const { documents: customers } = getCollection('customers')

    return { customers }
  }
}
</script>