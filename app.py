from flask import Flask, render_template, jsonify, request, url_for, flash, redirect, request
from flask_socketio import SocketIO
import time
#from threading import Timer
#import threading

key_to_name = {"1" : 'Brian', "2" : 'San'}
def display():  
		print(time.strftime('%H:%M:%S'))
class Game: #I will try to do this without multi-threading. If it doesn't work, we will do multi-threading.
	def __init__(self, time1, time2): #give time in seconds
		self.time1 = time1
		self.time2 = time2
		self.turn = 0 #set to 1 for player 1 set to 2 for player 2
		#self.timer1 = Timer(self.time1, display)
		self.remaining1 = time1
		self.remaining2 = time2
	
	
	def play(self): #call after a move
		if self.turn == 1:
			self.turn = 2
		else:
			self.turn = 1
		while self.turn == 1 and self.remaining1 > 0:
			print("Player 1 time:" + str(self.remaining1))
			time.sleep(1)
			self.remaining1 -= 1
		while self.turn == 2 and self.remaining2 > 0:
			print("Player 2 time:" + str(self.remaining2))
			time.sleep(1)
			self.remaining2 -= 1




g = Game(60, 10) 


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
	socketio.emit('sock number', "Socket: " + str(len(clients)), callback=messageReceived, room=clients[len(clients)-1])
	print("len = " + str(len(clients)))

@socketio.on('my event')
def handle_my_custom_event(json, methods=['GET', 'POST']):
	print('received my event: ' + str(json))
	user = json.get("user_name")
    
	if (key_to_name.__contains__(user)) :
		
		json["user_name"] = key_to_name.get(user)
		socketio.emit('my response', json, callback=messageReceived)
		
		g.play()
	else:
		json["user_name"] = "Private message: " + json["user_name"]
		socketio.emit('my response', json, callback=messageReceived, room=clients[0])   
		#g.play() 
if __name__ == '__main__':
    socketio.run(app, debug=True, port = 8000)


