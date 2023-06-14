<template>
  <v-item-group>
    <v-container>
      <v-row>
        <v-col v-for="(item, index) in items" :key="index"
            cols="12"
            md="4">
          <v-card
            class="mx-auto elevation-10"
            :style="item.claro"
            outlined
          >
            <v-list-item three-line>
              <v-list-item-content>
                <div class="text-overline mb-4">
                  {{ item.orden }}
                </div>
                <v-list-item-title class="text-h5 mb-1">
                  {{ $t('proceso.'+item.nombre) }}
                </v-list-item-title>
                <v-list-item-subtitle>{{ $i18n.locale==='en' ? item.description : item.descripcion }}</v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-avatar
                class="rounded-lg elevation-10"
                tile
                size="80"
                :color="item.color"
              ></v-list-item-avatar>
            </v-list-item>

            <v-card-actions>
              <v-btn
                outlined
                rounded
                text
              >
                #{{ item.id }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-item-group>
</template>

<script>
export default {
  data: () => ({
    items: null,
  }),
  methods: {
    async fetchSomething() {
      //const items = await this.$axios.$get('http://sipo.villahermosa.tecnm.mx/vue/estado')
      //const items = await this.$axios.$get('http://basic.test/vue/estado')
      //const items = await this.$axios.$get('http://basic.test/vue/palabra/?id=Recordar&tipo=Acci%C3%B3n')
      const view = this
      //await this.$axios.$get('api/proceso')
      //await this.$axios.$get('api/palabra/Crear')
      //await this.$axios.$get('api/estado/2')
      //await this.$axios.$get('api/estado')
                       //.$get ('api/orden/1')
                       //.$get ('orden/1')
                       //.$get ('proceso')
      await this.$axios
        .$get ('proceso')
        .then (response => {view.items = response})
        .catch(error    => {console.log("ERROR: "+error);})
    },
  },
  mounted() {
    this.fetchSomething()
  },
  name: 'ProcesoPage',
}
</script>
