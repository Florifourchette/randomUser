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
                    const users: Array<User> = data.map((user) => {
                        return { email: user.email, gender: user.gender, location: user.location, name: user.name, phone: user.phone, picture: user.picture, id: user.id }
                    })
                    this.store.addUsers(users);
                    this.store.setAllUsersLS(users)
                    this.storedUsers = this.store.getAllUsers
                    return this.storedUsers;
                }).catch((error) => console.log(error))
        },

        handleFilteredUsers(filteredUsers: Array<User>) {
            if (filteredUsers.length === 0 || filteredUsers === undefined) {
                return this.storedUsers
            }
            else {
                this.store.setFilteredUsers(filteredUsers)
                this.storedUsers = this.store.getfilteredUsers
                return this.storedUsers
            }

        },
        handleClick(user: User) {
            this.store.setUser(user)
            return this.$emit('userClicked', user)
        },
        handleScroll() {
            const bottomOfWindow =
                document.documentElement.scrollHeight -
                document.documentElement.clientHeight;

            if (this.scrollPosition >= bottomOfWindow) {
                callRandomUSers()
                    .then((data: Array<User>) => {
                        const users: Array<User> = data.map((user) => {
                            return { email: user.email, gender: user.gender, location: user.location, name: user.name, phone: user.phone, picture: user.picture, id: user.id }
                        })
                        this.store.addUsers(users);
                        this.store.setAllUsersLS(users)
                        this.storedUsers = this.store.getAllUsers
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
                if (filteredUsers.length !== 0) {
                    this.storedUsers = filteredUsers
                }
                else {
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
    <div class="resultContainer">
        <SearchBar :users="finalUsers" @newUsersArray="handleFilteredUsers" />
        <FilterGender :users="finalUsers" @newUsersArray="handleFilteredUsers" />
        <ResetAllFilters @filtersReset="handleFilteredUsers" />
        <div id="infinite-list" class="infinite-scroll" v-infinite-scroll="handleScroll">
            <div v-for="( user, index ) in   finalUsers  " :key="index">
                <div class="card">
                    <img class="card-img-left" :src="`${user.picture?.thumbnail}`" alt="displayedUser.name.last">
                    <div class="card-body">
                        <h5 class="card-title">{{ user.name?.last }} {{ user.name?.first }}</h5>
                    </div>
                    <div class="card-body">
                        <p>{{ user?.email }}</p>
                    </div>
                </div>

            </div>
        </div>
        <button @click.prevent="handleMoreUsers">More results...</button>
    </div>
</template>../interface/UserInterface