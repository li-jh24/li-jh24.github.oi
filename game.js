// 在现有代码最前面添加首页逻辑
document
.getElementById('homepage').addEventListener('click', () => {
  document
.getElementById('homepage').style.display = 'none';
  document
.querySelector('.game-container').style.display = 'block';
});


// 1. 定义游戏数据（场景、选项、分数）
const gameData = {
    currentScene: "start", // 当前场景ID
    totalScore: 0,         // 玩家总分
    scenes: {
        // 初始场景
        start: {
            text: "📚 期中生存游戏开始！今晚你要：",
            options: [
                {
                    id: 1,
                    img: "images/熬夜卷.gif", // 图片路径
                    target: "study",            // 跳转目标场景
                    score: 10,                  // 分值变化
                    text: "通宵复习！"          // 鼠标悬停提示（可选）
                },
                {
                    id: 2,
                    img: "images/眠了.gif",
                    target: "study",
                    score: -10,
                    text: "直接躺平睡觉！"
                }
            ]
        },
        // 上课场景1
        study: {
            text: "💻 第二天上课时巨困无比",
            options: [
                {
                    id: 1,
                    img: "images/眠了.gif", // 图片路径
                    target: "teacher",            // 跳转目标场景
                    score: -10,                  // 分值变化
                    text: "眠了！"          // 鼠标悬停提示（可选）
                },
                {
                    id: 2,
                    img: "images/认真听.gif",
                    target: "DDL",
                    score: 10,
                    text: "认真听讲！"
                }// 更多选项（后续扩展）
            ]
        }
        // 上课场景2
        ,sleep: {
            text: "💻 第二天上课时精神很好",
            options:[
                {
                    id: 1,
                    img: "images/摸鱼.gif", // 图片路径
                    target: "DDL",            // 跳转目标场景
                    score: -10,                  // 分值变化
                    text: "开始摸鱼！"          // 鼠标悬停提示（可选）
                },
                {
                    id: 2,
                    img: "images/认真听.gif",
                    target: "DDL",
                    score: 10,
                    text: "认真听讲！"
                 }
       
            ]
         }
          //上课睡觉被老师抓住
        ,teacher: {
            text: "孩子，平时分扣10分",
            options: [
                {
                    id: 1,
                    img: "images/鼠了.gif", // 图片路径
                    target: "DDL",            // 跳转目标场景
                    score: -10,                  // 分值变化
                    text: " "          // 鼠标悬停提示（可选）
                }
            ]
        }
         // DDL
        ,DDL: {
            text: "💻 你有一个临近的DDL",
            options:[
                {
                    id: 1,
                    img: "images/赶due.gif", // 图片路径
                    target: "Play_outside",            // 跳转目标场景
                    score: 10,                  // 分值变化
                    text: "开赶！"          // 鼠标悬停提示（可选）
                },
                {
                    id: 2,
                    img: "images/拖延.gif",
                    target: "DDL_yesterday",
                    score: -10,
                    text: "拖延！"
                 }
            ]
         }
         //DDL_yesterday
        ,DDL_yesterday: {
            text: "什么DDL是昨天！",
            options: [
                {
                    id: 1,
                    img: "images/错过DDL.gif", // 图片路径
                    target: "Play_outside",            // 跳转目标场景
                    score: -10,                  // 分值变化
                    text: " "          // 鼠标悬停提示（可选）
                }
            ]
         }
         //Play_outside
        ,Play_outside:{
            text:"crush竟然约你出去玩？！",
            options:[
                {
                    id: 1,
                    img: "images/会会crush.gif", // 图片路径
                    target: "Little_Red_Book",            // 跳转目标场景
                    score: -10,                  // 分值变化
                    text: "欣然同意"          // 鼠标悬停提示（可选）
                },
                {
                    id: 2,
                    img: "images/一心向学.gif",
                    target: "Little_Red_Book",
                    score: 10,
                    text: "一心向学"
                 }
            ]
         }
         //Little_Red_Book
        ,Little_Red_Book:{
            text:"刷小红书刷到限额了",
            options:[
                {
                    id: 1,
                    img: "images/一心向学.gif", // 图片路径
                    target: "Test_Tomorrow",            // 跳转目标场景
                    score: 10,                  // 分值变化
                    text: "一心向学"          // 鼠标悬停提示（可选）
                },
                {
                    id: 2,
                    img: "images/刷小红薯.gif",
                    target: "Test_Tomorrow",
                    score: -10,
                    text: "继续刷"
                 }
            ]
         }
          //Test_Tomorrow
        ,Test_Tomorrow:{
            text:"明天就要考试了",
            options:[
                {
                    id: 1,
                    img: "images/抱佛脚.gif", // 图片路径
                    target: "final_ending",            // 跳转目标场景
                    score: 5,                  // 分值变化
                    text: "抱佛脚"          // 鼠标悬停提示（可选）
                },
                {
                    id: 2,
                    img: "images/拜三拜.gif",
                    target: "final_ending",
                    score: 5,
                    text: "拜三拜"
                 },
                 {
                    id:3,
                    img:"images/眠了.gif",
                    target:"final_ending",
                    score:-5,
                    text:"眠了"
                 }
            ]
         }
        ,final_ending: {
            text: "", // 文字留空，由结算界面展示
            options: [] // 空数组表示结局
          }
    }
};


// 2. 加载场景函数
function loadScene(sceneId) {
    const scene = gameData.scenes[sceneId];
    
    // 更新场景文字
    document.getElementById("scene-text").innerHTML = scene.text;
    
    // 清空旧选项
    const optionsContainer = document.getElementById("options");
    optionsContainer.innerHTML = "";
    
    // 动态生成选项按钮
    scene.options.forEach(option => {
        const button = document.createElement("button");
        button.className = "option-button";
        button.innerHTML = `<img src="${option.img}" alt="选项${option.id}">`;
        
        // 添加悬停提示（可选）
        if (option.text) {
            button.title = option.text;
        }
        
        // 绑定点击事件
        button.onclick = () => selectOption(option);
        optionsContainer.appendChild(button);
    });
    
    // 更新分数显示
    updateScore();
}

// 3. 处理选项点击
function selectOption(option) {
    // 播放点击音效（需提前准备音效文件）
    const clickSound = new Howl({ src: ["sounds/click.mp3"] });
    clickSound.play();
    
    // 更新分数和场景
    gameData.totalScore += option.score;
    gameData.currentScene = option.target;
    
    // 判断是否进入结局场景
    if (isEndScene(option.target)) {
        showEnding();
        return; // 终止后续流程
    }

    loadScene(option.target);
}

// 新增结局判断函数
function isEndScene(sceneId) {
    const scene = gameData.scenes[sceneId];
    const endScenes = ['final_ending']; // 包含所有结局场景
    return scene.options.length === 0 || endScenes.includes(sceneId);
  }
 

// 初始化本地存储
let gameHistory = JSON.parse(localStorage.getItem('gameHistory')) || [];

// 历史战绩弹窗
document.getElementById('showHistory').addEventListener('click', () => {
    // 添加遮罩层
    const mask = document.createElement('div');
    mask.className = 'history-mask';
    const html = `
        <div class="history-popup">
            <h2>📅 历史战绩</h2>
            <ul>
                ${gameHistory.map(record => `
                    <li>${record.date} - ${record.grade} (${record.score}分)</li>
                `).join('')}
            </ul>
            <button onclick="this.parentElement.remove()">关闭</button>
        </div>
    `;
    // 组合元素
    mask.innerHTML = html;
    document.body.appendChild(mask);
    
    // 点击遮罩层关闭
    mask.addEventListener('click', (e) => {
        if(e.target === mask) mask.remove();
    });
});

function showEnding() {
    const container = document.getElementById('ending-container');
    const animation = container.querySelector('.fullscreen-animation');
    const scoreCard = container.querySelector('.score-card');
    
    // 隐藏游戏界面
    document.querySelector(".game-container").style.display = "none";
    container.style.display = "block";
    
    // 计算成绩
    const finalScore = calculateGrade(gameData.totalScore);
    container.querySelector('.grade').textContent = finalScore.grade;
    container.querySelector('.comment').textContent = finalScore.comment;
    
    // 新增gif显示元素
    const gradeGif = document.createElement('img');
    gradeGif.className = 'grade-gif';
    gradeGif.src = finalScore.gif;
    scoreCard.appendChild(gradeGif);
    
    // 动画结束后处理
    animation.addEventListener('animationend', () => {
        scoreCard.classList.remove('hidden');
        animation.style.display = 'none';
    }, { once: true });
    
    // 重新开始按钮
    container.querySelector('.restart-btn').onclick = () => {
        location.reload();
    };
    
    // 保存记录
    gameHistory.push({
        date: new Date().toLocaleString(),
        grade: finalScore.grade,
        score: gameData.totalScore
    });
    localStorage.setItem('gameHistory', JSON.stringify(gameHistory));
    // 新增加载完成检测
    const envelopeImg = container.querySelector('.envelope-animation');
    envelopeImg.onload = function() {
        // 确保图片加载完成后开始动画
        this.style.visibility = 'visible';
    
        // 动画结束后处理
        this.addEventListener('animationend', () => {
        setTimeout(() => { // 增加额外停留时间
            scoreCard.classList.remove('hidden');
        }, 500);
    }, { once: true });
};

    // 防止图片缓存导致事件不触发
    if (envelopeImg.complete) envelopeImg.onload();
}


// 新增成绩计算函数
function calculateGrade(score) {
    // 计算理论最高分（需根据实际选项调整）
    const MAX_SCORE = 50; // 根据现有选项路径的最大分值
    // 将实际得分转换为百分制
    const percent = Math.round((score / MAX_SCORE) * 100);
    const normalized = Math.min(100, Math.max(0, percent)); // 确保在0-100之间
    
    let grade, comment, gif;
    if (normalized >= 80) {
      grade = 'A'; comment = '生存大师！';gif = 'images/卷王.gif'; 
    } else if (normalized >= 60) {
      grade = 'B'; comment = '勉强过关';gif = 'images/苟着.gif'; 
    } else {
      grade = 'C'; comment = '下次加油';gif = 'images/鼠了.gif'; 
    }
    
    return { grade, comment,gif};

  }

// 5. 初始化游戏：加载初始场景
loadScene(gameData.currentScene);