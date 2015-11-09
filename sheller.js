var Q = require('q');
var execute = require('lambduh-execute');

//your lambda function
exports.handler = function(event, context) {

  var result = {}
  execute(result, {
    shell: "echo `ls /tmp/`", // logs output of /tmp/ dir on your lambda machine
    logOutput: true
  })
  .then(function(result) {
    return execute(result, {
      shell: "cp /var/task/HelloLambda /tmp/.; chmod 755 /tmp/HelloLambda", // copies an ffmpeg binary to /tmp/ and chmods permissions to run it
      logOutput: true
    })
  })
  .then(function(result) {
    context.done()
  })
  .fail(function(err) {
    console.log("derp");
    console.log(err);
    context.done(null, err);
  });
}
