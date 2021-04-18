<template>
  <div id="app">
     <label >ID: </label><input type="text" v-model="id"><br />
    <label >Tarefa: </label><input type="text" v-model="tarefa"><br />
    <label >Autor: </label><input type="text" v-model="autor"><br />
    <button @click="cadastrar">Cadastrar</button>
       <button @click="buscarposts">Buscar</button>
            <button @click="atualizarpost">Atualizar</button>
             <button @click="deletePost">Excluir</button>
       <hr>
     <ul>
       <li v-for="post in posts" :key="post.id">
       
         ID: {{post.id}}   <br />
         Tarefa: {{post.tarefa}}   <br />
         Autor: {{post.autor}}
         <br />
         <br />
       </li>
     </ul>
  </div>
</template>

<script>
import firebase from './services/firebase-connection';
export default {
  name: 'App',
  components: {
    
  },
  data(){
    return{
      id:'',
      autor : '',
      tarefa: '',
      posts:[]
    }
  },
 async created(){
   await firebase.firestore().collection('posts')
   .onSnapshot((doc) => {
     this.posts = [] 
     doc.forEach((item) => {
        this.posts.push({
         id:item.id,
         tarefa:item.data().tarefa,
         autor: item.data().autor
     })
     })
   })
  },
  methods:{
   async cadastrar(){
      await firebase.firestore().collection('posts')
      // .doc('123')
      .add({
        tarefa:this.tarefa,
        autor:this.autor
      })
      .then( () => {
        console.log('cadastrado com sucesso')
        this.autor = ''
        this.tarefa = ''
      })
      .catch((error)=> {
              console.log('GEROU ERRO',error)
      })
    },
    async buscarposts () {
      this.posts = []
      // await firebase.firestore().collection('posts')
      // .doc('123')
      // .get()
      // .then((snapshot) => {
      //   this.tarefa = snapshot.data().tarefa,
      //   this.autor = snapshot.data().autor
      // })
      // .catch((error) => {
      //   console.log('GEROU ERRO',error)
      // })
      await firebase.firestore().collection('posts')
      .get()
      .then ((snapshot) => {
        snapshot.forEach((doc) => {
          this.posts.push({
          id:doc.id,
          tarefa: doc.data().tarefa,
          autor: doc.data().autor
          })
    
        })
      })
    }, 
    async atualizarpost(){
      await firebase.firestore().collection('posts').doc(this.id)
      .update({
        tarefa:this.tarefa,
        autor:this.autor
      })
      .then(() => {
           console.log('atualizado com sucesso')
                 this.id = ''
                this.autor = ''
                 this.tarefa = ''
      })
      .catch((error)=> {
              console.log('GEROU ERRO',error)
      })
    },
    async deletePost(){
      if(this.id === '') return
      await firebase.firestore().collection('posts').doc(this.id)
      .delete()
      .then (() => {
        this.id = ''
        console.log("EXCLUIDO")
      })
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
