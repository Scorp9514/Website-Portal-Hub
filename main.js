const plusBtn = document.getElementById('plusBtn');
const popup = document.getElementById('popup');

plusBtn.addEventListener('click',()=>{
    const rect = plusBtn.getBoundingClientRect();
    popup.style.left = rect.left + "px";
    popup.style.right = rect.right + "px";
    popup.style.display = popup.style.display === "block" ? "none" : "block";
    console.log('yo')
})