SET js=--js=ujs.js
SET js=%js% --js=ujs.ArrayList.js
SET js=%js% --js=ujs.Dictionary.js
SET js=%js% --js=ujs.Math.js

yuidoc .

java -jar ..\compiler.jar %js% --js_output_file=Build\ujs.complete.min.js

java -jar ..\compiler.jar ujs.js --js_output_file=Build\ujs.min.js
java -jar ..\compiler.jar ujs.ArrayList.js --js_output_file=Build\ujs.ArrayList.min.js
java -jar ..\compiler.jar ujs.Dictionary.js --js_output_file=Build\ujs.Dictionary.min.js
java -jar ..\compiler.jar ujs.Math.js --js_output_file=Build\ujs.Math.min.js

