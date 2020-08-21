const GRAVITY = 0.35 // 중력 가속도 상수
const JUMP_POWER = 40 // 점프에 적용되는 힘 상수
const entity = {
    accel : 0.7, // 가속도 상수
    spds : { // 현재 속도 (방향 : key, 속력 : value)
        x : 0,
        y : 0
    },
    key : {}, // 눌리고 있는 키들
    gravity : 0,
    jumpAble : true
}


function toInt(text){
    return Number(text.replace('px', ''))
}
function get(id){
    return document.querySelector(id)
}
function OnGround(target){
    let targetStyle = target.style
    let ground = get('#ground')
    return ground.offsetLeft < (toInt(targetStyle.left) + toInt(targetStyle.width) / 2) 
    && (ground.offsetLeft + toInt(ground.style.width)) > (toInt(targetStyle.left) + toInt(targetStyle.width) / 2)
    && toInt(targetStyle.top) + toInt(targetStyle.height) - ground.offsetTop > 0
    && !(ground.offsetTop - toInt(targetStyle.top) + toInt(targetStyle.height) < 0)
}
function loop(){
    update()
    move()
    window.requestAnimationFrame(loop)
}
function update(){
    get('#player').style.left = toInt(get('#player').style.left) + entity.spds.x + 'px'
    get('#player').style.top = toInt(get('#player').style.top) + entity.spds.y + 'px'
    entity.spds.x *= 0.909
    entity.spds.y *= 0.909


    if(!OnGround(get('#player'))){
        entity.gravity += GRAVITY
        get('#player').style.top = toInt(get('#player').style.top) + entity.gravity + 'px'
    } else {
        entity.gravity = 0
    }

}
function move(){
    if(entity.key['d']) entity.spds.x += entity.accel 
    if(entity.key['a']) entity.spds.x -= entity.accel 
    if(entity.key['w']){
        if(OnGround(get('#player'))){
            jump()
            entity.jumpAble = false;
        }
    }
}
function jump(){
    entity.spds.y -= JUMP_POWER
    entity.jumpAble = true;
}

document.addEventListener('keydown', e => {
    entity.key[e.key] = true
})
document.addEventListener('keyup', e => {
    delete entity.key[e.key]
})


window.requestAnimationFrame(loop)