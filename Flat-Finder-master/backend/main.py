from flask import Flask
from flask import Flask, flash, redirect, render_template, request, session, abort, jsonify
from flask_jwt_extended import create_access_token, JWTManager
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from datetime import datetime
import os, json

app = Flask(__name__)
cors = CORS(app)
app.secret_key = b'_5#y2L"FASESz\n\xec]/'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///posts.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
jwt = JWTManager(app)


class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    authorId = db.Column(db.String(80), nullable=True, default='user')
    date_posted = db.Column(db.Date, nullable=False, default=datetime.utcnow().date())
    title = db.Column(db.String(80), nullable=False)
    type = db.Column(db.String(80), nullable=False)
    description = db.Column(db.String(200), nullable=False)
    price = db.Column(db.Integer, nullable=False)
    area = db.Column(db.String(80), nullable=False)
    bathrooms = db.Column(db.Integer, nullable=True)
    city = db.Column(db.String(80), nullable=False)
    postcode = db.Column(db.String(80), nullable=False)
    addressLine = db.Column(db.String(80), nullable=False)
    beds = db.Column(db.Integer, nullable=False)
    condition = db.Column(db.String(80), nullable=False)
    parkingExists = db.Column(db.String(80), nullable=False)
    smokingAllowed = db.Column(db.String(80), nullable=False)
    petAllowed = db.Column(db.String(80), nullable=False)
    balconyExists = db.Column(db.String(80), nullable=False)
    photos = db.Column(db.JSON, nullable=False)

    def __repr__(self):
        return '<Post %r>' % self.title

def get_post_data(post):
    
    post_data = {'id' : post.id,
                'title': post.title,
                 'type': post.type,
                 'description': post.description,
                 'price': post.price,
                 'area': post.area,
                 'bathrooms': post.bathrooms,
                 'city': post.city,
                 'postcode': post.postcode,
                 'addressLine': post.addressLine,
                 'beds': post.beds,
                 'condition': post.condition,
                 'parkingExists': post.parkingExists,
                 'smokingAllowed': post.smokingAllowed,
                 'petAllowed': post.petAllowed,
                 'balconyExists': post.balconyExists}
                 #'photos': json.loads(photos)}
    return post_data

@app.route('/')
def home():
    if not session.get('logged_in'):
        return "please login"
        # return render_template('login.html')
    else:
        return "Hello World!"


@app.route('/login', methods=['POST'])
def do_admin_login():

    username = request.form['username'].strip()
    password = request.form['password'].strip()

    if password == 'password' and username == 'admin':
        print("Logged in")
        session['logged_in'] = True
        session['user_id'] = username
        access_token = create_access_token(identity=username)
        response = {"access_token": access_token, "username": username, "admin": True}
        return response
    else:
        print("Wrong pwd")
        flash('wrong password!')
        return home()


@app.route('/createPost', methods=['POST', 'OPTIONS'])
def create_post():
    if request.method == 'OPTIONS':
        response = jsonify({'status': 'success'})
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
        response.headers.add('Access-Control-Allow-Methods', 'POST')
        return response
    data = request.get_json()
    new_post = Post(
        title=data['title'],
        authorId=session.get('user_id'),
        type=data['type'],
        description=data['description'],
        price=data['price'],
        area=data['area'],
        bathrooms=data['bathrooms'],
        city=data['city'],
        postcode=data['postcode'],
        addressLine=data['addressLine'],
        beds=data['beds'],
        condition=data['condition'],
        parkingExists=data['parkingExists'],
        smokingAllowed=data['smokingAllowed'],
        petAllowed=data['petAllowed'],
        balconyExists=data['balconyExists'],
        #dont know if this photots one works
        photos=data['photos'])
    db.session.add(new_post)
    db.session.commit()
    print('Post Created')
    return jsonify({'message': 'Post Created!'})

@app.route('/getPosts', methods=['GET'])
def get_posts():
    posts = Post.query.all()
    result = []
    for post in posts:
        post_data = get_post_data(post)
        result.append(post_data)
    return jsonify(result)

@app.route('/getMyPosts', methods=['GET'])
def get_my_posts():
    posts = Post.query.filter(Post.authorId == "user").all()
    # change to current user id when login finished session.get('user_id')
    result = []
    for post in posts:
        post_data = get_post_data(post)
        result.append(post_data)
    return jsonify(result)


@app.route('/getPost', methods=['GET'])
def get_post():
    post_id = request.args.get('id')
    post = Post.query.filter_by(id=post_id).first()
    if not post:
        return 'Post not found', 404
    
    post_data = get_post_data(post)
    return jsonify(post_data)

    
@app.route('/updatePost', methods=['PUT'])
def update_post():
    post_id = request.args.get('id')
    post = Post.query.get(post_id)
    if post is None:
        abort(404)

    if post.authorID != session.get('user_id'):
        abort(403)

    data = request.get_json()
    post.id = data['id']
    post.title = data['title']
    post.type = data['type']
    post.description = data['description']
    post.price = data['price']
    post.area = data['area']
    post.bathrooms = data['bathrooms']
    post.city = data['city']
    post.postcode = data['postcode']
    post.addressLine = data['addressLine']
    post.beds = data['beds']
    post.condition = data['condition']
    post.parkingExists = data['parkingExists']
    post.smokingAllowed = data['smokingAllowed']
    post.petAllowed = data['petAllowed']
    post.balconyExists = data['balconyExists']

    db.session.commit()

    return jsonify({'message': 'Post updated successfully.'})


@app.route('/deletePost', methods=['DELETE'])
def delete_post():
    post_id = request.args.get('id')
    post = Post.query.get(post_id)
    if post is None:
        abort(404)

    if post.authorID != session.get('user_id'):
        abort(403)

    db.session.delete(post)
    db.session.commit()
    return jsonify({'message': 'Post deleted successfully'})


if __name__ == '__main__':
    with app.app_context():
        """
        #you cannot use : in url, ensure values are escaped
        postList = [
        Post(authorId='123', title='Spacious 3 Bedroom Apartment', type='apartment', description='This beautiful apartment boasts a spacious living area, modern kitchen, 3 large bedrooms, and 2 bathrooms. Located in the heart of the city, it offers easy access to all the best restaurants and shops.', price=3000, area=2000, bathrooms=2, city='New York', postcode='10001', addressLine='123 Main Street', beds=3, condition='newly renovated', parkingExists="True", smokingAllowed="False", petAllowed="True", balconyExists="False", 
        photos='["https://lid.zoocdn.com/u/2400/1800/ce2b5ecacac0eb82f06354104d7b40866f434d0e.jpg\\:p","https://lid.zoocdn.com/u/2400/1800/c345d093fcc0ab62a06fedfa7993b13617c825ba.jpg\\:p", "https://lid.zoocdn.com/u/2400/1800/a405db38e2a7f52ba41542580380065d052fd0ce.jpg\\:p", "https://lid.zoocdn.com/u/2400/1800/845d204f9d2320e5dd1dab314ab5edaa0cc04b13.jpg\\:p","https://lid.zoocdn.com/u/2400/1800/ecbf2adb2bf762712ece80142851c74824fdb89a.jpg\\:p"]'),
        
        Post(authorId='456', title='Luxury 4 Bedroom Villa', type='villa', description='Escape to this luxurious villa with breathtaking views of the ocean. Featuring 4 spacious bedrooms, a fully equipped kitchen, and a private pool, it\'s the perfect place to unwind and relax.', price=10000, area=5000, bathrooms=4, city='Miami', postcode='33139', addressLine='456 Ocean Drive', beds=4, condition='luxury', parkingExists="True", smokingAllowed="False", petAllowed="False", balconyExists="True",
        photos='["https://lid.zoocdn.com/u/2400/1800/ce2b5ecacac0eb82f06354104d7b40866f434d0e.jpg\\:p","https://lid.zoocdn.com/u/2400/1800/c345d093fcc0ab62a06fedfa7993b13617c825ba.jpg\\:p", "https://lid.zoocdn.com/u/2400/1800/a405db38e2a7f52ba41542580380065d052fd0ce.jpg\\:p", "https://lid.zoocdn.com/u/2400/1800/845d204f9d2320e5dd1dab314ab5edaa0cc04b13.jpg\\:p","https://lid.zoocdn.com/u/2400/1800/ecbf2adb2bf762712ece80142851c74824fdb89a.jpg\\:p"]'),
        
        Post(authorId='Marshall Bruce Mathers III', title='Cadogan Gardens', type='flat', description='The property offers a bright and inviting reception area, an additional reception / lounge area and a separate fully fitted kitchen. The master bedroom suite offers fitted wardrobe space and a stylish en-suite with walk in shower. There is an additional double bedroom with fitted wardrobes, a third bedroom that is current utilised as a study and a separate family bathroom with shower over bath. Additional benefits include ample fitted storage & access to Cadogan Gardens.', 
        price=6000, area=1485, bathrooms=2, city='London', postcode='SW3', addressLine='Cadogan Gardens', beds=3, condition='renovated', parkingExists=True, smokingAllowed=False, petAllowed=True, balconyExists=True, 
        photos='["https://lid.zoocdn.com/u/2400/1800/ce2b5ecacac0eb82f06354104d7b40866f434d0e.jpg\\:p","https://lid.zoocdn.com/u/2400/1800/c345d093fcc0ab62a06fedfa7993b13617c825ba.jpg\\:p", "https://lid.zoocdn.com/u/2400/1800/a405db38e2a7f52ba41542580380065d052fd0ce.jpg\\:p", "https://lid.zoocdn.com/u/2400/1800/845d204f9d2320e5dd1dab314ab5edaa0cc04b13.jpg\\:p","https://lid.zoocdn.com/u/2400/1800/ecbf2adb2bf762712ece80142851c74824fdb89a.jpg\\:p"]')
        ]
        for post in postList:
            db.session.add(post)
    
        #reset database
        # for post in postList:
        #     db.session.delete(post)
        db.session.commit()
        """
        db.create_all()
    app.run(debug=True)
