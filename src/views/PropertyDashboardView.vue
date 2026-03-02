<template>
  <div class="dashboard-layout">
    <!-- Sidebar -->
    <SmAside class="dashboard-aside">
      <div class="aside-property-name">{{ propertyData.name }}</div>
      <SmVerticalNav>
        <SmVerticalNavItem
          label="Property dashboard"
          :force-active-state="currentNav === 'dashboard' ? 'exact-active' : 'in-active'"
          @click="currentNav = 'dashboard'"
        />
        <SmVerticalNavItem
          label="Product configuration"
          :force-active-state="currentNav === 'product-config' ? 'exact-active' : 'in-active'"
          @click="currentNav = 'product-config'"
        />
        <SmVerticalNavItem
          label="Property users"
          :force-active-state="currentNav === 'property-users' ? 'exact-active' : 'in-active'"
          @click="currentNav = 'property-users'"
        />
      </SmVerticalNav>

      <div class="aside-section-label">APPLICATIONS</div>
      <SmVerticalNav>
        <SmVerticalNavItem
          label="Billing"
          :force-active-state="currentNav.startsWith('billing') ? 'exact-active' : 'in-active'"
          @click="billingExpanded = !billingExpanded"
        >
          <template #right>
            <SmIcon :name="billingExpanded ? 'navigation-chevron-up' : 'navigation-chevron-down'" />
          </template>
        </SmVerticalNavItem>
        <template v-if="billingExpanded">
          <SmVerticalNavItem
            label="Transactions"
            class="aside-sub-item"
            :force-active-state="currentNav === 'billing-transactions' ? 'exact-active' : 'in-active'"
            @click="currentNav = 'billing-transactions'"
          />
          <SmVerticalNavItem
            label="Billing plans"
            class="aside-sub-item"
            :force-active-state="currentNav === 'billing-plans' ? 'exact-active' : 'in-active'"
            @click="currentNav = 'billing-plans'"
          />
          <SmVerticalNavItem
            label="Customer view"
            class="aside-sub-item"
            :force-active-state="currentNav === 'billing-customer' ? 'exact-active' : 'in-active'"
            @click="currentNav = 'billing-customer'"
          />
        </template>
        <SmVerticalNavItem
          label="Smart guide"
          :force-active-state="currentNav === 'smart-guide' ? 'exact-active' : 'in-active'"
          @click="currentNav = 'smart-guide'"
        />
      </SmVerticalNav>
    </SmAside>

    <!-- Main content -->
    <main class="dashboard-main">
      <!-- Breadcrumb -->
      <div class="breadcrumb">
        <a href="#" class="breadcrumb-link" @click.prevent="$emit('back')">Properties</a>
        <span class="breadcrumb-sep">/</span>
        <span class="breadcrumb-current">{{ propertyData.name }}</span>
      </div>

      <!-- Page title row -->
      <div class="page-title-row">
        <div class="page-title-left">
          <h1 class="page-title">{{ propertyData.name }}</h1>
          <span class="status-badge" :class="propertyData.status === 'Active' ? 'status-badge--active' : 'status-badge--inactive'">
            {{ propertyData.status }}
          </span>
        </div>
        <SmButton type="secondary" suffix-icon="action-external-link">
          View nxs-admin
        </SmButton>
      </div>

      <!-- Two-column content -->
      <div class="content-grid">
        <!-- Left column -->
        <div class="content-left">
          <!-- Property information card -->
          <SmCard class="info-card">
            <SmCardContent>
              <div class="card-header">
                <h2 class="card-title">Property information</h2>
                <button v-if="!isEditingInfo" class="edit-btn" title="Edit" @click="startEditInfo">
                  <SmIcon name="action-edit" />
                </button>
              </div>
              <div class="info-rows">
                <template v-if="!isEditingInfo">
                  <div class="info-row">
                    <div class="info-label">Name</div>
                    <div class="info-value">{{ propertyData.name }}</div>
                  </div>
                  <div class="info-row">
                    <div class="info-label">Partner</div>
                    <div class="info-value">{{ propertyData.info.partner }}</div>
                  </div>
                  <div class="info-row">
                    <div class="info-label">Enterprise</div>
                    <div class="info-value">{{ propertyData.info.enterprise }}</div>
                  </div>
                  <div class="info-row">
                    <div class="info-label">Billing start date (UTC)</div>
                    <div class="info-value">{{ propertyData.info.billingStartDate }}</div>
                  </div>
                  <div class="info-row">
                    <div class="info-label">Currency</div>
                    <div class="info-value">{{ propertyData.info.currency }}</div>
                  </div>
                  <div class="info-row">
                    <div class="info-label">Timezone</div>
                    <div class="info-value">{{ propertyData.info.timezone }}</div>
                  </div>
                  <div class="info-row">
                    <div class="info-label">Salesforce Id</div>
                    <div class="info-value">{{ propertyData.info.salesforceId }}</div>
                  </div>
                </template>
                <template v-else>
                  <div class="info-row">
                    <div class="info-label">Name</div>
                    <SmInput name="edit-name" v-model="editInfo.name" :error-disabled="true" :label-hidden="true" />
                  </div>
                  <div class="info-row">
                    <div class="info-label">Partner</div>
                    <SmInput name="edit-partner" v-model="editInfo.partner" :error-disabled="true" :label-hidden="true" />
                  </div>
                  <div class="info-row">
                    <div class="info-label">Enterprise</div>
                    <SmInput name="edit-enterprise" v-model="editInfo.enterprise" :error-disabled="true" :label-hidden="true" />
                  </div>
                  <div class="info-row">
                    <div class="info-label">Billing start date (UTC)</div>
                    <SmInput name="edit-billing-start" v-model="editInfo.billingStartDate" :error-disabled="true" :label-hidden="true" />
                  </div>
                  <div class="info-row">
                    <div class="info-label">Currency</div>
                    <SmInput name="edit-currency" v-model="editInfo.currency" :error-disabled="true" :label-hidden="true" />
                  </div>
                  <div class="info-row">
                    <div class="info-label">Timezone</div>
                    <SmInput name="edit-timezone" v-model="editInfo.timezone" :error-disabled="true" :label-hidden="true" />
                  </div>
                  <div class="info-row">
                    <div class="info-label">Salesforce Id</div>
                    <SmInput name="edit-salesforce" v-model="editInfo.salesforceId" :error-disabled="true" :label-hidden="true" />
                  </div>
                </template>
              </div>
              <div v-if="isEditingInfo" class="card-actions">
                <SmButton type="tertiary" @click="cancelEditInfo">Cancel</SmButton>
                <SmButton type="primary" @click="saveInfo">Save</SmButton>
              </div>
            </SmCardContent>
          </SmCard>

          <!-- Address card -->
          <SmCard class="info-card">
            <SmCardContent>
              <div class="card-header">
                <h2 class="card-title">Address</h2>
                <button v-if="!isEditingAddress" class="edit-btn" title="Edit" @click="startEditAddress">
                  <SmIcon name="action-edit" />
                </button>
              </div>
              <div class="info-rows">
                <template v-if="!isEditingAddress">
                  <div class="info-row">
                    <div class="info-label">Street</div>
                    <div class="info-value">{{ propertyData.addressDetail.street }}</div>
                  </div>
                  <div class="info-row">
                    <div class="info-label">Suburb</div>
                    <div class="info-value">{{ propertyData.addressDetail.suburb }}</div>
                  </div>
                  <div class="info-row address-row-split">
                    <div class="split-left">
                      <div class="info-label">State</div>
                      <div class="info-value">{{ propertyData.addressDetail.state }}</div>
                    </div>
                    <div class="split-right">
                      <div class="info-label">Post Code</div>
                      <div class="info-value">{{ propertyData.addressDetail.postCode }}</div>
                    </div>
                  </div>
                  <div class="info-row">
                    <div class="info-label">Country</div>
                    <div class="info-value">{{ propertyData.addressDetail.country }}</div>
                  </div>
                  <div class="info-row address-row-split">
                    <div class="split-left">
                      <div class="info-label">Latitude</div>
                      <div class="info-value">{{ propertyData.addressDetail.latitude }}</div>
                    </div>
                    <div class="split-right">
                      <div class="info-label">Longitude</div>
                      <div class="info-value">{{ propertyData.addressDetail.longitude }}</div>
                    </div>
                  </div>
                  <div class="info-row">
                    <div class="info-label">Google Place ID</div>
                    <div class="info-value">{{ propertyData.addressDetail.googlePlaceId }}</div>
                  </div>
                </template>
                <template v-else>
                  <div class="info-row">
                    <div class="info-label">Street</div>
                    <SmInput name="edit-street" v-model="editAddress.street" :error-disabled="true" :label-hidden="true" />
                  </div>
                  <div class="info-row">
                    <div class="info-label">Suburb</div>
                    <SmInput name="edit-suburb" v-model="editAddress.suburb" :error-disabled="true" :label-hidden="true" />
                  </div>
                  <div class="info-row address-row-split">
                    <div class="split-left">
                      <div class="info-label">State</div>
                      <SmInput name="edit-state" v-model="editAddress.state" :error-disabled="true" :label-hidden="true" />
                    </div>
                    <div class="split-right">
                      <div class="info-label">Post Code</div>
                      <SmInput name="edit-postcode" v-model="editAddress.postCode" :error-disabled="true" :label-hidden="true" />
                    </div>
                  </div>
                  <div class="info-row">
                    <div class="info-label">Country</div>
                    <SmInput name="edit-country" v-model="editAddress.country" :error-disabled="true" :label-hidden="true" />
                  </div>
                  <div class="info-row address-row-split">
                    <div class="split-left">
                      <div class="info-label">Latitude</div>
                      <SmInput name="edit-latitude" v-model="editAddress.latitude" :error-disabled="true" :label-hidden="true" />
                    </div>
                    <div class="split-right">
                      <div class="info-label">Longitude</div>
                      <SmInput name="edit-longitude" v-model="editAddress.longitude" :error-disabled="true" :label-hidden="true" />
                    </div>
                  </div>
                  <div class="info-row">
                    <div class="info-label">Google Place ID</div>
                    <SmInput name="edit-googleplaceid" v-model="editAddress.googlePlaceId" :error-disabled="true" :label-hidden="true" />
                  </div>
                </template>
              </div>
              <div v-if="isEditingAddress" class="card-actions">
                <SmButton type="tertiary" @click="cancelEditAddress">Cancel</SmButton>
                <SmButton type="primary" @click="saveAddress">Save</SmButton>
              </div>
            </SmCardContent>
          </SmCard>
        </div>

        <!-- Right column -->
        <div class="content-right">
          <!-- Applications card -->
          <SmCard class="info-card">
            <SmCardContent>
              <h2 class="card-title">Applications</h2>
              <div class="applications-table">
                <SmTable>
                  <SmTableThead>
                    <SmTableTr>
                      <SmTableTh>Name</SmTableTh>
                      <SmTableTh>Status</SmTableTh>
                      <SmTableTh>Region</SmTableTh>
                    </SmTableTr>
                  </SmTableThead>
                  <SmTableTbody>
                    <SmTableTr v-for="app in propertyData.applications" :key="app.name">
                      <SmTableTd>
                        <a href="#" class="app-link" @click.prevent>
                          {{ app.name }}
                          <SmIcon name="action-external-link" style="margin-left: 2px; vertical-align: middle;" />
                        </a>
                      </SmTableTd>
                      <SmTableTd>
                        <span class="status-badge" :class="app.status === 'Active' ? 'status-badge--active' : 'status-badge--inactive'">
                          {{ app.status }}
                        </span>
                      </SmTableTd>
                      <SmTableTd>{{ app.region }}</SmTableTd>
                    </SmTableTr>
                  </SmTableTbody>
                </SmTable>
              </div>
            </SmCardContent>
          </SmCard>

          <!-- Smart Guide Tasks card -->
          <SmCard class="info-card">
            <SmCardContent>
              <h2 class="card-title">Smart Guide Tasks</h2>
              <div class="smart-guide-empty">
                <div class="smart-guide-illustration">
                  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="20" y="15" width="45" height="8" rx="4" fill="#d0e8ff"/>
                    <rect x="20" y="30" width="45" height="8" rx="4" fill="#d0e8ff"/>
                    <rect x="20" y="45" width="45" height="8" rx="4" fill="#d0e8ff"/>
                    <circle cx="22" cy="19" r="10" fill="#e8f4ff" stroke="#6ab0f5" stroke-width="1.5"/>
                    <path d="M17 19 L20 22 L27 15" stroke="#006add" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <circle cx="15" cy="5" r="3" fill="#b3d4ff"/>
                    <circle cx="60" cy="8" r="4" fill="#b3d4ff"/>
                  </svg>
                </div>
                <p class="smart-guide-message">All available tasks have been completed.</p>
              </div>
              <div class="smart-guide-actions">
                <SmButton type="secondary">See all smart guide tasks</SmButton>
              </div>
            </SmCardContent>
          </SmCard>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const props = defineProps({
  property: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['back'])

const currentNav = ref('dashboard')
const billingExpanded = ref(false)

function loadStored() {
  try {
    const raw = localStorage.getItem(`property-data-${props.property.id}`)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function persistPropertyData() {
  localStorage.setItem(`property-data-${props.property.id}`, JSON.stringify({
    name: propertyData.name,
    status: propertyData.status,
    info: { ...propertyData.info },
    addressDetail: { ...propertyData.addressDetail }
  }))
}

const stored = loadStored()

const propertyData = reactive({
  name: stored?.name ?? props.property.name,
  status: stored?.status ?? props.property.status,
  info: stored?.info ?? { ...props.property.info },
  addressDetail: stored?.addressDetail ?? { ...props.property.addressDetail },
  applications: props.property.applications
})

const isEditingInfo = ref(false)
const isEditingAddress = ref(false)
const editInfo = ref({})
const editAddress = ref({})

function startEditInfo() {
  editInfo.value = { name: propertyData.name, ...propertyData.info }
  isEditingInfo.value = true
}

function saveInfo() {
  propertyData.name = editInfo.value.name
  Object.assign(propertyData.info, {
    partner: editInfo.value.partner,
    enterprise: editInfo.value.enterprise,
    billingStartDate: editInfo.value.billingStartDate,
    currency: editInfo.value.currency,
    timezone: editInfo.value.timezone,
    salesforceId: editInfo.value.salesforceId
  })
  isEditingInfo.value = false
  persistPropertyData()
}

function cancelEditInfo() {
  isEditingInfo.value = false
}

function startEditAddress() {
  editAddress.value = { ...propertyData.addressDetail }
  isEditingAddress.value = true
}

function saveAddress() {
  Object.assign(propertyData.addressDetail, editAddress.value)
  isEditingAddress.value = false
  persistPropertyData()
}

function cancelEditAddress() {
  isEditingAddress.value = false
}
</script>

<style scoped>
.dashboard-layout {
  display: flex;
  flex: 1;
  height: 100%;
  overflow: hidden;
}

.dashboard-aside {
  flex-shrink: 0;
}

.aside-property-name {
  padding: 16px 16px 8px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  color: #333;
  letter-spacing: 0.05em;
}

.aside-section-label {
  padding: 16px 16px 4px;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  color: #717171;
  letter-spacing: 0.08em;
}

.aside-sub-item {
  padding-left: 12px;
}

.dashboard-main {
  flex: 1;
  overflow-y: auto;
  padding: 24px 32px;
  background: #f5f7fa;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  font-size: 13px;
}

.breadcrumb-link {
  color: #006add;
  text-decoration: none;
}

.breadcrumb-link:hover {
  text-decoration: underline;
}

.breadcrumb-sep {
  color: #717171;
}

.breadcrumb-current {
  color: #333;
  font-weight: 500;
}

.page-title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}

.page-title-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.page-title {
  margin: 0;
  font-size: 24px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.02em;
}

.status-badge {
  display: inline-block;
  padding: 3px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
}

.status-badge--active {
  background-color: #e8f5e9;
  color: #2e7d32;
  border: 1px solid #a5d6a7;
}

.status-badge--inactive {
  background-color: #ffebee;
  color: #c62828;
  border: 1px solid #ef9a9a;
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  align-items: start;
}

.content-left,
.content-right {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.info-card {
  background: white;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.card-title {
  margin: 0 0 16px 0;
  font-size: 16px;
  font-weight: 600;
}

.card-header .card-title {
  margin-bottom: 0;
}

.edit-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  color: #717171;
  display: flex;
  align-items: center;
}

.edit-btn:hover {
  color: #006add;
}

.info-rows {
  display: flex;
  flex-direction: column;
}

.info-row {
  display: flex;
  flex-direction: column;
  padding: 8px 0;
}

.address-row-split {
  display: flex;
  flex-direction: row;
  gap: 24px;
}

.split-left,
.split-right {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.info-label {
  font-size: 11px;
  color: #717171;
  margin-bottom: 2px;
}

.info-value {
  font-size: 14px;
  color: #333;
}

.card-actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 16px;
  padding-top: 12px;
  border-top: 1px solid #f0f0f0;
}

.app-link {
  color: #006add;
  text-decoration: none;
  font-size: 14px;
}

.app-link:hover {
  text-decoration: underline;
}

.applications-table :deep(table) {
  border: none;
  border-collapse: collapse;
}

.applications-table :deep(thead),
.applications-table :deep(thead tr),
.applications-table :deep(tbody tr) {
  background: transparent !important;
  background-color: transparent !important;
  border: none !important;
}

.applications-table :deep(th),
.applications-table :deep(td),
.applications-table :deep([class*="sm-table"]) {
  border: none !important;
  background: transparent !important;
  background-color: transparent !important;
  box-shadow: none !important;
}

.smart-guide-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px 16px 16px;
  text-align: center;
}

.smart-guide-illustration {
  margin-bottom: 12px;
}

.smart-guide-message {
  margin: 0;
  font-size: 14px;
  color: #333;
}

.smart-guide-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
}
</style>
