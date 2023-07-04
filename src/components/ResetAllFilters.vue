<script lang="ts">
import { useStore } from '@/stores/store';
import { defineComponent } from 'vue';

export default defineComponent({
    methods: {
        handleEmptyLS() {
            console.log('button clicked')
            const store = useStore()
            const allUsers = store.getAllStoredUsers
            console.log(allUsers)
            store.setGenderFilter('3')
            store.setSearchFilter('')
            store.setFilteredUsers(allUsers)
            console.log(store.getfilteredUsers)
            return this.$emit('filtersReset', allUsers)
        }
    }


})
</script>
<template>
    <button @click.prevent="handleEmptyLS">Reset all filters</button>
</template>