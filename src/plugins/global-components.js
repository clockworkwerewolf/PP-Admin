import SmIcon from '@sui-icons/app/sm-icon.vue'
import SmButton from '@sui/app/components/sm-button/sm-button.vue'
import SmBadge from '@sui/app/components/sm-badge/sm-badge.vue'
import SmCard from '@sui/app/components/sm-card/sm-card.vue'
import SmCardContent from '@sui/app/components/sm-card/sm-card-content.vue'
import SmCardActions from '@sui/app/components/sm-card/sm-card-actions.vue'
import SmTooltip from '@sui/app/components/sm-tooltip/sm-tooltip.vue'
import SmTag from '@sui/app/components/sm-tag/sm-tag.vue'
import SmPageTitle from '@sui/app/components/sm-page-title/sm-page-title.vue'
import SmDivider from '@sui/app/components/sm-divider/sm-divider.vue'
import SmTable from '@sui/app/components/sm-table/sm-table.vue'
import SmTableThead from '@sui/app/components/sm-table/sm-table-thead.vue'
import SmTableTbody from '@sui/app/components/sm-table/sm-table-tbody.vue'
import SmTableTr from '@sui/app/components/sm-table/sm-table-tr.vue'
import SmTableTh from '@sui/app/components/sm-table/sm-table-th.vue'
import SmTableTd from '@sui/app/components/sm-table/sm-table-td.vue'
import SmPagination from '@sui/app/components/sm-pagination/sm-pagination.vue'
import SmDropdown from '@sui/app/components/sm-dropdown/sm-dropdown.vue'
import SmContainer from '@sui/app/components/sm-container/sm-container.vue'
import SmForm from '@sui/app/components/forms/sm-form/sm-form.vue'
import SmInput from '@sui/app/components/forms/sm-input/sm-input.vue'
import SmFormGroup from '@sui/app/components/forms/sm-form-group/sm-form-group.vue'
import SmSelect from '@sui/app/components/forms/sm-select/sm-select.vue'
import SmAside from '@sui/app/components/sm-aside/sm-aside.vue'
import SmAppHeader from '@sui/app/components/sm-app-header/sm-app-header.vue'
import SmHorizontalNav from '@sui/app/components/sm-horizontal-nav/sm-horizontal-nav.vue'
import SmHorizontalNavItem from '@sui/app/components/sm-horizontal-nav/sm-horizontal-nav-item.vue'
import SmVerticalNav from '@sui/app/components/sm-vertical-nav/sm-vertical-nav.vue'
import SmVerticalNavSection from '@sui/app/components/sm-vertical-nav/sm-vertical-nav-section.vue'
import SmVerticalNavItem from '@sui/app/components/sm-vertical-nav/sm-vertical-nav-item.vue'
import SmUserMenu from '@sui/app/components/sm-user-menu/sm-user-menu.vue'

export default {
  install(app) {
    app.component('SmIcon', SmIcon)
    app.component('SmButton', SmButton)
    app.component('SmBadge', SmBadge)
    app.component('SmCard', SmCard)
    app.component('SmCardContent', SmCardContent)
    app.component('SmCardActions', SmCardActions)
    app.component('SmTooltip', SmTooltip)
    app.component('SmTag', SmTag)
    app.component('SmPageTitle', SmPageTitle)
    app.component('SmDivider', SmDivider)
    app.component('SmTable', SmTable)
    app.component('SmTableThead', SmTableThead)
    app.component('SmTableTbody', SmTableTbody)
    app.component('SmTableTr', SmTableTr)
    app.component('SmTableTh', SmTableTh)
    app.component('SmTableTd', SmTableTd)
    app.component('SmPagination', SmPagination)
    app.component('SmDropdown', SmDropdown)
    app.component('SmContainer', SmContainer)
    app.component('SmForm', SmForm)
    app.component('SmInput', SmInput)
    app.component('SmFormGroup', SmFormGroup)
    app.component('SmSelect', SmSelect)
    app.component('SmAside', SmAside)
    app.component('SmAppHeader', SmAppHeader)
    app.component('SmHorizontalNav', SmHorizontalNav)
    app.component('SmHorizontalNavItem', SmHorizontalNavItem)
    app.component('SmVerticalNav', SmVerticalNav)
    app.component('SmVerticalNavSection', SmVerticalNavSection)
    app.component('SmVerticalNavItem', SmVerticalNavItem)
    app.component('SmUserMenu', SmUserMenu)
  }
}
