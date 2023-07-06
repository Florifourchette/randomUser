<script lang="ts">
import type { User } from '@/interface/UserInterface';
import { useStore } from '@/stores/store';

export default {
    methods: {
        handleChange(): void {
            const store = useStore()
            const storedUsers = store.getAllUsers
            store.setSearchFilter('')
            let filteredUsers: Array<User> = []
            if (this.gender === 2) {
                filteredUsers = storedUsers.filter((user) => user.gender === 'female')
            }
            else if (this.gender === 1) {
                filteredUsers = storedUsers.filter((user) => user.gender === 'male')
            }
            else {
                filteredUsers = storedUsers
            }
            return this.$emit('newUsersArray', filteredUsers)
        },
    },
    data() {
        const gender: number = 3
        const store = useStore()
        const search: String = store.getSearchFilter
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
            options, gender, store, search
        };
    },
    mounted() {
        const storedFilter = this.store.getGenderFilter
        if (storedFilter !== null && storedFilter !== undefined) {
            return this.gender = parseInt(this.store.getGenderFilter.toString())
        }

    },
    watch: {
        gender(gender) {
            console.log(this.gender)
            this.store.setGenderFilter(gender)
        },
    },
}
</script>

<template>
    <div class="genderFilter">
        <b-form-group class="label" label="Search per gender:" label-cols-lg="2">
            <b-form-select class="dropdown" v-model="gender" :options="options" @input="handleChange">
            </b-form-select>
        </b-form-group>
    </div>
</template>