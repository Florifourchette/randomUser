<script lang="ts">
import { useStore } from '@/stores/store';
import { defineComponent } from 'vue';


export default defineComponent({
    data() {
        const store = useStore()

        return { store }
    },
    computed: {
        displayedUser() {
            const user = this.store.getUser
            return user
        }
    },
})

</script>

<template>
    <sui-card>
        <sui-reveal animated="move">
            <sui-reveal-content visible>
                <sui-image :src="`${displayedUser.picture?.thumbnail}`" />
            </sui-reveal-content>
        </sui-reveal>
        <sui-card-content>
            <sui-card-header>
                <p>{{ displayedUser.name?.last }} {{ displayedUser.name?.first }}</p>
                <p>{{ displayedUser.id?.name }}: {{ displayedUser?.id?.value }}</p>
            </sui-card-header>
            <sui-card-meta>
                <h3>Contact</h3>
                <p>{{ displayedUser?.email }}</p>
                <p>{{ displayedUser?.phone }}</p>
            </sui-card-meta>
            <sui-card-description>
                <h3>Address</h3>{{ displayedUser.location?.street.name }} {{ displayedUser.location?.street.number
                }}</br>{{
    displayedUser.location?.postcode }} {{ displayedUser.location?.state }} {{ displayedUser.location?.country
    }}
            </sui-card-description>
        </sui-card-content>
    </sui-card>
</template>