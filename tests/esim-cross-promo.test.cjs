const {test}=require('node:test');
const assert=require('node:assert/strict');
const {readFileSync}=require('node:fs');
const {resolve}=require('node:path');
for(const path of ['renmaimaster/index.html','renmaimaster/en/index.html','renmaimaster/ja/index.html','renmaimaster/ko/index.html','bpcare/index.html','gutsy/index.html','gutsy/en/index.html','menulens/index.html','menulens/en/index.html','wildwest/index.html','wildwest/en/index.html']){
  test(`${path}: eSIM recommendation explicitly promotes Duo`,()=>{
    const html=readFileSync(resolve(__dirname,'..',path),'utf8');
    assert.match(html, /<h[23][^>]*>eSIMManager<\/h[23]><p class="sister-app-new esim-duo-promo"[^>]*>[^<]*2\.3[^<]*iPhone Duo[^<]*<\/p>/);
    assert.equal((html.match(/esim-duo-promo/g)||[]).length,1);
    assert.match(html,/href="(?:https:\/\/getesimmanager\.com\/(?:en\/|ja\/|ko\/)?|\.\.\/(?:en\/|ja\/|ko\/)?)"/);
  });
}
