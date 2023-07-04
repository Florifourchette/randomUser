<script lang="ts">
import { useStore } from '@/stores/store';
import { defineComponent } from 'vue';

export default defineComponent({
    methods: {
        handleEmptyLS() {
            const emptyUser = {
                email: '',
                gender: '',
                location: {},
                name: '',
                phone: '',
                picture: {},
            }
            const store = useStore()
            const allUsers = store.getAllStoredUsers
            store.setGenderFilter('3')
            store.setSearchFilter('')
            store.setFilteredUsers(allUsers)
            store.setUser(emptyUser)
            return this.$emit('filtersReset', allUsers)
        }
    }


})
</script>
<template>
    <button @click.prevent="handleEmptyLS">Reset all filters</button>
</template>