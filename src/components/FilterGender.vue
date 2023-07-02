<script lang="ts">
import { useStore } from '@/stores/store';

export default {
    methods: {
        handleChange() {
            const store = useStore()
            const storedUsers = store.getAllUsers
            let filteredUsers: Array<Object> = []
            if (this.current === 2) {
                filteredUsers = storedUsers.filter((user) => user.gender === 'female')
            }
            else if (this.current === 1) {
                filteredUsers = storedUsers.filter((user) => user.gender === 'male')
            }
            else {
                filteredUsers = storedUsers
            }
            console.log(filteredUsers)

            return this.$emit('newUsersArray', filteredUsers)
        }
    },
    data() {
        const current = null

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
            options, current
        };
    },
    mounted() {
    }
}
</script>

<template>
    <sui-dropdown placeholder="Search for gender" selection :options="options" v-model="current" @input="handleChange" />
</template>


