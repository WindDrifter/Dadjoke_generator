from ...__init__ import create_app
from ...database import mongo
import pytest
import json
import bson
import random
from faker import Faker
import random
fake = Faker()
@pytest.fixture
def app():
    app = create_app(testing=True)
    return app

@pytest.fixture(autouse=True)
def reset_db():
    mongo.db.jokes.drop()


def clear_entry(joke_id):

    mongo.db.jokes.remove({"joke_id":joke_id})


def get_pre_setjoke(hate=False):
    if hate:
        return {"joke_id": "R7UfaahVfFd",
                "hate": 1}
    else:

        return {"joke_id": "R7UfaahVfFd",
                "like": 1}

def generateRandomDataToDB():
    ids_returned = []
    for i in range(0,10):
        fake_joke_id = fake.md5()
        ids_returned.append(fake_joke_id)
        mongo.db.jokes.insert_one({"joke_id": fake_joke_id,
                                   "likes": random.randInt(1,10),
                                   "hates": random.randInt(1,10),
                                   "meh": random.randInt(1,10)})
    return ids_returned

class Test_Joke:

    def test_return_data_type(self, client):
        pre_set_joke = get_pre_setjoke()
        joke_id = pre_set_joke["joke_id"]
        rv = client.post('/api/dadjoke/joke_id', data=json.dumps(pre_set_joke), content_type='application/json')
        assert isinstance(json.loads(rv.data), dict)
        clear_entry(joke_id)

    def test_making_sure_joke_return_joke_id(self, client):
        pre_set_joke = get_pre_setjoke()
        joke_id = pre_set_joke["joke_id"]
        rv = client.post('/api/dadjoke/${joke_id}', data=json.dumps(pre_set_joke), content_type='application/json')
        assert ("joke_id" in json.loads(rv.data))
        clear_entry(joke_id)

    def test_joke_data_should_updated(self, client):
        pre_set_joke = get_pre_setjoke()
        joke_id = pre_set_joke["joke_id"]
        rv = client.post('/api/dadjoke/${joke_id}', data=json.dumps(pre_set_joke), content_type='application/json')
        assert ("likes" in json.loads(rv.data))
