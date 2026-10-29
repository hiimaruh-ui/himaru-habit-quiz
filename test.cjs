const assert=require('node:assert/strict'),Q=require('./data.js'),L=require('./logic.js');
assert.equal(Q.questions.length,12);
assert.deepEqual(Object.values(Q.types).map(t=>t.name),['お疲れタイプ','自分後回しタイプ','完璧主義タイプ','食事めんどうタイプ','我慢しすぎタイプ','三日坊主タイプ']);
for(const [key,indices] of Object.entries({A:[0,1],B:[2,3],C:[4,5],D:[6,7],E:[8,9],F:[10,11]})){
 for(const i of indices)assert.deepEqual(L.leaders(L.score([i],Q.questions)),[key]);
 assert.deepEqual(L.leaders(L.score(indices,Q.questions)),[key]);
 assert.equal(Q.types[key].habits.length,3);
}
const overlap=L.leaders(L.score([4,10],Q.questions));
assert.deepEqual(overlap,['C','F']);
assert.equal(L.priority(Q.questions[4],overlap),'C');
assert.equal(L.priority(Q.questions[10],overlap),'F');
assert.deepEqual(L.leaders(L.score([],Q.questions)),[]);
let ties=0;
for(let mask=1;mask<4096;mask++){
 const sel=Array.from({length:12},(_,i)=>i).filter(i=>mask&(1<<i));
 const scores=L.score(sel,Q.questions),leaders=L.leaders(scores);
 assert(leaders.length>0);assert(leaders.every(k=>Q.types[k]));
 if(leaders.length>1){ties++;for(const i of sel){const k=L.priority(Q.questions[i],leaders);assert(k===null||leaders.includes(k));}}
 for(const main of leaders)assert(L.secondary(scores,main).every(k=>k!==main&&scores[k]>0));
}
assert.deepEqual(L.score([4,4],Q.questions),L.score([4],Q.questions));
assert.throws(()=>L.score([12],Q.questions));
console.log(JSON.stringify({result:'PASS',patterns:4095,types:6,tiedPatterns:ties,perfectionismVsShortBurst:'PASS'},null,2));
