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
            console.log('handle scroll')
            const bottomOfWindow =
                document.documentElement.scrollHeight -
                document.documentElement.clientHeight;

            if (this.scrollPosition >= bottomOfWindow) {
                callRandomUSers()
                    .then((data: Array<Object>) => {
                        this.store.addUsers(data);
                        this.store.setAllUsersLS(data)
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
                let users: Array<Object> = []
                if (filteredUsers.length !== 0) {
                    console.log('filteredUsers !== undefined')
                    this.storedUsers = filteredUsers
                }
                else
                // if (allUsers !== undefined && allUsers !== null)
                {
                    console.log('allUsers !== undefined')
                    this.storedUsers = allUsers
                }
                // else {
                //     console.log('API call')
                //     callRandomUSers()
                //         .then((data: Array<Object>) => {
                //             this.store.addUsers(data);
                //             this.store.setAllUsersLS(data)
                //             return this.store.getAllUsers
                //         }).then((data) => {
                //             console.log(data)
                //             return this.storedUsers = data
                //         }
                //         )
                //         .catch((error) => {
                //             console.log(error);
                //         })
                // }

                return this.storedUsers
            } catch (error) {
                console.log(error)
            }
        }

    },
    data() {
        const store = useStore();
        let storedUsers: Array<Object> = store.getAllUsers;
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
        // window.addEventListener('scroll', this.handleScroll);
        this.handleRefresh()
    },
    // beforeUnmount() {
    //     window.removeEventListener('scroll', this.handleScroll);
    // },
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
</template>