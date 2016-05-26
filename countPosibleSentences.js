/*
<p>For a given string and dictionary, how many sentences can you make from the string, such that all the words are contained in the dictionary. 
<br>
<br>// eg: for given string -&gt; "appletablet"
<br>// "apple", "tablet"
<br>// "applet", "able", "t"
<br>// "apple", "table", "t"
<br>// "app", "let", "able", "t"
<br>
<br>// "applet", {app, let, apple, t, applet} =&gt; 3
<br>// "thing", {"thing"} -&gt; 1</p>

*/

var st = "appletablet";
var dictionary = {"app": 1, "let": 1, "apple":1, "tablet":1,"t":1,"table":1, "able": 1};

function findWords(input) {
   var len = input.length;
   return subroutine(0);
   
   function subroutine(start) {
   	 
      var count = 0;
      var buffer = "";
      
      for (var i = start; i < len; i++) {
         buffer += input.charAt(i);
         if (dictionary.hasOwnProperty(buffer)) {
            count += subroutine(i+1);
         }
      }

      return buffer == "" ? count + 1 : count;
   }
   
   
}

console.log(findWords(st));