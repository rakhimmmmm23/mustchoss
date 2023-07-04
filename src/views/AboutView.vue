<template>
    <main>
        <div class="container">
            <h1>This is an about page</h1>
        </div>
    </main>
</template>
  
<script>
import { useHead } from '@vueuse/head'
export default {
    data () {
        return {
            title: 'My Options API title'
        }
    },
    setup(){
        useHead({
            title: 'Hello World'
        })
    },
    beforeMount () {
        // document.title = this.title
    }
}
</script>