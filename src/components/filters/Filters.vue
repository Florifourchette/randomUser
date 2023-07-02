<script lang="ts">
import { defineComponent } from 'vue';
import SearchBar from './SearchBar.vue'

export default defineComponent({
    props: {
        users: {
            type: Array<Object>,
            default: []
        }
    },
    components: {
        SearchBar
    }
})

</script>
<template>
    <div class="filtersContainer">
        <SearchBar :users="users" />
        <!-- <select class="ui fluid search selection simple dropdown">
            <option value="Type your search here">Type your search here</option>
            <option v-for="(user, index) in users" :key="index">{{ user.name.last }}</option>
        </select> -->
        <select class="ui dropdown">
            <option value="">Gender</option>
            <option value="1">Male</option>
            <option value="0">Female</option>
        </select>
    </div>
</template>