(function(root){
 const keys=['A','B','C','D','E','F'];
 function score(selected,questions){const s=Object.fromEntries(keys.map(k=>[k,0]));for(const i of new Set(selected)){if(!Number.isInteger(i)||!questions[i])throw Error('Invalid question');for(const [k,v] of Object.entries(questions[i][1]))s[k]+=v;}return s;}
 function leaders(scores){const max=Math.max(...Object.values(scores));return max>0?keys.filter(k=>scores[k]===max):[];}
 function resolve(scores,finalChoice){if(!keys.includes(finalChoice))throw Error('Invalid final answer');const tied=leaders(scores);return tied.length===1?tied[0]:tied.includes(finalChoice)?finalChoice:null;}
 function secondary(scores,main){const other=keys.filter(k=>k!==main&&scores[k]>0);const max=Math.max(0,...other.map(k=>scores[k]));return other.filter(k=>scores[k]===max);}
 const api={score,leaders,resolve,secondary};if(typeof module!=='undefined')module.exports=api;else root.QuizLogic=api;
})(typeof window==='undefined'?globalThis:window);
