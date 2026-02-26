<template>
  <div class="admin-app">
    <SmAppHeader
      logo="/sm-logo-app-colour.svg"
      page-title="Platform Admin"
    >
      <template #user-menu>
        <SmUserMenu display-name="Admin User">
          <template #icon>
            <SmIcon name="action-user" />
          </template>
          <SmVerticalNav>
            <SmVerticalNavItem label="My account" />
            <SmVerticalNavItem label="Logout" />
          </SmVerticalNav>
        </SmUserMenu>
      </template>

      <template #nav>
        <SmHorizontalNav>
          <SmHorizontalNavItem
            label="Properties"
            :force-active-state="view === 'properties' ? 'exact-active' : 'in-active'"
            @click="goToProperties"
          />
          <SmHorizontalNavItem
            label="Applications"
            :force-active-state="view === 'applications' ? 'exact-active' : 'in-active'"
          />
          <SmHorizontalNavItem
            label="Settings"
            :force-active-state="view === 'settings' ? 'exact-active' : 'in-active'"
          />
        </SmHorizontalNav>
      </template>
    </SmAppHeader>

    <div class="admin-body">
      <PropertiesView
        v-if="view === 'properties'"
        @select-property="openDashboard"
      />
      <PropertyDashboardView
        v-else-if="view === 'dashboard' && selectedProperty"
        :property="selectedProperty"
        @back="goToProperties"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import PropertiesView from './views/PropertiesView.vue'
import PropertyDashboardView from './views/PropertyDashboardView.vue'

const view = ref('properties')
const selectedProperty = ref(null)

function openDashboard(property) {
  selectedProperty.value = property
  view.value = 'dashboard'
}

function goToProperties() {
  view.value = 'properties'
  selectedProperty.value = null
}
</script>

<style>
.admin-app {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.admin-body {
  flex: 1;
  display: flex;
  overflow: hidden;
}

/* Dashboard layout fills full height */
.admin-body > * {
  flex: 1;
  min-height: 0;
}
</style>
