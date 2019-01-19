
from flask import render_template
from flask_pymongo import PyMongo
from app import app

app.config["MONGO_URI"] = "mongodb://localhost:27017/ddc"
mongo = PyMongo(app)

@app.route('/')
@app.route('/index')
def index():
	user = mongo.db.Users.find({})[0]
	return render_template('index.html', title="Home", user=user)
