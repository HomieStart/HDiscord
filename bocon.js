/**
* @author XHOMIE
* Bot bocón
*/

//INIT
var Discord = require('discord.js');
var request = require("request");

// Token por defecto usado solo para este ejemplo
var YOU_TOKEN = '';

/**
* Mensajes que no deben mostrarse en el chat
*@type {String} messageBanneds
*/
var messageBanneds = [
    'Tôi không hiểu hãy dạy tôi bằng cách tải APP simsimi trên điện thoại nhé.'
    ,'Video Chat with random person'
    , 'SIMSI'
    , 'simsimi'
    , 'simsi' 
    , 'Simsi'
    , 'Simsi' 
    , 'simsimi' 
    , 'sim' 
];


// ******************* REQUEST MODULE *********************** //

// REQUIRE var request = require("request");

/**
* Enviar petiicones a APIS
* @params {String} url
* @params {Boolean} json
*/
function sendRequest(url, json = true){
    var moduleRequest = request;
    if(null == moduleRequest){
        moduleRequest = require("request");
    }
    try {
        moduleRequest({
            url: url,
            json: json
            }, (error, response, body) => {
                if (!error) {
                    return body;
                }else{
                    throw new Error(error);
                }
            }
        );
    } catch (e) {
        console.log(e.ToString());
    }
}

// ********************* SIMSIM MODULE *********************** //

/**
* Obtener respuesta de simsim
* @param {String} message
* @param {String} fullURL
*/
function getSimsimResponse(message , fullURL="http://ghuntur.com/simsim.php?lc=es&deviceId=&bad=0&txt="){
    var response = null;
    if(null == message){throw new Error('El mensaje no puede ser nulo!');}
    //Obtener respuesta de sim
    response = sendRequest(fullURL+encodeURI(message));
    //Check message banneds
    if(null != messageBanneds && messageBanneds.length > 0){
        for (var i = messageBanneds.length - 1; i >= 0; i--) {
            if(response == messageBanneds[i]){ // response.includes(messageBanneds[i])
                response = null;
                break;
            }
        }
    }
    return response;
}

// ************************* IS VALID CHANNEL ***********************
// ID DE CANALES A LOS QUE TIENE PERMISO HABLAR
/**
* @type {String} validChannelsID
*/
var validChannelsID = [
    '668657506335195156'
];

/**
* Revisa si coincide el identificador del canal
* @param {String} id
*/
function isValidChannel(id){
    if(null != validChannelsID && validChannelsID.length > 0){
        for (var i = validChannelsID.length - 1; i >= 0; i--) {
            if(id == validChannelsID[i]){
                return true;
            }
        }
    }
    return false;
}


// ************************** SIMPLE CLIENT CALL ********************
/**
* Solo otro cliente cualquiera
* @param {String} token
*/
function anyOtherClient(token){
    var client = new Discord.Client();

    //CLIENT Ready
    client.on('ready', () => {
        console.log('Logged in as '+client.user.tag);
    });

    //Client MSG Sim
    client.on('message', msg => {
        //Enviar mensajes a Simsimi
        var response = getSimsimResponse(msg);
        if(!(null == response)){
            if(isValidChannel(msg.channel.id)){
                msg.send(response);
            }
        }
    });

    client.login(token).catch(error => console.log(error));
}

// Llama al bot qlero

anyOtherClient(YOU_TOKEN);
