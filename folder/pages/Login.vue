<template>
    <div>
  
      <!-- <v-dialog width="500"> -->
      <!--   <template v-slot:activator="{ props }"> -->
      <!--     <v-btn v-bind="props" text="Open Dialog"> </v-btn> -->
      <!--   </template> -->
      <!--   <template v-slot:default="{ isActive }"> -->
      <!--     <v-card title="Dialog"> -->
      <!---->
      <!--       <v-form name="login" ref="login" action="#" class="mt-3 px-5" @submit.prevent="loginClick"> -->
      <!--         <v-text-field label="E-mail" prepend-inner-icon="mdi-email" name="email" v-model="email" color="primary" -->
      <!--           :error-messages="
  error.email
  " variant="outlined" type="email" autocomplete="username" /> -->
      <!--         <v-text-field id="passwordID" ref="passowrdRef" label="Senha" color="primary" prepend-inner-icon="mdi-lock" -->
      <!--           :type="showPassword ? 'text' : 'password'" :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'" -->
      <!--           @click:appendInner="eyeClick" name="password" v-model="password" :error-messages="error.password" -->
      <!--           variant="outlined" autocomplete="current-password" /> -->
      <!--         <v-btn color="primary" class="mt-3" type="submit">Entrar</v-btn> -->
      <!--       </v-form> -->
      <!---->
      <!--       <v-card-actions> -->
      <!--         <v-spacer></v-spacer> -->
      <!---->
      <!--         <v-btn text="Close Dialog" @click="isActive.value = false"></v-btn> -->
      <!--       </v-card-actions> -->
      <!--     </v-card> -->
      <!--   </template> -->
      <!-- </v-dialog> -->
  
  
      <!-- <v-system-bar> -->
      <!--   <v-spacer></v-spacer> -->
      <!---->
      <!--   <v-icon>mdi-square</v-icon> -->
      <!---->
      <!--   <v-icon>mdi-circle</v-icon> -->
      <!---->
      <!--   <v-icon>mdi-triangle</v-icon> -->
      <!-- </v-system-bar> -->
  
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
  <v-btn text @click="openLoginDialog">Login</v-btn>

  <v-dialog v-model="loginDialog" max-width="1000">
      <v-card>
        <v-card-title class="d-flex">
            <span class="flex-grow-1">Login</span>
            <v-btn icon @click="closeLoginDialog" class="m1-auto">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
        <v-card-text>
          <!-- Formulário de login com campos de usuário e senha -->
          <v-form @submit.prevent="login">
            <v-text-field v-model="username" label="Email"></v-text-field>
            <v-text-field v-model="password" label="Senha" type="password" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="togglePasswordVisibility"  
            ></v-text-field>
            <div class="d-flex">
                <v-btn type="submit" color="primary" class="mr-2">Entrar</v-btn>
                <v-btn text @click="openRegisterDialog">Não está registrado? Clique aqui</v-btn>
            </div>
          </v-form>
        </v-card-text>
      </v-card>
  </v-dialog>

  <v-dialog v-model="registerDialog" max-width="1000">
        <v-card>
          <v-card-title class="d-flex">
            <span class="flex-grow-1">Registro</span>
            <v-btn icon @click="closeRegisterDialog" class="ml-auto">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text>
            <!-- Formulário de login com campos de usuário e senha -->
            <v-form @submit.prevent="register">
              <v-text-field v-model="username" label="Email"></v-text-field>
              <v-text-field v-model="password" label="Senha" type="password" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="togglePasswordVisibility"  
                >
              </v-text-field>
              <v-text-field v-model="cpfORcnpj" label="CPF/CNPJ"></v-text-field>
              <v-text-field v-model="address"  label="Endereço" ></v-text-field>
              <v-text-field v-model="phone"    label="Telefone" ></v-text-field>
              <div class="d-flex">
                <v-btn type="submit" color="primary" class="mr-2">Registrar</v-btn>
              </div>
            </v-form>
          </v-card-text>
        </v-card>
  </v-dialog>


</v-app-bar>



<v-navigation-drawer v-model="drawer" temporary>
  <v-list-item link title="Home"></v-list-item>
  <v-divider></v-divider>
  <v-list-item link title="Produtos"></v-list-item>
  <v-divider></v-divider>
  <v-list-item link title="Login"></v-list-item>

</v-navigation-drawer>

      <!---->
      <!-- <v-main class="bg-grey-lighten-2"> -->
      <!--   <v-container> -->
      <!--     <v-row> -->
      <!--       <template v-for="n in 4" :key="n"> -->
      <!--         <v-col class="mt-2" cols="12"> -->
      <!--           <strong>Category {{ n }}</strong> -->
      <!--         </v-col> -->
      <!---->
      <!--         <v-col v-for="j in 6" :key="`${n}${j}`" cols="6" md="2"> -->
      <!--           <v-sheet height="150"></v-sheet> -->
      <!--         </v-col> -->
      <!--       </template> -->
      <!--     </v-row> -->
      <!--   </v-container> -->
      <!-- </v-main> -->
    </div>
  </template>
  
  
  
  <script setup lang="ts">
  
  
  import { ref } from 'vue'
  
  const imgUrl= "/img/logo.svg"

  const loginDialog = ref(false);
  const registerDialog = ref(false);


  const username = ref('');
  const password = ref('');
  const cpfORcnpj = ref('');
  const address = ref('');
  const phone = ref('');

  const showPassword = ref(false);

  function openLoginDialog() {
    loginDialog.value = true;
  }

  function closeLoginDialog() {
    loginDialog.value = false;
  }

  function openRegisterDialog() {
    loginDialog.value = false;
    setTimeout(abreTelaRegistro, 0);
  }

  function abreTelaRegistro()
  {
    registerDialog.value = true;
  }

  function closeRegisterDialog() {
    registerDialog.value = false;
  }

  function togglePasswordVisibility() {
    showPassword.value = !showPassword.value;
  }

  function register() {
    // Lógica para lidar com o registro
    console.log('Registrando usuário:', username.value, 'Senha:', password.value);
    // Feche o diálogo de registro após o registro bem-sucedido
    closeRegisterDialog();

    username.value=""
    password.value=""
    cpfORcnpj.value=""
    address.value=""
    phone.value=""

  }


  function login() {
    console.log('Usuário:', username.value, 'Senha:', password.value);
    // Feche o diálogo após a autenticação
    loginDialog.value = false;

    closeLoginDialog();

    username.value=""
    password.value=""
  }

  function navigateToRegistration() 
  {
    closeLoginDialog();


  }

  // APARTIR DAQUI PRA BAIXO É TEU CÓDIGO

  const drawer = ref(null)
  
  // import { signInWithEmailAndPassword } from "firebase/auth";
  
  // TODO: se não for consertado na build de deploy, verificar sobre o autocomplete da senha
  
  // no vue 3, paolo, os valores que queremos usar no HTML da pagina são ensapsulados (estilo monadas do Haskell) e o framework cuida da reatividade dos valores
  // nesse caso, usamos 'ref', o mais comum que e só sincroniza o valor no HTML com o do JS.
  
  const email = ref('')
  //const password = ref('')
  const error = ref({
    email: '',
    password: ''
  })
  
  function eyeClick() {
    showPassword.value = !showPassword.value
    const elem = document.getElementById("passwordID");
    elem.blur();
  }
  
  //const showPassword = ref(false)
  
  // const auth = useFirebaseAuth()! // esse ´!´ no final garante pro typescript que esse valor nunca será nulo
  
  function loginClick() {
    if (!loginValido()) return
    // signInWithEmailAndPassword(auth, email.value, password.value)
    //   .then(() => { navigateTo('/') })
    //   .catch((err) => {
    //     const code = err.code;
    //     if (code === 'auth/invalid-email') 
  error.value.email
   = 'E-mail inválido'
    //     else if (code === 'auth/user-not-found') 
  error.value.email
   = 'E-mail não cadastrado'
    //     else if (code === 'auth/wrong-password') error.value.password = 'Senha incorreta'
    //   });
  }
  function loginValido() {
    error.value.password = !password.value ? 'Informe a senha' : ''
    
  error.value.email
   = !email.value ? 'Informe o e-mail' : (!/.+@.+\..+/.test(email.value) ? 'E-mail inválido' : '')
    for (const err in error.value) if (error.value[err]) return false
    return true
  }

  
 


  </script> 