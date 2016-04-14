
var sum = 200;
var allNum = [];
var timer;
var win_num;
// 输出多少个数字的数组
function total() {
    for (var i = 0; i < sum; i++) {
        allNum[i] = i;
    }
    return allNum;
};

allNum = total();
var num = allNum.length-1;

//(from,to,percent)增加概率从from到to，增加概率为正常概率的percent倍
function addPercent(from,to,percent){
    
    for(;from <= to;from ++){
        for(var i = 0;i < percent;i++){
            allNum.push(from);
        }
    }
    console.log(allNum);
}
addPercent(61,100,5);

// 给低位数前面增加零
function addZero(){
    for(var i = 0;i < allNum.length;i++){
        if (allNum[i] < 100) {
            if (allNum[i] < 10) {
                allNum[i] = "00"+allNum[i];
            }else{
                allNum[i] = "0"+allNum[i];
            }
        }
    }
}
addZero();

// 得到不超过总数的随机数
function GetRnd(num) {
    var random = Math.random().toFixed(3) * 1000;
    while (random > num) {
        random = Math.random().toFixed(3) * 1000;
    }
    return random;
}

// 显示随机到的数字
function change() {
    num = allNum.length-1;
    $("#order").text(allNum[GetRnd(num)]);
    // console.log(allNum[GetRnd(num)]);
}

// 开始抽奖
function start() {
    clearInterval(timer);
    timer = setInterval('change()', 10); //随机数据变换速度，越小变换的越快
}

// 停止抽奖
function stop(win_num) {
    clearInterval(timer);
    $('#order').text(allNum[win_num]);
    // $('.winner_box').show();
    // if (allNum[win_num] == undefined) {

    //     alert(win_num + " " +num);
    // }
    // $('.winner_box').append('<div class="winner">'+allNum[win_num]+'</div>')
}
var situation = 'start';
var input_sit = 'show';


$(document).ready(function() {
    $('.button').click(function() {
        var meanwhile = $('.num').val();
        switch(situation){
            case 'start':
                start();
                $('.button').text('停止抽奖');
                situation = 'stop';
                break;
            case 'stop':
                $('.winner_box').empty();
                $('.button').text('开始抽奖');
                for(var i = 0;i < meanwhile;i++){
                    num = allNum.length-1;
                    win_num = GetRnd(num);
                    stop(win_num);
                }
                //获奖后不可再次获奖
                var check = allNum[win_num];
                var checkNum = allNum.length;
                for(var i = 0; i < checkNum;i++){
                    
                    if (check == allNum[i]) {
                        allNum.splice(i,1);
                        i--;
                    }
                }
                
                // $('.winner_box').append('<div class="clear"></div>')
                situation = 'start';
                break;
        }
    });
    // $('.show').click(function(event) {
    //     switch(input_sit){
    //         case 'show':
    //             $('.num').show();
    //             input_sit = 'hide';
    //             break;
    //         case 'hide':
    //             $('.num').hide();
    //             input_sit = 'show';
    //             break;
    //     }
    // });
});
