<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="10">
      <v-card class="logo py-4 d-flex justify-center">
        <FliLogo />
      </v-card>
      <v-card>
        <v-card-title class="headline">
          {{ $t('inicio.Bienvenida') }}
        </v-card-title>
        <v-card-text>
          <p>{{ $t('inicio.Bienvenida1') }}</p>
          <br>
          <hr class="my-3">
          <br>
          <p>
            <a
              href="https://tecnm.mx/"
              target="_blank"
              rel="noopener noreferrer"
            >TecNM</a> ::
            {{ $t('inicio.TecNM') }}
          </p>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="primary"
            nuxt
            :to="$auth && $auth.user && $auth.user.username ? '/aula' : '/login'"
          >
            <v-icon>{{ $auth && $auth.user && $auth.user.username ? 'mdi-google-classroom' : 'mdi-account-key' }}</v-icon> {{ $t($auth && $auth.user && $auth.user.username ? 'inicio.Continue' : 'login.Login')}}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'IndexPage'
}
</script>
