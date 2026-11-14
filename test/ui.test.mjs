import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";

const html=await readFile(new URL("../public/index.html",import.meta.url),"utf8");
const styles=await readFile(new URL("../public/styles.css",import.meta.url),"utf8");
const js=await readFile(new URL("../public/app.js",import.meta.url),"utf8");

test("o layout de caderno mantém as três telas e controles da API",()=>{
  const ids=["welcome","quiz","result","subject","subject-wrap","sapienza-hint","count-group",
    "time-group","start-btn","start-notice","counter","quiz-mode","timer","progress-fill",
    "question-tag","question-text","answers","quit-btn","next-btn","quiz-notice","score",
    "percent","duration","review","review-count","again-btn"];
  for(const id of ids){
    const occurrences=html.match(new RegExp('id="'+id+'"',"g"))||[];
    assert.equal(occurrences.length,1,"ID obrigatório e único: "+id);
  }
  assert.equal((html.match(/data-mode="impara"/g)||[]).length,1);
  assert.equal((html.match(/data-mode="sapienza"/g)||[]).length,1);
  for(const count of [5,10,15,20])assert.ok(html.includes('data-count="'+count+'"'));
  for(const time of ["none","total","question"])assert.ok(html.includes('data-time="'+time+'"'));
});

test("referências retrô são decorativas e CSS é responsivo",()=>{
  assert.match(html,/class="notebook-decor" aria-hidden="true"/);
  assert.match(html,/class="sticker-einstein"/);
  assert.match(html,/class="polaroid-msx"/);
  assert.match(styles,/repeating-linear-gradient/);
  assert.match(styles,/@media\(max-width:750px\)/);
  assert.match(styles,/prefers-reduced-motion/);
  assert.match(js,/fetch\("\.\/api\/session"/);
  assert.match(js,/fetch\("\.\/api\/grade"/);
});
