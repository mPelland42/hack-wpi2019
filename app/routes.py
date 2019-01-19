
from flask import render_template
from flask_pymongo import PyMongo
from app import app

app.config["MONGO_URI"] = "mongodb://35.221.20.85:27018/ddc"
mongo = PyMongo(app)

@app.route('/')
@app.route('/index')
def index():
	user = mongo.db.userData.find({})[0]
	return render_template('index.html', title="Home", user=user)
