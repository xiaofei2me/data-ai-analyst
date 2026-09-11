<template>
  <div class="search-ov" :class="{ show: isOpen }" @click="closeSearch"></div>
  <div class="search-modal" :class="{ show: isOpen }">
    <div class="search-input-wrap">
      <i class="fas fa-search"></i>
      <input
        type="text"
        :value="query"
        placeholder="Search metrics, tables, reports..."
        @input="setQuery($event.target.value)"
      >
    </div>
    <div class="search-results">
      <div v-for="group in filteredResults" :key="group.g" class="search-result-group">
        <div class="search-result-group-title">{{ group.g }}</div>
        <div
          v-for="item in group.items"
          :key="item.t"
          class="search-result-item"
          @click="closeSearch"
        >
          <div class="sri-ico" :style="{ background: item.c, color: item.ic }">
            <i :class="item.i"></i>
          </div>
          <div class="sri-text">
            <div class="sri-title">{{ item.t }}</div>
            <div class="sri-sub">{{ item.s }}</div>
          </div>
        </div>
      </div>
      <div v-if="filteredResults.length === 0" style="text-align: center; padding: 32px; color: var(--tx3)">
        No results for "{{ query }}"
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useSearchStore } from '../stores/search'

const searchStore = useSearchStore()

const isOpen = computed(() => searchStore.isOpen)
const query = computed(() => searchStore.query)

const searchItems = [
  {
    g: 'Metrics',
    items: [
      { t: 'Revenue Growth', s: 'Revenue Growth Rate', i: 'fas fa-calculator', c: 'var(--pribg)', ic: 'var(--pri)' },
      { t: 'Gross Margin', s: 'Gross Profit Margin', i: 'fas fa-percentage', c: 'var(--okl)', ic: 'var(--ok)' },
      { t: 'Customer Retention', s: 'Customer Retention Rate', i: 'fas fa-users', c: 'var(--infl)', ic: 'var(--inf)' }
    ]
  },
  {
    g: 'Tables',
    items: [
      { t: 'fact_sales', s: 'Sales fact table | 2.5M rows', i: 'fas fa-table', c: 'var(--wnl)', ic: 'var(--wn)' },
      { t: 'dim_region', s: 'Region dimension | 500 rows', i: 'fas fa-table', c: 'var(--wnl)', ic: 'var(--wn)' }
    ]
  },
  {
    g: 'Reports',
    items: [
      { t: 'Q3 Sales Performance Report', s: 'Published | Admin', i: 'fas fa-file-alt', c: 'var(--pribg)', ic: 'var(--pri)' },
      { t: 'Annual Revenue Forecast', s: 'Draft | Admin', i: 'fas fa-file-alt', c: 'var(--pribg)', ic: 'var(--pri)' }
    ]
  }
]

const filteredResults = computed(() => {
  if (!query.value) return searchItems
  const q = query.value.toLowerCase()
  return searchItems
    .map(g => ({
      ...g,
      items: g.items.filter(i => i.t.toLowerCase().includes(q) || i.s.toLowerCase().includes(q))
    }))
    .filter(g => g.items.length > 0)
})

function closeSearch() {
  searchStore.closeSearch()
}

function setQuery(q) {
  searchStore.setQuery(q)
}
</script>
