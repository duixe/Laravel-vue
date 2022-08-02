<template>
  <nav class="filter-nav">
    <a  
        class="btn btn-nav"
        @click.prevent="filter('all')"
        :class="{active: current === 'all'}"
    >
    All Task
    </a>
    <a
        class="btn btn-nav"
        @click.prevent="filter('completed')"
        :class="{active: current === 'completed'}"
    >
    Completed
    </a>
    <a
        class="btn btn-nav"
        @click.prevent="filter('ongoing')"
        :class="{active: current === 'ongoing'}"
    >
    ongoing 
    </a>
  </nav>
</template>

<script>
export default {
    props: ['current'],
    methods: {
        filter(arg) {
            this.$emit('filterChange', arg);
        }
    }
}
</script>

<style>

</style>