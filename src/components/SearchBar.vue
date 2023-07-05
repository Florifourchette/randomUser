<script lang="ts">
import { useStore } from '@/stores/store';


export default {
    methods: {
        handleInput(): void {
            const store = useStore()
            const storedUsers = store.getAllUsers
            this.searchTerm = this.searchTerm.toLowerCase()
            let filteredUsers: Array<Object> = []
            if (this.searchTerm !== '') { filteredUsers = storedUsers.filter((user) => user.name.last.toLowerCase().includes(this.searchTerm.toLowerCase()) || user.name.first.toLowerCase().includes(this.searchTerm.toLowerCase())) }
            else {
                filteredUsers = storedUsers
            }
            this.$emit('newUsersArray', filteredUsers)
        }
    },
    data() {
        const store = useStore()
        const searchTerm = ''
        return { searchTerm, store }
    },
    mounted() {
        const storedFilter = this.store.getSearchFilter
        if (storedFilter !== null && storedFilter !== undefined) { this.searchTerm = String(this.store.getSearchFilter) }
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