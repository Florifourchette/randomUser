<script lang="ts">
import { emptyUser } from '@/interface/emptyUser';
import { eventBus } from '@/utils/eventBus';

import { useStore } from '@/stores/store';
import { defineComponent } from 'vue';

export default defineComponent({
    methods: {
        handleEmptyLS() {
            const store = useStore()
            const allUsers = store.getAllStoredUsers
            store.setGenderFilter('3')
            store.setSearchFilter('')
            store.setFilteredUsers(allUsers)
            store.setUser(emptyUser)
            eventBus.$emit('clearGenderInput')
            eventBus.$emit('clearSearchTerm');
            return this.$emit('filtersReset', allUsers)
        }
    }


})
</script>
<template>
    <button @click.prevent="handleEmptyLS">Reset all filters</button>
</template>