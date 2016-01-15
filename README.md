[<img src="https://raw.githubusercontent.com/rannn505/wave.io/master/assets/wave.io.png">](https://github.com/rannn505/wave.io)
[![Version npm](https://img.shields.io/npm/v/wave.io.svg?style=flat-square)](https://www.npmjs.com/package/wave.io)[![NPM Downloads](https://img.shields.io/npm/dt/wave.io.svg?style=flat-square)](https://www.npmjs.com/package/wave.io)

## Installation

- NPM:
```bash
$ npm install wave.io
```
<!--- CDN:
``` html
<script src="https://cdn.jsdelivr.net/angular.ngscopestorage/latest/ngscopestorage.min.js"></script>
```-->
- Download/Clone this repo and include `wave.io.min.js` in your project
``` html
<script src="Path/To/wave.io.min.js"></script>
```

## What's wave.io?

wave.io is a lightweight client-side, syntactic-sugar JS library that wraps the browser's WebSocket API with a familiar http-like syntax.
In other words wave gives you the feeling of using the regular http functions that you love and know, and at the same time it uses WebSocket instead of HTTP to transmit the data to the server.
All these gives wave some "BOOM!" performance, when it comes to send and receive data from your server [(see benefits)](#Benefits).

## Quick start

```javascript
<script src="/wave.io/wave.io.min.js"></script>
<script>
    http.seturl("localhost:8080");   
    http.get("/getest", function (data) {
        console.log(data);
    });
    http.post("/postest",{wave:"Is Awesome"},function(data){
        console.log(data);
    });
</script>
```

## API

#### http
  
  Wave.io exposes an `http` object to the main scope of your application so you can use it wherever you want.
  This object is the core of Wave as it contains most of the well-knowen HTTP verbs (GET,POST,PUT,DELETE) in the form of functions with callbacks.

#### http.seturl(url:String)
  
  The seturl function open the ws:// connection to the server in order to transmit the data you send to the server.
  > **NOTE:** ***In order to wave to work properly***
  > - You must call http.seturl() function.
  > - The url string must represent a server that listening for WebSocket connections.
   
#### http.get(path:String, callback:Function)

  The get function sends this JSON schema (as a string) to the server:<br/> 
  { method: 'GET', uri: '/path-arg', data: '', reswaiter: true }

#### http.post(path:String, data:AnyDataType, callback:Function)

  The post function sends this JSON schema (as a string) to the server:<br/> 
  { method: 'POST', uri: '/path-arg', data: 'data-arg', reswaiter: true }
  
#### http.put(path:String, data:AnyDataType, callback:Function)

  The put function sends this JSON schema (as a string) to the server:<br/> 
  { method: 'PUT', uri: '/path-arg', data: 'data-arg', reswaiter: true }

#### http.delete(path:String, data:AnyDataType, callback:Function)

  The delete function sends this JSON schema (as a string) to the server:<br/> 
  { method: 'DELETE', uri: '/path-arg', data: 'data-arg', reswaiter: true }
  
#### Principals<a name="Principals"></a>
  
  wave.io designed to make a ws connection to the server and transmit your data in the form of a JSON schema look like this:<br/> 
  { method: 'Method', uri: '/SomePath', data: 'SomeData', reswaiter: true }
  - `method`   :The HTTP verb of the request (String).
  - `uri`      :The relative path of the request (String).
  - `data`     :The data to transmit (Any DataType).
  - `reswaiter`:Represent whether the callback arg is used or not (Boolean).<br/> 
  This means, that in order to return data to the callback on the client, 
  wave demands that the response from the server will be the same JSON schema with the same method and uri values.
  
  > **TIP:** 
  > If your using Node, you might wanna take a look on [Wave.io-server(node)](), which simplifies all the work with wave on the server side.
  
    
## Benefits<a name="Benefits"></a>

As you all know HTML5 WebSocket represents a major upgrade in the history of web communications. 
Before WebSocket, all communication between web clients and servers relied only on HTTP. 
Now, dynamic data can flow freely over WebSocket connections that are persistent (always on), full duplex (simultaneously bi-directional) and blazingly fast!.

## Contribute

If you wanna contribute to wave, You can help with server side module like [Wave.io-server(node)](),
which implements the principles from [here](#Principals), for other languages like (C#, Java, PHP, Ruby, Python, Perl..).
Your more then welcome to email me any time <Rannn505@outlook.com>

## Credits

wave using the awesome [reconnecting-websocket](https://github.com/joewalnes/reconnecting-websocket) of joewalnes.


## License

  [MIT](LICENSE)

