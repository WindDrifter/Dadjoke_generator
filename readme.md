# Dadjoke generator

## Requirements:

* Python 3
* npm
* mongodb

NOTE TO INSTALL MONGO DB in local enviroment, follow this link:
https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/

##### First step - install vitrual enviroment

```
$ pip install virtualenv
```

##### Second step - create new folder, call vitrual env and pull the repository:
```
$ virtualenv dadjoke_generator
$ source dadjoke_generator/bin/activate
$ git@github.com:WindDrifter/Dadjoke_generator.git
$ cd Dadjoke_generator
```

##### Third step - install all the requirements and run the backend server
```
$ pip install -r requirements.txt
$ flask run
```


##### Fourth step - install frontend requirements (do it another terminal) and run frontend
```
$ cd frontend
$ npm install
$ npm start
```
And goto localhost:3000 and see the app run


#### Testing - Server side
Calling pytest at the project root folder will be fine
```
$ pytest
```

#### Testing - frontend
calling npm test at frontend folder would be sufficient
```
$ cd frontend
$ npm test
```
