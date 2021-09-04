# blue-ocean

"Deeper than a puddle, as wide as the sky."
[Deployment](http://3.144.32.109:3000/)

## Requirements

- A running installation of PostGreSQL
- An ENV file with the following properties:
```
    DB_USER='FILL_ME_IN'
    DB_PASSWORD='FILL_ME_IN'
    DB_PORT=5432
    DB_NAME='donation_station'
    DB_HOST='localhost'
    MAPS_API_KEY='FILL_ME_IN'
    CLIENT_ID='FILL_ME_IN'
    CLIENT_SECRET='FILL_ME_IN'
    REDIRECT_URI='FILL_ME_IN'
    REFRESH_TOKEN='FILL_ME_IN'
```
- A config file within a config directory which exports the following properties:
```
    const S3_ACCESS_KEY = 'FILL_ME_IN';
    const S3_SECRET = 'FILL_ME_IN';

    module.exports = {
      S3_ACCESS_KEY,
      S3_SECRET,
    };
```
- API Keys:
  - Firebase Private Key for Authentication (contained in JSON file in the root)
  - Google OAuth Key for Email Notifications (CLIENT_ID and CLIENT_SECRET in ENV file)
  - Google Maps API Key for Distance Finding (MAPS_API_KEY in ENV file)
  - Amazon S3 Keys for Image Storage (S3_ACCESS_KEY and S3_SECRET in the config file)

## Run Instructions

1. Clone this Repository or download its zip.
2. Navigate to its directory using a console.
3. Install the dependencies with `npm install`
4. Bundle the code with `npm run build:prod`
5. Serve the result on `localhost:3000` using `npm run start:prod`

## Technologies

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)

![Material UI](https://img.shields.io/badge/materialui-%230081CB.svg?style=for-the-badge&logo=material-ui&logoColor=white)

![Firebase](https://img.shields.io/badge/firebase-%23039BE5.svg?style=for-the-badge&logo=firebase)

![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)

![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)

![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)

![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)

![Google Cloud](https://img.shields.io/badge/GoogleCloud-%234285F4.svg?style=for-the-badge&logo=google-cloud&logoColor=white)

![Styled Components](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)

![Testing-Library](https://img.shields.io/badge/-TestingLibrary-%23E33332?style=for-the-badge&logo=testing-library&logoColor=white)

### Developed Using

![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)

![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)

![GitHub Actions](https://img.shields.io/badge/githubactions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white)

![Webpack](https://img.shields.io/badge/webpack-%238DD6F9.svg?style=for-the-badge&logo=webpack&logoColor=black)

![NPM](https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white)

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)

![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)

![Gmail](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)

![Babel](https://img.shields.io/badge/Babel-F9DC3e?style=for-the-badge&logo=babel&logoColor=black)

![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)

![Discord](https://img.shields.io/badge/%3CServer%3E-%237289DA.svg?style=for-the-badge&logo=discord&logoColor=white)

![Slack](https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=slack&logoColor=white)

![Ubuntu](https://img.shields.io/badge/Ubuntu-E95420?style=for-the-badge&logo=ubuntu&logoColor=white)

### **KAPOW**

_We have no official or unofficial affiliation with Liz Benny, and do not represent her. We are fans paying homage, and admire her speaking skills._
