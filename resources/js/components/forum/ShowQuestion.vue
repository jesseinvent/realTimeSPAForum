<template>
    <v-card>
        <v-container>
            <v-card-title>
                <div>
                    <div class="headline">
                        {{question.title}}
                    </div>
                    <h6 class="grey--text">{{ question.user }} said {{question.created_at}}</h6>
                </div>
                <v-spacer></v-spacer>
                <v-btn color="teal" dark>{{ replyCount }} Replies</v-btn>
            </v-card-title>
            <v-card-text v-html="body"></v-card-text>
                <v-col v-if="own">
                    <v-btn icon @click="emit">
                        <v-icon
                            small
                            >
                            mdi-pencil
                        </v-icon>
                    </v-btn>
                    <v-btn icon @click="destroy">
                        <v-icon
                            small
                            >
                            mdi-delete
                        </v-icon>
                   </v-btn>
                </v-col>
        </v-container>
    </v-card>
</template>

<script>

export default {

    props : ['question'],
    data () { 
        return {
            own: User.own(this.question.user_id),
            replyCount: this.question.reply_count
        }
    },
    computed: {
        body () {
            return md.parse(this.question.body)
        }
    },

    methods: {
        destroy () { 
            axios.delete(`/api/question/${this.question.slug}`)
                .then(res => this.$router.push('/forum'))
                .catch(error => console.log(error.response.data))
        },

        emit () {
            EventBus.$emit('startEditting');
        }
    },

    created () {
        EventBus.$on('newReply', () => {
            this.replyCount++
        })
        
        EventBus.$on('deleteReply', () => {
            this.replyCount--
        })

        Echo.private('App.Models.User.' + User.id())
            .notification((notification) => {
            this.replyCount++
        });

        Echo.private('App.Models.User.' + User.id())
            .notification((notification) => {
            this.replyCount--
        });
    }
}

</script>

<style>
    
</style>