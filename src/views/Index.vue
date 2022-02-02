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
h1 { color: #42b983; font-family: 'Trocchi', serif; font-size: 45px; font-weight: normal; line-height: 48px; margin: 0; }


</style>