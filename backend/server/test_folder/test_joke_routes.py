from ...database import mongo
import pytest
import json
import bson
import random
from faker import Faker
import random
fake = Faker()

# Clearing out DB after each test case
@pytest.fixture(autouse=True)
def reset_db():
    mongo.db.jokes.drop()

def clear_entry(joke_id):
    mongo.db.jokes.delete_one({"joke_id":joke_id})

def get_pre_setjoke(joke_id = "R7UfaahVfFd", hate=False, meh=False):
    if hate:
        return {"joke_id": joke_id,
                "hate": 1}
    elif meh:
        return {"joke_id": joke_id,
                "meh": 1}
    else:

        return {"joke_id": joke_id,
                "like": 1}

def generateRandomDataToDB():
    ids_returned = []
    for i in range(0,10):
        fake_joke_id = fake.md5()
        ids_returned.append(fake_joke_id)
        mongo.db.jokes.insert_one({"joke_id": fake_joke_id,
                                   "likes": random.randint(1,10),
                                   "hates": random.randint(1,10),
                                   "meh": random.randint(1,10)})
    return ids_returned

class TestJoke:

    def test_return_data_type(self, client):
        pre_set_joke = get_pre_setjoke()
        joke_id = pre_set_joke["joke_id"]
        rv = client.post('/api/dadjoke/%s'%(joke_id), data=json.dumps(pre_set_joke), content_type='application/json')
        assert isinstance(json.loads(rv.data), dict)
        clear_entry(joke_id)

    def test_making_sure_joke_return_joke_id(self, client):
        pre_set_joke = get_pre_setjoke()
        joke_id = pre_set_joke["joke_id"]
        rv = client.post('/api/dadjoke/%s'%(joke_id), data=json.dumps(pre_set_joke), content_type='application/json')
        assert ("joke_id" in json.loads(rv.data))
        clear_entry(joke_id)

    def test_joke_data_should_updated(self, client):
        pre_set_joke = get_pre_setjoke()
        joke_id = pre_set_joke["joke_id"]
        rv = client.post('/api/dadjoke/%s'%(joke_id), data=json.dumps(pre_set_joke), content_type='application/json')
        assert ("likes" in json.loads(rv.data))
        clear_entry(joke_id)

    def test_new_entry_is_added_if_joke_id_does_not_exist(self, client):
        pre_set_joke = get_pre_setjoke()
        joke_id = pre_set_joke["joke_id"]
        precount = mongo.db.jokes.count_documents({})
        rv = client.post('/api/dadjoke/%s'%(joke_id), data=json.dumps(pre_set_joke), content_type='application/json')
        postcount = mongo.db.jokes.count_documents({})
        assert (postcount- precount ==1)
        clear_entry(joke_id)

    def test_like_data_add_to_total_properly(self, client):
        joke_ids = generateRandomDataToDB()
        joke_id = joke_ids[1]
        pre_set_joke = get_pre_setjoke(joke_id=joke_id)
        precount_likes = mongo.db.jokes.find_one({"joke_id": joke_id}).get("likes")
        rv = client.post('/api/dadjoke/%s'%(joke_id), data=json.dumps(pre_set_joke), content_type='application/json')
        postcount_likes = mongo.db.jokes.find_one({"joke_id": joke_id}).get("likes")
        assert (postcount_likes - precount_likes ==1)

    def test_hate_data_add_to_total_properly(self, client):
        joke_ids = generateRandomDataToDB()
        joke_id = joke_ids[1]
        pre_set_joke = get_pre_setjoke(joke_id=joke_id, hate=True)
        precount_hates = mongo.db.jokes.find_one({"joke_id": joke_id}).get("hates")
        rv = client.post('/api/dadjoke/%s'%(joke_id), data=json.dumps(pre_set_joke), content_type='application/json')
        postcount_hates = mongo.db.jokes.find_one({"joke_id": joke_id}).get("hates")
        assert (postcount_hates - precount_hates ==1)

    def test_meh_data_add_to_total_properly(self, client):
        joke_ids = generateRandomDataToDB()
        joke_id = joke_ids[1]
        pre_set_joke = get_pre_setjoke(joke_id=joke_id, meh=True)
        precount_meh = mongo.db.jokes.find_one({"joke_id": joke_id}).get("meh")
        rv = client.post('/api/dadjoke/%s'%(joke_id), data=json.dumps(pre_set_joke), content_type='application/json')
        postcount_meh = mongo.db.jokes.find_one({"joke_id": joke_id}).get("meh")
        assert (postcount_meh - precount_meh ==1)
