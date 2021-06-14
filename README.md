# Postgrest Docker example

An example docker-compose setup for configuring a PostgreSQL database and the associated PostgREST endpoint, which is exposed to the internet using `cloudflared`.

## Example data

You can generate some example data by running the `create-example-data.sql` script inside of your running docker container:

```sh
$ docker-compose exec postgres psql -U user -d db -f /scripts/create-example-data.sql 
```

This will create a `users` table and a single user with the name `Kristian`.

## Making requests

A `cloudflared` tunnel will be generated when you run `docker-compose` up, such as `https://honolulu-devices-update-drink.trycloudflare.com`. You can find the currently active tunnel URL by looking through the `docker-compose` logs:

```sh
$ docker-compose logs cloudflared | grep trycloudflare
cloudflared_1 | INFO[2021-06-14T17:26:05Z] | https://honolulu-devices-update-drink.trycloudflare.com
```

This tunnel allows access to the PostgREST endpoint. You can make a few example requests to see data correctly returned from PostgreSQL to PostgREST, and then to your terminal:

```sh
$ curl https://honolulu-devices-update-drink.trycloudflare.com/users
[{"id":1,"name":"Kristian"}]

$ curl https://honolulu-devices-update-drink.trycloudflare.com/users?id=eq.1
[{"id":1,"name":"Kristian"}]

$ curl https://honolulu-devices-update-drink.trycloudflare.com/users?id=eq.2
[]
```

You can also create records using the PostgREST API, though you should go through the [PostgREST tutorial on user authentication](https://postgrest.org/en/stable/tut1.html) to secure your API:

```sh
$ curl https://honolulu-devices-update-drink.trycloudflare.com/users \
  -X POST \
  -H "Content-type: application/json" \
  -d '{"name": "Dog"}'

$ curl https://honolulu-devices-update-drink.trycloudflare.com/users?name=eq.Dog
[{"id":2, "name":"Dog"}]
```