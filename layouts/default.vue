<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
      class="sidebar"
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="$t('menu.'+item.title)" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
      class="navbar"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="clipped = !clipped"
      >
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="fixed = !fixed"
      >
        <v-icon>mdi-minus</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title" />
      <v-spacer />

      <v-btn
        icon
        @click.stop="$vuetify.theme.dark = !$vuetify.theme.dark"
      >
        <v-icon>mdi-theme-light-dark</v-icon>
      </v-btn>

      <v-btn
        icon
        @click.stop="$i18n.locale = $i18n.locale==='en' ? 'es' : 'en'"
      >
        <img :src="'/'+ $i18n.locales.find(d => d.code === $i18n.locale).img +'-icono.png'" style="width: 25px; margin-top: 5px;" />
      </v-btn>

      <v-btn
        icon
        @click.stop="rightDrawer = !rightDrawer"
      >
        <v-icon>mdi-menu</v-icon>
      </v-btn>

      <v-spacer />

      <v-btn
        text
        to="login"
        color="white"
      >
        <v-icon>mdi-account-key</v-icon>
        {{ $auth && $auth.loggedIn && $auth.user && $auth.user.username ? $auth.user.username : '' }}
      </v-btn>

    </v-app-bar>

    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>

    <v-navigation-drawer
      v-model="rightDrawer"
      :right="right"
      temporary
      fixed
      class="drawer"
    >
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light>
              mdi-repeat
            </v-icon>
          </v-list-item-action>
          <v-list-item-title>{{ $t('menu.Paneles') }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Inicio',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Proceso',
          to: '/proceso'
        },
        {
          icon: 'mdi-google-classroom',
          title: 'Aula',
          to: '/aula'
        },
        {
          icon: 'mdi-clipboard-edit-outline',
          title: 'Actividad',
          to: '/actividad'
        },
        {
          icon: 'mdi-rocket-launch',
          title: 'Acercade',
          to: '/acercade'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'FliClassroom',
    }
  },
  created() {
      setInterval(this.getNow, 1000);
  },
  methods: {
      getNow: function() {
          const today = new Date();
          const date = today.getFullYear()+'-'+(today.getMonth()+1<10 ? "0" : "") + (today.getMonth()+1)+'-'+(today.getDate()<10 ? "0" : "") + today.getDate();
          const time = (today.getHours()<10 ? "0" : "") + today.getHours() + ":" + (today.getMinutes()<10 ? "0" : "") + today.getMinutes() + ":" + (today.getSeconds()<10 ? "0" : "") + today.getSeconds();
          const dateTime = date +' '+ time;
          this.title = 'FliClassroom: ' + dateTime;
      }
  }
}
</script>

<style scoped>
.navbar .v-icon.v-icon {
  color: white;
}
.navbar .v-toolbar__title {
  color: white;
}
.sidebar .v-icon.v-icon {
  color: #1F6093;
}
.sidebar .v-list-item__content {
  color: white;
  text-shadow: -2px 0 #1F6093, 0 2px #1F6093;
}
</style>
