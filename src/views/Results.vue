<script lang="ts">
//Vue modules
import { defineComponent } from 'vue';

//components
import SearchBar from '@/components/SearchBar.vue';
import FilterGender from '@/components/FilterGender.vue'
import ResetAllFilters from '@/components/ResetAllFilters.vue';

//interface
import type { User } from '../interface/UserInterface'

//third-party library modules
import infiniteScroll from 'vue-infinite-scroll'

//custom modules
import { useStore } from '@/stores/store';
import { handleAPI } from '@/utils/handleAPI';



export default defineComponent({
    components: { SearchBar, FilterGender, ResetAllFilters },
    directives: {
        infiniteScroll: infiniteScroll,
    },
    methods: {
        async handleMoreUsers() {
            this.storedUsers = await handleAPI()
            return this.storedUsers
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
        async handleScroll() {
            const bottomOfWindow =
                document.documentElement.scrollHeight -
                document.documentElement.clientHeight;

            if (this.scrollPosition >= bottomOfWindow) {
                this.storedUsers = await handleAPI()
                return this.storedUsers
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
                <div class="card" @click="handleClick(user)">
                    <img class="card-img-left" :src="`${user.picture?.thumbnail}`" alt="displayedUser.name.last">
                    <div class="card-body">
                        <h6 class="card-title">{{ user.name?.last }} {{ user.name?.first }}</h6>
                    </div>
                    <div class="card-body">
                        <p>{{ user?.email }}</p>
                    </div>
                </div>

            </div>
        </div>
        <button @click.prevent="handleMoreUsers">More results...</button>
    </div>
</template>