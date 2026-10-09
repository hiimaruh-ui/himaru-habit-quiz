(function(root){
 const keys=['A','B','C','D','E','F'];
 function score(selected,questions){const s=Object.fromEntries(keys.map(k=>[k,0]));for(const i of new Set(selected)){if(!Number.isInteger(i)||!questions[i])throw Error('Invalid question');for(const [k,v] of Object.entries(questions[i][1]))s[k]+=v;}return s;}
 function leaders(scores){const max=Math.max(...Object.values(scores));return max>0?keys.filter(k=>scores[k]===max):[];}
 function priority(question, tied){const main=Object.entries(question[1]).find(([,v])=>v===2)?.[0];return tied.includes(main)?main:null;}
 function secondary(scores,main){const other=keys.filter(k=>k!==main&&scores[k]>0);const max=Math.max(0,...other.map(k=>scores[k]));return other.filter(k=>scores[k]===max);}
 const api={score,leaders,priority,secondary};if(typeof module!=='undefined')module.exports=api;else root.QuizLogic=api;
})(typeof window==='undefined'?globalThis:window);
