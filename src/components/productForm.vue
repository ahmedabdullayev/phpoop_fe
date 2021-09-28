<template>
  <div class="add_form">
    <form id="product_form" v-on:submit.prevent="submitForm">
    <input type="text" id="sku" name="sku" v-model="form.sku" placeholder="SKU.." >
      <div v-if="skuSameError.length">
        <div class="error-msg">
          <i class="fa fa-times-circle"></i>
          There is already same sku!
        </div>
      </div>
      <div v-if="skuLengthErr.length">
        <div class="error-msg">
          <i class="fa fa-times-circle"></i>
          SKU is empty or length is more than 10, please check!
        </div>
      </div>
    <input type="text" id="name" name="name" v-model="form.name" placeholder="Name.." >
    <currency-input
        v-model="form.value"
        id="price"
        placeholder="Price.."
        :options="{ currency: 'EUR' }"
        v-on:keypress="NumbersOnly"
    />
      <div>
      <p class="type-label">Please, choose a type:</p>
      <select v-model="form.selected" id="productType">
        <option v-for="(type) in form.types" :key="type.id" v-bind:value="type.id" >{{type.name}}</option>
      </select>
      </div>
    <template v-if="form.selected == 1">
      <p class="type-label">Please, provide size:</p>
      <input type="text" id="size" name="size" v-model="form.size" placeholder="Size (in MB).." v-on:keypress="NumbersOnly">
    </template>
    <template v-else-if="form.selected == 2">
      <p class="type-label">Please, provide weight:</p>
      <input type="text" id="weight" name="weight" v-model="form.weight" placeholder="Weight (in Kg).." v-on:keypress="NumbersOnly">
    </template>
    <template v-else-if="form.selected == 3">
      <div>
      <p class="type-label" >Please, provide dimensions:</p>
      <input type="text" id="height" name="weight" v-model="form.height" placeholder="Height (CM).." v-on:keypress="NumbersOnly">
      <input type="text" id="width" name="width" v-model="form.width" placeholder="Width (CM).." v-on:keypress="NumbersOnly">
      <input type="text" id="length" name="length" v-model="form.length" placeholder="Length (CM).." v-on:keypress="NumbersOnly">
      </div>
    </template>
      <div v-if="errors.length">
        <div class="error-msg">
          <i class="fa fa-times-circle"></i>
          Error! Please check for empty fields!
        </div>
      </div>
      <div v-if="isNumber.length">
        <div class="warn-msg">
          <i class="fa fa-exclamation-circle" aria-hidden="true"></i>
          Please use type of number!
        </div>
      </div>
      <input class="save" type="submit" value="Save">

    </form>
    <input class="cancel" type="submit" value="Cancel" @click="redirectToMain()">
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import CurrencyInput from '@/components/CurrencyInput.vue'
import _ from 'lodash'
import { mapGetters, mapActions, mapMutations } from 'vuex';
export default defineComponent({
  name: "addProduct",
  components: {CurrencyInput},
  data() {
    return{
      errors: [] as string[],
      isNumber: [] as string[],
      skuSameError: [] as string[],
      skuLengthErr: [] as string[],
      form: {
        sku: null as unknown as string,
        name: null as unknown as string,
        value: null as unknown as number,
        selected: '' as string,
        size: null as unknown as number,
        weight: null as unknown as number,
        height: null as unknown as number,
        width: null as unknown as number,
        length: null as unknown as number,
        types: [],
      }
    }
  },
  computed:{
    ...mapGetters('productTypes',[
      'productTypes'
    ])
  },
  methods:{
    ...mapActions('productTypes', [
        'FETCH_PRODUCTTYPES'
    ]),
    ...mapActions('products',[
        'ADD_PRODUCT'
    ]),
    submitForm(){
      this.errors = [];
      console.warn(this.form.sku, this.form.name, this.form.value, this.form.selected,
          this.form.size, this.form.weight, this.form.height, this.form.width, this.form.length)
      this.checkForEmpty(this.form.sku)
      this.checkForEmpty(this.form.name)
      this.checkForEmpty(this.form.value)
      this.checkForEmpty(this.form.selected)
      if(this.form.selected == '1'){
        this.checkForEmpty(this.form.size);
      }else if(this.form.selected == '2'){
        this.checkForEmpty(this.form.weight);
      }else if(this.form.selected == '3'){
        this.checkForEmpty(this.form.height)
        this.checkForEmpty(this.form.width)
        this.checkForEmpty(this.form.length)
      }
      if(this.errors.length == 0) {
        let string = "?sku=" + this.form.sku + "&name=" + this.form.name + "&price=" + this.form.value + "&type=" +
            this.form.selected + "&size=" + this.form.size + "&weight=" + this.form.weight + "&height=" +
            this.form.height + "&width=" + this.form.width + "&length=" + this.form.length;
        this.ADD_PRODUCT(string).then(() => {
          this.skuSameError = [];
          this.skuLengthErr = [];
          this.$router.push('/');
        }).catch(error =>{
          this.skuSameError = [];
          this.skuLengthErr = [];
          if(error.response.data.message == "same_sku"){
            this.skuSameError.push("sku_error")
          }
          if(error.response.data.message == "empty_or_big"){
            this.skuLengthErr.push("empty_or_big")
          }
        })
      }
    },
    checkForEmpty(value: string | number){
      if(!value || value === ''){
        let error = value + ' is empty!';
        this.errors.push(error)
      }
    },
    NumbersOnly(evt: any) {
      this.isNumber = []
      let char = String.fromCharCode(evt.keyCode);
      if (/^[0-9]+$/.test(char)){
        return true;
      } else {
        this.isNumber.push('error')
        evt.preventDefault();
      }
    },
    redirectToMain(){
      this.$router.push('/');
    }
  },
  async mounted() {
    console.warn("something")
   await this.FETCH_PRODUCTTYPES();
   this.form.types = this.productTypes;
    this.form.selected = this.form.types[0]['id']
  }
})
</script>

<style lang="less">
@import url('//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css');

@color: white;
@errorColor: #D8000C;
.error-msg{
  margin: 10px 0;
  padding: 10px;
  border-radius: 3px 3px 3px 3px;
  color: @errorColor;
  background-color: #FFBABA;
}
.warn-msg{
  margin: 10px 0;
  padding: 10px;
  border-radius: 3px 3px 3px 3px;
  color: black;
  background-color: #E5E725;
}

.type-label{
  text-align: left;
  margin-bottom: 1px;
  margin-top: 1px;
  font-size: small;
}
body {
  background-color: @color;
}
input[type=text], select {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}
.add_form{
  display: inline-block;
  width: 50%;
}
.save {
  width: 100%;
  background-color: #42b983;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.save:hover {
  background-color: #45a049;
}
.cancel{
  width: 100%;
  background-color: #C6C843;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.cancel:hover {
  background-color: #D4D63B;
}
</style>