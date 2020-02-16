/**
* @author XHOMIE
* Enviador de mensajes personalizado usando Webhook, CMD
*/

var discord = require("discord.js"); // As Module
var DEFAULT_ID_HOOK_CONSOLE = '678296967469858829'; // As String
var DEFAULT_TOKEN_HOOK_CONSOLE = 'Ip99rvKARWB0vPxcbicHkH84T1V6RSCEog8Ku_TPXk2Y73abknhl_2a3MuYgcV8HYNyp'; // As String

/**
* Envia mensajes usando el hook
* @params {String} idHook
* @params {String} tokenHook
* @param {String} Menssage
*/
function talkHook(idHook, tokenHook, messages){
	var message = {};
	message.message = messages;
	message.options = null;
	sendHookMessage(idHook, tokenHook, message);
}

/**
* Envia mensajes usando el hook
* @params {String} idHook
* @params {String} tokenHook
* @params {Object} messageOptions REQUIRE* {String} message, {String} options
*/
function sendHookMessage(idHook, tokenHook, messageOptions){
	var hook;
	if(null == messageOptions){
		throw new Error('F*ck, you can\'t try send message without the message!!');
	}
	hook = new discord.WebhookClient(idHook,tokenHook);
	messageOptions.options = messageOptions.options ? messageOptions.options : null;
	console.log(messageOptions);
	hook.send(messageOptions.message, messageOptions.options);	
}

/**
* Envia mensajes con opciones basicas indicadas como argumentos
* @params {String} idhook
* @params {String} tokenHook
* @params {String} message
* @params {String} avatarUrl
* @params {String} userName
* @params {Boolean} split
* @params {Boolean} tts
*/
function talkHookCustomFaceOptions(idHook, tokenHook, messages, avatarURL = null, userName = null, split=true, tts=false){
	var message = {};
	message.message = messages;
	message.options = {
		'userName' : userName,
		'avatarURL' : avatarURL,
		'split' : split,
		'tts' : tts
	}
	sendHookMessage(idHook, tokenHook, message);
}

/*
* Envia mensaje verificando los argumentos de la entrada por consola
* @params {String} idHook
* @params {String} tokenHook
*/
function talkHookCustomConsoleMessage(idHook,tokenHook){
	var args = process.argv;
	if(!(null == args) && args.length > 2){
		var messages = '';
		var messageOptions = null;
		var split = '';
		for(var x=2;x<args.length;x++){
			if(isCommand(args[x])){
				if((x + 1) >= args.length){
					throw new Error('Not command argument defined!!');
				}
				messageOptions = getCommand(args[x], args[x + 1],messageOptions);
				x++;
				continue;
			}
			messages +=split;
			messages +=args[x];
			split = ' ';
		}

		args = {};
		args.message = messages;
		if(!(null == messageOptions)){
			args.options = messageOptions;
		}
		sendHookMessage(idHook, tokenHook, args);
	}
}

/**
* Comprueba si es un tipo de comando
* @params {String} arg
* @return {Boolean} true | false
*/
function isCommand(arg){
	return (arg[0].includes('-'));
}

/**
* Verifica y asigna el comando
* @params {String} cmd
* @params {String} arg
* @params {Object} commandArray
* @return {Object} {username:?,avatarUrl:?,tts:?,nonce:?,embeds:?,disableEveryone:?,file:?,code:?}
*/
function getCommand(cmd, arg, commandArray){
	if(null == commandArray){
		commandArray = {};
	}
	cmd = cmd.replace('-', '');
	switch(cmd.toUpperCase()){
		case 'USERNAME'			: commandArray.username = arg; break;
		case 'AVATARURL'		: commandArray.avatarURL = arg; break;
		case 'TTS'				: commandArray.tts = arg; break;
		case 'NOCE'				: commandArray.nonce = arg; break;
		case 'EMBEDS'			: commandArray.embeds = arg; break;
		case 'DISABLEEVERYONE'	: commandArray.disableEveryone = arg; break;
		case 'FILE'				: commandArray.file = arg; break;
		case 'CODE'				: commandArray.code = arg; break;
		default : console.log("[COMMAND UNKNOW] " +cmd + " : " + arg);
	}
	return commandArray;
}

// < CONSOLE INIT HANDLER >
if(process.argv.length > 2){
	if(!(null == DEFAULT_ID_HOOK_CONSOLE && null == DEFAULT_TOKEN_HOOK_CONSOLE)){
		talkHookCustomConsoleMessage(DEFAULT_ID_HOOK_CONSOLE, DEFAULT_TOKEN_HOOK_CONSOLE);
	}
}