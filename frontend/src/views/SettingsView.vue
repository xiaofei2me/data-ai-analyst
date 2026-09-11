<template>
  <div class="set-pg">
    <div class="set-t">{{ m('nav_settings') }}</div>
    <div class="set-g">
      <div class="set-gt"><i class="fas fa-user"></i> {{ m('settings_profile') }}</div>
      <div class="set-r">
        <span class="set-rl">{{ m('settings_name') }}</span>
        <input type="text" :value="settings.profile.name" @change="setSetting('profile.name', $event.target.value)" style="width: 160px; padding: 5px 9px; border: 1px solid var(--bd); border-radius: var(--rm); font-size: 12px">
      </div>
      <div class="set-r">
        <span class="set-rl">{{ m('settings_email_label') }}</span>
        <input type="email" :value="settings.profile.email" @change="setSetting('profile.email', $event.target.value)" style="width: 200px; padding: 5px 9px; border: 1px solid var(--bd); border-radius: var(--rm); font-size: 12px">
      </div>
      <div class="set-r">
        <span class="set-rl">{{ m('settings_role') }}</span>
        <select class="set-sel" :value="settings.profile.role" @change="setSetting('profile.role', $event.target.value)">
          <option value="Admin">Admin</option>
          <option value="Data Analyst">Data Analyst</option>
          <option value="Viewer">Viewer</option>
        </select>
      </div>
    </div>
    <div class="set-g">
      <div class="set-gt"><i class="fas fa-palette"></i> {{ m('settings_appearance') }}</div>
      <div class="set-r">
        <span class="set-rl">{{ m('settings_language') }}</span>
        <select class="set-sel" :value="settings.appearance.language" @change="setSetting('appearance.language', $event.target.value)">
          <option value="en">English</option>
          <option value="zh">中文</option>
        </select>
      </div>
      <div class="set-r">
        <span class="set-rl">{{ m('settings_dark_mode') }}</span>
        <div class="set-tog" :class="{ on: settings.appearance.theme === 'dark' }" @click="toggleTheme"></div>
      </div>
      <div class="set-r">
        <span class="set-rl">{{ m('settings_compact') }}</span>
        <div class="set-tog" :class="{ on: settings.appearance.compactMode }" @click="setSetting('appearance.compactMode', !settings.appearance.compactMode)"></div>
      </div>
      <div class="set-r">
        <span class="set-rl">{{ m('settings_sidebar') }}</span>
        <div class="set-tog" :class="{ on: settings.appearance.sidebarCollapsed }" @click="setSetting('appearance.sidebarCollapsed', !settings.appearance.sidebarCollapsed)"></div>
      </div>
    </div>
    <div class="set-g">
      <div class="set-gt"><i class="fas fa-database"></i> {{ m('settings_data') }}</div>
      <div class="set-r">
        <span class="set-rl">{{ m('settings_auto_refresh') }}</span>
        <div class="set-tog" :class="{ on: settings.dataSources.autoRefresh }" @click="setSetting('dataSources.autoRefresh', !settings.dataSources.autoRefresh)"></div>
      </div>
      <div class="set-r">
        <span class="set-rl">{{ m('settings_refresh_interval') }}</span>
        <select class="set-sel" :value="settings.dataSources.refreshInterval" @change="setSetting('dataSources.refreshInterval', $event.target.value)">
          <option value="5">5</option>
          <option value="15">15</option>
          <option value="30">30</option>
          <option value="60">60</option>
        </select>
      </div>
      <div class="set-r">
        <span class="set-rl">{{ m('settings_cache') }}</span>
        <div class="set-tog" :class="{ on: settings.dataSources.cacheEnabled }" @click="setSetting('dataSources.cacheEnabled', !settings.dataSources.cacheEnabled)"></div>
      </div>
    </div>
    <div class="set-g">
      <div class="set-gt"><i class="fas fa-robot"></i> {{ m('settings_ai') }}</div>
      <div class="set-r">
        <span class="set-rl">{{ m('settings_default_model') }}</span>
        <select class="set-sel" :value="settings.aiModels.defaultModel" @change="setSetting('aiModels.defaultModel', $event.target.value)">
          <option value="GPT-4">GPT-4</option>
          <option value="Claude-3">Claude-3</option>
          <option value="SQL-Gen-v2">SQL-Gen-v2</option>
        </select>
      </div>
      <div class="set-r">
        <span class="set-rl">{{ m('settings_streaming') }}</span>
        <div class="set-tog" :class="{ on: settings.aiModels.streaming }" @click="setSetting('aiModels.streaming', !settings.aiModels.streaming)"></div>
      </div>
      <div class="set-r">
        <span class="set-rl">{{ m('settings_auto_optimize') }}</span>
        <div class="set-tog" :class="{ on: settings.aiModels.autoOptimizeSql }" @click="setSetting('aiModels.autoOptimizeSql', !settings.aiModels.autoOptimizeSql)"></div>
      </div>
    </div>
    <div class="set-g">
      <div class="set-gt"><i class="fas fa-bell"></i> {{ m('settings_notifications') }}</div>
      <div class="set-r">
        <span class="set-rl">{{ m('settings_email_alerts') }}</span>
        <div class="set-tog" :class="{ on: settings.notifications.emailAlerts }" @click="setSetting('notifications.emailAlerts', !settings.notifications.emailAlerts)"></div>
      </div>
      <div class="set-r">
        <span class="set-rl">{{ m('settings_desktop') }}</span>
        <div class="set-tog" :class="{ on: settings.notifications.desktopNotifications }" @click="setSetting('notifications.desktopNotifications', !settings.notifications.desktopNotifications)"></div>
      </div>
      <div class="set-r">
        <span class="set-rl">{{ m('settings_analysis_complete') }}</span>
        <div class="set-tog" :class="{ on: settings.notifications.analysisComplete }" @click="setSetting('notifications.analysisComplete', !settings.notifications.analysisComplete)"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useSettingsStore } from '../stores/settings'
import { useThemeStore } from '../stores/theme'
import { useI18n } from '../composables/useI18n'

const settingsStore = useSettingsStore()
const themeStore = useThemeStore()
const { m } = useI18n()

const settings = computed(() => settingsStore.settings)

function setSetting(path, val) {
  settingsStore.setSetting(path, val)
}

function toggleTheme() {
  themeStore.toggleTheme()
  setSetting('appearance.theme', themeStore.theme)
}
</script>
