import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';
const supabaseUrl = 'https://vwvijlosyyueozawvrak.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ3dmlqbG9zeXl1ZW96YXd2cmFrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTMzMDYzODUsImV4cCI6MjAwODg4MjM4NX0.pqpK7cJpvrNHhiIY94M9NNmgsKYpWYu1HjqIJoVcBYQ'
const supabase = createClient(supabaseUrl, supabaseKey)
let ghbBtn = document.getElementById('si-gh')
let signIn = document.getElementById('si-si')
let email = document.getElementById('email')
let password = document.getElementById('password')

ghbBtn.addEventListener('click', (e)=>{
    console.log('sdfghjkl');
    e.preventDefault()
    isUser()
    async function signInWithGitHub() {
        const { data, error } = await supabase.auth.signInWithOAuth({
          provider: 'github',
        })
      }
      signInWithGitHub()
   
})
signIn.addEventListener('click',(e)=>{
  e.preventDefault()
  if (true) {
    isUser()
    async function sign_in() {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.value,
        password: password.value2,
      })
    }
      if (error){
        console.log(error);
      }
    sign_in()
  }
  else{
    console.error('fill all parts');
  }
  
})
async function isUser(){
  let {data, error} = await supabase
    .from('user_store')
    .select() 
    let mails = data.map(e => e.email)
    if(mails.includes(email.value)){
      console.log('yoooou are a user');
      saveToLocal()
    }
    else{
      console.log(`email does'nt exist`);
    }

}
async function saveToLocal() {
  let {data, error} = await supabase
  .from('user_store')
  .select('id,name,email,userId')
  .eq('email',`${email.value}`)
  localStorage.clear()
  localStorage.setItem("userInfo", JSON.stringify(data));
  localStorage.setItem("isLogged", "true");  
  localStorage.setItem("userId", JSON.stringify(data[0].userId))
}
// saveToLocal()