<script lang="ts">
import { useStore } from '@/stores/store';
import { defineComponent } from 'vue';


export default defineComponent({
    data() {
        const store = useStore()
        const user = store.getUser
        const userDetailsClass = ''
        return { store, user, userDetailsClass }
    },
    computed: {
        displayedUser() {
            this.user = this.store.getUser
            if (this.user.name.last === 'deleted' || this.user.name.first === 'deleted') {
                this.userDetailsClass = 'userDetailsHidden'
                return this.user
            } else {
                this.userDetailsClass = ''
                return this.user
            }


        }
    },
})

</script>

<template>
    <div :class="userDetailsClass">
        <sui-card>
            <sui-reveal animated="move">
                <sui-reveal-content visible>
                    <sui-image :src="`${displayedUser.picture?.thumbnail}`" />
                </sui-reveal-content>
            </sui-reveal>
            <sui-card-content>
                <sui-card-header>
                    <p>{{ displayedUser.name?.last }} {{ displayedUser.name?.first }}</p>
                    <p>{{ displayedUser?.id?.value === null ? 'No ID found' : `${displayedUser.id?.name} :
                                            ${displayedUser?.id?.value}` }}</p>
                </sui-card-header>
                <sui-card-meta>
                    <h3>Contact</h3>
                    <p>{{ displayedUser?.email }}</p>
                    <p>{{ displayedUser?.phone }}</p>
                </sui-card-meta>
                <sui-card-description>
                    <h3>Address</h3>{{ displayedUser.location?.street.name }} {{ displayedUser.location?.street.number
                    }}</br>{{
    displayedUser.location?.postcode }} {{ displayedUser.location?.state }} {{
        displayedUser.location?.country
    }}
                </sui-card-description>
            </sui-card-content>
        </sui-card>
    </div>
</template>