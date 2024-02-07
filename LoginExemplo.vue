<template>
  <v-container class="h-100 d-flex" fluid style="background-color: #6A1B9A;">
    <div class="wp-card mx-auto my-auto pt-10 pb-8" style="width: 80vh;">
      <v-row>
        <v-col cols="6" sm="4" class="mx-auto">
          <v-img alt="Logo Weplan" src="@/assets/logo.png"></v-img>
        </v-col>
      </v-row>
      <v-col cols="10" class="mx-auto">
        <v-form name="login" ref="login" action="#" class="mt-3" @submit.prevent="loginClick">
          <v-text-field label="E-mail" prepend-inner-icon="mdi-email" name="email" v-model="email" color="primary"
            :error-messages="error.email" variant="outlined" type="email" autocomplete="username" />
          <!-- ref exite para fazermos blur no eyeClick (problema com o caret) -->
          <v-text-field id="passwordID" ref="passowrdRef" label="Senha" color="primary" prepend-inner-icon="mdi-lock"
            :type="showPassword ? 'text' : 'password'" :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
            @click:appendInner="eyeClick" name="password" v-model="password" :error-messages="error.password"
            variant="outlined" autocomplete="current-password" />
          <v-btn color="primary" class="mt-3" type="submit">Entrar</v-btn>
        </v-form>
      </v-col>
    </div>
  </v-container>
</template>

<script setup lang="ts">

import { signInWithEmailAndPassword } from "firebase/auth";

// TODO: se não for consertado na build de deploy, verificar sobre o autocomplete da senha

// no vue 3, paolo, os valores que queremos usar no HTML da pagina são ensapsulados (estilo monadas do Haskell) e o framework cuida da reatividade dos valores
// nesse caso, usamos 'ref', o mais comum que e só sincroniza o valor no HTML com o do JS.

const email = ref('')
const password = ref('')
const error = ref({
  email: '',
  password: ''
})

function eyeClick() {
  showPassword.value = !showPassword.value
  const elem = document.getElementById("passwordID");
  elem.blur();
}

const showPassword = ref(false)

const auth = useFirebaseAuth()! // esse ´!´ no final garante pro typescript que esse valor nunca será nulo

function loginClick() {
  if (!loginValido()) return
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then(() => { navigateTo('/') })
    .catch((err) => {
      const code = err.code;
      if (code === 'auth/invalid-email') error.value.email = 'E-mail inválido'
      else if (code === 'auth/user-not-found') error.value.email = 'E-mail não cadastrado'
      else if (code === 'auth/wrong-password') error.value.password = 'Senha incorreta'
    });
}
function loginValido() {
  error.value.password = !password.value ? 'Informe a senha' : ''
  error.value.email = !email.value ? 'Informe o e-mail' : (!/.+@.+\..+/.test(email.value) ? 'E-mail inválido' : '')
  for (const err in error.value) if (error.value[err]) return false
  return true
}
</script>

<style scoped>
.wp-card {
  padding-top: 5%;
  padding-bottom: 5%;
  background-color: #ffffff;
}

@media (min-width: 600px) {
  .wp-card {
    margin-left: 25%;
    margin-right: 25%;
  }
}
</style>
