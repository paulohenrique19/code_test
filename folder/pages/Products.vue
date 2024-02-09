<template>

    <v-app-bar color="red" height="100">
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <v-app-bar-title>
            <div style="padding: 10px;">
                <nuxt-img
                :src="imgUrl"
                width="100"
                height="100"
                layout="responsive"
                ></nuxt-img>
            </div>
        </v-app-bar-title>

        <v-btn>Home</v-btn>
        <v-btn>Produtos</v-btn>
        <v-btn>Login</v-btn>

    </v-app-bar>

    <div style="max-width: 1200px; margin: auto; padding-top: 200px;">
      
        <v-row justify="center">
        <v-col cols="12" md="8">
            <v-text-field
            v-model="searchTerm"
            label="Digite o nome do produto"
            @input="searchProducts"
            ></v-text-field>
        </v-col>
        <v-col cols="3">
            <v-btn color="primary">Pesquisar</v-btn>
          </v-col>
        </v-row>


      <v-container>
        <v-row align="center">
          <v-col v-for="product in products" :key="product.id" cols="12" md="4">
            <v-card class="mb-4">
              <nuxt-img :src="product.image" alt="Product Image" height="200" class="mx-auto"></nuxt-img>
              <v-card-title class="text-h5">{{ product.name }}</v-card-title>
              <v-card-subtitle>{{ product.category }}</v-card-subtitle>
              <v-card-text>
                {{ product.description }}
                <br />
                Preço: R${{ product.price.toFixed(2) }} | Estoque: {{ product.stock.value }}
              </v-card-text>
              <v-card-actions>
                <v-btn @click="addToCart(product, cart)" color="primary">Adicionar</v-btn>
                <v-btn @click="removeFromCart(product, cart)" color="secondary">Remover</v-btn>
                <v-btn color="terciary">Detalhes</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>

      <v-row align="center" style="padding: 100px;">
      <v-col>
        <v-divider></v-divider>
        <v-row justify="center">
          <v-col>
            <v-text>Total Itens no Carrinho: {{ cart[0].stock.value }}</v-text>
          </v-col>
          <v-col>
            <v-text>Valor Total: R${{ cart[0].price.value.toFixed(2) }}</v-text>
          </v-col>
          <v-col>
            <v-btn @click="resetCart(cart)" color="red">Limpar Carrinho</v-btn>
          </v-col>
          <v-col>
            <v-btn color="green">Finalizar Pedido</v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    </div>

    <v-footer class="bg-red text-center d-flex flex-column">
        <div>
        <v-btn
            v-for="icon in IconsFooter()"
            :key="icon"
            class="mx-4"
            :icon="icon"
            variant="text"
        ></v-btn>
        </div>

        <div class="pt-0">Todos os direitos reservados</div>

        <v-divider></v-divider>

        <div>
        {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
        </div>
     </v-footer>


    
</template>
  
<script>
  
  import { ref } from 'vue';

  const imgUrl = "/img/logo.svg";
  const drawer = ref(null)

  function addToCart(product, cart) {
    if (product.stock.value > 0) {
        product.stock.value -= 1;
        cart[0].stock.value += 1;
        cart[0].price.value += product.price;
    }
  }

  function removeFromCart(product, cart) {
    if(cart.stock.value > 0)
    {
        product.stock.value += 1;
        cart[0].stock.value -= 1;
        cart[0].price.value -= product.price;
    }
  }


  function resetCart(cart) 
  {
    // Adiciona todos os produtos de volta ao estoque
    cart[0].stock.value = 0;
    cart[0].price.value = 0;
  }



  const cart = [
      {
        price: ref(0),
        stock: ref(0)
      }

  ];


  const products = [
      {
        id: 1,
        name: 'Produto 1',
        category: 'Categoria A',
        description: 'Descrição do Produto 1.',
        image: '/img/logo.svg',
        price: 10.00,
        stock: ref(12)
      },
      {
        id: 2,
        name: 'Produto 2',
        category: 'Categoria B',
        description: 'Descrição do Produto 2.',
        image: '/img/img_1.jpg',
        price: 5.00,
        stock: ref(126)
      },

      {
        id: 3,
        name: 'Produto 3',
        category: 'Categoria B',
        description: 'Descrição do Produto 2.',
        image: '/img/img_2.jpeg',
        price: 15.00,
        stock: ref(28)
      },

      {
        id: 4,
        name: 'Produto 4',
        category: 'Categoria B',
        description: 'Descrição do Produto 2.',
        image: '/img/img_3.jpeg',
        price: 20.00,
        stock: ref(812)
      },

      {
        id: 5,
        name: 'Produto 5',
        category: 'Categoria B',
        description: 'Descrição do Produto 5.',
        image: '/img/img_4.jpeg',
        price: 10.00,
        stock: ref(1)
      },

      {
        id: 6,
        name: 'Produto 6',
        category: 'Categoria A',
        description: 'Descrição do Produto 6.',
        image: '/img/img_4.jpeg',
        price: 10.00,
        stock: ref(61)
      },
      
      

  ];

  function productCard() {
    return {
      products, cart, addToCart, removeFromCart, resetCart,
    };
  }

  function IconsFooter() {
    const icons = [
      'mdi-facebook',
      'mdi-twitter',
      'mdi-linkedin',
      'mdi-instagram',
    ];
    
    return icons;
    
  }

  /*
  function Cart()
  {
    const Kart = [{

        id: "",
        name: "",
        category: "",
        description: "",
        price: "",
        quantity: ""

        }
    ]

    function addItem(product)
    {
        id = product.id;
        name = product.name;
        price = product.price;
        
        
    }
  }
  */
  
  export default {
    
    setup() {
      // usar ... quando for retornar funções
      return { ...productCard(), imgUrl, drawer, cart, IconsFooter};
    },
  };
</script>
  