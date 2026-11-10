const {test} = require('node:test');
const assert = require('node:assert/strict');
const {readFileSync} = require('node:fs');
const {runInNewContext} = require('node:vm');
const source = readFileSync(new URL('../assets/js/theme.js', 'file://' + __filename), 'utf8');

function boot({saved=null, systemDark=false, blocked=false}={}) {
    const root = {dataset:{}};
    const listeners = {document:{},window:{},system:{}};
    const button = {hidden:true,attributes:{},setAttribute(key,value){this.attributes[key]=value;}};
    const media = {matches:systemDark,addEventListener(type,fn){listeners.system[type]=fn;}};
    let storage = saved;
    const document = {
        documentElement:root,
        querySelectorAll(){return listeners.document.DOMContentLoaded ? [button] : [];},
        addEventListener(type,fn){listeners.document[type]=fn;},
    };
    const window = {matchMedia(){return media;},addEventListener(type,fn){listeners.window[type]=fn;}};
    const localStorage = {
        getItem(){if(blocked)throw Error('Storage unavailable');return storage;},
        setItem(key,value){if(blocked)throw Error('Storage unavailable');storage=value;},
    };
    runInNewContext(source,{document,window,localStorage});
    const earlyTheme=root.dataset.theme;
    listeners.document.DOMContentLoaded();
    return {
        root,button,earlyTheme,
        saved:()=>storage,
        toggle:()=>listeners.document.click({target:{closest:()=>button}}),
        system(dark){media.matches=dark;listeners.system.change();},
        remote(value,key='enclave-theme'){listeners.window.storage({key,newValue:value});},
    };
}

test('resolves the system palette before body rendering',()=>{
    for(const dark of [false,true]){
        const app=boot({systemDark:dark});
        assert.equal(app.earlyTheme,dark?'dark':'light');
        assert.equal(app.root.dataset.themePreference,'system');
        assert.equal(app.button.hidden,false);
        assert.equal(app.button.attributes['aria-pressed'],String(dark));
    }
});
test('restores a saved choice instead of the system preference',()=>{
    const app=boot({saved:'light',systemDark:true});
    assert.equal(app.earlyTheme,'light');
    app.system(false);app.system(true);
    assert.equal(app.root.dataset.theme,'light');
});
test('switching persists and restores on the next page',()=>{
    const app=boot();app.toggle();
    assert.equal(app.root.dataset.theme,'dark');
    assert.equal(app.button.attributes['aria-pressed'],'true');
    assert.equal(app.saved(),'dark');
    assert.equal(boot({saved:app.saved()}).earlyTheme,'dark');
    app.toggle();assert.equal(app.saved(),'light');
});
test('follows system changes until a manual choice is made',()=>{
    const app=boot();app.system(true);
    assert.equal(app.root.dataset.theme,'dark');
    app.toggle();app.system(false);app.system(true);
    assert.equal(app.root.dataset.theme,'light');
});
test('switching still works when storage is blocked',()=>{
    const app=boot({blocked:true,systemDark:true});
    app.toggle();assert.equal(app.root.dataset.theme,'light');
    app.toggle();assert.equal(app.root.dataset.theme,'dark');
});
test('invalid saved values fall back to the system',()=>{
    assert.equal(boot({saved:'invalid',systemDark:true}).earlyTheme,'dark');
});
test('synchronizes changes from other tabs and clearing the preference',()=>{
    const app=boot();app.remote('dark');
    assert.equal(app.root.dataset.theme,'dark');
    app.remote('light','unrelated');assert.equal(app.root.dataset.theme,'dark');
    app.remote(null);assert.equal(app.root.dataset.theme,'light');
    app.system(true);assert.equal(app.root.dataset.theme,'dark');
});
