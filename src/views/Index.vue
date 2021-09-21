<template>
<h1>Product List</h1>
  <products></products>
</template>

<script>
import {defineComponent} from "vue";
import products from "@/components/products";
export default defineComponent({
  name: "Index",
  components: {products}
})
</script>

<style scoped>

</style>