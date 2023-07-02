<script lang="ts">
export default {
    props: {
        users: {
            type: Array<Object>,
            default: []
        }
    },
    methods: {
        handleInput() {
            return this.searchTerm = this.searchTerm.toLowerCase()
        }
    },
    data() {
        const searchTerm: String = ''
        return { searchTerm }
    },
    computed: {
        filteredUsers() {
            return this.users.filter((user) => user.name.last.toLowerCase().includes(this.searchTerm.toLowerCase()))
        }
    }

};
</script>

<template>
    <div>
        <div class="ui action input">
            <input type="text" placeholder="Search..." v-model="searchTerm" @input="handleInput">
            <select class="ui fluid selection dropdown">
                <option v-for="(user, index) in filteredUsers" :key="index">{{ user.name.last }}</option>
            </select>
            <button class="ui button">Search</button>
        </div>
    </div>
</template>

