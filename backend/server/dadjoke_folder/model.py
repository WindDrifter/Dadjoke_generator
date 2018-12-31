import pymongo
import bson
from ...database import mongo
from html.parser import HTMLParser
from bson.json_util import loads, dumps
from pymongo import IndexModel, ASCENDING, DESCENDING

def check_and_create_index():
    if mongo.db.jokes.count_documents({}) == 0:
        mongo.db.jokes.create_index([("joke_id",ASCENDING)], unique=True)

def save_joke(data={}, joke_id=""):
    check_and_create_index()
    joke_data = get_joke(joke_id=joke_id, from_saving=True)
    if data.get("like"):
        joke_data["likes"] =  joke_data["likes"]+data.get("like")
    elif data.get("hate"):
        joke_data["hates"] =  joke_data["hates"]+data.get("hate")
    elif data.get("meh"):
        joke_data["meh"] =  joke_data["meh"]+data.get("meh")

    if joke_data.get("is_new"):
        joke_data.pop("is_new")
        mongo.db.jokes.insert_one(joke_data)
    else:
        mongo.db.jokes.update_one({"joke_id": joke_id},{"$set": joke_data})

    return get_joke(joke_id)


def get_joke(joke_id="", from_saving=False):
    check_and_create_index()
    result = ""
    if joke_id:
        result = mongo.db.jokes.find_one({"joke_id": joke_id})
        if result is None and from_saving:
            return {"joke_id": joke_id, "tags":[],"meh":0, "likes": 0, "hates": 0, "is_new": True}
        elif result is None:
            return {"error": "Joke id not found"}
        else:
            return result
