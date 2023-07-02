<script lang="ts">
import SearchBar from './SearchBar.vue';
import FilterGender from './FilterGender.vue'

import { callRandomUSers } from '../utils/Apicall'
import { defineComponent } from 'vue';
import { useStore } from '@/stores/store';


export default defineComponent({
    components: { SearchBar, FilterGender },
    methods: {
        handleUsers(): Array<Object> {
            return callRandomUSers().then((data: Array<Object>) => {
                this.store.setAllUsers(data);
                this.storedUsers = this.store.getAllUsers;
                return this.storedUsers;
            }).catch((error) => { console.log(error); return []; });
        },
        handleMoreUsers(): Promise<Array<Object>> {
            return callRandomUSers().then((data: Array<Object>) => {
                this.store.addUsers(data);
                this.storedUsers = this.store.getAllUsers;
                return this.storedUsers;
            }).catch((error) => { console.log(error); return []; });
        },
        handleFilteredUsers(filteredUsers: Array<Object>) {
            console.log(filteredUsers)
            if (filteredUsers.length === 0) {
                return [{
                }]
            }
            else { return this.storedUsers = filteredUsers }
        },
        handleClick(user: Object) {

            this.store.setUser(user)
            console.log(this.store.user)
        }
    },
    data() {
        const store = useStore();
        const storedUsers = store.getAllUsers;
        return { storedUsers, store };
    },
    computed: {
        finalUsers() {
            console.log(this.storedUsers);
            return this.storedUsers;
        }
    },
})

</script>
<template>
    <div>
        <SearchBar :users="finalUsers" @newUsersArray="handleFilteredUsers" />
        <FilterGender :users="finalUsers" @newUsersArray="handleFilteredUsers" />
        <button @click.prevent="handleUsers">Test API Call</button>
        <div v-for="( user, index ) in   finalUsers  " :key="index">
            <sui-card @click="handleClick(user)">
                <sui-reveal animated="move">
                    <sui-reveal-content visible>
                        <sui-image :src="`${user.picture?.thumbnail}`" />
                    </sui-reveal-content>
                </sui-reveal>
                <sui-card-content>
                    <sui-card-header>{{ user.name?.last }} {{ user.name?.first }}</sui-card-header>
                    <sui-card-meta>{{ user?.email }}</sui-card-meta>
                </sui-card-content>
            </sui-card>
        </div>
        <button @click.prevent="handleMoreUsers">More results...</button>
    </div>
</template>