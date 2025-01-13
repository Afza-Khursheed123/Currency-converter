let userscore = 0;
let computerscore = 0;
let user_scorebox = document.querySelector('#user-score');
let computerer_scorebox = document.querySelector('#computer-score');

let options = document.querySelectorAll('.option');
const generatechoice=()=>{
    let choices=['rock','paper','scissor'];
    let rand = Math.random() *2;
    rand = Math.round(rand);
    let computer_choice =choices[rand];
    return computer_choice;
}
const play=(user_choice)=>{
    let computer_choice = generatechoice();
    let msg = document.querySelector('#result');
    let comp_ans = document.querySelector('#computer');
    let user_ans = document.querySelector('#user');
    user_ans.innerText=user_choice;
    comp_ans.innerText=computer_choice;
    if(user_choice==computer_choice){
        msg.innerText=`Tie`
    }
    else if((user_choice=='rock' && computer_choice=='scissors') || (user_choice=='scissors' && computer_choice=='paper') || (user_choice=='paper' && computer_choice=='rock')){
        userscore +=10;
        user_scorebox.innerText= userscore;
        msg.innerText=`You Win`
    }
    
    else{
        msg.innerText=`Computer win`
        computerscore +=10;
        computerer_scorebox.innerText=computerscore;
    }
}
options.forEach((opt)=>{
 opt.addEventListener('click',()=>{
    const user_selected = opt.getAttribute('id');
    play(user_selected);
 });
});