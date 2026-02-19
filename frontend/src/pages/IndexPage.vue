<template>
  <div>
    <h1>Quasar + Backend Demo</h1>
    <button @click="callApi">Call /api/demo</button>
    <pre v-if="res">{{ res }}</pre>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'IndexPage',
  data() { return { res: null }; },
  methods: {
    async callApi() {
      try {
        const base = import.meta.env.VITE_API_URL || process.env.VITE_API_URL || 'http://localhost:3000';
        const r = await axios.get(`${base}/api/demo`);
        this.res = JSON.stringify(r.data, null, 2);
      } catch (e) {
        this.res = 'error: ' + (e.message || e);
      }
    }
  }
}
</script>
