<template>
	<div>
    <center>
      <v-form style="width: 60%;">
      <v-card max-width="95%">
        <v-card-title>
          <span class="text-h5">{{ $t('register.Titulo') }}</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
                <v-col
                  cols="12"
                >
                  <v-text-field
                    v-model="registro.username"
                    :label="$t('register.Correo')"
                    :rules="[
                      (v) => !!v || $t('register.CorreoRequerido'),
                      (v) => (v && v.length > 10) || $t('register.CorreoVálido'),
                      (v) => (v && v.indexOf('@')>2) || $t('register.CorreoVálido'),
                      (v) => (v && v.lastIndexOf('.')>v.lastIndexOf('@')+2) || $t('register.CorreoVálido'),
                    ]"
                    maxlength="80"
                    counter
                    required
                  ></v-text-field>
                </v-col>

                <v-col
                  cols="6"
                >
                  <v-text-field
                    v-model="registro.nombre"
                    :label="$t('register.Nombre')"
                    :rules="[
                      (v) => !!v || $t('register.NombreRequerido'),
                      (v) => (v && v.length>=2) || $t('register.NombreVálido'),
                    ]"
                    required
                  ></v-text-field>
                </v-col>

                <v-col
                  cols="6"
                >
                  <v-text-field
                    v-model="registro.apellidos"
                    :label="$t('register.Apellidos')"
                    :rules="[
                      (v) => !!v || $t('register.ApellidosRequerido'),
                      (v) => (v && v.length>=2) || $t('register.ApellidosVálido'),
                    ]"
                    required
                  ></v-text-field>
                </v-col>

                <v-col
                  cols="6"
                >
                  <v-text-field
                    v-model="registro.password"
                    :type="showPassword ? 'text' : 'password'"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="showPassword=!showPassword"
                    :rules="[
                      (v) => !!v || $t('register.ContraseñaRequerida'),
                      (v) => (v && v.length >= 8) || $t('register.ContraseñaVálida'),
                    ]"
                    :label="$t('register.Contraseña')"
                    prepend-icon="mdi-key"
                    counter=true
                    required
                  ></v-text-field>
                </v-col>

                <v-col
                  cols="6"
                >
                  <v-text-field
                    v-model="registro.password2"
                    :type="showPassword ? 'text' : 'password'"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="showPassword=!showPassword"
                    :rules="[
                      (v) => !!v || $t('register.ContraseñaRequerida'),
                      (v) => (v && v.length >= 8) || $t('register.ContraseñaVálida'),
                      (v) => (v && v==registro.password) || $t('register.ContraseñaIgual'),
                    ]"
                    :label="$t('register.Contraseña2')"
                    prepend-icon="mdi-key"
                    counter=true
                    required
                  ></v-text-field>
                </v-col>

                <v-col
                  v-if="showConfirma"
                  cols="12"
                >
                  <v-text-field
                    v-model="registro.register"
                    :label="$t('register.Confirma')"
                    :rules="[
                      (v) => !!v || $t('register.NombreRequerido'),
                      (v) => (v && v.length>=2) || $t('register.NombreVálido'),
                    ]"
                    required
                  ></v-text-field>
                </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <div
            :class='status=="Existe" ? "accent" : status=="Ok" ? "sidebar" : "white"'
            style="width: 80%;border-radius: 20px;"
          >
            <span> {{ $t('register.'+status) }} </span>
          </div>

          <v-spacer></v-spacer>
          <v-btn
            color="default"
            @click="close"
          >
            {{ $t('register.Cancelar') }}
          </v-btn>

          <v-btn
            color="warning"
            v-if="!showConfirma"
            @click="register"
            :disabled="registro.username.length<10
                    || registro.nombre.length<2
                    || registro.apellidos.length<2
                    || registro.password.length<8
                    || registro.password2.length<8"
          >
            {{ $t('register.Register') }}
          </v-btn>

          <v-btn
            color="success"
            v-if="showConfirma"
            @click="registerConfirma"
            :disabled="registro.username.length<10
                    || registro.nombre.length<2
                    || registro.apellidos.length<2
                    || registro.password.length<8
                    || registro.password2.length<8
                    || registro.register.length!=64"
          >
            {{ $t('register.Confirmar') }}
          </v-btn>
        </v-card-actions>
      </v-card>
      </v-form>
    </center>
	</div>
</template>

<script>
  import axios from 'axios';

  export default {
    name: 'ContactForm',
    data() {
      return {
        registro: {
          username: "",
          nombre: "",
          apellidos: "",
          password: "",
          password2: "",
          register: "",
        },
        showPassword: false,
        showConfirma: false,
        status: 'Espera',
      };
    },
    methods: {
      close () {
        this.$router.push('/login');
      },
      async register () {
        if(  this.registro.username.length>10
          && this.registro.nombre.length>2
          && this.registro.apellidos.length>2
          && this.registro.password.length>=8
          && this.registro.password2.length>=8
        ) {
          let formData = new FormData();
          for (let [key, value] of Object.entries(this.registro)) {
            formData.append(key, value);
          }
          formData.append("solicita", "Solicita");

          this.status = 'Espera';
          await this.$axios
            .post("/auth/register", formData)
            .then((response) => {
              let data = response.data[0];
              if(data.intentos!=undefined) {
                if(data.intentos>=3000) {
                  this.intentos     = data.intentos;
                  this.tiempoEspera = 60;
                  this.iniciaTemporizadorEspera();
                  this.$toast.error(this.$t('login.Intentos', {'fallos': this.intentos}));
                } else {
                  this.$toast.error(this.$t('login.recoverFalla'));
                }
              } else {
                this.status = data.status;
                if(this.status=='Confirma') {
                  this.showConfirma=true;
                  this.$router.push('/register');
                }
              }
            })
            .catch((error)   => {console.log("ERROR: "+error);});
        }
      },
      async registerConfirma () {
        if(  this.registro.username.length>10
          && this.registro.nombre.length>2
          && this.registro.apellidos.length>2
          && this.registro.password.length>=8
          && this.registro.password2.length>=8
          && this.registro.register.length==64
        ) {
          let formData = new FormData();
          for (let [key, value] of Object.entries(this.registro)) {
            formData.append(key, value);
          }
          formData.append("confirma", "Confirma");

          this.status = 'Espera';
          await this.$axios
            .post("/auth/register", formData)
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
                this.status = data.status;
                if(this.status=='Ok') {
                  this.showConfirma=false;
                  this.$router.push('/login');
                }
              }
            })
            .catch((error)   => {console.log("ERROR: "+error);});
        }
      },
    }
  };
</script>