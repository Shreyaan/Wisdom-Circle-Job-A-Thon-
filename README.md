
#  Sign-in flow using Nuxt

sign-in form and sign up form with a bunch of error screens for different edge cases


## Demo

https://wisdom-circle-job-a-thon.vercel.app/

## Deployment

Fork, then download or clone the repo.


### For the **back-end**

go to *backend* folder via the terminal.

```bash
cd backend
```

install the dependencies once via the terminal.
```bash
npm install
```

Run the *main server*. It listens on port 3001.
```bash
npm statrt
```
View it on the browser.




### For the **Front-end**

go to *frontend* folder via the terminal.

```bash
cd frontend
```

Install the dependencies required by React once.
```bash
npm install
```
## Development Server

Start the development server on http://localhost:3000

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```




## API Reference

#### Register

```http
POST api/auth/register
```

| Required form fields | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**. email of user |
| `name` | `string` | **Required**. name of user |
 `password` | `string` | **Required**. password of user |


#### login


```http
POST api/auth/login
```

| Required form fields | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**. email of user |
 `password` | `string` | **Required**. password of user |


#### Checkauth


```http
GET api/checkauth
```
Checks auth status of user

| Required headers| Type     | format                |
| :-------- | :------- | :------------------------- |
| `Authorization` | `string` | Bearer accessToken|


#### other

```http
GET api/auth/refresh_token
```

gets new accessToken from the refresh token sent in cookie



## Screenshots

![](https://cdn.discordapp.com/attachments/1025706389387104266/1045380948356776066/image.png)


![](https://cdn.discordapp.com/attachments/1025706389387104266/1045388920680099850/image.png)

