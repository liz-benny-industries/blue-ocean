# blue-ocean

An application for posting items you'd like to donate. Features include authentication, travel time calculations between your entered address and the item's listed address, and sorting donations based on post recency or proximity.

[Deployment](https://adb-blue-ocean.herokuapp.com/)

## Requirements

- A running installation of PostGreSQL
- An ENV file in `server` with the following properties:
```
	DB_USER='postgres'
	DB_PASSWORD='postgres'
	DB_PORT=5432
	DB_NAME='donation_station'
	DB_HOST='localhost'
	GOOGLE_MAPS_API_KEY=FILL_ME_IN
	GOOGLE_AUTH_CLIENT_ID=FILL_ME_IN
	GOOGLE_AUTH_CLIENT_SECRET=FILL_ME_IN
	GOOGLE_AUTH_REDIRECT_URI=FILL_ME_IN
	GOOGLE_AUTH_REFRESH_TOKEN=FILL_ME_IN
	FIREBASE_TYPE=FILL_ME_IN
	FIREBASE_PROJECT_ID=FILL_ME_IN
	FIREBASE_PRIVATE_KEY_ID=FILL_ME_IN
	FIREBASE_PRIVATE_KEY=FILL_ME_IN
	FIREBASE_CLIENT_EMAIL=FILL_ME_IN
	FIREBASE_CLIENT_ID=FILL_ME_IN
	FIREBASE_AUTH_URI=FILL_ME_IN
	FIREBASE_TOKEN_URI=FILL_ME_IN
	FIREBASE_AUTH_PROVIDER_URL=FILL_ME_IN
	FIREBASE_CLIENT_CERT_URL=FILL_ME_IN
```
- An ENV file in `client` with the following properties:
```
	S3_ACCESS_KEY=FILL_ME_IN
	S3_SECRET=FILL_ME_IN
```
- API Keys:
  - Firebase Private Key for Authentication (contained in the server ENV file)
  - Google OAuth Key for Email Notifications (contained in the server ENV file)
  - Google Maps API Key for Distance Finding (contained in the server ENV file)
  - Amazon S3 Keys for Image Storage (contained in the client ENV file)

## Run Instructions

1. Clone this Repository or download its zip.
2. Navigate to its directory using a console.
3. Install the dependencies with `npm install`
4. Bundle the code with `npm run build`
5. Serve the result on `localhost:3000` using `npm run start`

## Technologies

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)

![Material UI](https://img.shields.io/badge/materialui-%230081CB.svg?style=for-the-badge&logo=material-ui&logoColor=white)

![Firebase](https://img.shields.io/badge/firebase-%23039BE5.svg?style=for-the-badge&logo=firebase)

![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)

![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)

![Google Cloud](https://img.shields.io/badge/GoogleCloud-%234285F4.svg?style=for-the-badge&logo=google-cloud&logoColor=white)

![Testing-Library](https://img.shields.io/badge/-TestingLibrary-%23E33332?style=for-the-badge&logo=testing-library&logoColor=white)

### Developed Using

![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)

![Webpack](https://img.shields.io/badge/webpack-%238DD6F9.svg?style=for-the-badge&logo=webpack&logoColor=black)

![NPM](https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white)

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)

### **KAPOW**

_We have no official or unofficial affiliation with Liz Benny, and do not represent her. We are fans paying homage, and admire her speaking skills._
