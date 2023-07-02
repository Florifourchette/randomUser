<script lang="ts">
import { useStore } from '@/stores/store';

export default {
    methods: {
        handleInput() {
            const store = useStore()
            const storedUsers = store.getAllUsers
            this.searchTerm = this.searchTerm.toLowerCase()
            let filteredUsers: Array<Object> = []
            if (this.searchTerm !== '') { filteredUsers = storedUsers.filter((user) => user.name.last.toLowerCase().includes(this.searchTerm.toLowerCase()) || user.name.first.toLowerCase().includes(this.searchTerm.toLowerCase())) }
            else {
                filteredUsers = storedUsers
            }
            return this.$emit('newUsersArray', filteredUsers)
        }
    },
    data() {
        const searchTerm: String = ''
        return { searchTerm }
    },

};
</script>

<template>
    <div>
        <div class="ui action input">
            <input type="text" placeholder="Search..." v-model="searchTerm" @input="handleInput">
            <button class="ui button">Search</button>
        </div>
    </div>
</template>