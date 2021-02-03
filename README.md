# BackEndCookbook

##recipes
must be logged in to use the recipes routes
```
GET /recipes
```

to search by Title use:

`/recipes?title=RecipeTitle`

to search by Category use a comma separated list of integers:

`/recipes?category=1,2,3`

```
GET /recipes/:id
```

```	
POST /recipes
```

`title` is required

`categories` is a list of category IDs, integers

example:
```
{
    "title": "Rice",
    "source": "Somewhere",
    "ingredients": "1 cup of water. 1 cup of rice.",
    "instructions": "Rice, water, pan, boil. Eat.",
    "categories": [1]
}
```

```
DELETE /recipes/:id
```

##categories
must be logged in to view the categories
```
GET /categories
```
returns a list of all categories

##guests
uses a query string token to view a specific recipe
```
GET /guests?token=JsonWebToken
```

##users
```
POST /users/login
```

requires a user object, for example: 

`{username: "jameskirk", password: "12345"}`

```
POST /users/register
```

requires a user object, for example: 

`{username: "jameskirk", password: "12345"}`
