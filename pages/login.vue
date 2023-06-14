<template>
  <div align="center">
    <br /><br /><br /><br />
    <v-flex xs12 sm6 md5>
      <v-card class="elevation-12" :color="tiempoEspera>0 ? '#ffff0033': 'default'">
        <br /><h1>{{ $t($auth && $auth.loggedIn && $auth.user && $auth.user.username ? "login.Perfil" : (tiempoEspera>0 ? "login.Espera" : (showConfirma ? "login.LoginConfirma" : "login.Login")), {'tiempo' : tiempoEspera})}} </h1><br />

        <h2 v-if="tiempoEspera>0" style="color:red;"> {{ $t("login.Intentos", {'fallos' : intentos}) }}</h2>

        <v-form v-if="$auth && $auth.loggedIn && $auth.user && $auth.user.username" style="width: 95%;">
          <v-text-field
            v-model="$auth.user.username"
            disabled
            :label="$t('login.Usuario')"
            prepend-icon="mdi-mail"
            style="font-weight:bold;"
          ></v-text-field>

          <v-text-field
            v-model="$auth.user.fullName"
            disabled
            :label="$t('login.Nombre')"
            prepend-icon="mdi-account"
            style="font-weight:bold; color: red !important;"
          ></v-text-field>

          <v-btn class="mr-4" color="primary" @click="userLogout">
            <v-icon>mdi-account-key</v-icon> {{ $t("login.Cerrar") }}
          </v-btn>

          <v-btn
            color="info"
            nuxt
            :to="$auth && $auth.user && $auth.user.username ? '/aula' : '/login'"
          >
            <v-icon>mdi-google-classroom</v-icon> {{ $t('inicio.Continue') }}
          </v-btn>

        </v-form>

        <v-form v-else style="width: 95%">
          <v-text-field
            v-model="login.username"
            :rules="[
              (v) => !!v || $t('login.CorreoRequerido'),
              (v) => /.+@.+\..+/.test(v) || $t('login.CorreoVálido'),
              (v) => (v && v.indexOf('@')>2) || $t('login.CorreoVálido'),
              (v) => (v && v.lastIndexOf('.')>v.lastIndexOf('@')+2) || $t('login.CorreoVálido'),
            ]"
            :label="$t('login.Usuario')"
            :placeholder="$t('login.Correo')"
            prepend-icon="mdi-mail"
            required
          ></v-text-field>

          <v-text-field
            v-model="login.password"
            :type="showPassword ? 'text' : 'password'"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword=!showPassword"
            :rules="[
              (v) => !!v || $t('login.ContraseñaRequerida'),
              (v) => (v && v.length >= 8) || $t('login.ContraseñaVálida'),
            ]"
            :label="$t('login.Contraseña'+(showConfirma ? 'Confirma' : ''))"
            prepend-icon="mdi-key"
            counter=true
            required
          ></v-text-field>

          <v-text-field
            v-model="login.recover"
            v-if="showConfirma"
            :type="showPassword ? 'text' : 'password'"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword=!showPassword"
            :rules="[
              (v) => !!v || $t('login.ConfirmaRequerida'),
              (v) => (v && v.length >= 15) || $t('login.ConfirmaVálida'),
            ]"
            :label="$t('login.Confirma')"
            prepend-icon="mdi-account-cancel"
            counter=true
            required
          ></v-text-field>

          <v-card-actions>
            <v-container>
              <v-btn color="success" class="mr-5" v-if="!showConfirma" :disabled="tiempoEspera>0 || login.username.length<10 || login.username.indexOf('@')<=2 || login.username.lastIndexOf('.')<=login.username.lastIndexOf('@')+2 || login.username.lastIndexOf('.')==login.username.length-2 || login.password.length<8" @click="userLogin">
                <v-icon>mdi-account-key</v-icon> {{ $t("login.Aceptar") }}
              </v-btn>

              <v-btn color="default" class="mr-5" v-if="showConfirma" :disabled="tiempoEspera>0" @click="close">
                {{ $t("login.Cancelar") }}
              </v-btn>

              <v-btn color="warning" class="mr-5" v-if="!showConfirma && login.username.length!=0 && login.password.length==0" :disabled="tiempoEspera>0 || login.username.length<10 || login.username.indexOf('@')<=2 || login.username.lastIndexOf('.')<=login.username.lastIndexOf('@')+2 || login.username.lastIndexOf('.')==login.username.length-2 || login.password.length>0" @click="recover">
                <v-icon>mdi-account-cancel</v-icon> {{ $t("login.Recover") }}
              </v-btn>

              <v-btn color="info" class="mr-5" v-if="!showConfirma && login.username.length==0 && login.password.length==0" :disabled="tiempoEspera>0" to="register">
                <v-icon>mdi-account-plus</v-icon> {{ $t("login.Registro") }}
              </v-btn>

              <v-btn color="warning" class="mr-5" v-if="showConfirma" :disabled="tiempoEspera>0 || login.username.length<10 || login.password.length<8 || login.recover.length!=64" @click="recoverConfirma">
                <v-icon>mdi-account-cancel</v-icon> {{ $t("login.Recover") }}
              </v-btn>
            </v-container>
          </v-card-actions>

        </v-form>

        <br />
      </v-card>
    </v-flex>
  </div>
</template>

<script>
export default {
  data() {
    return {
      intentos: 0,
      tiempoEspera: 0,
      temporizadorEspera: null,
      showPassword: false,
      showConfirma: false,
      login: {
        username: "",
        password: "",
        recover: "",
      },
    };
  },

  methods: {
    async userInit() {
      if(this.$auth.user!=null && this.$auth.user.token==undefined && localStorage['auth._token.local']!=undefined && localStorage['auth._token.local']!='false' && localStorage['auth._user.local']!=undefined && localStorage['auth._user.local']!='false') {
        await this.$axios
          .post('/auth/refresh', { username: localStorage['auth._user.local'], token: localStorage['auth._token.local'] })
          .then(response => this.setToken(response.data[0]))
      }
    },

    async userLogin() {
      try {
        const response = await this.$auth.loginWith("local", { data: this.login });
        this.setToken(response.data[0]);
      } catch (errors) {
        console.error("LOGIN ERROR: "+errors);
      }
    },

    async userLogout() {
      if(this.$auth!=undefined && this.$auth.user!=undefined && this.$auth.user.username!=undefined && this.$auth.user.token!=undefined) {
        await this.$axios
          .post('/auth/logout', { username: this.$auth.user.username, token: this.$auth.user.token })
          .then(() => this.$auth.logout().then(() => {localStorage.removeItem('auth._user.local'); this.$router.push('/login');}))
      }
    },

    setToken(user) {
      if(user.token != undefined) {
        const token = user.token;

        this.$auth.setUserToken(token)
          .then(() => {
            if(this.$auth.loggedIn) {
              this.$toast.success(this.$t('login.Iniciado'));
              this.intentos = 0;
              this.$auth.setUser(user);
              localStorage.setItem('auth._user.local', user.username)
              this.$router.push('/aula')
            }
          })
          .catch(e => console.error("FAIL: " + e.message));
      } else if(user.intentos != undefined) {
        if(user.intentos>3) {
          this.intentos     = user.intentos;
          this.tiempoEspera = 60;
          this.iniciaTemporizadorEspera();
        } else this.$toast.error(this.$t('login.Error'));
      }
    },

    close() {
      this.showConfirma=false;
    },

    espera() {
      clearTimeout(this.temporizadorEspera);
      this.tiempoEspera--;
      if(this.tiempoEspera>0) {
        this.iniciaTemporizadorEspera();
      }
    },

    iniciaTemporizadorEspera() {
      if (this.tiempoEspera>0) {
        this.temporizadorEspera=setTimeout(() => {
            this.espera();
        }, 1000);
      }
    },

    async recover() {
      if(this.login.username!="" && this.login.username.length >= 10) {
        this.$toast.info(this.$t('login.recoverInicio'));
        await this.$axios
          .post('/auth/recover', { username: this.login.username, solicita: "Solicita" })
          .then((response) => {
            let data = response.data[0];
            if(data.intentos!=undefined) {
              if(data.intentos>=3) {
                this.intentos     = data.intentos;
                this.tiempoEspera = 60;
                this.iniciaTemporizadorEspera();
                this.$toast.error(this.$t('login.Intentos', {'fallos': this.intentos}));
              } else {
                this.$toast.error(this.$t('login.recoverFalla'));
              }
            } else {
              if(data.status=='Confirma') {
                this.showConfirma=true;
                this.$router.push('/login');
              }
            }
          })
          .catch((error) => {console.error("ERROR: "+error);});
      }
    },

    async recoverConfirma() {
      if(this.login.username!="" && this.login.username.length >= 10 && this.login.password!="" && this.login.password.length >= 6 && this.login.recover!="" && this.login.recover.length >= 15) {
        await this.$axios
          .post('/auth/recover', { username: this.login.username, password: this.login.password, recover: this.login.recover, confirma: 'Confirma' })
          .then((response) => {
            let data = response.data[0];
            if(data.intentos!=undefined) {
              if(data.intentos>=3) {
                this.intentos     = data.intentos;
                this.tiempoEspera = 60;
                this.iniciaTemporizadorEspera();
                this.$toast.error(this.$t('login.Intentos', {'fallos': this.intentos}));
              }
            } else {
              if(data.status=='Ok') {
                this.showConfirma=false;
                this.$router.push('/login');
              }
            }
          })
          .catch((error) => {console.error("ERROR: "+error);});
      }
    }
  },

  mounted() {
    this.iniciaTemporizadorEspera();
    this.userInit();
  },

  beforeDestroy() {
    clearTimeout(this.temporizadorEspera);
  }
};
</script>