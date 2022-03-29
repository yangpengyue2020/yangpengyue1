export default {
  install(Vue){
    Vue.prototype.debouncefn = function(fn,delay){
      let timer = null;
      return function(){
        timer&&clearTimeout(timer);
         timer = setTimeout(function(){
          fn()
        },delay)
      }
    }
  }
}
