<template id="products-component">
  <div class="mainBtns">
  <input class="mainBtn" style="" type="button" id="#delete-product-btn" @click="submitItem($event)" value="MASS DELETE">
  <input class="mainBtn" type="button" value="ADD" @click="redirectToProducts()">
  </div>
<hr>
  <div class="wrapper">
    <template v-if="this.productList.length">
    </template>
  <div class="archive" v-for="post in productList" :key="post.id">
    <form ref="form" v-on:submit.prevent="submitItem($event)">
    <article class="article">
      <input type="checkbox" class="delete-checkbox" v-bind:name="'id' + post.id" v-bind:value="post.id" v-model="form.product_id[post.id]" >
      <p class="sku">{{post.SKU}}</p>
      <p>{{post.name}} </p>
      <p>{{post.price}} $</p>
    <template v-if="post.product_type_id == 1">
      <p>{{post.size}} MB</p>
    </template>
    <template v-if="post.product_type_id == 2">
      <p>{{post.weight}}KG</p>
    </template>
    <template v-if="post.product_type_id == 3">
      <p>{{post.height}}x{{post.width}}x{{post.length}}</p>
    </template>
      <hr>
      <hr>
    </article>
    </form>
  </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import _ from 'lodash'
import { mapGetters, mapActions, mapMutations } from 'vuex';
export default defineComponent({
  name: "products",
  data(){
    return{
      productList: [],
      form:{
        product_id: []
      }
    }
  },
  computed: {
    ...mapGetters('products',[
        'products'
    ])
  },
  methods: {
    ...mapActions('products', [
        'FETCH_PRODUCTS',
        'DELETE_PRODUCTS'
    ]),
    submitItem: function () {
      if(this.products.length == 0){
        return
      }
      let el: any = this.$refs.form
      el.addEventListener('submit', (event: any) => {
        event.preventDefault()
      })
      let ids: string[] = Object.keys(this.form.product_id)
      let idsInt: number[] = ids.map((i) => Number(i));

      for (let i = 0; i < idsInt.length; i++) {
        _.remove(this.productList, function(currentObject: any) {
          return currentObject.id === idsInt[i];
        });
      }
      let newar = Array.from(idsInt, val => 'id: '+ val);
      this.DELETE_PRODUCTS(idsInt)

    },
    redirectToProducts(){
      this.$router.push('/add-product');
    }
  },
  async mounted() {
    await this.FETCH_PRODUCTS();
    this.productList = this.products
    console.warn(this.products.length)
    console.warn("list here:", this.productList);
  }
})
</script>

<style lang="less">
@desktop:   ~"only screen and (min-width: 1201px) ";
@tablet:    ~"only screen and (min-width: 801px) and (max-width: 1200px)";
@bigPhone:  ~"only screen and (min-width: 501px) and (max-width: 800px)";
@phone:     ~"only screen and (max-width: 500px)";
@mainColor: #42b983;
@whiteColor: #fff;
@media @phone {
  .page {
    padding: 1em;
    border-radius: 5px;
    text-align: center;
    background: @mainColor;
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 90%;
  }
  .wrapper {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-auto-rows: minmax(50px, auto);
    grid-gap: 5px;
  }
}
  @media @desktop {
    .page {
      padding: 1.5em;
      border-radius: 5px;
      text-align: center;
      background: @mainColor;
      display: block;
      margin-left: auto;
      margin-right: auto;
      width: 40%;
    }
    .wrapper {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-auto-rows: minmax(50px, auto);
      grid-gap: 5px;
    }
  }
@media @tablet {
  .page {
    padding: 1.5em;
    border-radius: 5px;
    text-align: center;
    background: @mainColor;
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 40%;
  }
  .mainBtns{
    margin-left: auto;
    margin-right: 0;
  }
  .wrapper {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: minmax(50px, auto);
    grid-gap: 5px;
  }
}
@media @bigPhone {
  .page {
    padding: 1.5em;
    border-radius: 5px;
    text-align: center;
    background: @mainColor;
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 40%;
  }
  .wrapper {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: minmax(50px, auto);
    grid-gap: 5px;
  }
}

.mainBtn{
  display:inline-block;
  padding:0.3em 1.2em;
  margin:0 0.3em 0.3em 0;
  border-radius:2em;
  box-sizing: border-box;
  text-decoration:none;
  font-family:'Roboto',sans-serif;
  font-weight:300;
  color:#FFFFFF;
  background-color:#4eb5f1;
  text-align:center;
  transition: all 0.2s;
}
.massDelete:hover{
  background-color:#4095c6;
}
.sku{
  text-transform: uppercase;
}
    .archive {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      grid-gap: 1em;
    }

    .article {
      padding: 1em;
      background: @whiteColor;
      box-shadow:
          0 5px 10px rgba(0, 0, 0, 0.1),
          0 20px 20px rgba(0, 0, 0, 0.05);
    }
    .button {
      background-color: @mainColor; /* Green */
      border: none;
      color: @whiteColor;
      padding: 16px 32px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 16px;
      margin: 4px 2px;
      transition-duration: 0.4s;
      cursor: pointer;
      border-radius: 12px;
    }

    .button5 {
      background-color: @whiteColor;
      color: black;
      border: 2px solid @mainColor;
    }

    .button5:hover {
      background-color: @mainColor;
      color: @whiteColor;
    }
</style>