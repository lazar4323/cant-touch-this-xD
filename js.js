const evilButton = document.getElementById('evil-button')
const OFFSET = 100;

evilButton.addEventListener('click', () =>{
    alert("Nice try! Bye!")
    window.close();
})

document.addEventListener('mousemove', (e) =>{
    const x= e.pageX
    const y= e.pageY
    const buttonBox= evilButton.getBoundingClientRect()//we are getting position of our evil button
    console.log(buttonBox.x, buttonBox.y) //we are getting position of our mouse
    const horizontalDistanceFromCenter = distanceFromCenter(buttonBox.x, x, buttonBox.width)//kroz ovo znamo kolko je nas mis blizu dugmetu horizontalno 
    const verticalDistanceFromCenter = distanceFromCenter(buttonBox.y, y, buttonBox.height)// vertikalno
    const horizontalOffset = buttonBox.width / 2 + OFFSET //na kojoj razdaljini misa od dugmeta vec hocemo da krenemo da pomeramo dugme
    const verticalOffset = buttonBox.height / 2 + OFFSET

    if(Math.abs(horizontalDistanceFromCenter) <= horizontalOffset && Math.abs(verticalDistanceFromCenter) <= verticalOffset){
       setButtonPosition(
           buttonBox.x + horizontalOffset / horizontalDistanceFromCenter * 10,
           buttonBox.y + verticalOffset / verticalDistanceFromCenter * 10
       ) 
    }
})

function setButtonPosition(left,top){

    const windowBox = document.body.getBoundingClientRect()
    const buttonBox= evilButton.getBoundingClientRect()

    if(distanceFromCenter(left,windowBox.left,buttonBox.width) <0 ){
        left = windowBox.right - buttonBox.width - OFFSET
    }
    if(distanceFromCenter(left,windowBox.right,buttonBox.width) >0 ){
        left = windowBox.left + OFFSET
    }
    if(distanceFromCenter(top,windowBox.top,buttonBox.height) <0 ){
        top = windowBox.bottom - buttonBox.height - OFFSET
    }
    if(distanceFromCenter(top,windowBox.bottom,buttonBox.height) >0 ){
        top = windowBox.top + OFFSET
    }


    evilButton.style.left = `${left}px`
    evilButton.style.top = `${top}px`
    console.log(x,y)
}

function distanceFromCenter(boxPosition, mousePosition,boxSize){
    return boxPosition - mousePosition + boxSize /2
}

//horizontalDistanceFromCenter je distanca od kursora do centra buttona
//OFFSET default je 100 razdaljina na kojoj dugme vec pocinje da se krece 
//kod prvog if() proveravamo da li je horizontalna i vertikalna distanca od centra manja ili jednaka default offsetu.
// u koliko je manja ili jednaka OFFSETU onda jednostavno hocemo da promenimo poziciju dugmeta
//jer je distanca izmdju naseg kursora i centra dugmeta manja ili jednaka offsetu koji je default 100 
