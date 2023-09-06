import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';
const supabaseUrl = 'https://vwvijlosyyueozawvrak.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ3dmlqbG9zeXl1ZW96YXd2cmFrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTMzMDYzODUsImV4cCI6MjAwODg4MjM4NX0.pqpK7cJpvrNHhiIY94M9NNmgsKYpWYu1HjqIJoVcBYQ'
const supabase = createClient(supabaseUrl, supabaseKey)
let ghbBtn = document.getElementById('su-gh')
let signUp = document.getElementById('su-ca')
let name = document.getElementById('name')
let email = document.getElementById('email')
let password = document.getElementById('password')


ghbBtn.addEventListener('click', (e)=>{
    console.log('sdfghjkl');
    e.preventDefault()
    if (email.value.length > 2 ) {
      createUserProfile()
      async function signInWithGitHub() {
          const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'github',
          })
        }
        signInWithGitHub()
    }
   
})
function uuid() {
  return ('10000000-1000-4000-8000-100000000000').replace(/[018]/g, c => (
      c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)
  );
}    

signUp.addEventListener('click',(e)=>{
  e.preventDefault()
  if (true) {
    createUserProfile()
    async function sign_up() {
      const { data, error } = await supabase.auth.signUp({
        email: email.value,
        password: password.value,
        options: {
          data: {
            name: name.value,
          }
        }
      })
      if (error){
        console.log(error);
      }
    }
    sign_up()
  }
  else{
    console.error('fill all parts');
  }
  
})

  

async function createUserProfile() {
  let {data, error} = await supabase
    .from('user_store')
    .select() 
    let mails = data.map(e => e.email)

  if (!mails.includes(email.value)) {
    console.log('okay for go');
    let {data, error} = await supabase
      .from('user_store')
      .insert({email: email.value, userId: uuid()})
      .select() 
      console.log(data);
      if (error) {
        console.log(error);
      }
      console.log(email.value);
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
      saveToLocal()
  }
  else{
    console.log('email already exist');
  }
}