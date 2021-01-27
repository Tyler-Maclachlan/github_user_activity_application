import Vue from 'vue';

export default new Vue({
    methods: {
        displayErrorNotification(title: string, text: string) {
            this.$notify({
                title,
                text,
                duration: 4000,
                group: 'notifications',
                type: 'error'
            })
        }
    }
})