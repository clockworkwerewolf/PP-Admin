<template>
  <div class="properties-view">
    <div class="properties-header">
      <h1 class="properties-title">Properties</h1>
      <SmButton variant="primary">Add property</SmButton>
    </div>

    <SmCard class="search-card">
      <SmCardContent>
        <div class="search-form">
          <div class="search-field">
            <label class="search-label">Name</label>
            <SmInput v-model="searchName" placeholder="" />
          </div>
          <div class="search-field">
            <label class="search-label">SPID</label>
            <SmInput v-model="searchSpid" placeholder="" />
          </div>
          <SmButton variant="primary" @click="handleSearch">Search</SmButton>
        </div>
      </SmCardContent>
    </SmCard>

    <div class="table-wrapper">
      <SmTable>
        <SmTableThead>
          <SmTableTr>
            <SmTableTh>Name</SmTableTh>
            <SmTableTh>Info</SmTableTh>
            <SmTableTh>Apps</SmTableTh>
          </SmTableTr>
        </SmTableThead>
        <SmTableTbody>
          <SmTableTr
            v-for="property in paginatedProperties"
            :key="property.id"
            class="property-row"
          >
            <SmTableTd>
              <a
                href="#"
                class="property-link"
                @click.prevent="$emit('select-property', property)"
              >{{ property.name }}</a>
              <div class="property-address pp-text-xs pp-text-grey">{{ property.address }}</div>
            </SmTableTd>
            <SmTableTd>
              <div class="info-spid pp-text-sm">SPID: {{ property.spid }}</div>
              <div class="info-partner pp-text-xs pp-text-grey">
                Partner/Enterprise: {{ property.partner }} / {{ property.enterprise }}
              </div>
            </SmTableTd>
            <SmTableTd>
              <div class="apps-cell">
                <span
                  v-for="app in property.apps"
                  :key="app"
                  class="app-tag"
                  :class="getAppTagClass(app, property)"
                >{{ formatAppName(app) }}</span>
              </div>
            </SmTableTd>
          </SmTableTr>
        </SmTableTbody>
      </SmTable>

      <div class="table-footer">
        <div class="pagination-wrapper">
          <SmPagination
            :total="filteredProperties.length"
            :page-size="pageSize"
            v-model:current-page="currentPage"
          />
        </div>
        <div class="results-info pp-text-sm pp-text-grey">
          {{ resultsInfo }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { PROPERTIES, TOTAL_PROPERTIES } from '../data/mock-data.js'

const emit = defineEmits(['select-property'])

const searchName = ref('')
const searchSpid = ref('')
const activeSearch = ref({ name: '', spid: '' })
const currentPage = ref(1)
const pageSize = ref(10)

function handleSearch() {
  activeSearch.value = { name: searchName.value, spid: searchSpid.value }
  currentPage.value = 1
}

const filteredProperties = computed(() => {
  return PROPERTIES.filter(p => {
    const nameMatch = !activeSearch.value.name ||
      p.name.toLowerCase().includes(activeSearch.value.name.toLowerCase())
    const spidMatch = !activeSearch.value.spid ||
      p.spid.toLowerCase().includes(activeSearch.value.spid.toLowerCase())
    return nameMatch && spidMatch
  })
})

const paginatedProperties = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  return filteredProperties.value.slice(start, start + pageSize.value)
})

const resultsInfo = computed(() => {
  const total = activeSearch.value.name || activeSearch.value.spid
    ? filteredProperties.value.length
    : TOTAL_PROPERTIES
  const start = (currentPage.value - 1) * pageSize.value + 1
  const end = Math.min(currentPage.value * pageSize.value, filteredProperties.value.length)
  return `${start} - ${end} of ${total.toLocaleString()} results`
})

function formatAppName(app) {
  const names = {
    BookingButton: 'BookingButton',
    ChannelManager: 'ChannelManager',
    Canvas: 'Canvas',
    LittleHotelier: 'LittleHotelier',
    Insights: 'Insights',
    FrontDesk: 'FrontDesk'
  }
  return names[app] || app
}

function getAppTagClass(app, property) {
  const appObj = property.applications?.find(a =>
    a.name.replace(/\s/g, '') === app || a.name === app
  )
  const isInactive = appObj?.status === 'Inactive'
  return isInactive ? 'app-tag--inactive' : 'app-tag--active'
}
</script>

<style scoped>
.properties-view {
  padding: 32px;
  max-width: 1200px;
}

.properties-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}

.properties-title {
  margin: 0;
  font-size: 24px;
  font-weight: 600;
}

.search-card {
  margin-bottom: 24px;
}

.search-form {
  display: flex;
  align-items: flex-end;
  gap: 16px;
}

.search-field {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 200px;
}

.search-label {
  font-size: 13px;
  font-weight: 500;
  color: #333;
}

.table-wrapper {
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
}

.property-row:hover {
  background-color: #f9fafc;
}

.property-link {
  color: #006add;
  text-decoration: none;
  font-weight: 500;
  font-size: 14px;
}

.property-link:hover {
  text-decoration: underline;
}

.property-address {
  margin-top: 2px;
}

.info-spid {
  font-size: 13px;
}

.info-partner {
  margin-top: 2px;
}

.apps-cell {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.app-tag {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
  border: 1px solid;
}

.app-tag--active {
  background-color: #e8f5e9;
  color: #2e7d32;
  border-color: #a5d6a7;
}

.app-tag--inactive {
  background-color: #ffebee;
  color: #c62828;
  border-color: #ef9a9a;
}

.table-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-top: 1px solid #e0e0e0;
  background: white;
}

.results-info {
  font-size: 13px;
  color: #717171;
}
</style>
