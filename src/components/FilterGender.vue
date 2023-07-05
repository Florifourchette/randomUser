<script lang="ts">
import { useStore } from '@/stores/store';

export default {
    methods: {
        handleChange(): void {
            console.log('filter activated')
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

            return this.$emit('newUsersArray', filteredUsers)
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
        console.log(JSON.parse(localStorage.getItem('filteredUsers')))

        const storedFilter = this.store.getGenderFilter
        console.log(storedFilter)

        if (storedFilter !== null && storedFilter !== undefined) { return this.current = parseInt(this.store.getGenderFilter.toString()) }
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