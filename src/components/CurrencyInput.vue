<template>
  <input
      ref="inputRef"
      type="text"
      :value="formattedValue"
  >
</template>

<script>
import { useCurrencyInput } from 'vue-currency-input'
import {defineComponent} from "vue";

export default defineComponent({
  name: 'CurrencyInput',
  props: {
    modelValue: Number,
    options: Object
  },
  setup (props) {
    const { formattedValue, inputRef } = useCurrencyInput(props.options)

    return { inputRef, formattedValue }
  }
})
</script>