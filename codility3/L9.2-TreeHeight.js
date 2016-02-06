

function solution(T) {

    return Math.max(sub(T.l), sub(T.r));

    function sub(t) {
        
      if (t == null) return 0;
      return 1 + Math.max(sub(t.l), sub(t.r));
    }
}