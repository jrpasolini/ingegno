import test from "node:test";
import assert from "node:assert/strict";
import {CURRICULUM,buildStudyContext,getCoverageSummary} from "../curriculum.mjs";
import {SUBJECTS} from "../public/bank.js";

test("five courses have identifiable modules backed by the uploaded teaching sources",()=>{
  assert.deepEqual(new Set(Object.keys(CURRICULUM)),new Set(SUBJECTS.map(s=>s.id)));
  for(const s of SUBJECTS){
    const entry=CURRICULUM[s.id];
    assert.ok(entry.modules.length>=3, s.id+" must cover the major chapters");
    assert.match(entry.source,/\(\d{5}\)/);
    for(const module of entry.modules){
      assert.ok(module.title.length>8);
      assert.match(module.pages,/^\d+–\d+$/);
      assert.ok(module.guidance.length>150);
      assert.ok(!/https?:\/\//.test(module.guidance),"No protected upstream links in sources");
    }
  }
});

test("Impara gives detailed guidance for one subject, not for the entire semester",()=>{
  const context=buildStudyContext("impara","interfaces",10);
  assert.match(context,/Web 1\.0 e Web 2\.0/);
  assert.match(context,/Web 3\.0/);
  assert.match(context,/Web semântica/);
  assert.match(context,/responsiv/);
  assert.doesNotMatch(context,/DISCIPLINA agil/);
  assert.doesNotMatch(context,/DISCIPLINA riscos/);
});

test("Sapienza gives all five disciplines and exactly each per-subject count",()=>{
  for(const count of [5,10,15,20]){
    const context=buildStudyContext("sapienza",null,count);
    const expected=count/5;
    for(const s of SUBJECTS){
      assert.ok(context.includes("DISCIPLINA "+s.id),s.id);
      assert.ok(context.includes(" "+expected+" questão(ões)."),count+" split");
    }
  }
});

test("invalid subjects are rejected; public summary contains no PDF contents",()=>{
  assert.throws(()=>buildStudyContext("impara","invalid",5));
  const summary=getCoverageSummary();
  assert.equal(summary.length,5);
  assert.ok(summary.every(item=>!Object.hasOwn(item,"guidance")&&!Object.hasOwn(item,"text")));
});
