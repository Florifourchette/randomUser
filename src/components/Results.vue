<script lang="ts">
import SearchBar from './SearchBar.vue';
import FilterGender from './FilterGender.vue'
import ResetAllFilters from './ResetAllFilters.vue';

import infiniteScroll from 'vue-infinite-scroll'

import { callRandomUSers } from '../utils/Apicall'
import { defineComponent } from 'vue';
import { useStore } from '@/stores/store';


export default defineComponent({
    components: { SearchBar, FilterGender, ResetAllFilters },
    directives: {
        infiniteScroll: infiniteScroll,
    },
    methods: {
        handleFilteredUsers(filteredUsers: Array<Object>) {
            console.log(filteredUsers)
            if (filteredUsers.length === 0) {
                return [{
                }]
            }
            else {
                console.log(this.store.getfilteredUsers)
                this.store.setFilteredUsers(filteredUsers)
                this.storedUsers = this.store.getfilteredUsers
                console.log(this.storedUsers)
                return this.storedUsers
            }

        },
        handleClick(user: Object) {
            this.store.setUser(user)
            console.log(this.store.user)
        },
        handleScroll() {
            const bottomOfWindow =
                document.documentElement.scrollHeight -
                document.documentElement.clientHeight;

            if (this.scrollPosition >= bottomOfWindow) {
                callRandomUSers()
                    .then((data: Array<Object>) => {
                        this.store.addUsers(data);
                        this.store.setAllUsersLS(data)
                        this.storedUsers = this.store.getAllUsers
                        console.log(this.storedUsers)
                        return this.storedUsers;
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        },

    },
    data() {
        const store = useStore();
        let storedUsers: Array<Object> = store.getAllUsers;
        return {
            storedUsers,
            store
        };
    },
    computed: {
        finalUsers() {
            return this.storedUsers;
        },
        scrollPosition() {
            return window.pageYOffset || document.documentElement.scrollTop;
        }
    },
    mounted() {
        window.addEventListener('scroll', this.handleScroll);
    },
    beforeUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    },
})

</script>
<template>
    <div class="infinite-scroll" v-infinite-scroll="handleScroll">
        <SearchBar :users="finalUsers" @newUsersArray="handleFilteredUsers" />
        <FilterGender :users="finalUsers" @newUsersArray="handleFilteredUsers" />
        <ResetAllFilters @filtersReset="handleFilteredUsers" />
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