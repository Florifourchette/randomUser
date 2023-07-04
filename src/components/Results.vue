<script lang="ts">
import SearchBar from './SearchBar.vue';
import FilterGender from './FilterGender.vue'
import ResetAllFilters from './ResetAllFilters.vue';
import type { User } from '../interface/UserInterface'

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
        handleMoreUsers() {
            callRandomUSers()
                .then((data: Array<User>) => {
                    this.store.addUsers(data);
                    this.store.setAllUsersLS(data)
                    this.storedUsers = this.store.getAllUsers
                    console.log(this.store.getAllUsers)
                    console.log(this.storedUsers)
                    return this.storedUsers;
                })
                .catch((error) => {
                    console.log(error);
                })
        },

        handleFilteredUsers(filteredUsers: Array<User>) {
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
        handleClick(user: User) {
            this.store.setUser(user)
            console.log(this.store.user)
        },
        handleScroll() {
            console.log('handle scroll')
            const bottomOfWindow =
                document.documentElement.scrollHeight -
                document.documentElement.clientHeight;

            if (this.scrollPosition >= bottomOfWindow) {
                callRandomUSers()
                    .then((data: Array<Object>) => {
                        console.log(data)
                        const users: Array<User> = data.map((user) => {
                            return { email: user.email, gender: user.gender, location: user.location, name: user.name, phone: user.phone, picture: user.picture }
                        })
                        console.log(users)
                        this.store.addUsers(users);
                        this.store.setAllUsersLS(users)
                        this.storedUsers = this.store.getAllUsers
                        console.log(this.store.getAllUsers)
                        console.log(this.storedUsers)
                        return this.storedUsers;
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        },
        async handleRefresh() {
            try {
                const allUsers = await this.store.getAllStoredUsers
                const filteredUsers = await this.store.getfilteredUsers

                console.log(allUsers)
                console.log(filteredUsers)
                let users: Array<User> = []
                if (filteredUsers.length !== 0) {
                    console.log('filteredUsers !== undefined')
                    this.storedUsers = filteredUsers
                }
                else {
                    console.log('allUsers !== undefined')
                    this.storedUsers = allUsers
                }

                return this.storedUsers
            } catch (error) {
                console.log(error)
            }
        }

    },
    data() {
        const store = useStore();
        let storedUsers: Array<User> = store.getAllUsers;
        return {
            storedUsers,
            store,
        };
    },
    computed: {
        finalUsers() {
            console.log(this.storedUsers)
            return this.storedUsers;
        },
        scrollPosition() {
            return document.documentElement.scrollTop;
        }
    },
    mounted() {
        this.handleRefresh()
    },
})

</script>
<template>
    <div>
        <SearchBar :users="finalUsers" @newUsersArray="handleFilteredUsers" />
        <FilterGender :users="finalUsers" @newUsersArray="handleFilteredUsers" />
        <ResetAllFilters @filtersReset="handleFilteredUsers" />
        <div id="infinite-list" class="infinite-scroll" v-infinite-scroll="handleScroll">
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
        </div>
        <button @click.prevent="handleMoreUsers">More results...</button>
    </div>
</template>../interface/UserInterface