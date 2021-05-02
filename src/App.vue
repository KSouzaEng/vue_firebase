<template>
  <div id="app">
    <div v-if="!user">
      <h1>Entrar</h1>
      <label >Email: </label>
      <input type="text" v-model="email"><br /><br />
      <label>Senha: </label>
      <input type="text" v-model="senha"><br /><br />
      <button @click="Entrar">Entrar</button>
    </div>
    <div v-else>
      <h1>Você está Logado</h1>
      <h2>{{this.email}}</h2>
      <button @click="sair">Sair</button>
    </div>
    <hr>
     <label >ID: </label><input type="text" v-model="idPost"><br /><br />
    <label >Tarefa: </label><input type="text" v-model="tarefa"><br /><br />
    <label >Autor: </label><input type="text" v-model="autor"><br /><br />
    <button @click="cadastrar">Cadastrar</button>
       <button @click="buscarposts">Buscar</button>
            <button @click="atualizarpost">Atualizar</button>
            
       <hr>
     <ul>
       <li v-for="post in posts" :key="post.id">
       
         ID: {{post.id}}  <button @click="deletePost(post.id)">Excluir</button>  <br />
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
      idPost:'',
      autor : '',
      tarefa: '',
      email:'',
      senha:'',
      user:false,
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
   await firebase.auth().onAuthStateChanged((user)=>{
     if(user){
       this.user = true
       console.log(user)
       this.email = user.email
     }else{
       this.user = false
       this.email = ''
       this.senha = ''
     }
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

      await firebase.firestore().collection('posts').doc(this.idPost)
      .update({
        tarefa:this.tarefa,
        autor:this.autor
      })
      .then(() => {
           console.log('atualizado com sucesso')
                
                this.autor = '';
                 this.tarefa = '';
                  this.id = '';
      })
      .catch((error)=> {
              console.log('GEROU ERRO',error)
      })
    },
    async deletePost(id){
    
      await firebase.firestore().collection('posts').doc(id)
      .delete()
      .then (() => {
        this.id = ''
        console.log("EXCLUIDO")
      })
    },
    async CadastrarUsuario (){
      await firebase.auth().createUserWithEmailAndPassword(this.email,this.senha)
      .then(() => {
        this.email = '',
        this.senha = ''
        console.log("OK")
      })
      .catch((error)=>{
       if(error.code === 'auth/weak-password'){
         alert("SENHA MUITO FRACA")
       }else if(error.code === 'auth/email-already-in-use')
           alert("EMAIL JÁ EXISTE")
      })
    },
    async sair(){
      await firebase.auth().signOut()
    },
    async Entrar(){
      await firebase.auth().signInWithEmailAndPassword(this.email,this.senha)
      .then((response)=>{
        console.log(response)
      })
      .catch((error)=>{
        console.log(error)
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
