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
        handleChange() {
            let filteredUsers: Array<Object> = []
            if (this.current === 2) {
                filteredUsers = this.users.filter((user) => user.gender === 'female')
                console.log(this.storedUsers)
            }
            else if (this.current === 1) {
                filteredUsers = this.users.filter((user) => user.gender === 'male')
                console.log(this.storedUsers)
            }
            else {
                filteredUsers = this.storedUsers
                console.log(this.storedUsers)
            }
            console.log(filteredUsers)

            return this.$emit('newUsersArray', filteredUsers)
        }
    },
    data() {
        const current = null
        const store = useStore()
        const storedUsers = store.getAllUsers
        const options: Array<Object> = [
            {
                text: 'Male',
                value: 1,
            },
            {
                text: 'Female',
                value: 2,
            },
            {
                text: 'Reset filters',
                value: 3,
            },
        ]
        return {
            options, current, storedUsers
        };
    },
    mounted() {
        console.log(this.current)
    }
};
</script>

<template>
    <sui-dropdown placeholder="Search for gender" selection :options="options" v-model="current" @input="handleChange" />
</template>


