<script lang="ts">
import { useStore } from '@/stores/store';

export default {
    methods: {
        handleChange(): void {
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

            this.$emit('newUsersArray', filteredUsers)
        }
    },
    data() {
        const current: number = 3
        const store = useStore()
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
                text: 'Reset gender filter',
                value: 3,
            },
        ]
        return {
            options, current, store
        };
    },
    mounted() {
        const storedFilter = this.store.getGenderFilter
        if (storedFilter !== null && storedFilter !== undefined) { this.current = parseInt(this.store.getGenderFilter.toString()) }
    },
    watch: {
        current(current) {
            this.store.setGenderFilter(current)
        },

    }
}
</script>

<template>
    <div class="genderFilter">
        <sui-dropdown placeholder="Search for gender" selection :options="options" v-model="current"
            @input="handleChange" />
    </div>
</template>

<style scoped></style>