<script lang="ts">
import Results from '@/components/Results.vue';
import UserDetails from '@/components/UserDetails.vue'

export default {
    components: {
        Results,
        UserDetails
    },
}

</script>

<template>
    <main>
        <Results />
        <UserDetails />
    </main>
</template>