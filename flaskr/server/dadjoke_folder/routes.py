from .model import *
from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for
)
from ...database import mongo
from flask import Response
import functools

import json
import bson
dadjoke = Blueprint('dadjoke', __name__, url_prefix='/api/dadjoke')
@dadjoke.route('/<joke_id>', methods=['GET'])
def get_dadjoke(joke_id):
    result = get_joke(joke_id=joke_id)
    res_code = 200
    if(result.get("error")):
        res_code = 403
    js = bson.json_util.dumps(result)
    resp = Response(js, status=res_code, mimetype='application/json')
    return resp

@dadjoke.route('/<joke_id>', methods=['POST'])
def rate_dadjoke(joke_id):
    data = request.get_json()
    result = save_joke(data=data, joke_id=joke_id)
    res_code = 200
    if(result.get("error")):
        res_code = 403
    js = bson.json_util.dumps(result)
    resp = Response(js, status=res_code, mimetype='application/json')
    return resp
