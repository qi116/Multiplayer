from flask import Flask, render_template, jsonify, request, url_for, flash, redirect, request
from flask_socketio import SocketIO
import time

import json
#from threading import Timer
from threading import Thread

#import threading

key_to_name = {"1" : 'Brian', "2" : 'San'}
clients = []



app = Flask(__name__)

app.config['SECRET_KEY'] = 'f03a2ea0b16bfc14f0af5ed54553f84a0877604ca3e9fa25'
socketio = SocketIO(app)
def display():  
		print(time.strftime('%H:%M:%S'))
class Game(Thread): #I will try to do this without multi-threading. If it doesn't work, we will do multi-threading.
	def __init__(self, time1, time2): #give time in seconds
		Thread.__init__(self)
		self.time1 = time1
		self.time2 = time2
		self.turn = 1 #set to 1 for player 1 set to 2 for player 2
		#self.timer1 = Timer(self.time1, display)
		self.remaining1 = time1
		self.remaining2 = time2
		self.done = False

	def changeTurn(self):
		if self.turn == 1:
			self.turn = 2
		else:
			self.turn = 1	

	def run(self): #call after a move
		# if self.turn == 1:
		# 	self.turn = 2
		# else:
		# 	self.turn = 1
		while not self.done:

			while self.turn == 1 and self.remaining1 > 0:
				print("Player 1 time:" + str(self.remaining1))
				data = {"user": 1, "time": self.remaining1, "other":self.remaining2}
				json_f = json.dumps(data)
				socketio.emit('update time', json_f)
				time.sleep(1)
				self.remaining1 -= 1
			while self.turn == 2 and self.remaining2 > 0:
				print("Player 2 time:" + str(self.remaining2))
				data = {"user": 2, "time": self.remaining2, "other":self.remaining1}
				json_f = json.dumps(data)
				socketio.emit('update time', json_f)
				time.sleep(1)
				self.remaining2 -= 1
			if self.remaining1 <=0 or self.remaining2 <=0:
				self.done = True


g = Game(180, 10)
start = False

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
		
		
	else:
		
		json["user_name"] = "Private message: " + json["user_name"]
		socketio.emit('my response', json, callback=messageReceived, room=clients[0])   
		#g.play() 


@socketio.on('timer')
def time_send(methods = ['GET', 'POST']):
	#st = started
	global start
	if start == False:
		start = True
		g.start()
		
	else:
		g.changeTurn()

@socketio.on('addMove')
def send_move(json, methods = ['GET', 'POST']):
	print(json)
	socketio.emit('add move', json, callback=messageReceived)


@socketio.on('myTurn')
def check_turn(accept, methods = ['GET', 'POST']):
	print("accept: ", accept)
	if (accept == g.turn):
		socketio.emit('check turn', True, callback=messageReceived)
	else:
		socketio.emit('check turn', False, callback=messageReceived)

if __name__ == '__main__':
    socketio.run(app, debug=True, port = 8000, host = "0.0.0.0")