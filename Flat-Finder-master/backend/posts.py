from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///posts.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)


class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(80), nullable=False)
    type = db.Column(db.String(80), nullable=False)
    description = db.Column(db.String(200), nullable=False)
    price = db.Column(db.Integer, nullable=False)
    area = db.Column(db.String(80), nullable=False)
    bathroomCount = db.Column(db.Integer, nullable=False)
    city = db.Column(db.String(80), nullable=False)
    postcode = db.Column(db.String(80), nullable=False)
    addressLine = db.Column(db.String(80), nullable=False)
    # photos = db.Column(db.String(80), nullable=True)
    beds = db.Column(db.Integer, nullable=False)
    condition = db.Column(db.String(80), nullable=False)
    hasParking = db.Column(db.String(80), nullable=False)
    smokingFriendly = db.Column(db.String(80), nullable=False)
    petFriendly = db.Column(db.String(80), nullable=False)
    hasBalcony = db.Column(db.String(80), nullable=False)

    def __repr__(self):
        return '<Post %r>' % self.title


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
        type=data['type'],
        description=data['description'],
        price=data['price'],
        area=data['area'],
        bathroomCount=data['bathroomCount'],
        city=data['city'],
        postcode=data['postcode'],
        addressLine=data['addressLine'],
        # photos=data['photos'],
        beds=data['beds'],
        condition=data['condition'],
        hasParking=data['hasParking'],
        smokingFriendly=data['smokingFriendly'],
        petFriendly=data['petFriendly'],
        hasBalcony=data['hasBalcony'])
    db.session.add(new_post)
    db.session.commit()
    print('Post Created')
    return jsonify({'message': 'Post Created!'})


@app.route('/', methods=['GET'])
def get_posts():
    posts = Post.query.all()
    result = []
    for post in posts:
        post_data = {'title': post.title,
                     'type': post.type,
                     'description': post.description,
                     'price': post.price,
                     'area': post.area,
                     'bathroomCount': post.bathroomCount,
                     'city': post.city,
                     'postcode': post.postcode,
                     'addressLine': post.addressLine,
                     # 'photos': post.photos,
                     'beds': post.beds,
                     'condition': post.condition,
                     'hasParking': post.hasParking,
                     'smokingFriendly': post.smokingFriendly,
                     'petFriendly': post.petFriendly,
                     'hasBalcony': post.hasBalcony}
        result.append(post_data)
    return jsonify(result)


if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
