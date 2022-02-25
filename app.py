from flask import Flask, render_template, jsonify, request, url_for, flash, redirect, request
from flask_socketio import SocketIO


key_to_name = {"1" : 'Brian', "2" : 'San'}

clients = []

app = Flask(__name__)

app.config['SECRET_KEY'] = 'f03a2ea0b16bfc14f0af5ed54553f84a0877604ca3e9fa25'
socketio = SocketIO(app)

@app.route('/')
def home():
    return render_template('base.html')

def messageReceived(methods=['GET', 'POST']):
    print('message was received!!!')

@app.route('/chess/', methods=('GET', 'POST'))
def chess():
	return render_template('content.html')

@socketio.on('connected')
def connected():
	
	clients.append(request.sid)
	print("len = " + str(len(clients)))

@socketio.on('my event')
def handle_my_custom_event(json, methods=['GET', 'POST']):
	print('received my event: ' + str(json))
	user = json.get("user_name")
    
	if (key_to_name.__contains__(user)) :
		
		json["user_name"] = key_to_name.get(user)
		socketio.emit('my response', json, callback=messageReceived)
	else:
		
		socketio.emit('my response', 'For you!', callback=messageReceived, room=clients[0])    
if __name__ == '__main__':
    socketio.run(app, debug=True, port = 8000)


