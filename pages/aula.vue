<template>
  <v-data-table
    :headers="headers"
    :items="items"
    item-key="clave"
    show-expand
    group-by="rol"
    item-class="color"
    class="elevation-3"
    :footer-props="{
      showFirstLastPage: true,
      itemsPerPageText:$t('aula.AulasPáginas')
    }"
  >
    <template v-slot:[`header.clave`] ="{ header }">
      {{ $t('aula.'+header.text) }}
    </template>

    <template v-slot:[`header.nombre`] ="{ header }">
      {{ $t('aula.'+header.text) }}
    </template>

    <template v-slot:[`header.descripcion`] ="{ header }">
      {{ $t('aula.'+header.text) }}
    </template>

    <template v-slot:[`header.creadores`] ="{ header }">
      {{ $t('aula.'+header.text) }}
    </template>

    <template v-slot:[`header.participantes`] ="{ header }">
      {{ $t('aula.'+header.text) }}
    </template>

    <template v-slot:[`header.rol`] ="{ header }">
      {{ $t('aula.'+header.text) }}
    </template>

    <template v-slot:[`header.actividades`] ="{ header }">
      {{ $t('aula.'+header.text) }}
    </template>

    <template v-slot:[`header.estado`] ="{ header }">
      {{ $t('aula.'+header.text) }}
    </template>

    <template v-slot:[`header.acciones`] ="{ header }">
      {{ $t('aula.'+header.text) }}
    </template>


    <template v-slot:[`group.header`]="{items, isOpen, toggle}">
      <td @click="toggle" align="center" style="border-left: 3px solid gray; border-top: 3px solid gray; border-bottom: 3px solid gray; border-radius: 20px 0px 0px 20px;"><br><v-icon>{{ isOpen ? 'mdi-minus' : 'mdi-plus' }}</v-icon><br><br></td>
      <td @click="toggle" :colspan="headers.length" style="border: 3px solid gray; border-radius: 0px 20px 20px 0px;">
        <br>
        <v-row>
          <v-col v-for="n in 3" :key="n" align="center">
            <v-icon>
              {{ items[0].rol=='a:Creador' ? 'mdi-account-cog' : (items[0].rol=='b:Colaborador' ? 'mdi-account-cog-outline' : (items[0].rol=='c:Participante' ? 'mdi-account-box-outline' : 'mdi-account-card-outline')) }}
            </v-icon>
            {{ $t('aula.'+items[0].rol).toUpperCase() }}
          </v-col>
        </v-row>
        <br>
      </td>
    </template>

    <template v-slot:[`item.rol`]="{ item }">
      <v-icon>
        {{ item.rol=='Creador' ? 'mdi-account-cog' : (item.rol=='Colaborador' ? 'mdi-account-cog-outline' : (item.rol=='Participante' ? 'mdi-account-box-outline' : 'mdi-account-card-outline')) }}
      </v-icon>
      {{ $t('aula.'+item.rol) }}
    </template>

    <template v-slot:[`item.creadores`]="{ item }">
      <v-list-item dense style="padding: 0;">
        <v-list-item-content>
          <v-list-item-title v-for="(col, ind) in item.creadores" :key="ind">
            {{ $auth && $auth.user && $auth.user.username && (col.usuario==$auth.user.username || col.usuario=='(*)'+$auth.user.username) ? (col.usuario=='(*)'+$auth.user.username ? '(*)' : '')+$t('aula.Yo') : (ind==0 ? '(*)' : '')+col.nombre}}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </template>

    <template v-slot:[`item.participantes`]="{ item }">
      {{ item.participantes.length }}
    </template>

    <template v-slot:expanded-item="{ headers, item }">
      <td :colspan="headers.length-8" :class="item.color" style="vertical-align: top;">
        <center>
          <h4>{{ $t('aula.PARTICIPANTES') }}</h4>
          <v-data-table
            :headers="[
              {text: '#'               , value: 'index'  , divider: true, align: 'end', width: '80px'},
              {text: $t('aula.NOMBRE') , value: 'nombre' , divider: true},
              {text: $t('aula.USUARIO'), value: 'usuario', divider: true},
            ]"
            :items="item.participantes"
            :footer-props="{
              showFirstLastPage: true,
              itemsPerPageText:$t('aula.ParticipantesPáginas')
            }"
            class="elevation-10"
            style="opacity: 0.7;"
            dense
          >
            <template v-slot:[`header.usuario`] ="{ header }">
              {{ item.rol=='a:Creador' || item.rol=='b:Colaborador' ? header.text : $t('aula.ROL') }}
            </template>

            <template v-slot:[`item.index`]="{ item }">
              <center>
                {{ item.index }}
              </center>
            </template>

            <template v-slot:[`item.nombre`]="{ item }" v-if="item.rol!='a:Creador' && item.rol!='b:Colaborador'">
              {{ item.usuario==$auth.user.username ? $t('aula.Yo') : item.nombre }}
            </template>

            <template v-slot:[`item.usuario`]="" v-if="item.rol!='a:Creador' && item.rol!='b:Colaborador'">
              {{ $t('aula.'+item.rol) }}
            </template>
          </v-data-table>
        </center>
      </td>

      <td :colspan="8" :class="item.color" style="vertical-align: top;">
        <center>
          <h4>{{ $t('aula.ACTIVIDADES') }}</h4>
          <v-data-table
            :headers="[
              {text: '#'                    , value: 'index'      , divider: true, align: 'end', width: '80px'},
              {text: $t('aula.NOMBRE')      , value: 'nombre'     , divider: true},
              {text: $t('aula.DESCRIPCIÓN') , value: 'descripcion', divider: true},
              {text: $t('aula.INTEGRANTES') , value: 'integrantes', divider: true},
              {text: $t('aula.INICIO')      , value: 'inicio'     , divider: true},
              {text: $t('aula.FIN')         , value: 'fin'        , divider: true},
              {text: $t('aula.ESTADO')      , value: 'estado'     , divider: true},
            ]"
            :items="item.actividades"
            :footer-props="{
              showFirstLastPage: true,
              itemsPerPageText:$t('aula.ActividadesPáginas')
            }"
            class="elevation-10"
            style="opacity: 0.7;"
            dense
          >
            <template v-slot:[`header.usuario`] ="{ header }">
              {{ item.rol=='a:Creador' || item.rol=='b:Colaborador' ? header.text : $t('aula.ROL') }}
            </template>

            <template v-slot:[`item.index`]="{ item }">
              <center>
                {{ item.index }}
              </center>
            </template>

            <template v-slot:[`item.nombre`]="{ item }" v-if="item.rol!='a:Creador' && item.rol!='b:Colaborador'">
              {{ item.usuario==$auth.user.username ? $t('aula.Yo') : item.nombre }}
            </template>

            <template v-slot:[`item.usuario`]="" v-if="item.rol!='a:Creador' && item.rol!='b:Colaborador'">
              {{ $t('aula.'+item.rol) }}
            </template>
          </v-data-table>
        </center>
      </td>
    </template>

    <template v-slot:[`item.actividades`]="{ item }">
      {{ item.actividades.length }}
    </template>

    <template v-slot:[`item.estado`]="{ item }">
      <v-chip
        class="elevation-3"
        :color="item.estado=='Activo' ? 'success' : 'warning'"
        style="width: 100%; justify-content: center;"
      >
        {{ $t('estado.'+item.estado) }}
      </v-chip>
    </template>


    <template v-slot:top>
      <v-toolbar
        flat
        v-if="$auth && $auth.loggedIn && $auth.user && $auth.user.username"
        class="elevation-3"
      >
        <v-toolbar-title>{{ $t('aula.Título') }}</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              {{ $t('aula.NuevaAula') }}
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ $t('aula.'+formTitle) }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    v-if="editedIndex > -1"
                  >
                    <v-text-field
                      v-model="editedItem.clave"
                      :label="$t('aula.CLAVE')"
                      disabled
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                  >
                    <v-text-field
                      v-model="editedItem.nombre"
                      :label="$t('aula.NOMBRE')"
                      :rules="[
                        (v) => !!v || $t('aula.NombreRequerido'),
                        (v) => (v && v.length > 0) || $t('aula.NombreVálido'),
                      ]"
                      maxlength="50"
                      counter
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                  >
                    <v-text-field
                      v-model="editedItem.descripcion"
                      :label="$t('aula.DESCRIPCIÓN')"
                      :rules="[
                        (v) => !!v || $t('aula.DescripcionRequerida'),
                        (v) => (v && v.length >= 15) || $t('aula.DescripcionVálida'),
                      ]"
                      maxlength="255"
                      counter
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                  >
                    <v-select
                      :items="estados"
                      v-model="editedItem.estado"
                      :label="$t('aula.ESTADO')"
                      :rules="[
                        (v) => !!v || $t('aula.EstadoRequerido'),
                      ]"
                      dense
                    ></v-select>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                {{ $t('aula.Cancelar') }}
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="save"
              >
                {{ $t('aula.'+(editedIndex === -1 ? 'Guardar' : 'Actualizar')) }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">{{ $t('aula.LetreroEliminar') }}</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">{{ $t('aula.Cancelar') }}</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">{{ $t('aula.Confirmar') }}</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="dialogSalir" max-width="685px">
          <v-card>
            <v-card-title class="text-h5">{{ $t("aula.LetreroSalir") }}</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeSalir" >{{ $t("aula.Cancelar")  }}</v-btn>
              <v-btn color="blue darken-1" text @click="salirItemConfirm">{{ $t("aula.Confirmar") }}</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="dialogSubscribe" max-width="650px">
          <v-card>
            <v-card-title class="text-h5">{{ $t("aula.LetreroSubscribir") }}</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeSubscribe" >{{ $t("aula.Cancelar")  }}</v-btn>
              <v-btn color="blue darken-1" text @click="subscribeItemConfirm">{{ $t("aula.Confirmar") }}</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>

      </v-toolbar>
    </template>

    <template v-slot:[`item.acciones`]="{ item }">

      <v-tooltip
        v-if="item.rol=='a:Creador' || item.rol=='b:Colaborador' || item.rol=='c:Participante'"
        top
      >
        <template v-slot:activator="{ on, attrs }">
          <v-icon
            @click="viewItem(item)"
            v-bind="attrs"
            v-on="on"
          >
            mdi-eye
          </v-icon>
        </template>
        <span>{{ $t('aula.Ver') }}</span>
      </v-tooltip>

      <v-tooltip
        v-if="item.rol=='c:Participante'"
        top
      >
        <template v-slot:activator="{ on, attrs }">
          <v-icon
            @click="salirItem(item)"
            v-bind="attrs"
            v-on="on"
          >
            mdi-location-exit
          </v-icon>
        </template>
        <span>{{ $t('aula.Salir') }}</span>
      </v-tooltip>

      <v-tooltip
        v-if="item.rol=='d:Otro'"
        top
      >
        <template v-slot:activator="{ on, attrs }">
          <v-icon
            @click="subscribeItem(item)"
            v-bind="attrs"
            v-on="on"
          >
            mdi-clipboard-edit-outline
          </v-icon>
        </template>
        <span>{{ $t('aula.Subscribir') }}</span>
      </v-tooltip>

      <v-tooltip
        v-if="item.rol=='a:Creador' || item.rol=='b:Colaborador'"
        top
      >
        <template v-slot:activator="{ on, attrs }">
          <v-icon
            @click="editItem(item)"
            v-bind="attrs"
            v-on="on"
          >
            mdi-pencil
          </v-icon>
        </template>
        <span>{{ $t('aula.Modificar') }}</span>
      </v-tooltip>

      <v-tooltip
        v-if="item.rol=='a:Creador' && item.participantes.length==0"
        top
      >
        <template v-slot:activator="{ on, attrs }">
          <v-icon
            @click="deleteItem(item)"
            v-bind="attrs"
            v-on="on"
          >
            mdi-delete
          </v-icon>
        </template>
        <span>{{ $t('aula.Eliminar') }}</span>
      </v-tooltip>

    </template>

    <template v-slot:no-data>
      {{ $t('aula.NoData') }}<br>
      <v-btn
        color="primary"
        nuxt
        to="/login"
        v-if="!($auth && $auth.user && $auth.user.username)"
      >
        <v-icon>mdi-account-key</v-icon> {{ $t('login.Login') }}
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
export default {
  data: () => ({
    user: '*',
    dialog: false,
    dialogSalir: false,
    dialogSubscribe: false,
    dialogDelete: false,
    headers: [
      { text: 'CLAVE'        , value: 'clave'            , divider: true , align: 'start'},
      { text: 'NOMBRE'       , value: 'nombre'           , divider: true},
      { text: 'DESCRIPCIÓN'  , value: 'descripcion'      , divider: true},
      { text: 'CREADORES'    , value: 'creadores'        , divider: true},
      { text: 'PARTICIPANTES', value: 'participantes'                   , align: 'center', width: '140px'},
      { text: ''             , value: 'data-table-expand', divider: true},
      { text: 'ROL'          , value: 'rol'              , divider: true},
      { text: 'ACTIVIDADES'  , value: 'actividades'      , divider: true, align: 'center', width: '140px'},
      { text: 'ESTADO'       , value: 'estado'           , divider: true},
      { text: 'ACCIONES'     , value: 'acciones'         , divider: true , sortable: false },
    ],
    items: [],
    estados: [],
    editedAula: { id: '', clave: ''},
    editedIndex: -1,
    defaultItem: { clave: '(AUTO)', nombre: '', descripcion: '', estado: '1'},
    editedItem: { clave: '(AUTO)', nombre: '', descripcion: '', estado: '1'},
  }),
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'NuevaAula' : 'EditarAula'
    },
  },

  watch: {
    dialog (val) {
      this.cargarEstados();
      val || this.close()
    },
    dialogSalir (val) {
      val || this.closeSalir()
    },
    dialogSubscribe (val) {
      val || this.closeSubscribe()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    },
  },

  mounted() {
    this.cargarAulas()
  },

  methods: {
    async cargarAulas() {
      if(this.$auth!=undefined && this.$auth.user!=undefined && this.$auth.user.username!=undefined && this.$auth.user.token!=undefined) {
        await this.$axios
        .post ('/aula/', { username: this.$auth.user.username, token: this.$auth.user.token })
        .then (response => {this.items = response.data})
        .catch(error    => {console.log("ERROR: "+error);})
      } else this.userInit();
    },

    async userInit() {
      if(this.$auth!=undefined && this.$auth.user!=undefined && this.$auth.user.token==undefined && localStorage!=undefined && localStorage['auth._token.local']!=undefined && localStorage['auth._token.local']!='false' && localStorage['auth._user.local']!=undefined && localStorage['auth._user.local']!='false') {
        await this.$axios
          .post('/auth/refresh', { username: localStorage['auth._user.local'], token: localStorage['auth._token.local'] })
          .then(response => this.setToken(response.data[0]))
      }
    },

    setToken(user) {
      if(user.token != undefined) {
        const token = user.token;
        this.$auth.setUserToken(token)
          .then(() => {
            if(this.$auth.loggedIn) {
              //this.$toast.success(this.$t('login.Iniciado'));
              this.intentos = 0;
              this.$auth.setUser(user);
              localStorage.setItem('auth._user.local', user.username);
              this.cargarAulas();
            }
          })
          .catch(e => console.log("FAIL: " + e.message));
      }
    },
    async cargarEstados() {
      this.estados = [];
      this.estados.push({text: this.$t('estado.Activo'), value: '1'});
      this.estados.push({text: this.$t('estado.Inactivo'), value: '0'});
    },
    async viewItem (item) {
      localStorage.setItem('aula', item.id);
      this.$router.push('/actividad');
    },
    async salirItemConfirm () {
      await this.$axios
        .post ('/aula/', { username: this.$auth.user.username, token: this.$auth.user.token, salir: {"id" : this.editedAula.id, "clave" : this.editedAula.clave} })
        .then (response => {this.items = response.data;})
        .catch(error    => {console.log("ERROR: "+error);});
      this.closeSalir();
    },
    async subscribeItemConfirm () {
      await this.$axios
        .post ('/aula/', { username: this.$auth.user.username, token: this.$auth.user.token, subscribe: {"id" : this.editedAula.id, "clave" : this.editedAula.clave} })
        .then (response => {this.items = response.data;})
        .catch(error    => {console.log("ERROR: "+error);});
      this.closeSubscribe();
    },
    async editItem (item) {
      this.cargarEstados();
      this.editedIndex = this.items.indexOf(item);
      this.editedItem  = Object.assign({}, item);
      this.editedItem.estado  = this.estados.find(e => e.text == this.$t('estado.'+item.estado)).value;
      this.dialog = true;
    },

    salirItem (item) {
      this.editedAula   = item;
      this.dialogSalir  = true;
    },

    subscribeItem (item) {
      this.editedAula      = item;
      this.dialogSubscribe = true;
    },

    deleteItem (item) {
      this.editedIndex  = this.items.indexOf(item);
      this.editedItem   = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm () {
      this.items.splice(this.editedIndex, 1);
      this.closeDelete();
    },
    close () {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem  = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      })
    },
    closeSalir () {
      this.dialogSalir = false;
    },
    closeSubscribe () {
      this.dialogSubscribe = false;
    },
    closeDelete () {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem  = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      })
    },
    async save () {
      if(this.editedIndex === -1) {
        if(this.editedItem.nombre!='' && this.editedItem.descripcion.length>=15 && this.editedItem.estado!='') {
          await this.$axios
            .post ('/aula/', { username: this.$auth.user.username, token: this.$auth.user.token, nueva: this.editedItem })
            .then (response => {this.items = response.data; this.close();})
            .catch(error    => {console.log("ERROR: "+error);})
        }
      } else {
        if(this.editedItem.clave.length>=8 && this.editedItem.nombre!='' && this.editedItem.descripcion.length>=15 && this.editedItem.estado!='') {
          await this.$axios
            .post ('/aula/', { username: this.$auth.user.username, token: this.$auth.user.token, edita: this.editedItem })
            .then (response => {this.items = response.data; this.close();})
            .catch(error    => {console.log("ERROR: "+error);})
        }
      }
    },
  },
  name: 'AulaPage',
}
</script>
