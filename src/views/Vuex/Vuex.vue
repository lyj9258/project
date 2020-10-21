<template>
    <div>
        {{num}}
        {{city}}
        <br/>
        <button @click="handle3">点我加13</button>
    </div>
</template>

<script>
// 按需导入mapstate
import {mapMutations, mapState,mapGetters,mapActions} from 'vuex'
export default {
    data() {
        return {
            num:1
        }
    },
    mounted() {
        // state直接获取对应的数据值
        console.log(this.$store.state.count);
        console.log(this.$store.state.city);

    },
    computed: {
       ... mapState(['count','city']),
       ...mapGetters(['getCount']),
    },
    mutations:{

    },
    methods: {
        ...mapMutations(['add']),
        ...mapActions(['addAsync']),
        handle1:function(){
            this.$store.commit('add',13)
        },
        handle2:function(){
            this.add(13)
        },
        handle3:function(){
            this.$store.dispatch('addAsync',31)
        }
    },
    
}
</script>