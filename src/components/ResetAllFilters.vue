<script lang="ts">
import type { User } from '@/interface/UserInterface';

import { useStore } from '@/stores/store';
import { defineComponent } from 'vue';

export default defineComponent({
    methods: {
        handleEmptyLS() {
            const emptyUser: User = {
                email: '',
                gender: '',
                location: {
                    street: {
                        name: '',
                        number: 0
                    },
                    country: '',
                    postcode: 0,
                    state: '',
                    city: ''
                },
                name: {
                    last: 'deleted',
                    first: 'deleted',
                    title: ''
                },
                phone: '',
                picture: {
                    large: '',
                    medium: '',
                    thumbnail: ''
                },
                id: {
                    name: '',
                    value: ''
                }
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