from flask import Flask, render_template, jsonify, request, url_for, flash, redirect

messages = [{'title': 'Message One',
             'content': 'Message One Content'},
            {'title': 'Message Two',
             'content': 'Message Two Content'}
            ]

app = Flask(__name__)

app.config['SECRET_KEY'] = 'f03a2ea0b16bfc14f0af5ed54553f84a0877604ca3e9fa25'

@app.route('/')
def home():
    return render_template('base.html')


# @app.route('/create/', methods=('GET', 'POST'))
# def create():
# 	if request.method == 'POST':
# 		title = request.form['title']
# 		content = request.form['content']

# 		if not title:
# 			flash('Title is required!')
# 		elif not content:
# 			flash('Content is required!')
# 		else:
# 			messages.append({'title': title, 'content': content})
# 			return redirect(url_for('message'))
# 	return render_template('create.html') #render_template --> always use this. We can use this to send data from server.


# @app.route('/data/', methods=('GET', 'POST'))
# def data():
# 	return 12 #note: must have strings
# @app.route('/message/', methods=('GET','POST'))
# def message():
# 	return render_template('message.html', messages = messages)
# @app.route('/test/<int:i>')
# def hold():
# 	return None
if __name__ == '__main__':
    app.run(debug=True, port = 8000)


