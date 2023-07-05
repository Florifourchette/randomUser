<script lang="ts">
import { useStore } from '@/stores/store';
import { defineComponent } from 'vue';


export default defineComponent({
    data() {
        const store = useStore()
        const user = store.getUser
        const userDetailsClass = 'userDetailsHidden'
        return { store, user, userDetailsClass }
    },
    computed: {
        displayedUser() {
            this.user = this.store.getUser
            if (this.user.name.last === 'deleted' || this.user.name.first === 'deleted') {
                this.userDetailsClass = 'userDetailsHidden'
                return this.user
            } else {
                this.userDetailsClass = 'userDetailsDisplayed'
                return this.user
            }


        }
    },
})

</script>

<template>
    <div :class="userDetailsClass">
        <div class="card">
            <img class="card-img-top" :src="`${displayedUser.picture?.large}`" alt="displayedUser.name.last">
            <div class="card-body">
                <h5 class="card-title">{{ displayedUser.name?.last }} {{ displayedUser.name?.first }}</h5>
                <p>{{ displayedUser?.id?.value === null ? 'No ID found' : `${displayedUser.id?.name} :
                                    ${displayedUser?.id?.value}` }}</p>
            </div>
            <div class="card-body">
                <div class="descriptionItem">
                    <h3>Contact</h3>
                    <p>{{ displayedUser?.email }}</p>
                    <p>{{ displayedUser?.phone }}</p>
                </div>
                <div class="descriptionItem">
                    <h3>Address</h3>{{ displayedUser.location?.street.name }} {{ displayedUser.location?.street.number
                    }}</br>{{
    displayedUser.location?.postcode }} {{ displayedUser.location?.state }}</br>{{
        displayedUser.location?.country
    }}
                </div>
            </div>
        </div>
    </div>
</template>