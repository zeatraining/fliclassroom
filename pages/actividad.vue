<template>
  <v-container>
<!-- aula -->
    <v-card :class="'mx-auto elevation-10 ' + aula.color" outlined>
      <v-list-item>
        <v-list-item-content>
          <div class="text-overline mb-4">
            {{ $t("actividad.AULA") }}
          </div>
          <v-list-item-title class="text-h5 mb-1">
            {{ $t("actividad.NOMBRE") }}: {{ aula.nombre }}
          </v-list-item-title>
        </v-list-item-content>

        <v-spacer />
        {{ $t("actividad.DESCRIPCIÓN") }}: {{ aula.descripcion }}

        <v-spacer />
        <v-btn outlined rounded text>
          {{ $t("actividad.CLAVE") }}: {{ aula.clave }}
        </v-btn>

        <v-spacer />
        <ul>
          <li v-for="item in aula.creadores">
            {{ item.usuario }} <i>({{ item.nombre }})</i>
          </li>
        </ul>
      </v-list-item>
    </v-card>

    <v-data-table
      :headers="headers"
      :items="items"
      item-key="id"
      show-expand
      item-class="color"
      class="elevation-3"
      :footer-props="{
        showFirstLastPage: true,
        itemsPerPageText: $t('actividad.ActividadesPáginas'),
      }"
    >
<!-- actividades headers -->
      <template v-slot:[`header.nombre`]="{ header }">
        {{ $t("actividad." + header.text) }}
      </template>

      <template v-slot:[`header.descripcion`]="{ header }">
        {{ $t("actividad." + header.text) }}
      </template>

      <template v-slot:[`header.proceso`] ="{ header }">
        {{ $t("actividad."+header.text) }}
      </template>

      <template v-slot:[`header.inicio`]="{ header }">
        {{ $t("actividad." + header.text) }}
      </template>

      <template v-slot:[`header.fin`]="{ header }">
        {{ $t("actividad." + header.text) }}
      </template>

      <template v-slot:[`header.recurso`]="{ header }">
        {{ $t("actividad." + header.text) }}
      </template>

      <template v-slot:[`header.instrumento`]="{ header }">
        {{ $t("actividad." + header.text) }}
      </template>

      <template v-slot:[`header.estado`]="{ header }">
        {{ $t("actividad." + header.text) }}
      </template>

      <template v-slot:[`header.integrantes`]="{ header }">
        {{ $t("actividad." + header.text) }}
      </template>

      <template v-slot:[`header.puntaje`]="{ header }">
        {{ $t("actividad." + header.text) }}
      </template>

      <template v-slot:[`header.acciones`]="{ header }">
        {{ $t("actividad." + header.text) }}
      </template>

      <template v-slot:[`header.data-table-expand`]="{ header }">
        {{ $t("actividad." + header.text) }}
      </template>

      <template v-slot:[`item.recurso`]="{ item }">
        {{ item.recurso.nombre }}
      </template>

      <template v-slot:[`item.instrumento`]="{ item }">
        {{ item.instrumento.nombre }}
      </template>

      <template v-slot:[`item.estado`]="{ item }">
        <v-chip
          class="elevation-3"
          :color="item.estado == 'Activo' ? 'success' : 'warning'"
          style="width: 100%; justify-content: center"
        >
          {{ $t("estado." + item.estado) }}
        </v-chip>
      </template>

      <template v-slot:[`item.integrantes`]="{ item }">
        {{ (aula.rol != 'a:Creador' && aula.rol != 'b:Colaborador' ? item.equipo.length+'/' : '')+item.integrantes }}
      </template>

      <template v-slot:[`item.data-table-expand`]="{ item, expand, isExpanded }">
        <td style="width:100px;">
          <v-row>
            <v-col style="padding:0px;" v-if="aula.rol == 'a:Creador' || aula.rol == 'b:Colaborador'">
              <v-icon @click="editItem(item)"> mdi-pencil </v-icon>
            </v-col>
            <v-col style="padding:0px;" v-if="aula.rol == 'a:Creador' && aula.participantes.length == 0">
              <v-icon @click="deleteItem(item)"> mdi-delete </v-icon>
            </v-col>
            <v-col style="padding:0px;">
              <v-btn icon
                @click="expand(!isExpanded)"
                class="v-data-table__expand-icon"
                :class="{'v-data-table__expand-icon--active' : isExpanded}"
                style="padding:0px;"
                small
              >
                <v-icon>mdi-chevron-down</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </td>
      </template>
<!-- DIALOGOS -->

      <template v-slot:expanded-item="{ headers, item }">
        <td
          :colspan="headers.length"
          style="vertical-align: top;"
          :id="item.id"
        >
          <table width="100%">
            <tr style="outline: 2px solid black; background: red;" :class="item.color">
              <td style="padding: 10px;">
                <center>
                  <h4>{{ $t("actividad.RECURSO") }}</h4>
                  <v-img :src="item.recurso.ruta" class="elevation-5" style="height:320px; border: 1px solid gray;"></v-img>
                  <v-row v-if="aula.rol == 'a:Creador' || aula.rol == 'b:Colaborador'">
                    <v-col cols="6">
                      <v-btn color="primary"   @click="editItemRecurso(item)">{{ $t('actividad.EditarRecurso')}}</v-btn>
                    </v-col>
                    <v-col cols="6">
                      <v-btn color="secondary" @click="newItemRecurso(item)" >{{ $t('actividad.NuevoRecurso') }}</v-btn>
                    </v-col>
                  </v-row>
                </center>
              </td>
              <td style="padding: 10px;">
                <center>
                  <h4>{{ $t("actividad.INSTRUMENTO") }}</h4>
                  <embed :src="item.instrumento.ruta" class="elevation-5" width="100%" height="320px" type="application/pdf">
                  <v-row v-if="aula.rol == 'a:Creador' || aula.rol == 'b:Colaborador'">
                    <v-col cols="6">
                      <v-btn color="primary"   @click="editItemInstrumento(item)">{{ $t('actividad.EditarInstrumento')}}</v-btn>
                    </v-col>
                    <v-col cols="6">
                      <v-btn color="secondary" @click="newItemInstrumento(item)" >{{ $t('actividad.NuevoInstrumento') }}</v-btn>
                    </v-col>
                  </v-row>
                </center>
              </td>

              <td style="padding: 10px;" v-if="aula.rol == 'a:Creador' || aula.rol == 'b:Colaborador'">
                <center>
                  <h4>{{ $t("aula.PARTICIPANTES") }}</h4>
                  <v-data-table
                    :headers="[
                      { text: '#'                     , value: 'index'   , divider: true, align: 'end', width: '80px', },
                      { text: $t('actividad.NOMBRE')  , value: 'nombre'  , divider: true, },
                      { text: $t('actividad.USUARIO') , value: 'usuario' , divider: true, },
                    ]"
                    :items="aula.participantes"
                    :footer-props="{
                      showFirstLastPage: true,
                      itemsPerPageText: $t('actividad.IntegrantesPáginas'),
                    }"
                    class="table table-striped elevation-10"
                    dense
                    style="height:320px;"
                  >
                    <template v-slot:[`item.index`]="{ item }">
                      <center> {{ item.index }} </center>
                    </template>

                    <template v-slot:[`item.nombre`]="{ item }">
                      {{ item.usuario == $auth.user.username ? $t("aula.Yo") : item.nombre }}
                    </template>

                    <template v-slot:[`item.usuario`]="{ item }">
                      {{ item.usuario == $auth.user.username ? $t("aula.Yo") : item.usuario }}
                    </template>
                  </v-data-table>
                </center>
              </td>
              <td style="padding: 10px;" v-if="aula.rol == 'c:Participante'">
                <center>
                  <h4>{{ $t("actividad.INTEGRANTES") }}</h4>

                  <v-data-table
                    :headers="[
                      { text: '#'                     , value: 'index'   , divider: true, align: 'end', width: '80px', },
                      { text: $t('actividad.NOMBRE')  , value: 'nombre'  , divider: true, },
                      { text: $t('actividad.ROL')     , value: 'rol'     , divider: true  },
                      { text: $t('actividad.USUARIO') , value: 'usuario' , divider: true, },
                      { text: $t('actividad.ACCIONES'), value: 'acciones', divider: true, },
                    ]"
                    :items="item.equipo"
                    :footer-props="{
                      showFirstLastPage: true,
                      itemsPerPageText: $t('actividad.IntegrantesPáginas'),
                    }"
                    class="table table-striped elevation-10"
                    dense
                    style="height:320px;"
                  >
                    <template v-slot:[`item.index`]="{ item }">
                      <center>
                        {{ item.index }}
                      </center>
                    </template>

                    <template v-slot:[`item.nombre`]="{ item }">
                      {{ item.usuario == $auth.user.username ? $t("aula.Yo") : item.nombre }}
                    </template>

                    <template v-slot:[`item.rol`]="{ item }">
                      {{ $t("actividad."+item.rol) }}
                    </template>

                    <template v-slot:[`item.usuario`]="{ item }">
                      {{ item.usuario == $auth.user.username ? $t("aula.Yo") : item.usuario }}
                    </template>

                    <template v-slot:[`item.acciones`]="{ item }">
                      <v-icon
                        @click="editMiembro(item)"
                      >
                        mdi-delete
                      </v-icon>
                    </template>
                  </v-data-table>

                  <v-btn v-if='item.integrantes-item.equipo.length>0' color="primary" @click="newItemMiembro(item)">{{ $t('actividad.NUEVO_INTEGRANTE') + ' (' + (item.integrantes-item.equipo.length) + ')'}}</v-btn>
                </center>
              </td>
            </tr>

            <tr :class="item.color" style="outline: 2px solid black;">
              <td colspan="3" style="padding: 10px;">
                <center>
                  <v-row>
                    <v-col>
                      <h4>{{ $t("actividad.EVIDENCIAS") }}</h4>
                    </v-col>
                    <v-col cols=2 v-if="aula.rol == 'c:Participante'"  style="text-align-last: end;">
                      <v-btn color="primary" @click="ItemEvidencia(item)" >{{ $t('actividad.NuevaEvidencia') }}</v-btn>
                    </v-col>
                  </v-row>

                  <v-data-table
                    :headers="[
                      { text: '#'                         , value: 'index'       , divider: true, align: 'end', width: '80px', },
                      { text: $t('actividad.USUARIO')     , value: 'usuario'     , divider: true, align: aula.rol == 'a:Creador' || aula.rol == 'b:Colaborador' ? '' : ' d-none'},
                      { text: $t('actividad.NOMBRE')      , value: 'nombre'      , divider: true, },
                      { text: $t('actividad.ESTADO')      , value: 'estado'      , divider: true, width: '120px' },
                      { text: $t('actividad.EVIDENCIA')   , value: 'archivo'     , divider: true, sortable: false },
                      { text: $t('actividad.ACCIONES')    , value: 'acciones'    , divider: true, sortable: false },
                    ]"
                    :items="item.evidencias"
                    :footer-props="{
                      showFirstLastPage: true,
                      itemsPerPageText: $t('actividad.EvidenciasPáginas'),
                    }"
                    class="elevation-10"
                    dense
                  >
                    <template v-slot:[`item.usuario`]="{ item }">
                      <b>{{ item.evidencia.usuario.usuario }}</b><br>
                      {{ item.evidencia.usuario.nombre }}<br><br>
                      <b>{{ $t("actividad.INTEGRANTES") }}:</b><br>
                      <ul>
                        <li v-for="item in item.evidencia.equipo">
                          {{ item.usuario }} <i>({{ $t('actividad.'+item.rol) }})</i>
                        </li>
                      </ul>
                    </template>

                    <template v-slot:[`item.nombre`]="{ item }">
                      <b>{{ item.evidencia.nombre }}</b><br>
                      {{ item.evidencia.descripcion }}
                    </template>

                    <template v-slot:[`item.estado`]="{ item }">
                      <center>
                        <v-btn
                          v-if="item.evidencia.entregada==''"
                          class="elevation-3"
                          :color="(item.evidencia.estado == 'Iniciada' ? 'warning' : 'default')"
                          style="width: 100%; font-size: 10px;"
                        >
                          {{ $t("estado." + item.evidencia.estado) }}
                        </v-btn>
                        <v-btn
                          v-if="item.evidencia.entregada!=''"
                          class="elevation-3"
                          color="info"
                          style="width: 100%; font-size: 10px;"
                        > {{ $t("estado.Entregada") }}<br>{{ item.evidencia.entregada }}
                        </v-btn>
                        <v-btn
                          v-if="item.evidencia.calificada!=''"
                          class="elevation-3"
                          color="success"
                          style="width: 100%; font-size: 10px;"
                        > {{ $t("estado.Calificada") }}<br>{{ item.evidencia.calificada }}
                        </v-btn>
                        <v-btn
                          v-if="item.evidencia.calificada!=''"
                          class="elevation-3"
                          color='primary'
                          style="width: 100%; font-size: 10px;"
                        > {{ $t("actividad.CALIFICACIÓN")+': '+item.evidencia.calificacion+'/'+item.evidencia.puntaje  }}
                        </v-btn>
                      </center>
                    </template>

                    <template v-slot:[`item.archivo`]="{ item }">
                      <embed :src="item.evidencia.archivo.ruta" class="elevation-5" width="100%" height="300" type="application/pdf">
                    </template>

                    <template v-slot:[`item.acciones`]="{ item }">
                      <center>
                        <v-btn
                          color="primary"
                          v-if="aula.rol == 'a:Creador' || aula.rol == 'b:Colaborador'"
                          dark
                          class="mb-2"
                          @click="ItemEvidencia(item)"
                        >
                          {{ $t('actividad.Calificar') }}
                        </v-btn>
                        <v-btn
                          color="secondary"
                          v-if="aula.rol == 'c:Participante' && item.evidencia.estado != 'Calificada'"
                          dark
                          class="mb-2"
                          @click="ItemEvidencia(item)"
                        >
                          {{  $t('actividad.Actualizar') }}
                        </v-btn>
                      </center>
                    </template>
                  </v-data-table>
                </center>
              </td>
            </tr>
          </table>
        </td>
      </template>

      <template v-slot:top>
        <v-toolbar
          flat
          v-if="$auth && $auth.loggedIn && $auth.user && $auth.user.username"
          class="elevation-3"
        >
          <v-toolbar-title>{{ $t("actividad.Título") }}</v-toolbar-title>
<!-- evidencia -->
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>

          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
                :disabled="aula.rol != 'a:Creador' && aula.rol != 'b:Colaborador'"
              >
                {{ $t("actividad.NuevaActividad") }}
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ $t("actividad." + formTitle) }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.nombre"
                        :label="$t('actividad.NOMBRE')"
                        :rules="[
                          (v) => !!v || $t('actividad.NombreRequerido'),
                          (v) => (v && v.length >= 10) || $t('actividad.NombreVálido'),
                        ]"
                        maxlength="50"
                        counter
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.descripcion"
                        :label="$t('actividad.DESCRIPCIÓN')"
                        :rules="[
                          (v) => !!v || $t('actividad.DescripcionRequerida'),
                          (v) => (v && v.length >= 15) || $t('actividad.DescripcionVálida'),
                        ]"
                        maxlength="255"
                        counter
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                    >
                      <v-select
                        :items="procesos"
                        v-model="editedItem.proceso"
                        :label="$t('actividad.PROCESO')"
                        :rules="[
                          (v) => !!v || $t('actividad.ProcesoRequerido'),
                        ]"
                        :value="editedItem.proceso"
                        dense
                      ></v-select>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field
                        v-model="editedItem.inicioFecha"
                        :label="$t('actividad.INICIOFECHA')"
                        :rules="[
                          (v) => !!v || $t('actividad.InicioFechaRequerida'),
                          (v) => (v && v.length == 10) || $t('actividad.InicioFechaVálida'),
                        ]"
                        type="date"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field
                        v-model="editedItem.inicioHora"
                        :label="$t('actividad.INICIOHORA')"
                        :rules="[
                          (v) => !!v || $t('actividad.InicioHoraRequerida'),
                          (v) => (v && v.length == 5) || $t('actividad.InicioHoraVálida'),
                        ]"
                        type="time"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field
                        v-model="editedItem.finFecha"
                        :label="$t('actividad.FINFECHA')"
                        :rules="[
                          (v) => !!v || $t('actividad.FinFechaRequerida'),
                          (v) => (v && v.length == 10) || $t('actividad.FinFechaVálida'),
                        ]"
                        type="date"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field
                        v-model="editedItem.finHora"
                        :label="$t('actividad.FINHORA')"
                        :rules="[
                          (v) => !!v || $t('actividad.FinHoraRequerida'),
                          (v) => (v && v.length == 5) || $t('actividad.FinHoraVálida'),
                        ]"
                        type="time"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field
                        v-model="editedItem.puntaje"
                        :label="$t('actividad.PUNTAJE')"
                        :rules="[(v) => (v>=0 && v<=100) || $t('actividad.PuntajeRequerido')]"
                        type="number"
                        min="0"
                        max="100"
                        dense
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-select
                        :items="integrantes"
                        v-model="editedItem.integrantes"
                        :label="$t('actividad.INTEGRANTES')"
                        :rules="[(v) => !!v || $t('actividad.IntegrantesRequerido')]"
                        dense
                      ></v-select>
                    </v-col>
                    <v-col cols="12">
                      <v-select
                        :items="estados"
                        v-model="editedItem.estado"
                        :label="$t('actividad.ESTADO')"
                        :rules="[(v) => !!v || $t('actividad.EstadoRequerido')]"
                        dense
                      ></v-select>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
                  {{ $t("actividad.Cancelar") }}
                </v-btn>
                <v-btn color="blue darken-1" text @click="save">
                  {{ $t("actividad." + (editedIndex === -1 ? "Guardar" : "Actualizar")) }}
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5">{{ $t("actividad.LetreroEliminar") }}</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"      >{{ $t("actividad.Cancelar")  }}</v-btn>
                <v-btn color="blue darken-1" text @click="deleteItemConfirm">{{ $t("actividad.Confirmar") }}</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-dialog v-model="dialogMiembro" max-width="500px">
            <v-card>
              <v-card-title class="text-h5">{{ $t("actividad.NUEVO_INTEGRANTE") }}</v-card-title>
              <v-card-text v-if="isMiembroNew">
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-select
                        :items="miembros"
                        v-model="miembro.usuario"
                        :label="$t('actividad.INTEGRANTE')"
                        :rules="[
                          (v) => !!v || $t('actividad.IntegranteRequerido'),
                          (v) => /.+@.+\..+/.test(v) || $t('login.CorreoVálido'),
                        ]"
                        dense
                      ></v-select>
                    </v-col>
                    <v-col cols="12">
                      <v-select
                        :items="roles"
                        v-model="miembro.rol"
                        :label="$t('actividad.ROL')"
                        :rules="[(v) => !!v || $t('actividad.RolRequerido')]"
                        dense
                      ></v-select>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-text v-else>
                <v-row>
                  <v-col
                    v-for="(item, index) in recursos"
                    :key="index"
                    class="d-flex child-flex"
                    cols="4"
                  >
                    <v-container>
                      <v-img
                        :src="item.ruta"
                        aspect-ratio="1"
                        class="grey lighten-2"
                      >
                        <template v-slot:placeholder>
                          <v-row
                            class="fill-height ma-0"
                            align="center"
                            justify="center"
                          >
                            <v-progress-circular
                              indeterminate
                              color="grey lighten-5"
                            ></v-progress-circular>
                          </v-row>
                        </template>
                      </v-img>
                      <v-label>
                        {{ item.nombre }}
                      </v-label>
                      <v-label>
                        {{ item.descripcion }}
                      </v-label>
                      <v-btn color="blue darken-1" text @click="saveRecurso(item)"> {{ $t("actividad.Elegir") }}</v-btn>
                    </v-container>
                  </v-col>
                </v-row>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeMiembro">{{ $t("actividad.Cancelar")  }}</v-btn>
                <v-btn color="blue darken-1" text @click="saveMiembro" >{{ $t("actividad.Confirmar") }}</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-dialog v-model="miembroDelete" max-width="600px">
            <v-card>
              <v-card-title class="text-h5">{{ $t("actividad.LetreroEliminarMiembro") }}</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeMiembro" >{{ $t("actividad.Cancelar")  }}</v-btn>
                <v-btn color="blue darken-1" text @click="deleteMiembro">{{ $t("actividad.Confirmar") }}</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-dialog v-model="dialogRecurso" max-width="500px">
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ $t("actividad.NuevoRecurso") }}</span>
              </v-card-title>

              <v-card-text v-if="isRecursoNew">
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        v-model="recurso.nombre"
                        :label="$t('actividad.NOMBRE')"
                        :rules="[
                          (v) => !!v || $t('actividad.NombreRequerido'),
                          (v) => (v && v.length >= 10) || $t('actividad.NombreVálido'),
                        ]"
                        maxlength="50"
                        counter
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="recurso.descripcion"
                        :label="$t('actividad.DESCRIPCIÓN')"
                        :rules="[
                          (v) => !!v || $t('actividad.DescripcionRequerida'),
                          (v) => (v && v.length >= 15) || $t('actividad.DescripcionVálida'),
                        ]"
                        maxlength="255"
                        counter
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-checkbox
                        v-model="recurso.publico"
                        :label="$t('actividad.PÚBLICO')"
                      ></v-checkbox>
                    </v-col>
                    <v-col cols="12">
                      <v-file-input
                        v-model="recurso.file"
                        accept="image/png, image/jpeg"
                        :label="$t('actividad.RECURSO')"
                        :rules="[
                          v => !v || v.size < 1000000 || $t('actividad.RecursoTamaño')
                        ]"
                        show-size
                        dense
                        chips
                        small-chips
                        truncate-length="15"
                      ></v-file-input>
                    </v-col>
                    <v-col cols="12">
                      <v-select
                        :items="estados"
                        v-model="recurso.estado"
                        :label="$t('actividad.ESTADO')"
                        :rules="[(v) => !!v || $t('actividad.EstadoRequerido')]"
                        dense
                      ></v-select>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-text v-else>
                <v-row>
                  <v-col
                    v-for="(item, index) in recursos"
                    :key="index"
                    class="d-flex child-flex"
                    cols="4"
                  >
                    <v-container>
                      <v-img
                        :src="item.ruta"
                        aspect-ratio="1"
                        class="grey lighten-2"
                      >
                        <template v-slot:placeholder>
                          <v-row
                            class="fill-height ma-0"
                            align="center"
                            justify="center"
                          >
                            <v-progress-circular
                              indeterminate
                              color="grey lighten-5"
                            ></v-progress-circular>
                          </v-row>
                        </template>
                      </v-img>
                      <v-label>
                        {{ item.nombre }}
                      </v-label>
                      <v-label>
                        {{ item.descripcion }}
                      </v-label>
                      <v-btn color="blue darken-1" text @click="saveRecurso(item)"> {{ $t("actividad.Elegir") }}</v-btn>
                    </v-container>
                  </v-col>
                </v-row>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn                     color="blue darken-1" text @click="closeRecurso">{{ $t("actividad.Cancelar")}}</v-btn>
                <v-btn v-if="isRecursoNew" color="blue darken-1" text @click="saveRecurso"> {{ $t("actividad.Guardar") }}</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-dialog v-model="dialogInstrumento" max-width="500px">
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ $t("actividad.NuevoInstrumento") }}</span>
              </v-card-title>

              <v-card-text v-if="isInstrumentoNew">
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        v-model="instrumento.nombre"
                        :label="$t('actividad.NOMBRE')"
                        :rules="[
                          (v) => !!v || $t('actividad.NombreRequerido'),
                          (v) => (v && v.length >= 10) || $t('actividad.NombreVálido'),
                        ]"
                        maxlength="50"
                        counter
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="instrumento.descripcion"
                        :label="$t('actividad.DESCRIPCIÓN')"
                        :rules="[
                          (v) => !!v || $t('actividad.DescripcionRequerida'),
                          (v) => (v && v.length >= 15) || $t('actividad.DescripcionVálida'),
                        ]"
                        maxlength="255"
                        counter
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-file-input
                        v-model="instrumento.file"
                        accept="image/pdf"
                        :label="$t('actividad.RECURSO')"
                        :rules="[
                          v => !v || v.size < 1000000 || $t('actividad.InstrumentoTamaño')
                        ]"
                        show-size
                        dense
                        chips
                        small-chips
                        truncate-length="15"
                      ></v-file-input>
                    </v-col>
                    <v-col cols="12">
                      <v-select
                        :items="estados"
                        v-model="instrumento.estado"
                        :label="$t('actividad.ESTADO')"
                        :rules="[(v) => !!v || $t('actividad.EstadoRequerido')]"
                        dense
                      ></v-select>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-text v-else>
                <v-row>
                  <v-col
                    v-for="(item, index) in instrumentos"
                    :key="index"
                    class="d-flex child-flex"
                    cols="4"
                  >
                    <v-container>
                      <embed
                        :src="item.ruta"
                        class="elevation-5"
                        width="100%"
                        height="100"
                        type="application/pdf"
                      >

                      <v-label>
                        {{ item.nombre }}
                      </v-label>
                      <v-label>
                        {{ item.descripcion }}
                      </v-label>
                      <v-btn color="blue darken-1" text @click="saveInstrumento(item)"> {{ $t("actividad.Elegir") }}</v-btn>
                    </v-container>
                  </v-col>
                </v-row>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn                         color="blue darken-1" text @click="closeInstrumento">{{ $t("actividad.Cancelar")}}</v-btn>
                <v-btn v-if="isInstrumentoNew" color="blue darken-1" text @click="saveInstrumento"> {{ $t("actividad.Guardar") }}</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
<!-- evidencias expand -->
          <v-dialog v-model="dialogEvidencia" max-width="500px">
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ $t("actividad."+(isEvidenciaNew ? "NuevaEvidencia" : "EditarEvidencia")) }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        v-model="evidencia.nombre"
                        :label="$t('actividad.NOMBRE')"
                        :rules="[
                          (v) => !!v || $t('actividad.NombreRequerido'),
                          (v) => (v && v.length >= 10) || $t('actividad.NombreVálido'),
                        ]"
                        maxlength="50"
                        counter
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="evidencia.descripcion"
                        :label="$t('actividad.DESCRIPCIÓN')"
                        :rules="[
                          (v) => !!v || $t('actividad.DescripcionRequerida'),
                          (v) => (v && v.length >= 15) || $t('actividad.DescripcionVálida'),
                        ]"
                        maxlength="255"
                        counter
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="evidencia.calificacion"
                        v-if="aula.rol == 'a:Creador' || aula.rol == 'b:Colaborador'"
                        :label="$t('actividad.CALIFICACIÓN')+'(Max:'+evidencia.puntaje+')'"
                        :rules="[
                          (v) => !!v || $t('actividad.CalificaciónRequerida'),
                          (v) => (v && v >= 0 && v <= evidencia.puntaje) || $t('actividad.CalificaciónVálida'),
                        ]"
                      ></v-text-field>

                      <v-label v-if="aula.rol == 'c:Participante'" style="font-size: 6px !important;">{{ !isEvidenciaNew ? '('+$t('actividad.ANTERIOR')+')' : '' }}</v-label>
                      <v-file-input
                        v-model="evidencia.file"
                        v-if="aula.rol == 'c:Participante'"
                        accept="image/pdf"
                        :label="$t('actividad.RECURSO')"
                        :rules="[
                          v => !v || v.size < 1000000 || $t('actividad.EvidenciaTamaño')
                        ]"
                        show-size
                        dense
                        chips
                        small-chips
                        truncate-length="15"
                      ></v-file-input>
                    </v-col>
                    <v-col cols="12">
                      <v-select
                        :items="estados"
                        v-model="evidencia.estado"
                        :label="$t('actividad.ESTADO')"
                        :rules="[(v) => !!v || $t('actividad.EstadoRequerido')]"
                        dense
                      ></v-select>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeEvidencia">{{ $t("actividad.Cancelar")}}</v-btn>
                <v-btn color="blue darken-1" text @click="saveEvidencia"
                      :disabled="evidencia.nombre.length < 10
                              || evidencia.descripcion.length < 15
                              || ((aula.rol == 'a:Creador' || aula.rol == 'b:Colaborador') && (evidencia.calificacion<0 || evidencia.calificacion>evidencia.puntaje))
                              || ((isEvidenciaNew && evidencia.file==null) || evidencia.estado=='')
                "> {{ $t("actividad.Guardar") }}</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>

      <template v-slot:no-data>
        {{ $t("actividad.NoData") }}<br>
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
  </v-container>
</template>

<style>
  tbody tr:nth-of-type(odd) {
    background-color: rgba(0, 0, 0, .05);
  }
</style>

<script>

export default {
// data
  data: () => ({
    user: "*",
    aula: { clave: "", nombre: "", descripcion: "", proceso: "" },
    dialog: false,
    dialogDelete: false,
    miembroDelete: false,
    isMiembroNew: false,
    isRecursoNew: false,
    isInstrumentoNew: false,
    isEvidenciaNew: false,
    dialogMiembro: false,
    dialogRecurso: false,
    dialogInstrumento: false,
    dialogEvidencia: false,
    headers: [
      { text: "NOMBRE"     , value: "nombre"           , divider: true, align: "start" },
      { text: "DESCRIPCIÓN", value: "descripcion"      , divider: true },
      { text: 'PROCESO'    , value: 'proceso'          , divider: true},
      { text: "INICIO"     , value: "inicio"           , divider: true },
      { text: "FIN"        , value: "fin"              , divider: true },
      { text: "RECURSO"    , value: "recurso"          , divider: true },
      { text: "INSTRUMENTO", value: "instrumento"      , divider: true },
      { text: "ESTADO"     , value: "estado"           , divider: true },
      { text: "INTEGRANTES", value: "integrantes"      , divider: true, align: "center" },
      { text: "PUNTAJE"    , value: "puntaje"          , divider: true, align: "center" },
      { text: "ACCIONES"   , value: "data-table-expand", sortable: false }
    ],
    items: [],
    procesos: [],
    estados: [],
    integrantes: [],
    miembros: [],
    roles: [],
    recursos: [],
    instrumentos: [],
    miembro     : { id: 0, actividad: "", usuario: "", rol: "", id: "" },
    recurso     : { id: 0, actividad: "", nombre: "", descripcion: "", publico: false, file: "", estado: "1" },
    instrumento : { id: 0, actividad: "", nombre: "", descripcion: "", file: "", estado: "1" },
    evidencia   : { id: 0, actividad: "", nombre: "", descripcion: "", file: "", estado: "1", calificacion: "0" , puntaje: "0" },
    editedIndex: -1,
    defaultItem: { clave: "(AUTO)", nombre: "", descripcion: "", proceso: '', estado: "1", inicioFecha: "", inicioHora: "", finFecha: "", finHora: "", integrantes: "1", puntaje: "0" },
    editedItem : { clave: "(AUTO)", nombre: "", descripcion: "", proceso: '', estado: "1", inicioFecha: "", inicioHora: "", finFecha: "", finHora: "", integrantes: "1", puntaje: "0" },
  }),

//metodos
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "NuevaActividad" : "EditarActividad";
    },
  },

  watch: {
    dialog(val) {
      this.cargarProcesos();
      this.cargarEstados();
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
    dialogMiembro(val) {
      val || this.closeMiembro();
    },
    dialogRecurso(val) {
      val || this.closeRecurso();
    },
    dialogInstrumento(val) {
      val || this.closeInstrumento();
    },
    dialogEvidencia(val) {
      val || this.closeEvidencia();
    },
  },

  mounted() {
    this.cargarActividades();
  },

  methods: {


    async cargarActividades() {
      if (
        this.$auth != undefined &&
        this.$auth.user != undefined &&
        this.$auth.user.username != undefined &&
        this.$auth.user.token != undefined &&
        localStorage != undefined &&
        localStorage.aula != undefined
      ) {
        await this.$axios
          .post("/aula/", {
            username: this.$auth.user.username,
            token: this.$auth.user.token,
            aula: localStorage.aula,
          })
          .then((response) => {
            this.aula = response.data[0];
            this.$axios
              .post("/actividad/", {
                username: this.$auth.user.username,
                token: this.$auth.user.token,
                aula: localStorage.aula,
              })
              .then((response) => {
                this.items = response.data;
              })
              .catch((error) => {
                console.error("ERROR: " + error);
              });
          })
          .catch((error) => {
            console.error("ERROR: " + error);
          });
      } else this.userInit();
    },

    async userInit() {
      if (
        this.$auth != undefined &&
        this.$auth.user != undefined &&
        this.$auth.user.token == undefined &&
        localStorage != undefined &&
        localStorage["auth._token.local"] != undefined &&
        localStorage["auth._token.local"] != "false" &&
        localStorage["auth._user.local"]  != undefined &&
        localStorage["auth._user.local"]  != "false"
      ) {
        await this.$axios
          .post("/auth/refresh", {
            username: localStorage["auth._user.local"],
            token: localStorage["auth._token.local"],
          })
          .then((response) => this.setToken(response.data[0]));
      }
    },

    setToken(user) {
      if (user.token != undefined) {
        const token = user.token;
        this.$auth
          .setUserToken(token)
          .then(() => {
            if (this.$auth.loggedIn) {
              this.intentos = 0;
              this.$auth.setUser(user);
              localStorage.setItem("auth._user.local", user.username);
              this.cargarActividades();
            }
          })
          .catch((e) => console.error("FAIL: " + e.message));
      }
    },
    cargarEstados() {
      this.roles = [];
      this.roles.push({text: this.$t('actividad.Integrante') , value: 'Integrante' })
      this.roles.push({text: this.$t('actividad.Responsable'), value: 'Responsable' })
      this.roles.push({text: this.$t('actividad.Colaborador'), value: 'Colaborador' })
      this.roles.push({text: this.$t('actividad.Moderador')  , value: 'Moderador' })

      this.estados = [];
      this.estados.push({ text: this.$t("estado.Activo"), value: "1" });
      this.estados.push({ text: this.$t("estado.Inactivo"), value: "0" });
      this.estados.push({ text: this.$t("estado.Iniciada"), value: "2" });
      this.estados.push({ text: this.$t("estado.Programada"), value: "3" });
      this.estados.push({ text: this.$t("estado.Calificada"), value: "4" });

      this.integrantes = [];
      this.integrantes.push({ text: this.$t("actividad.Ninguno"), value: "0", });
      this.integrantes.push({ text: this.$t("actividad.Individual"), value: "1", });
      this.integrantes.push({ text: this.$t("actividad.Parejas"), value: "2" });
      this.integrantes.push({ text: this.$t("actividad.Tres"), value: "3" });
      this.integrantes.push({ text: this.$t("actividad.Cuatro"), value: "4" });
      this.integrantes.push({ text: this.$t("actividad.Cinco"), value: "5" });
    },
    async cargarProcesos() {
      await this.$axios
        .$get ('proceso')
        .then (response => {
          this.procesos = [];
          response.forEach(pro => {
            this.procesos.push({text: this.$t('proceso.'+pro.nombre), value: `${pro.id}`});
          });
        })
        .catch(error => {console.error("ERROR: "+error);})
    },
    async cargarMiembros() {
      this.miembros = [];
      this.aula.participantes.forEach(par => {
        this.miembros.push({text: `${par.nombre}`, value: `${par.usuario}`});
      });
    },
    async viewItem(item) {
      this.$toast.error(";) Proceso pendiente...");
    },
    async editItem(item) {
      await this.cargarProcesos();
      await this.cargarEstados();
      this.editedIndex            = this.items.indexOf(item);
      this.editedItem             = Object.assign({}, item);
      this.editedItem.proceso     = this.procesos.find(e => e.text == this.$t('proceso.'+item.proceso)).value;
      this.editedItem.inicioFecha = item.inicio.substring(0, 10);
      this.editedItem.inicioHora  = item.inicio.substring(11, 16);
      this.editedItem.finFecha    = item.fin.substring(0, 10);
      this.editedItem.finHora     = item.fin.substring(11, 16);
      this.editedItem.estado      = this.estados.find(e => e.text == this.$t("estado." + item.estado)).value;
      this.editedItem.integrantes = this.integrantes[item.integrantes].value
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.items.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    deleteItemConfirm() {
      this.items.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    async newItemMiembro(item) {
      await this.cargarMiembros();
      await this.cargarEstados();
      this.miembro.actividad   = item.id;
      this.miembro.usuario     = '';
      this.miembro.rol         = 'Integrante';
      this.isMiembroNew        = true;
      this.dialogMiembro       = true;
    },

    editMiembro(item) {
      this.miembro.actividad = item.acti;
      this.miembro.usuario   = item.usuario;
      this.miembro.id        = item.id;
      this.miembroDelete     = true;
    },

    async deleteMiembro() {
      if(
        this.miembro.actividad != '' &&
        this.miembro.usuario != '' &&
        this.miembro.id != ''
      ){
        let formData = new FormData()
        formData.append("username", this.$auth.user.username)
        formData.append("token", this.$auth.user.token)
        formData.append("aula", localStorage.aula)
        formData.append("actividad", this.miembro.actividad)
        formData.append("miembroEdit", 'miembroEdit')
        formData.append("usuario", this.miembro.usuario)
        formData.append("id", this.miembro.id)

        await this.$axios
          .post("/actividad/", formData)
          .then((response) => {
            this.items = response.data;
            this.closeMiembro();
          })
          .catch((error) => {
            console.error("ERROR: " + error);
          });
      }
    },
    async editItemRecurso(item) {
      this.cargarEstados();
      this.recurso.actividad   = item.id;
      this.recurso.id          = item.recurso.id;
      this.recurso.nombre      = item.recurso.nombre;
      this.recurso.descripcion = item.recurso.descripcion;
      this.recurso.publico     = item.recurso.publico;
      this.recurso.file        = null;
      this.recurso.estado      = this.estados.find((e) => e.text == this.$t("estado." + item.estado)).value;

      this.$axios
        .post("/recurso/", {
          username: this.$auth.user.username,
          token: this.$auth.user.token,
          galeria: 'galeria',
        })
        .then((response) => {
          this.recursos = response.data;
          this.isRecursoNew  = false;
          this.dialogRecurso = true;
        })
        .catch((error) => {
          console.error("ERROR: " + error);
        });
    },
    async newItemRecurso(item) {
      this.cargarEstados();
      this.recurso.actividad   = item.id;
      this.recurso.nombre      = '';
      this.recurso.descripcion = '';
      this.recurso.publico     = true;
      this.recurso.file        = null;
      this.recurso.estado      = '1';
      this.isRecursoNew        = true;
      this.dialogRecurso       = true;
    },

    async editItemInstrumento(item) {
      this.cargarEstados();
      this.instrumento.actividad   = item.id;
      this.instrumento.id          = item.instrumento.id;
      this.instrumento.nombre      = item.instrumento.nombre;
      this.instrumento.descripcion = item.instrumento.descripcion;
      this.instrumento.file        = null;
      this.instrumento.estado      = this.estados.find((e) => e.text == this.$t("estado." + item.estado)).value;

      this.$axios
        .post("/instrumento/", {
          username: this.$auth.user.username,
          token: this.$auth.user.token,
          galeria: 'galeria',
        })
        .then((response) => {
          this.instrumentos = response.data;
          this.isInstrumentoNew  = false;
          this.dialogInstrumento = true;
        })
        .catch((error) => {
          console.error("ERROR: " + error);
        });
    },
    async newItemInstrumento(item) {
      this.cargarEstados();
      this.instrumento.actividad   = item.id;
      this.instrumento.nombre      = '';
      this.instrumento.descripcion = '';
      this.instrumento.file        = null;
      this.instrumento.estado      = '1';
      this.isInstrumentoNew        = true;
      this.dialogInstrumento       = true;
    },

//evidencia
    async ItemEvidencia(item) {
      this.cargarEstados();
      this.estados.push({ text: this.$t("estado.Entregada"), value: "5" });

      /* console.log("item.evidenciaitem.evidenciaitem.evidencia");
      console.log(item.evidencia);
      console.log("item.evidenciaitem.evidenciaitem.evidencia"); */

      let nuevo = item.id != undefined;
      this.evidencia.actividad   = nuevo  ? item.id : item.evidencia.actividad;
      this.evidencia.id          = nuevo  ? 0       : item.evidencia.id;
      this.evidencia.nombre      = nuevo  ? ''      : item.evidencia.nombre;
      this.evidencia.descripcion = nuevo  ? ''      : item.evidencia.descripcion;
      this.evidencia.file        = nuevo  ? null    : item.evidencia.file;
      this.evidencia.estado      = nuevo  ? '1'     : this.estados.find((e) => e.text == this.$t("estado." + item.evidencia.estado)).value;
      this.evidencia.calificacion= nuevo  ? 0       : item.evidencia.calificacion;
      this.evidencia.puntaje     = nuevo  ? 0       : item.evidencia.puntaje;
      this.evidencia.usuario     = nuevo  ? 0       : item.evidencia.usuario.id;

      this.estados = [];
      this.estados.push({ text: this.$t("estado.Inactivo" ), value: "0" });
      this.estados.push({ text: this.$t("estado.Iniciada" ), value: "2" });
      this.estados.push({ text: this.$t("estado.Entregada"), value: "5" });
      if(this.aula.rol == 'a:Creador' || this.aula.rol == 'b:Colaborador') {
        this.estados.push({ text: this.$t("estado.Calificada"), value: "4" });
      }
      this.isEvidenciaNew        = nuevo;
      this.dialogEvidencia       = true;
    },

//métodos
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    closeMiembro() {
      this.dialogMiembro = false;
      this.miembroDelete = false;
    },
    closeRecurso() {
      this.dialogRecurso = false;
    },
    closeInstrumento() {
      this.dialogInstrumento = false;
    },
    closeEvidencia() {
      this.dialogEvidencia = false;
    },

    async save() {
      if (this.editedIndex === -1) {
        if (
          this.editedItem.nombre.length >= 10 &&
          this.editedItem.descripcion.length >= 15 && this.editedItem.proceso!='' &&
          this.editedItem.inicioFecha.length == 10 && this.editedItem.inicioHora.length == 5 &&
          this.editedItem.finFecha.length == 10 && this.editedItem.finHora.length == 5 &&
          this.editedItem.puntaje >= 0 && this.editedItem.puntaje <= 100 &&
          this.editedItem.integrantes.length > 0 &&
          this.editedItem.estado != ""
        ) {
          this.editedItem.inicio = this.editedItem.inicioFecha + " " + this.editedItem.inicioHora + ":00";
          this.editedItem.fin    = this.editedItem.finFecha    + " " + this.editedItem.finHora    + ":00";
          await this.$axios
            .post("/actividad/", {
              username: this.$auth.user.username,
              token: this.$auth.user.token,
              aula: localStorage.aula,
              nueva: this.editedItem,
            })
            .then((response) => {
              this.items = response.data;
              this.close();
            })
            .catch((error) => {
              console.error("ERROR: " + error);
            });
        }
      } else {
        if (
          this.editedItem.nombre.length >= 10 &&
          this.editedItem.descripcion.length >= 15 && this.editedItem.proceso!='' &&
          this.editedItem.inicioFecha.length == 10 && this.editedItem.inicioHora.length == 5 &&
          this.editedItem.finFecha.length == 10 && this.editedItem.finHora.length == 5 &&
          this.editedItem.puntaje >= 0 && this.editedItem.puntaje <= 100 &&
          this.editedItem.integrantes.length > 0 &&
          this.editedItem.estado != ""
        ) {
          this.editedItem.inicio = this.editedItem.inicioFecha + " " + this.editedItem.inicioHora + ":00";
          this.editedItem.fin    = this.editedItem.finFecha    + " " + this.editedItem.finHora    + ":00";
          await this.$axios
            .post("/actividad/", {
              username: this.$auth.user.username,
              token: this.$auth.user.token,
              aula: localStorage.aula,
              edita: this.editedItem,
            })
            .then((response) => {
              this.items = response.data;
              this.close();
            })
            .catch((error) => {
              console.error("ERROR: " + error);
            });
        }
      }
    },
    async saveMiembro() {
      if(
        this.miembro.actividad != '' &&
        this.miembro.usuario != '' &&
        this.miembro.rol != ''
      ){
        let formData = new FormData()
        formData.append("username" , this.$auth.user.username)
        formData.append("token"    , this.$auth.user.token)
        formData.append("aula"     , localStorage.aula)
        formData.append("actividad", this.miembro.actividad)
        if(this.isMiembroNew) {
          formData.append("miembro", 'miembro')
          formData.append("usuario", this.miembro.usuario)
          formData.append("rol"    , this.miembro.rol)
        }

        await this.$axios
          .post("/actividad/", formData)
          .then((response) => {
            this.items = response.data;
            this.closeMiembro();
          })
          .catch((error) => {
            console.error("ERROR: " + error);
          });
      }
    },
    async saveRecurso(item) {
      if(
        this.recurso.actividad != '' &&
        this.recurso.nombre.length >= 10 &&
        this.recurso.descripcion.length >= 15 &&
        (this.recurso.file || (!this.isRecursoNew && item)) &&
        this.recurso.estado != ""
      ){
        let formData = new FormData()
        formData.append("username" , this.$auth.user.username)
        formData.append("token"    , this.$auth.user.token)
        formData.append("aula"     , localStorage.aula)
        formData.append("actividad", this.recurso.actividad)
        if(this.isRecursoNew) {
          formData.append("recurso"    , 'recurso')
          formData.append("nombre"     , this.recurso.nombre)
          formData.append("descripcion", this.recurso.descripcion)
          formData.append("publico"    , this.recurso.publico ? '1' : '0')
          formData.append("file"       , this.recurso.file)
          formData.append("estado"     , this.recurso.estado)
        } else {
          formData.append("galeria", 'galeria')
          formData.append("galeriaId", item.id)
        }

        await this.$axios
          .post("/actividad/", formData)
          .then((response) => {
            this.items = response.data;
            this.closeRecurso();
          })
          .catch((error) => {
            console.error("ERROR: " + error);
          });
      }
    },
    async saveInstrumento(item) {
      if(
        this.instrumento.actividad != '' &&
        this.instrumento.nombre.length >= 10 &&
        this.instrumento.descripcion.length >= 15 &&
        (this.instrumento.file || (!this.isInstrumentoNew && item)) &&
        this.instrumento.estado != ""
      ){
        let formData = new FormData()
        formData.append("username" , this.$auth.user.username)
        formData.append("token"    , this.$auth.user.token)
        formData.append("aula"     , localStorage.aula)
        formData.append("actividad", this.instrumento.actividad)
        if(this.isInstrumentoNew) {
          formData.append("instrumento", 'instrumento')
          formData.append("nombre"     , this.instrumento.nombre)
          formData.append("descripcion", this.instrumento.descripcion)
          formData.append("file"       , this.instrumento.file)
          formData.append("estado"     , this.instrumento.estado)
        } else {
          formData.append("galeriaInst", 'galeriaInst')
          formData.append("galeriaId", item.id)
        }

        await this.$axios
          .post("/actividad/", formData)
          .then((response) => {
            this.items = response.data;
            this.closeInstrumento();
          })
          .catch((error) => {
            console.error("ERROR: " + error);
          });
      }
    },
//evidencia

    async saveEvidencia(item) {
      if(
        this.evidencia.actividad != '' &&
        this.evidencia.nombre.length >= 10 &&
        this.evidencia.descripcion.length >= 15 &&
        (this.evidencia.file || (!this.isEvidenciaNew && item)) &&
        this.evidencia.estado != ""
      ){
        let formData = new FormData()
        formData.append("username"    , this.$auth.user.username)
        formData.append("token"       , this.$auth.user.token)
        formData.append("aula"        , localStorage.aula)
        formData.append("actividad"   , this.evidencia.actividad)
        formData.append("evidencia"   , 'evidencia')
        formData.append("accion"      , this.isEvidenciaNew ? 'nuevo' : 'edita')
        formData.append("id"          , this.evidencia.id)
        formData.append("nombre"      , this.evidencia.nombre)
        formData.append("descripcion" , this.evidencia.descripcion)
        formData.append("file"        , this.evidencia.file)
        formData.append("estado"      , this.evidencia.estado)
        formData.append("usuario"     , this.evidencia.usuario)
        formData.append("calificacion", this.evidencia.calificacion)

        /*for (const value of formData.values()) {
          console.log(value);
        }  this.$toast.error(";) Proceso pendiente...");*/

        await this.$axios
          .post("/actividad/", formData)
          .then((response) => {
            this.items = response.data;
            this.closeEvidencia();
          })
          .catch((error) => {
            console.error("ERROR: " + error);
          });
      }
    }
  },
  name: "ActividadPage",
};
</script>