<script lang="ts">
import { useStore } from '@/stores/store';

export default {
    props: {
        users: {
            type: Array<Object>,
            default: []
        }
    },
    methods: {
        handleInput() {
            console.log(this.storedUsers)

            this.searchTerm = this.searchTerm.toLowerCase()
            let filteredUsers: Array<Object> = []
            if (this.searchTerm !== '') { filteredUsers = this.users.filter((user) => user.name.last.toLowerCase().includes(this.searchTerm.toLowerCase()) || user.name.first.toLowerCase().includes(this.searchTerm.toLowerCase())) }
            else {
                filteredUsers = this.storedUsers
            }
            return this.$emit('newUsersArray', filteredUsers)
        }
    },
    data() {
        const searchTerm: String = ''
        const store = useStore()
        const storedUsers = store.getAllUsers
        return { searchTerm, storedUsers }
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