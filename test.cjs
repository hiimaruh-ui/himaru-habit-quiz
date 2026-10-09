const assert=require('node:assert/strict'),Q=require('./data.js'),L=require('./logic.js');
const expected=[{B:2,A:1},{B:2,F:1},{A:2,B:1,F:1},{A:2,B:1,C:1},{C:2,A:1,E:1},{D:2,B:1},{E:2,F:1,D:1},{E:2,A:1,F:1},{D:2,B:1},{F:2,E:1},{F:2,A:1},{A:2}];
assert.deepEqual(Q.questions.map(q=>q[1]),expected);
assert.deepEqual(L.leaders(L.score([],Q.questions)),[]);
for(const[k,i]of Object.entries({A:11,B:0,C:4,D:5,E:6,F:9}))assert.deepEqual(L.leaders(L.score([i],Q.questions)),[k]);
let ties=0,fallback=0,examples=[];
for(let mask=1;mask<4096;mask++){let sel=Array.from({length:12},(_,i)=>i).filter(i=>mask&(1<<i));let actual=L.score(sel,Q.questions),reference=Object.fromEntries('ABCDEF'.split('').map(k=>[k,sel.reduce((s,i)=>s+(expected[i][k]||0),0)]));assert.deepEqual(actual,reference);let tied=L.leaders(actual);assert(tied.length>0);if(tied.length>1){ties++;for(const i of sel){let main=L.priority(Q.questions[i],tied);if(main)assert(tied.includes(main));else{fallback++;if(examples.length<2)examples.push({sel,tied,priority:i});}}}for(const main of tied)assert(L.secondary(actual,main).every(k=>k!==main&&actual[k]>0));}
assert.deepEqual(L.leaders(L.score([0,11],Q.questions)),['A']);
assert.deepEqual(L.leaders(L.score([1,9],Q.questions)),['F']);
console.log(JSON.stringify({result:'PASS',patterns:4095,types:6,tiedPatterns:ties,fallbackChoices:fallback,fallbackExamples:examples},null,2));
