1. Welcome
  1. Who am I?
  1. Why this talk?
  1.  Some house notes...
    1. Code samples are on github
    1. steps are broken down into tags v0 to v3
  1. What we will talk about
    1. Lambda
    1. GoLang
    1. Docker - Compilation
  1. Lets talk about GOLang
    1. GoLang is a rather new system level language
    1. Like C# and Java (other system languages) it can support a host of functions and does have a GC
    1. Unlike C# and Java the code is not written into a IL its actually native code
    1. The GoLang language was created by Engineers at Google
      1. Robert Griesemer
      1. Rob Pike
      1. Ken Thompson
    1. Its a static language that is strongly typed and uses type inferring
      1. Can be used with extreme amounts of high and low precision (100,000 and more depending on memory values for decimal)
      1. Concurrency is built into the language its self
      1. GoLang can be installed on any platform (windows, Unix, Mac) and can compile for any platform, possible to generate executable
      1. GoLang speed is faster then python (unsure about cython in some instances scala and java can be faster than go. Benchmarks vary depending on if MAXGOPROCS is turned on or not, which makes sense.
        1. [http://nathanleclaire.com/blog/2014/04/27/a-surprising-feature-of-golang-that-colored-me-impressed/]
      1. Language values simplicity over all else, language is built so that it does not have fanciness in it
        1. Go has some opinions that you need to know about
        1. Go orders its self in what it calls workspaces
        1. GOPATH variable must be set for tooling to work
      1. Lets see a simple go program in action
      1. Tooling, we can use many tools
        1. Intelij offers a good GO Plug in (Auto complete for the win!)
        1. Atom works as a good editor as well
        1. Make files can be used to create scripts that are reproducible
      1. we can format code with go fmt
      1. Some pretty cool tools have been written in go
        1. Docker
        1. Hugo.io
    1. Lets talk about Lambda
      1. Lambda is a Compute as a Service
      1. What is lambda
      1. Lambda allows you to use python, java or javascript (NodeJS) to run functions that respond based to an event
        1. Sample Events
        1. SNS Notification
        1. S3 Upload
        1. Simple Workflow Service
        1. DynamoDB Update
        1. Crons (Via AWS)
        1. Amazon Kenisis
        1. Simple Email Service
        1. Amazon Cognito
        1. Amazon Cloudwatch Logs
        1. AWS CloudFormation
        1. Request From Amazon API Gateway
      1. Pro/Cons
        1. Pros
          1. You can invoke python, javascript or java code to handle these events
          you are basically creating a series of micro services that act independently
          amazon takes care of the orchestration and management of the resource that you consume
          1. Can scale elastically parallelization of tasks over many instances
          1. pay for every 100ms, jobs are rounded up to nearest 100ms (so you spend 10ms you are still billed for 100ms) and for every million requests, first million requests are free every month. 0.20 after that for each additional million
          1. If you are on the free tier you get about 3.2 million seconds per month to about 266,000 seconds per month depending on memory instance
          1. all accounts get 400,000 of compute time per month for  free.
          1. Outputs to CloudWatch logs
      1. Cons
        1. Can not control infrastructure (no ssh access) debugging can be difficult (we will talk about node)
        1. limited to 500 mb of tmp space on the instance when it runs the lambda function, can write to S3
        1. Jobs can only run for a maximum of 5 minutes
        1. Can not access resources in a VPC, yet. It was announced that we should have this functionality by end of year
        1. Can not access ElasticCahce instances, need to proxy via a EC2 instance
        1. Platform only supports NodeJS, Java and Python (announced at re:Invent 2015) Or does it?
  1. Some examples
    1. Lets say you have images to process, you could write a worker in any language and host a EC2 instance or Container instance and do the work, this can work, but lets say you get a LOT Of images. You can no longer keep up the demand without spinning up more instances. to handle the load, this requires the following
    1. Managing infrastructure (whether scripts, docs, manually) Ensuring that you have infrastructure that can spin up EC2 instances can be expensive! Even spot instances can be difficult to orchestrate
    1. Or you could just create a function that deals in response to an S3 event, you can scale this to work on the specific event
    1. AWS will scale as necessary you don’t need to worry about it
  1. Finally lets combine the two to create something useful
    1. So why would you want to do this?
      1. Some things python, nor javascript can do, converting pics is usually best left to tools like ImageMagick of FFMPEG for video conversion
      1. Maybe you need high precision and maximize CPU while minimizing RAM
      1. Might be doing CPU intensive work
      1. using old code, Pearl or PHP scripts possible to execute if you can bin deploy the interpreter for PHP
    1. Maybe you want CI on the cheap
      1. First off I really hate NodeJs its difficult to work with, and tbh its slower than python and more resource intensive as far as Lambda is concerned, now it could be that since lambda runs on an older version of node that may be why its spending a lot of time allocating memory. Node is great for Web Servers but IMHO i would prefer to write python.
      1. I use python because I need a sheller script, now the sample code I created on the github repo that is in the description is not that interesting, it just says hello lambda, i am still learning GO so i am not super comfortable with it yet and the sample is about shelling processes
      1. lets first start with some things we need to know
        1. Lambda has three ways to deploy code
        1. The code can be inline via a editor from the AWS console that you can write and edit scripts in
        1. You upload a zip file to a s3 bucket that is a gzip or tar file or you reference a zip file from S3
        1. So the first thing we are going to do is zip the package up
        1. i created a target in my file to do this for me so all i need to do is run make package now go code can not run without a sheller script, so i was using JS till i burned out on my process exiting before the node script.
        1. I wrote some python to shell and I do it via python
          1. All code will invoke from the /var/task location on disk
          1. the final thing i should mention is that this won’t work, i am building on mac and my target is actually a linux machine
          1. so instead of installing all the dependencies i need for mac its better to just use a neat tool call docker to do this work for me
          1. So i am going to use docker-compose to build my file and create a zip package
          1. I now have a redistributable environment that i can use locally with the team cause you never know if Hello Lambda will go web scale ;) also i can use this on cloud CI or internal CI like GO.cd
          1. Finally we need to set the excitable bit to be on the executable and not exclude copying permissions when we zip the file up. 
  1. Finishing up
  1. Questions?
  1. Hatemail I read it send here /var/null … kidding :) mike.roth@mxrss.com Pertinent links, code and slide deck will be on github
