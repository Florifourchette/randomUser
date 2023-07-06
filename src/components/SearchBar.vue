<script lang="ts">
import { useStore } from '@/stores/store';

export default {
    methods: {
        handleInput(): void {
            const storedUsers = this.store.getAllUsers
            this.store.setGenderFilter('3')
            const searchTerm = this.searchTerm.toLowerCase()
            let filteredUsers: Array<Object> = []
            if (this.searchTerm !== '') { filteredUsers = storedUsers.filter((user) => user.name.last.toLowerCase().includes(searchTerm) || user.name.first.toLowerCase().includes(searchTerm)) }
            else {
                filteredUsers = storedUsers
            }
            return this.$emit('newUsersArray', filteredUsers)
        },

    },
    data() {
        const store = useStore()
        const searchTerm: String = store.getSearchFilter
        const gender = store.getGenderFilter
        return { searchTerm, store, gender }
    },
    mounted() {
        const storedFilter = this.store.getSearchFilter
        if (storedFilter !== null && storedFilter !== undefined) { return this.searchTerm = this.store.getSearchFilter }
        else {
            return this.searchTerm = ''
        }
    },
    watch: {
        searchTerm(searchTerm) {
            this.store.setSearchFilter(searchTerm)
        },
    }

};
</script>

<template>
    <div class="searchBarContainer">
        <input type="text" placeholder="Search..." v-model="searchTerm" @input="handleInput">
    </div>
</template>