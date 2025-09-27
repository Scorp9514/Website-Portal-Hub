const plusBtn = document.getElementById('plusBtn');
const popup = document.getElementById('popup');
const addWeb = document.getElementById('addWeb');
const changeBg = document.getElementById('changeBg');

plusBtn.addEventListener('click',()=>{
    const rect = plusBtn.getBoundingClientRect();
    popup.style.left = rect.left + "px";
    popup.style.right = rect.right + "px";
    popup.style.display = popup.style.display === "inline-block" ? "none" : "inline-block";
    console.log('yo')
})