const assert=require('node:assert/strict'),Q=require('./data.js'),L=require('./logic.js');
const baseline=[["仕事や家事で疲れて、運動する元気が残っていない",{"A":2,"B":1}],["睡眠や休む時間が足りず、まずは休みたいと感じる",{"A":2}],["家族や仕事を優先して、自分の食事や休憩は後回しになる",{"B":2,"A":1}],["自分のためだけに時間を使うと、つい気が引ける",{"B":2}],["少しでも予定どおりにできないと「もういいや」と全部やめてしまう",{"C":2,"F":1}],["きちんとできる準備が整わないと、なかなか始められない",{"C":2}],["自分のために献立や栄養バランスを考えて料理するのが負担",{"D":2,"B":1}],["野菜やおかずを用意するのが面倒で、手軽なものだけで済ませがち",{"D":2}],["痩せるために、お菓子やご飯など好きなものを禁止しがち",{"E":2,"C":1}],["食べたいものを我慢しすぎて、反動で食べてしまうことがある",{"E":2,"A":1}],["始めるときに食事も運動も一度に変えて、数日で疲れてしまう",{"F":2,"C":1}],["最初は張り切るけれど、数日たつとやる気が薄れて続かなくなる",{"F":2}]];
assert.equal(Q.questions.length,12);
const primary=q=>Object.entries(q[1]).find(([,v])=>v===2)[0];
const originalIndex=Q.questions.map(q=>baseline.findIndex(old=>old[0]===q[0]));
assert.equal(new Set(originalIndex).size,12);assert(originalIndex.every(i=>i>=0));
Q.questions.forEach((q,i)=>{assert.deepEqual(q,baseline[originalIndex[i]]);if(i)assert.notEqual(primary(q),primary(Q.questions[i-1]));});
for(const k of 'ABCDEF'){
 const pair=Q.questions.map((q,i)=>primary(q)===k?i:-1).filter(i=>i>=0);
 assert.equal(pair.length,2);assert.deepEqual(L.leaders(L.score(pair,Q.questions)),[k]);
}
let ties=0;
for(let mask=1;mask<4096;mask++){
 const selected=Array.from({length:12},(_,i)=>i).filter(i=>mask&(1<<i));
 const before=L.score(selected.map(i=>originalIndex[i]),baseline),after=L.score(selected,Q.questions);
 assert.deepEqual(after,before);const leaders=L.leaders(after);assert(leaders.length>0);
 if(leaders.length>1)ties++;
 for(const i of selected)assert.equal(L.priority(Q.questions[i],leaders),L.priority(baseline[originalIndex[i]],leaders));
 for(const main of leaders)assert.deepEqual(L.secondary(after,main),L.secondary(before,main));
}
assert.deepEqual(L.leaders(L.score([],Q.questions)),[]);
console.log(JSON.stringify({result:'PASS',patterns:4095,types:6,tiedPatterns:ties,allScoresAndTieBreaksUnchanged:true,adjacentSameType:false},null,2));
