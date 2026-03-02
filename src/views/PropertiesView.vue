<template>
  <div class="properties-view">
    <div class="properties-header">
      <h1 class="properties-title">Properties</h1>
      <SmButton type="primary">Add property</SmButton>
    </div>

    <SmCard class="search-card">
      <SmCardContent>
        <div class="search-form">
          <div class="search-field">
            <label class="search-label">Name</label>
            <SmInput name="search-name" v-model="searchName" placeholder="" :error-disabled="true" :label-hidden="true" />
          </div>
          <div class="search-field">
            <label class="search-label">SPID</label>
            <SmInput name="search-spid" v-model="searchSpid" placeholder="" :error-disabled="true" :label-hidden="true" />
          </div>
          <div class="search-field search-field--action">
            <span class="search-label" aria-hidden="true">&nbsp;</span>
            <SmButton type="primary" @click="handleSearch">Search</SmButton>
          </div>
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
                <SmTag
                  v-for="app in property.apps"
                  :key="app"
                  :type="getAppTagType(app, property)"
                  size="small"
                >{{ formatAppName(app) }}</SmTag>
              </div>
            </SmTableTd>
          </SmTableTr>
        </SmTableTbody>
      </SmTable>
    </div>

    <div class="table-footer">
      <div class="pagination-wrapper">
        <SmPagination
          :total-items="filteredProperties.length"
          :items-per-page="pageSize"
          v-model:currentPage="currentPage"
        />
      </div>
      <div class="results-info pp-text-sm pp-text-grey">
        {{ resultsInfo }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { PROPERTIES } from '../data/mock-data.js'

const emit = defineEmits(['select-property'])

const searchName = ref('')
const searchSpid = ref('')
const currentPage = ref(1)
const pageSize = ref(10)

watch([searchName, searchSpid], () => {
  currentPage.value = 1
})

function handleSearch() {
  currentPage.value = 1
}

const filteredProperties = computed(() => {
  return PROPERTIES.filter(p => {
    const nameMatch = !searchName.value ||
      p.name.toLowerCase().includes(searchName.value.toLowerCase())
    const spidMatch = !searchSpid.value ||
      p.spid.toLowerCase() === searchSpid.value.trim().toLowerCase()
    return nameMatch && spidMatch
  })
})

const paginatedProperties = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  return filteredProperties.value.slice(start, start + pageSize.value)
})

const resultsInfo = computed(() => {
  const total = filteredProperties.value.length
  const start = (currentPage.value - 1) * pageSize.value + 1
  const end = Math.min(currentPage.value * pageSize.value, total)
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

function getAppTagType(app, property) {
  const appObj = property.applications?.find(a =>
    a.name.replace(/\s/g, '') === app || a.name === app
  )
  return appObj?.status === 'Inactive' ? 'alert' : 'success'
}
</script>

<style scoped>
.properties-view {
  padding: 32px;
  width: 100%;
  overflow-y: auto;
  height: 100%;
  box-sizing: border-box;
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
  background-color: #EBF4FF !important;
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

.search-field--action {
  min-width: auto;
  flex-shrink: 0;
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

:deep(td) {
  vertical-align: top;
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

.table-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0;
}

.results-info {
  font-size: 13px;
  color: #717171;
}
</style>
