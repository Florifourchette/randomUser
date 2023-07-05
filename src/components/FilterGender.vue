<script lang="ts">
import { useStore } from '@/stores/store';

export default {
    methods: {
        handleChange(): void {
            console.log(this.current)
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
        const current: Number = 3
        const store = useStore()
        const options: Array<{ text: String, value: Number }> = [
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
        <b-form-group class="label" label="Search per gender:" label-cols-lg="2">
            <b-form-select class="dropdown" v-model="current" :options="options" @input="handleChange">
            </b-form-select>
        </b-form-group>
    </div>
</template>