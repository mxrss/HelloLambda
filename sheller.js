console.log('Loading function');
var child_process = require('child_process');
process.env['PATH'] = process.env['PATH'] + ':' + process.env['LAMBDA_TASK_ROOT'];

exports.handler = function(event, context) {
    //console.log('Received event:', JSON.stringify(event, null, 2));
    /*if (event.Records === undefined){
        console.log("No records!");
        context.done(null);
        return;
    }*/

    //var message = JSON.parse(event.Records[0].Sns.Message);
      //console.log('From SNS:', JSON.stringify(message.lambda.server));
      //context.succeed(message);
  console.log(process.env['LAMBDA_TASK_ROOT']);



     console.log("Calling REDIS PING!");
     /*var fs = require('fs');
         spawn = child_process.spawn;
         out = fs.openSync('/tmp/out.log', 'a');
         err = fs.openSync('/tmp/out.log', 'a');

     var child = spawn('/var/task/hellolambda', [''], {
       detached: true,
       stdio: ['ignore', out, err]
     });

     child.on('close', function(data){
     fs.readFile('/tmp/out.log', 'utf-8', function(err, data){
       if (err){
         return console.log('error occured' + err);
       }

       console.log("READOUT PROGRAM: " + data);
     });*/
    });
  };
