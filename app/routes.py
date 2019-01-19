from flask import render_template, session, url_for, request, redirect
from flask_pymongo import PyMongo
from flask_oauth import OAuth
from app import app

app.config["MONGO_URI"] = "mongodb://35.221.20.85:27018/ddc"
#app.config["SERVER_NAME"] = "https://duckduckcode.net"
app.secret_key = "willowwillow"
mongo = PyMongo(app)
oauth = OAuth()

github = oauth.remote_app(
	'github', base_url='',
	request_token_url=None,
	access_token_url='https://github.com/login/oauth/access_token',
	authorize_url='https://github.com/login/oauth/authorize',
	consumer_key='5a8711955a7980c5b0b8',
   consumer_secret='83a0374449e05b8424874f74b1f545b6d2154054'
)

@app.route('/')
@app.route('/index')
def index():
	session['github_user'] = session['github_user'] if session.get('github_user') is not None else None
	user = mongo.db.userData.find({"userName": session['github_user']})[0] if mongo.db.userData.find({"userName": session['github_user']}).count() > 0 else None
	return render_template('index.html', title="Home", user=user)

@github.tokengetter
def get_github_token():
	return session.get('github_token')

@app.route('/login-github')
def login():
	return github.authorize(callback='http://localhost:5000/github-authorized') #callback=url_of('oauth_authorized')

@app.route('/github-authorized')
@github.authorized_handler
def oauth_authorized(resp):
	next_url = request.args.get('next') or url_for('index')
	if resp is None:
		print('You denied the request to sign in.')
		return redirect(next_url)

	session['github_token'] = (
		resp['access_token'],
		'cat'
	)
	user = github.get("https://api.github.com/user", headers={'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'token ' + resp['access_token']})
	session['github_user'] = user.data['login']

	if (mongo.db.userData.find({"userName": user.data['login']}).count() == 0):
		mongo.db.userData.insert_one({"userName": user.data['login'], "tags": [], "duckDuckCoins": 0})

	print('You were signed in as %s' % session['github_user'])
	return redirect(next_url)

@app.route('/form')
def form():
	return render_template('form.html')
