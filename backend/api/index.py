from flask import Flask, request
from pymongo import MongoClient
from flask_cors import CORS



app = Flask(__name__)
CORS(app)

@app.route("/")
def default():
    return "blank page"

@app.route("/api/getWishes/")
def get_wishes():
    args = request.args
    sberuserid = args.get('sberuserid')
    database = getDatabase()
    coll = database["SberWishes"]
    result = coll.find_one({'sberuserid': sberuserid}, {'_id': 0})
    print(result)
    return result


@app.route("/api/updateWishes/", methods=["POST"])
def update_wishes():
    request_data = request.get_json()
    sberuserid = None
    list_of_wishes = None

    if request_data:
        if 'sberuserid' in request_data:
            sberuserid = request_data['sberuserid']
        if 'list_of_wishes' in request_data:
            list_of_wishes = request_data['list_of_wishes']

    database = getDatabase()
    coll = database["SberWishes"]
    coll.update_one({'sberuserid': sberuserid}, {"$set": {'wishes': list_of_wishes}}, upsert=True)
    return request.get_json()

@app.route("/test/")
def test():
    return "test test test test"


def getDatabase():

    CONNECTION_STRING = (
        "mongodb+srv://m2101760:LNndSjHPdxRWRDx4@wishes.a3tqmko.mongodb.net/SberWishes"
    )

    client = MongoClient(CONNECTION_STRING)

    return client["SberWishes"]
