<template>
  <div class="lp">
    <div class="lp-hdr">
      <div>
        <div class="lp-t">{{ m('permissions_title') }}</div>
        <div class="lp-sub">{{ roles.length }} roles | {{ roles.reduce((a, r) => a + r.users, 0) }} users</div>
      </div>
      <button class="btn-new" @click="toast(m('new'))"><i class="fas fa-plus"></i> {{ m('new') }}</button>
    </div>
    <div class="eval-g">
      <div v-for="r in roles" :key="r.name" class="eval-metric" style="cursor: pointer" @click="openDetail(r.name)">
        <div class="em-val" style="font-size: 22px">{{ r.users }}</div>
        <div class="em-lbl">{{ r.name }}</div>
        <div style="font-size: 10px; color: var(--tx3); margin-top: 2px">{{ r.desc }}</div>
      </div>
    </div>
    <div class="det-card">
      <h4>Permission Matrix</h4>
      <div class="tbl-tw">
        <table class="tbl">
          <thead>
            <tr>
              <th>Permission</th>
              <th v-for="r in roles" :key="r.name" style="text-align: center">{{ r.name }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="p in permissions" :key="p">
              <td class="nc">{{ p }}</td>
              <td v-for="r in roles" :key="r.name" style="text-align: center">
                <span v-if="r.perms.includes(p)" class="perm-yes">✓</span>
                <span v-else class="perm-no">✗</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useToastStore } from '../stores/toast'
import { useDrawerStore } from '../stores/drawer'
import { useI18n } from '../composables/useI18n'
import DetailView from '../components/DetailView.vue'

const toastStore = useToastStore()
const drawerStore = useDrawerStore()
const { m } = useI18n()

const permissions = ['Data Sources', 'AI Models', 'Users', 'System Settings', 'Reports', 'Analytics']

const roles = [
  { name: 'Admin', desc: 'Full system access', users: 2, perms: ['Data Sources', 'AI Models', 'Users', 'System Settings', 'Reports', 'Analytics'] },
  { name: 'Data Analyst', desc: 'Data analysis and reporting', users: 5, perms: ['Data Sources', 'Reports', 'Analytics'] },
  { name: 'Viewer', desc: 'Read-only access', users: 12, perms: ['Reports', 'Analytics'] },
  { name: 'Engineer', desc: 'Technical configuration', users: 3, perms: ['AI Models', 'Data Sources', 'System Settings'] }
]

function toast(msg) {
  toastStore.showToast(msg)
}

function openDetail(name) {
  const item = roles.find(r => r.name === name)
  if (item) {
    drawerStore.openDrawer(item.name + ' Role', DetailView, {
      title: item.name + ' Role',
      fields: [
        { label: 'Description', value: item.desc },
        { label: 'Users', value: item.users },
        { label: 'Permissions', value: item.perms.join(', ') }
      ]
    })
  }
}
</script>
