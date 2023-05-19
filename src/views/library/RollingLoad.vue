<template>
    <div>
        <div class="rolling-div">
            <RollingLoad></RollingLoad>
        </div>
    </div>
</template>
<script>
    import RollingLoad from "@/components/library/RollingLoad";
    export default {
        name: 'Test',
        data() {
            return {
            };
        },
        components: {
            RollingLoad
        },
        methods: {
        },
        created() {
        }
    };
</script>
<style scoped>
</style>